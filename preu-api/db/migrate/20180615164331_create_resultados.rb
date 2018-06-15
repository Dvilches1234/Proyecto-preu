class CreateResultados < ActiveRecord::Migration[5.2]
  def change
    create_table :resultados do |t|
      t.belongs_to :alumno
      t.belongs_to :ensayo
      t.integer :puntaje
      t.timestamps
    end
  end
end
