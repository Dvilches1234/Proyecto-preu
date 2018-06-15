class CreateAntecedenteSocioeconomicos < ActiveRecord::Migration[5.2]
  def change
    create_table :antecedente_socioeconomicos do |t|
      t.belongs_to :alumno
      t.integer :numero_integrantes
      t.integer :ingreso_total
      t.string :estado_vivienda
      t.integer :integrantes_trabajo_estable
      t.boolean :trabajador
      t.string :trabajo
      t.boolean :internet
      t.boolean :computador
      t.boolean :problemas_transporte
      t.boolean :puede_pagar
      t.timestamps
    end
  end
end
