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

ActiveRecord::Schema.define(version: 2018_06_24_065441) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "alumnos", force: :cascade do |t|
    t.date "fecha_de_nacimiento"
    t.string "sexo", limit: 1
    t.string "comuna"
    t.string "direccion"
    t.string "motivacion"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "colegio_id"
    t.index ["colegio_id"], name: "index_alumnos_on_colegio_id"
  end

  create_table "antecedente_educacionals", force: :cascade do |t|
    t.bigint "alumno_id"
    t.string "situacion_academica"
    t.integer "promedio_primero"
    t.integer "promedio_segundo"
    t.integer "promedio_tercero"
    t.integer "promedio_cuarto"
    t.string "nivel_educacional"
    t.string "observaciones"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["alumno_id"], name: "index_antecedente_educacionals_on_alumno_id"
  end

  create_table "antecedente_socioeconomicos", force: :cascade do |t|
    t.bigint "alumno_id"
    t.integer "numero_integrantes"
    t.integer "ingreso_total"
    t.string "estado_vivienda"
    t.integer "integrantes_trabajo_estable"
    t.boolean "trabajador"
    t.string "trabajo"
    t.boolean "internet"
    t.boolean "computador"
    t.boolean "problemas_transporte"
    t.boolean "puede_pagar"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["alumno_id"], name: "index_antecedente_socioeconomicos_on_alumno_id"
  end

  create_table "colegios", force: :cascade do |t|
    t.string "nombre"
    t.string "tipo", limit: 1
    t.string "dependencia"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "comuna"
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

  create_table "documentos", force: :cascade do |t|
    t.string "documentable_type"
    t.bigint "documentable_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["documentable_type", "documentable_id"], name: "index_documentos_on_documentable_type_and_documentable_id"
  end

  create_table "ensayos", force: :cascade do |t|
    t.bigint "seccion_id"
    t.string "asignatura"
    t.date "fecha"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["seccion_id"], name: "index_ensayos_on_seccion_id"
  end

  create_table "listas", force: :cascade do |t|
    t.bigint "alumno_id"
    t.bigint "seccion_id"
    t.bigint "docente_id"
    t.boolean "asistencia"
    t.date "fecha"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["alumno_id"], name: "index_listas_on_alumno_id"
    t.index ["docente_id"], name: "index_listas_on_docente_id"
    t.index ["seccion_id"], name: "index_listas_on_seccion_id"
  end

  create_table "preguntas", force: :cascade do |t|
    t.integer "numero"
    t.string "respuesta", limit: 1
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "ensayo_id"
    t.index ["ensayo_id"], name: "index_preguntas_on_ensayo_id"
  end

  create_table "respuestas", force: :cascade do |t|
    t.bigint "ensayo_id"
    t.bigint "pregunta_id"
    t.bigint "alumno_id"
    t.string "respuesta", limit: 1
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["alumno_id"], name: "index_respuestas_on_alumno_id"
    t.index ["ensayo_id"], name: "index_respuestas_on_ensayo_id"
    t.index ["pregunta_id"], name: "index_respuestas_on_pregunta_id"
  end

  create_table "resultados", force: :cascade do |t|
    t.bigint "alumno_id"
    t.bigint "ensayo_id"
    t.integer "puntaje"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["alumno_id"], name: "index_resultados_on_alumno_id"
    t.index ["ensayo_id"], name: "index_resultados_on_ensayo_id"
  end

  create_table "seccions", force: :cascade do |t|
    t.string "asignatura"
    t.string "horario"
    t.string "codigo"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
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
    t.index ["rut"], name: "index_users_on_rut", unique: true
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
