class StandardQuote < ApplicationRecord
end

# == Schema Information
#
# Table name: entries
#
#  id         :bigint           not null, primary key
#  content    :text             not null
#  mood       :string
#  title      :text
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  journal_id :bigint
#
# Indexes
#
#  index_entries_on_journal_id  (journal_id)
#
# Foreign Keys
#
#  fk_rails_...  (journal_id => journals.id)
#
