class Docente < Voluntario
  has_many :listas
  has_many :alumnos, :through => :listas
  # has_many :seccions, :through :listas
end
