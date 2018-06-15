class Seccion < ApplicationRecord
  belongs_to :administrador
  has_many :student_sections
  has_many :alumnos, :through => :student_sections
end
