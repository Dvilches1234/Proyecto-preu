class RemoveAdminFromSeccion < ActiveRecord::Migration[5.2]
  def change
    remove_reference :seccions, :administrador
  end
end
