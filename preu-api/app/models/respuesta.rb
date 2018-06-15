class Respuesta < ApplicationRecord
  belongs_to :ensayo
  belongs_to :pregunta
  belongs_to :alumno
end
