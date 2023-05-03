# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_05_03_172345) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "custom_quotes", force: :cascade do |t|
    t.bigint "user_id"
    t.string "content"
    t.string "image"
    t.string "author"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_custom_quotes_on_user_id"
  end

  create_table "entries", force: :cascade do |t|
    t.bigint "journal_id"
    t.text "title"
    t.text "content", null: false
    t.string "mood"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["journal_id"], name: "index_entries_on_journal_id"
  end

  create_table "entry_images", force: :cascade do |t|
    t.string "file"
    t.bigint "entry_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["entry_id"], name: "index_entry_images_on_entry_id"
  end

  create_table "entry_versions", force: :cascade do |t|
    t.string "item_type", null: false
    t.bigint "item_id", null: false
    t.string "event", null: false
    t.string "whodunnit"
    t.json "object"
    t.json "object_changes"
    t.datetime "created_at"
    t.index ["item_type", "item_id"], name: "index_entry_versions_on_item_type_and_item_id"
  end

  create_table "features", force: :cascade do |t|
    t.string "name", null: false
    t.bigint "plan_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["plan_id"], name: "index_features_on_plan_id"
  end

  create_table "gratitude_entries", force: :cascade do |t|
    t.bigint "user_id"
    t.text "prompt", null: false
    t.text "content", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_gratitude_entries_on_user_id"
  end

  create_table "journals", force: :cascade do |t|
    t.bigint "user_id"
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_journals_on_user_id"
  end

  create_table "plans", force: :cascade do |t|
    t.string "name"
    t.string "stripe_product_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "prices", force: :cascade do |t|
    t.bigint "plan_id", null: false
    t.string "stripe_price_id", null: false
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["plan_id"], name: "index_prices_on_plan_id"
  end

  create_table "standard_quotes", force: :cascade do |t|
    t.string "content"
    t.string "image_name"
    t.string "author"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "starred", force: :cascade do |t|
    t.string "starrable_type", null: false
    t.bigint "starrable_id", null: false
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["starrable_type", "starrable_id"], name: "index_starred_on_starrable"
    t.index ["user_id"], name: "index_starred_on_user_id"
  end

  create_table "subscriptions", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "plan_id", null: false
    t.string "stripe_customer_id"
    t.string "stripe_subscription_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "status", null: false
    t.index ["plan_id"], name: "index_subscriptions_on_plan_id"
    t.index ["user_id"], name: "index_subscriptions_on_user_id"
  end

  create_table "trials", force: :cascade do |t|
    t.datetime "start_date", null: false
    t.datetime "end_date", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "active", default: true
    t.index ["user_id"], name: "index_trials_on_user_id"
  end

  create_table "user_settings", force: :cascade do |t|
    t.bigint "user_id"
    t.boolean "qotd_email_reminder_enabled", default: false
    t.boolean "qotd_sms_reminder_enabled", default: false
    t.string "qotd_reminder_time"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_user_settings_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at", precision: nil
    t.datetime "remember_created_at", precision: nil
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "jti", null: false
    t.jsonb "meta", default: {}
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["jti"], name: "index_users_on_jti", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "custom_quotes", "users"
  add_foreign_key "entries", "journals"
  add_foreign_key "entry_images", "entries"
  add_foreign_key "features", "plans"
  add_foreign_key "gratitude_entries", "users"
  add_foreign_key "journals", "users"
  add_foreign_key "prices", "plans"
  add_foreign_key "starred", "users"
  add_foreign_key "subscriptions", "plans"
  add_foreign_key "subscriptions", "users"
  add_foreign_key "trials", "users"
  add_foreign_key "user_settings", "users"
end
