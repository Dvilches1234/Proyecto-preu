class Ensayo < ApplicationRecord
  belongs_to :seccion
  has_many :preguntas
  has_many :respuestas
  has_many :alumnos, :through => :respuestas
  has_many :resultados

end
