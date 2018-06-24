class CreateTeacherSections < ActiveRecord::Migration[5.2]
  def change
    create_table :teacher_sections do |t|
      t.belongs_to :seccion
      t.belongs_to :docente
      t.timestamps
    end
  end
end
