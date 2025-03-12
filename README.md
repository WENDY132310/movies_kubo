# Backend API

Este es el backend de una API para la gestión de usuarios, películas y categorías de películas. El proyecto está construido con Node.js, Express y Sequelize.

## Estructura del Proyecto


📂 backend-api (carpeta raíz del proyecto)
│── 📂 src (código fuente principal)
│ ├── 📂 config (configuración del proyecto, DB, etc.)
│ │ ├── 📝 database.js (configuración de Sequelize y conexión a la BD)
│ ├── 📂 models (modelos de la base de datos con Sequelize)
│ │ ├── 📝 index.js (relaciones entre modelos y exportación)
│ │ ├── 📝 user.model.js (modelo de usuario)
│ │ ├── 📝 category.model.js (modelo de categoría de películas)
│ │ ├── 📝 movie.model.js (modelo de película)
│ │ ├── 📝 userMovie.model.js (modelo intermedio entre usuario y película vista)
│ ├── 📂 routes (definición de endpoints)
│ │ ├── 📝 user.routes.js (rutas para usuarios: registro y login)
│ │ ├── 📝 movie.routes.js (rutas para películas: CRUD y filtrado)
│ │ ├── 📝 category.routes.js (rutas para categorías de películas)
│ ├── 📂 controllers (controladores que manejan la lógica de cada endpoint)
│ │ ├── 📝 user.controller.js (controlador de usuarios)
│ │ ├── 📝 movie.controller.js (controlador de películas)
│ │ ├── 📝 category.controller.js (controlador de categorías)
│ ├── 📂 middleware (middlewares para autenticación, permisos, etc.)
│ │ ├── 📝 auth.middleware.js (middleware para proteger rutas con JWT)
│ ├── 📂 utils (utilidades auxiliares como JWT o validaciones)
│ │ ├── 📝 jwt.js (gestión de tokens JWT)
│ ├── 📝 app.js (configuración principal del servidor Express)
│ ├── 📝 server.js (punto de entrada para iniciar el servidor y conectar a la BD)
│
│── 📝 .env (archivo de configuración con variables de entorno)
│── 📝 package.json (gestión de dependencias y scripts de Node.js)
│── 📝 Dockerfile (archivo para crear la imagen Docker del backend)
│── 📝 docker-compose.yml (orquestación de contenedores con PostgreSQL y la API)
│── 📝 README.md (documentación del proyecto)
│── 📝 postman_collection.json (colección de pruebas en Postman)


# Clonar el repositorio
git clone <URL_DEL_REPOSITORIO>
cd backend-api

## Instala las dependencias
npm install
Configura las variables de entorno en el archivo .env.
Inicia el servidor:
npm start

## Uso
Endpoints
Usuarios

Registro: POST /api/users/register
Login: POST /api/users/login
Películas

Crear: POST /api/movies
Leer: GET /api/movies
Actualizar: PUT /api/movies/:id
Eliminar: DELETE /api/movies/:id
Categorías

Crear: POST /api/categories
Leer: GET /api/categories
Actualizar: PUT /api/categories/:id
Eliminar: DELETE /api/categories/:id

## Docker

construye una imagen
docker build -t backend-api .
inicia los contenedores
docker-compose up

