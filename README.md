# Movies Kubo API

Este proyecto es un **backend REST API** para la gestión de usuarios, películas y categorías de películas. Está construido con **Node.js**, **Express** y **Sequelize** como ORM para bases de datos SQL.

## Características

- Registro y autenticación de usuarios (JWT)
- CRUD de películas y categorías
- Filtrado y paginación de películas
- Marcar películas como vistas por usuarios
- Gestión de novedades (películas recientes)
- Contenedores Docker para fácil despliegue

## Estructura del Proyecto

```
📂 backend-api
│── 📂 src
│   ├── 📂 config          # Configuración de BD y variables
│   ├── 📂 models          # Modelos Sequelize: Usuario, Película, Categoría, UserMovie
│   ├── 📂 routes          # Endpoints REST: usuarios, películas, categorías
│   ├── 📂 controllers     # Lógica de negocio por recurso
│   ├── 📂 middleware      # Autenticación y permisos (JWT)
│   ├── 📂 utils           # Utilidades JWT y validaciones
│   ├── 📝 app.js          # Configuración Express
│   ├── 📝 server.js       # Inicio del servidor y conexión BD
│── 📝 .env                # Variables de entorno (no subir)
│── 📝 package.json        # Dependencias y scripts Node.js
│── 📝 Dockerfile          # Imagen Docker backend
│── 📝 docker-compose.yml  # Orquestación con PostgreSQL
│── 📝 README.md           # Documentación del proyecto
│── 📝 postman_collection.json # Pruebas en Postman
```

## Base de datos

Utiliza **PostgreSQL** (por defecto, configurable). Las tablas principales son:

- **User:**  
  - `id` (PK, auto-incremental)  
  - `name` (string)  
  - `email` (string, único)  
  - `password` (string, encriptado)

- **Movie:**  
  - `id` (PK, auto-incremental)  
  - `title` (string)  
  - `releaseDate` (date)  
  - `CategoryId` (FK a Category)

- **Category:**  
  - `id` (PK, auto-incremental)  
  - `name` (string)

- **UserMovie:** (relación para marcar películas vistas)  
  - `id` (PK, auto-incremental)  
  - `UserId` (FK a User)  
  - `MovieId` (FK a Movie)

**Relaciones:**  
- Un usuario puede marcar varias películas como vistas (UserMovie).
- Una película pertenece a una categoría.

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/WENDY132310/movies_kubo.git
   cd movies_kubo
   ```

2. Instala dependencias:

   ```bash
   npm install
   ```

3. Configura el archivo `.env` con tus datos de base de datos y JWT:

   ```
   DB_HOST=localhost
   DB_USER=tu_usuario
   DB_PASSWORD=tu_contraseña
   DB_NAME=movies_db
   DB_DIALECT=postgres
   JWT_SECRET=tu_secreto
   ```

4. Inicia el servidor:

   ```bash
   npm start
   ```

## Uso de la API

### Usuarios

- **Registro:** `POST /api/users/register`
- **Login:** `POST /api/users/login`

### Películas

- **Crear:** `POST /api/movies`
- **Listar:** `GET /api/movies`
- **Actualizar:** `PUT /api/movies/:id`
- **Eliminar:** `DELETE /api/movies/:id`
- **Novedades:** `GET /api/movies/news`
- **Marcar como vista:** `POST /api/movies/:id/view` *(requiere JWT)*

### Categorías

- **Crear:** `POST /api/categories`
- **Listar:** `GET /api/categories`
- **Actualizar:** `PUT /api/categories/:id`
- **Eliminar:** `DELETE /api/categories/:id`

## Ejemplo de petición y respuesta

### Registro de usuario

**Petición:**  
```http
POST /api/users/register
Content-Type: application/json

{
  "name": "Ana",
  "email": "ana@mail.com",
  "password": "123456"
}
```

**Respuesta:**  
```json
{
  "id": 1,
  "name": "Ana",
  "email": "ana@mail.com",
  "password": "$2a$10$..."
}
```

### Login de usuario

**Petición:**  
```http
POST /api/users/login
Content-Type: application/json

{
  "email": "ana@mail.com",
  "password": "123456"
}
```

**Respuesta:**  
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Crear película

**Petición:**  
```http
POST /api/movies
Content-Type: application/json

{
  "title": "Matrix",
  "releaseDate": "1999-03-31",
  "categoryId": 2
}
```

**Respuesta:**  
```json
{
  "id": 1,
  "title": "Matrix",
  "releaseDate": "1999-03-31T00:00:00.000Z",
  "CategoryId": 2
}
```

### Listar películas

**Petición:**  
```http
GET /api/movies
```

**Respuesta:**  
```json
{
  "total": 1,
  "pages": 1,
  "movies": [
    {
      "id": 1,
      "title": "Matrix",
      "releaseDate": "1999-03-31T00:00:00.000Z",
      "Category": { "id": 2, "name": "Acción" }
    }
  ]
}
```

## Docker

1. Construye la imagen:

   ```bash
   docker build -t backend-api .
   ```

2. Inicia los contenedores (API + PostgreSQL):

   ```bash
   docker-compose up
   ```

## Pruebas

Incluye una colección de Postman en `postman_collection.json` para probar todos los endpoints fácilmente.

