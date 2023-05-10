class SendEmail < ActiveInteraction::Base
  include SendGrid

  hash :params, strip: false

  def execute
    mail = Mail.new
    mail.from = Email.new(email: 'hello@ambince.com')
    personalization = Personalization.new
    personalization.add_to(Email.new(email: params[:to_email]))
    personalization.add_dynamic_template_data(params[:template_params] || {})
    mail.add_personalization(personalization)
    mail.template_id = params[:template_id]

    sg = SendGrid::API.new(api_key: Rails.application.credentials.sendgrid[:api_key])
    begin
        response = sg.client.mail._("send").post(request_body: mail.to_json)
    rescue Exception => e
        puts e.message
    end
  end
end