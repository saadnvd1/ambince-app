class GratitudeEntry < ApplicationRecord
  PROMPTS = [
    "What are you grateful for today?",
    "What's something you're really proud about?",
    "What kindness did you show someone today?",
    "What difficulty did you overcome today?",
    "What made you feel better today?",
    "Who made your day better today?",
    "What were the highlights of your day?"
  ].freeze

  belongs_to :user

  encrypts :content
  encrypts :prompt, deterministic: true
end

# == Schema Information
#
# Table name: gratitude_entries
#
#  id         :bigint           not null, primary key
#  content    :text             not null
#  prompt     :text             not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :bigint
#
# Indexes
#
#  index_gratitude_entries_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
