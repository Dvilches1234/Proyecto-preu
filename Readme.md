# Portal para el Preu

## Como trabajar:
Se explica paso a paso como carajos trabajar en esto.

### Instalar dependencias de la API

Seguir guia en la carpeta [Preu-api](/preu-api/README.md)

### Instalar dependencias del Frontend

Seguir guia en en la carpeta [Preu-web](/preu-web/README.md)


### Instalar Foreman
Este paso no es necesario si solamente quieren trabajar exclusivamente en la API o exclusivamente en el frontend, pero en el caso que quieran trabajar en ambos o simplemente probar toda la aplicación les recomiendo instalar la siguiente gema.

```bash
sudo gem install foreman
```

Foreman es un simplificador de ejecución de aplicaciones, en nuestro caso si quisieramos correr el frontend con la API tendriamos que inicializar un ambos procesos por separado (ademas de darle un puerto diferente a cada uno...) lo cual todo se empieza a complicar. Con foreman creamos un archivo llamado `Procfile`, este archivo contiene las reglas que ejecuta foreman. En nuestro caso ya existe un `Procfile` que contiene lo siguiente:

```
web: cd preu-web && npm start
api: cd preu-api && bundle exec rails s -p 3001
```

Es un archivo sencillo de 2 lineas pero que cada una hace algo especial, en primer lugar crea un proceso que denominará como `web` que ejecutara el siguiente comando `cd preu-web && npm start`, ese comando iniciará el frontend.
El segundo comando es el más interesante, ejecutará rails especificandole que utiliza el puerto 3001.

El archivo es totalmente modificable y de por si estará afuera de cualquier commit en git (gracias a .gitignore).

Para ejecutar foreman solo necesitan correr el siguiente comando:
 ```bash
foreman start -p 3000
 ```
