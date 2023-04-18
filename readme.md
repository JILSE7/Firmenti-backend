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


### Installation

1. Clona el repositorio

2. Instala dependencias

```sh
npm install 

yarn install
```

3. Corre el proyecto
```sh
npm run dev

yarn dev
```

4. Correr pruebas E2E 
```sh
npx playwright test
```

### Uso
Al levantarse el proyecto primero deberas registrarte como usuario para poder ingresar.
