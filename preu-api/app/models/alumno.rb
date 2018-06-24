class Alumno < ApplicationRecord
  has_one :user, as: :userable
  has_many :documento_oficials, :through => :user
  has_many :student_sections
  has_many :seccions, :through => :student_sections
  has_many :docentes, :through => :seccions
  has_many :respuestas
  has_many :ensayos, :through => :respuestas
  has_many :resultados
  has_many :listas
  belongs_to :colegio
  has_one :antecedente_socioeconomico
  has_one :antecedente_educacional
  has_many :horarios, :through => :seccions
end
