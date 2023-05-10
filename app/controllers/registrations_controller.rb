class RegistrationsController < Devise::RegistrationsController
  respond_to :json
  def create
    result = CreateUser.run(user_params)

    if result.valid?
      sign_in :user, result.result
      render "home/session_data"
    else
      warden.custom_failure!
      render json: {error: result.errors.full_messages.first }, status: :unprocessable_entity
    end
  end

  def request_code
    code = (SecureRandom.random_number(9e5) + 1e5).to_i
    email = request_code_params[:email]

    $redis.setex("verify-code-#{email}", 30.minutes.to_i, code.to_json)

    SendEmail.run!(params: {
        to_email: email,
        template_id: "d-7f20307253694e299d0520686d50eef2",
        template_params: { code: code }
      }
    )
  end

  def update
    @user = current_user
    @user.assign_attributes(user_params.except(:meta))
    @user.meta.merge!(user_params[:meta])

    if @user.save
      render "home/session_data"
    else
      render json: {error: "invalid update"}, status: :unprocessable_entity
    end
  end

  def destroy
    @user = User.find_by_email(user_params[:email])
    if @user.destroy
      render json: {success: "user was successfully deleted"}, status: 201
    else
      render json: {error: "user could not be deleted"}, status: 422
    end
  end

  private

  def request_code_params
    params.permit(:email)
  end

  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation, :code, meta: {})
  end
end
