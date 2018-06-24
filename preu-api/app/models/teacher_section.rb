class TeacherSection < ApplicationRecord
  belong_to :seccion
  belong_to :docente
end
