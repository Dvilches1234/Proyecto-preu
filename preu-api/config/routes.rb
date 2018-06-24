Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  scope :api do
    post 'authenticate', to: 'authentication#authenticate'
    get 'desplegar/:id', to: 'docente#desplegar_lista'
    post 'rellenar', to: "docente#rellenar_lista"
    post 'pauta', to: "ensayo#recibir_pauta"
    post 'respuestas', to: "ensayo#recibir_respuestas"
    resources :colegios, :only => [:index, :create]
    resources :alumnos, :only => [:create]
    resources :voluntarios, :only => [:create]
  end
end
