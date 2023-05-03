class EntryImage < ApplicationRecord
  mount_uploader :file, EntryImageUploader

  belongs_to :entry

  validates :file, presence: true
end

# == Schema Information
#
# Table name: entry_images
#
#  id         :bigint           not null, primary key
#  file       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  entry_id   :bigint           not null
#
# Indexes
#
#  index_entry_images_on_entry_id  (entry_id)
#
# Foreign Keys
#
#  fk_rails_...  (entry_id => entries.id)
#
