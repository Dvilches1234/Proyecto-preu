class CreateSeccions < ActiveRecord::Migration[5.2]
  def change
    create_table :seccions do |t|
      t.belongs_to :administrador
      t.string :asignatura
      t.string :horario
      t.string :codigo
      t.timestamps
    end
  end
end
