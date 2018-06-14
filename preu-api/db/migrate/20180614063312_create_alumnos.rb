class CreateAlumnos < ActiveRecord::Migration[5.2]
  def change
    create_table :alumnos do |t|
      t.date :fecha_de_nacimiento
      t.string :sexo, :limit => 1
      t.string :comuna
      t.string :direccion
      t.string :motivacion

      t.timestamps
    end
  end
end
