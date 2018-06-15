class CreateAntecedenteEducacionals < ActiveRecord::Migration[5.2]
  def change
    create_table :antecedente_educacionals do |t|
      t.belongs_to :alumno
      t.string :situacion_academica
      t.integer :promedio_primero
      t.integer :promedio_segundo
      t.integer :promedio_tercero
      t.integer :promedio_cuarto
      t.string :certificado_de_notas
      t.string :nivel_educacional
      t.string :observaciones
      t.timestamps
    end
  end
end
