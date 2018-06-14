class Voluntario < ApplicationRecord
  has_one :user, as: :userable
end
