class Docente < Voluntario
  has_many :listas
  has_many :teacher_sections
  has_many :seccions, :through => :teacher_sections
  has_many :alumnos, :through => :seccions
  has_many :horarios, :through => :seccions

end
