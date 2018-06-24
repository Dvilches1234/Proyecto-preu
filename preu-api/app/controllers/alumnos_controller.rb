class AlumnosController < ApplicationController
  def create
    data = alumno_params
    user = data[:user]
    password = user['nombres'][0].downcase + user['apellidos'][0].downcase + user['rut'][0..5]
    colegio = Colegio.find(data[:school])
    alumno = colegio.alumnos.create!(data[:student])
    alumno.create_user!(user.merge!(password: password, password_confirmation: password))
    alumno.create_antecedente_socioeconomico!(data[:economics])
    antecedente = alumno.create_antecedente_educacional!(data[:academics])
    antecedente.create_documento!(data[:document])
    render json: {message: "Alumno creado correctamente!"}, status: :created
  end

  private

  def alumno_params
    params.permit(
      :school,
      user: [
        :rut, :nombres, :apellidos, :email, :telefono
      ],
      student: [
        :comuna, :direccion, :fecha_de_nacimiento, :sexo, :motivacion
      ],
      academics: [
        :situacion_academica, :promedio_primero, :promedio_segundo,
        :promedio_tercero, :promedio_cuarto, :nivel_educacional, :observaciones
      ],
      economics: [
        :numero_de_integrantes, :ingresa_total, :estado_vivienda,
        :integrantes_trabajo_estable, :trabajador, :trabajo, :internet,
        :computador, :problemas_transporte, :puede_pagar
      ],
      document: [
        :doc_contents, :doc_name
      ]
    )
  end
end
