class SessionsController < Devise::SessionsController
  clear_respond_to
  respond_to :json
  # POST /v1/login
  def create
    @user = User.find_by_email(user_params[:email].downcase)

    if @user.blank?
      render json: {error: "Sorry, it looks like that email doesn't exist in our system. Have you registered yet?"}, status: :unprocessable_entity
      return
    end

    if @user.valid_password?(user_params[:password])
      sign_in :user, @user
      render "home/session_data"
    else
      invalid_login_attempt
    end
  end

  private

  def invalid_login_attempt
    warden.custom_failure!
    render json: {error: "Sorry, it looks like that password isn't right"}, status: :unprocessable_entity
  end

  def user_params
    params.require(:user).permit(:email, :password)
  end
end
