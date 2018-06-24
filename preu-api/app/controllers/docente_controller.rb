require 'date'


class DocenteController < ApplicationController
  def recibir_seccion
      params.permit(:id)
  end

  def desplegar_lista
      seccion_id = recibir_seccion['id']
      seccion = Seccion.find(seccion_id)
      alumnos = []

      seccion.alumnos.each do |alumno|
          id = alumno.id
          nombres = alumno.user.nombres
          apellidos = alumno.user.apellidos
          alumnos.push({
            key: id,
            names: nombres,
            last_names: apellidos,
          })
      end
      a = render json: {alumnos: alumnos}
  end

  def recibir_datos_lista
      params.require(:lista).permit(:seccion, :docente, :asistencias => [:id, :asist])
  end

  def rellenar_lista
      #puts "empezamos a rellenar"
      datos_lista = recibir_datos_lista
    #  puts datos_lista
    #  puts "ya recibimos todo"
      seccion_id = recibir_datos_lista['seccion']
    #  puts "estamos tomando la seccion"
      docente_id = recibir_datos_lista['docente']
    #  puts "estamos tomando al docente"
      asistencias_array = recibir_datos_lista['asistencias']
    #  puts "ya tomamos las asistencias"
      fecha = Date.today
    #  puts asistencias_array
      asistencias_array.each do |a_asist|
    #    puts "ey", a_asist['id']
        asistencia_nueva = Lista.create!(alumno_id:a_asist['id'], seccion_id: seccion_id, docente_id: docente_id, asistencia: a_asist['asist'], fecha:fecha)
      #  puts "listen"
    #    puts a_asist['asist']
    #    asistencia_nueva.save
      end
    #  Lista.all

  end
end
