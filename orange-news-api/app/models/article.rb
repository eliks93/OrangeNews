class Article < ApplicationRecord
  validates :headline, uniqueness: true
end
