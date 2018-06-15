class CreateRespuestas < ActiveRecord::Migration[5.2]
  def change
    create_table :respuestas do |t|
      t.belongs_to :ensayo
      t.belongs_to :pregunta
      t.belongs_to :alumno
      t.string :respuesta, :limit => 1
      t.timestamps
    end
  end
end
