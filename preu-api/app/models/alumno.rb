class Alumno < ApplicationRecord
  has_one :user, as: :userable
end
