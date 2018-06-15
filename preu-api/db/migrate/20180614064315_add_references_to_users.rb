class AddReferencesToUsers < ActiveRecord::Migration[5.2]
  def change
    add_reference :users, :userable, polymorphic: true, index: true
  end
end
