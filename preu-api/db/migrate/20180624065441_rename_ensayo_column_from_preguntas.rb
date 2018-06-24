class RenameEnsayoColumnFromPreguntas < ActiveRecord::Migration[5.2]
  def change
    remove_reference :preguntas, :ensayos
    add_reference :preguntas, :ensayo
  end
end
