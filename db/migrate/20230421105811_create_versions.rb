class CreateVersions < ActiveRecord::Migration[7.0]
  def change
    create_table :note_versions do |t|
      t.string :item_type, null: false
      t.bigint :item_id, null: false
      t.string :event, null: false
      t.string :whodunnit
      t.json :object
      t.json :object_changes

      t.datetime :created_at
    end

    add_index :note_versions, %i[item_type item_id]
  end
end
