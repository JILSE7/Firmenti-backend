## Tabla de contenido

* [Acerca del proyecto](#about-the-project)
* [Construido con](#built-with)
* [Empezar](#getting-started)
  * [Prerequisitos](#prerequisites)
  * [Instalaciones](#installation)
* [Uso](#usage)

## Acerca del proyecto

Backend del challenge firmenti realizado con Nodejs + TS el cual permite gestionar las siguientes entidades:

*Users
*Products
*Categories

Sistema de rutas: 
### Users
* GET ALL -> /api/user/
* GET BY ID -> /api/user/:id
* POST -> /api/user/
* PUT -> /api/user/:id
* DELETE -> /api/user/:id


### Products
* GET ALL -> /api/product/
* GET BY ID -> /api/product/:id
* GET BY USERID -> /api/product/me/:id
* POST -> /api/product/
* PUT -> /api/product/:id
* DELETE -> /api/product/:id


### Categories
* GET ALL -> /api/category/
* GET BY ID -> /api/category/:id
* POST -> /api/category/
* PUT -> /api/category/:id
* DELETE -> /api/category/:id


### AUTH
* POST LOGIN -> /api/auth/login
* POST RENEW -> /api/auth/renew



## Construido con

* NodeJs + TS
* Express
* JEST


## Empezar



### Prerequisites
* node 19.0.0
* docker
* docker-compose


### Installation

1. Clona el repositorio

2. Levanta la db
```sh
 docker-compose-up
```

3. Instala dependencias

```sh
npm install 

yarn install
```

4. Corre el proyecto
```sh
npm run dev

yarn dev
```

5. Correr pruebas unitarias
```sh
yarn jest
```

### Uso
Antes de correr las pruebas unitarias asegurate de crear tanto un usuario de prueba como tambien una categoria para su correcta ejecución y cambiar sus respectivos id's en las variables de entorno 'USER_ID_TEST' y 'CATEGORY_ID_TEST'
