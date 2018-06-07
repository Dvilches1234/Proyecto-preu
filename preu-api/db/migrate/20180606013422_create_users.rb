class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :rut
      t.string :nombres
      t.string :apellidos
      t.string :email
      t.string :password_digest

      t.timestamps
    end
  end
end
