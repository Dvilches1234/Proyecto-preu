class CreateDocumentoOficials < ActiveRecord::Migration[5.2]
  def change
    create_table :documento_oficials do |t|
      t.belongs_to :user
      t.string :tipo_de_documento
      t.date :fecha_de_expiracion
      t.string :motivo
      t.timestamps
    end
  end
end
