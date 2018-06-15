class Voluntario < ApplicationRecord
  has_one :user, as: :userable
  has_many :documento_oficials, :through => :user
end
