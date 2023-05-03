class GratitudeEntry < ApplicationRecord
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
