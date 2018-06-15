class CreateColegios < ActiveRecord::Migration[5.2]
  def change
    create_table :colegios do |t|
      t.string :nombre
      t.string :tipo, :limit => 1
      t.string :dependencia
      t.timestamps
    end

    add_reference :alumnos, :colegio
  end
end
