class Starred < ApplicationRecord
  self.table_name = :starred

  belongs_to :user
  belongs_to :starrable

  scope :quotes, -> { where(starrable_type: "StandardQuote") }
end

# == Schema Information
#
# Table name: starred
#
#  id             :bigint           not null, primary key
#  starrable_type :string           not null
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  starrable_id   :bigint           not null
#  user_id        :bigint
#
# Indexes
#
#  index_starred_on_starrable  (starrable_type,starrable_id)
#  index_starred_on_user_id    (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
