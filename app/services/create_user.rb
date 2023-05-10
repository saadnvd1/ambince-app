class CreateUser < ActiveInteraction::Base
  string :email, :password

  def execute
    ActiveRecord::Base.transaction do
      user = User.new(user_params)

      if User.find_by_email(user_params[:email].downcase).present?
        errors.add(:base, "Sorry, it looks like that e-mail already exists. Try logging in instead.")
        return
      end

      user.save!

      create_trial(user)
      create_journal(user)

      user
    end
  end

  private

  def create_journal(user)
    Journal.create!(
      user: user,
      name: "My Journal",
    )

    Entry.create!(
      journal: user.journals.first,
      title: "#{Time.now.strftime("%m/%d/%y")}",
      content: ""
    )
  end

  def create_trial(user)
    Trial.create!(user: user,
      start_date: Date.current,
      end_date: 14.days.from_now,
      active: true)
  end

  def user_params
    {
      email: email,
      password: password
    }
  end
end
