class AddUniqueToRutInUsers < ActiveRecord::Migration[5.2]
  def change
    add_index :users, :rut, unique: true
  end
end
