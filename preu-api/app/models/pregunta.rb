class Pregunta < ApplicationRecord
  belongs_to :ensayo
  has_many :respuestas
end
