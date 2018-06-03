# Portal para el Preu

## Como trabajar:
Se explica paso a paso como carajos trabajar en esto.

### Instalar Ruby
Instalamos Ruby desde apt con el siguiente comando:
```bash
sudo apt-get install ruby ruby-dev
```

Verificamos que la versión de ruby igual o superior a la 2.3.3 con el comando
```bash
ruby -v
```

### Instalar PostgreSQL
Instalamos PostgreSQL desde apt con el siguiente comando:
```bash
sudo apt-get install postgresql
```

### Instalar Rails
Las gemas son librerias para ruby, instalaremos la libreria de Ruby on Rails `rails`.

Los instalaremos con el comando:
```bash
gem install rails
```

### Instalar el resto de las gemas.
Rails utiliza mucha librerias para su funcionamiento, para ello existe un comando dentro de rails para instalarlas todas.

Usaremos el comando adentro de la carpeta `preu-api/`:
```bash
sudo bundle install
```
### Crear el usuario en PostgreSQL.
Ingresamos con el usuario postgres en postgresql de la siguiente forma:
```bash
sudo su postgres
psql
```
En postgresql creamos el usuario de desarrollo con el siguiente comando:
```sql
create role "preu-api" with createdb login password 'preu';
```
### Cargar la base de datos.
Rails mantiene una estructura para recrear la base de datos rapidamente, usaremos esa estructura para recrearla.

Para ello accederemos a la carpeta `preu-api/` y usaremos los siguientes comandos:
```bash
rake db:setup
rake db:migrate
```


## TO DO

### API
* Todo

### APP
* Todo
