class CreateVoluntarios < ActiveRecord::Migration[5.2]
  def change
    create_table :voluntarios do |t|
      t.string :universidad
      t.string :carrera
      t.integer :años_cursados
      
      t.timestamps
    end
  end
end
