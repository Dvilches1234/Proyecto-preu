class AntecedenteEducacional < ApplicationRecord
  belongs_to :alumno
  has_one :documento, as: :documentable
end
