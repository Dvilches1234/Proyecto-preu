class User < ApplicationRecord
  has_secure_password
  belongs_to :userable, polymorphic: true
  has_many :documento_oficials
end
