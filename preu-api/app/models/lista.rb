class Lista < ApplicationRecord
  belongs_to :alumno
  belongs_to :seccion
  belongs_to :docente
end
