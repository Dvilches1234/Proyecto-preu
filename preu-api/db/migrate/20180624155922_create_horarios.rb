class CreateHorarios < ActiveRecord::Migration[5.2]
  def change
    create_table :horarios do |t|
      t.belongs_to :seccion
      t.string :dia
      t.string :bloque, :limit => 1
      t.timestamps
    end

    remove_column :seccions, :horario, :string
  end
end
