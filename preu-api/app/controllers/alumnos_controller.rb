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
    params.require(:alumno).permit!
  end
end
