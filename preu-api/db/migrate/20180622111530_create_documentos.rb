class CreateDocumentos < ActiveRecord::Migration[5.2]
  def change
    create_table :documentos do |t|
      t.references :documentable, polymorphic: true, index: true
      t.timestamps
    end
  end
end
