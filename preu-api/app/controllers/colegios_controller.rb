class ColegiosController < ApplicationController

  def create
    colegio = Colegio.create!(colegio_params)
    render json: {colegio_id: colegio.id}, status: :created
  end

  def index
    results = []

    Colegio.find_each do |colegio|
      case colegio.tipo
      when 'c'
        tipo = "Científico Humanista"
      when 't'
        tipo = "Técnico Profesional"
      when 'a'
        tipo = "Educación de Adultos"
      when 'e'
        tipo = "Educación Especial"
      end

      results.push({
        key: colegio.id,
        name: colegio.nombre,
        district: colegio.comuna,
        type: tipo,
        dependency: colegio.dependencia,
        })
    end
    render json: {results: results}
  end

  private

  def colegio_params
    params.permit(:nombre, :tipo, :dependencia)
  end
end
