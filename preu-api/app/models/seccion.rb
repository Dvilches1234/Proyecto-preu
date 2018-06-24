class Seccion < ApplicationRecord
  has_many :student_sections
  has_many :alumnos, :through => :student_sections
  has_many :ensayos
  has_many :listas
  has_many :teacher_sections
  has_many :docentes, :through => :teacher_sections
end
