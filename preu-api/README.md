# API

## Como Trabajar en la API

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

Usaremos el comando:
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


```bash
rake db:setup
rake db:migrate
```

### Ejecutar servidor de desarrollo

```bash
rails s
```
