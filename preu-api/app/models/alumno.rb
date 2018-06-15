class Alumno < ApplicationRecord
  has_one :user, as: :userable
  has_many :student_sections
  has_many :seccions, :through => :student_sections
end
