class RemoveCertificadoFromAntecendenteEducacional < ActiveRecord::Migration[5.2]
  def change
    remove_column :antecedente_educacionals, :certificado_de_notas, :string
  end
end
