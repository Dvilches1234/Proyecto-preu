class AddComunaToColegio < ActiveRecord::Migration[5.2]
  def change
    add_column :colegios, :comuna, :string
  end
end
