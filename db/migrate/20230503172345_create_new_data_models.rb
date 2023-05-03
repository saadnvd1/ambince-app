class CreateNewDataModels < ActiveRecord::Migration[7.0]
  def change
    drop_table :notebooks, force: :cascade
    drop_table :notes, force: :cascade
    drop_table :note_images, force: :cascade
    drop_table :note_versions, force: :cascade

    create_table :journals do |t|
      t.references :user, index: true, foreign_key: true
      t.string :name

      t.timestamps
    end

    create_table :entries do |t|
      t.references :journal, index: true, foreign_key: true
      t.text :title, null: true
      t.text :content, null: false
      t.string :mood, null: true

      t.timestamps
    end

    create_table :entry_versions do |t|
      t.string :item_type, null: false
      t.bigint :item_id, null: false
      t.string :event, null: false
      t.string :whodunnit
      t.json :object
      t.json :object_changes

      t.datetime :created_at
    end

    add_index :entry_versions, %i[item_type item_id]

    create_table :entry_images do |t|
      t.string :file
      t.references :entry, null: false, foreign_key: true

      t.timestamps
    end

    create_table :custom_quotes do |t|
      t.references :user, index: true, foreign_key: true
      t.string :content, null: true
      t.string :image, null: true
      t.string :author, null: true

      t.timestamps
    end

    create_table :standard_quotes do |t|
      t.string :content, null: true
      t.string :image_name, null: true
      t.string :author, null: true

      t.timestamps
    end

    create_table :starred do |t|
      t.references :starrable, polymorphic: true, null: false
      t.references :user, index: true, foreign_key: true

      t.timestamps
    end

    create_table :user_settings do |t|
      t.references :user, index: true, foreign_key: true
      t.boolean :qotd_email_reminder_enabled, default: false
      t.boolean :qotd_sms_reminder_enabled, default: false
      t.string :qotd_reminder_time, null: true

      t.timestamps
    end

    create_table :gratitude_entries do |t|
      t.references :user, index: true, foreign_key: true
      t.text :prompt, null: false
      t.text :content, null: false

      t.timestamps
    end
  end
end
