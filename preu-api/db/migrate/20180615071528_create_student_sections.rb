class CreateStudentSections < ActiveRecord::Migration[5.2]
  def change
    create_table :student_sections do |t|
      t.belongs_to :alumno
      t.belongs_to :seccion
      t.timestamps
    end
  end
end
