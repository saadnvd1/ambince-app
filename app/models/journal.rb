class Journal < ApplicationRecord
  belongs_to :user

  with_options dependent: :destroy do
    has_many :entries
  end

  encrypts :name, deterministic: true
end

# == Schema Information
#
# Table name: journals
#
#  id         :bigint           not null, primary key
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :bigint
#
# Indexes
#
#  index_journals_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
