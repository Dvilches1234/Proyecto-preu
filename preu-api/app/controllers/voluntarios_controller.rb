class VoluntariosController < ApplicationController

  # <Option value="docente">Docente</Option>
  # <Option value="ensayos">Encargado de Ensayos</Option>
  # <Option value="contraloria">Encargado de Contraloria</Option>
  # <Option value="admin">Administrador</Option>
  def create
    data = voluntario_params;
    user = data[:user]
    password = user[:nombres].downcase + user[:apellidos].downcase + user[:rut][0..5]
    case data[:type]
    when "docente"
      voluntario = Docente.create!(data[:volunteer])
    when "ensayos"
      voluntario = EncargadoDeEnsayos.create!(data[:volunteer])
    when "contraloria"
      voluntario = EncargadoDeContraloria.create!(data[:volunteer])
    when "impresiones"
      voluntario = EncargadoDeImpresiones.create!(data[:volunteer])
    when "admin"
      voluntario = Administrador.create!(data[:volunteer])
    end
    voluntario.create_user!(user.merge!(password: password, password_confirmation: password))
    render json: {message: "Voluntario creado correctamente"}, status: :created
  end

  private

  def voluntario_params
    params.permit(
      :type,
      user: [
        :rut, :nombres, :apellidos, :email, :telefono
      ],
      volunteer: [
        :universidad, :carrera, :años_cursados,
      ])
  end
end
