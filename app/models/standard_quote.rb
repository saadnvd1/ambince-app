class StandardQuote < ApplicationRecord
end

# == Schema Information
#
# Table name: standard_quotes
#
#  id         :bigint           not null, primary key
#  author     :string
#  content    :string
#  image_name :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
