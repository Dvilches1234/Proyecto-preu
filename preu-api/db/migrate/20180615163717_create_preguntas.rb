class CreatePreguntas < ActiveRecord::Migration[5.2]
  def change
    create_table :preguntas do |t|
      t.belongs_to :ensayos
      t.integer :numero
      t.string :respuesta, :limit => 1
      t.timestamps
    end
  end
end
