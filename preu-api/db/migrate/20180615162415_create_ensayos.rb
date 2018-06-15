class CreateEnsayos < ActiveRecord::Migration[5.2]
  def change
    create_table :ensayos do |t|
      t.belongs_to :seccion
      t.string :asignatura
      t.date :fecha
      t.timestamps
    end
  end
end
