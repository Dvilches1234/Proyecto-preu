class SeccionsController < ApplicationController
  def create
    data = seccion_params
    sec = Seccion.create!(asignatura: data[:asignatura], codigo: data[:codigo])
    data[:horario].each do |horario|
      sec.horarios.create!(horario)
    end
    render json: {message: "Sección creada correctamente!" }, status: :created

  end

  private
  def seccion_params
    params.permit(:asignatura, :codigo, horario: [:dia, :bloque])
  end
end
