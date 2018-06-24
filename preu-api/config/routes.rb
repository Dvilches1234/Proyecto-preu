Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  scope :api do
    post 'authenticate', to: 'authentication#authenticate'
    get 'salute', to: 'docente#salute'
    post 'recibir', to: 'docente#recibir_seccion'
    get 'desplegar/:id', to: 'docente#desplegar_lista'
    post 'rellenar', to: "docente#rellenar_lista"
    
  end
end
