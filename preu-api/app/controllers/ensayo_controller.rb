class EnsayoController < ApplicationController

  def recibir_pauta
    params.require(:pauta).permit(:fecha, :asignatura, :seccion_id, :preguntas =>[:numero, :respuesta])
  end

  def guardar_pauta
    pauta = recibir_pauta
    ensayo_nuevo = Ensayo.create!(seccion_id: pauta['seccion_id'], asignatura: pauta['asignatura'], fecha: pauta['fecha'])
    preguntas_array = pauta['preguntas']

    preguntas_array.each do |pregunta|
      ensayo_nuevo.preguntas.create(numero: pregunta['numero'], respuesta: pregunta['respuesta'])
    end

  end

end
