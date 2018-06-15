class AddTypeToVoluntarios < ActiveRecord::Migration[5.2]
  def change
    add_column :voluntarios, :type, :string
  end
end
