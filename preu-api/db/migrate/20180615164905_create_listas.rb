class CreateListas < ActiveRecord::Migration[5.2]
  def change
    create_table :listas do |t|
      t.belongs_to :alumno
      t.belongs_to :seccion
      t.belongs_to :docente
      t.boolean :asistencia
      t.date :fecha
      t.timestamps
    end
  end
end
