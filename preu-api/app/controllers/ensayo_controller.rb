class EnsayoController < ApplicationController

  def recibir_pauta
    pauta = params.require(:pauta).permit(:fecha, :asignatura, :seccion_id, :preguntas =>[:numero, :respuesta])
    ensayo_nuevo = Ensayo.create!(seccion_id: pauta['seccion_id'], asignatura: pauta['asignatura'], fecha: pauta['fecha'])
    preguntas_array = pauta['preguntas']

    preguntas_array.each do |pregunta|
      ensayo_nuevo.preguntas.create(numero: pregunta['numero'], respuesta: pregunta['respuesta'])
    end
  end

  def recibir_respuestas
    ensayo_info = params.require(:ensayo).permit(:ensayo_id, :alumno_id, :respuestas => [:pregunta_id, :respuesta])
    puts ensayo_info['ensayo_id']
    ensayo = Ensayo.find(ensayo_info['ensayo_id'])
    respuestas_array = ensayo_info['respuestas']

    respuestas_array.each do |respuesta|
      ensayo.respuestas.create(pregunta_id: respuesta['pregunta_id'], alumno_id: ensayo_info['alumno_id'], respuesta: respuesta['respuesta'])
    end
    corregir_ensayo(ensayo_info['ensayo_id'], ensayo_info['alumno_id'])
  end

  def corregir_ensayo(id_ensayo, id_alumno)
      preguntas_pauta = Ensayo.find(id_ensayo).preguntas
      preguntas_alumno = Respuesta.where("ensayo_id = ? AND alumno_id = ?", id_ensayo, id_alumno)
      respuestas_pauta = []
      respuestas_alumno = []
      buenas = 0
      malas = 0
      omitidas = 0

      preguntas_pauta.zip(preguntas_alumno).each do |pauta, alumno|
        respuesta_pauta = pauta["respuesta"]
        respuesta_alumno = alumno["respuesta"]
        if preguntas_pauta == respuestas_alumno
          buenas += 1
        elsif respuesta_alumno == "0"
          omitidas += 1
        else
          malas += 1
        end
      end
      total = buenas + malas + omitidas
      puts buenas, malas, omitidas, total

      puntaje = 850 * buenas / total  #insertar formula de recibir_datos_lista
      puts puntaje
      Resultado.create!(alumno_id: id_alumno, ensayo_id: id_ensayo, puntaje: puntaje)
  end
end
