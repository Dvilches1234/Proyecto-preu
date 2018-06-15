# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2018_06_15_071528) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "alumnos", force: :cascade do |t|
    t.date "fecha_de_nacimiento"
    t.string "sexo", limit: 1
    t.string "comuna"
    t.string "direccion"
    t.string "motivacion"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "documento_oficials", force: :cascade do |t|
    t.bigint "user_id"
    t.string "tipo_de_documento"
    t.date "fecha_de_expiracion"
    t.string "motivo"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_documento_oficials_on_user_id"
  end

  create_table "seccions", force: :cascade do |t|
    t.bigint "administrador_id"
    t.string "asignatura"
    t.string "horario"
    t.string "codigo"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["administrador_id"], name: "index_seccions_on_administrador_id"
  end

  create_table "student_sections", force: :cascade do |t|
    t.bigint "alumno_id"
    t.bigint "seccion_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["alumno_id"], name: "index_student_sections_on_alumno_id"
    t.index ["seccion_id"], name: "index_student_sections_on_seccion_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "rut"
    t.string "nombres"
    t.string "apellidos"
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "telefono"
    t.string "userable_type"
    t.bigint "userable_id"
    t.index ["userable_type", "userable_id"], name: "index_users_on_userable_type_and_userable_id"
  end

  create_table "voluntarios", force: :cascade do |t|
    t.string "universidad"
    t.string "carrera"
    t.integer "años_cursados"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "type"
  end

end
