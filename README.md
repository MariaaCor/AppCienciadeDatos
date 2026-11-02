# API Canciones

API REST para administrar canciones y disqueras, con inicio de sesión por token (Node.js + Express + Mongoose + MongoDB Atlas + jwt-simple).

Arquitectura: Cliente → Ruta → Middleware (token) → Controlador → Modelo → MongoDB

## Estructura

```
config/db.js                      Conexión a MongoDB
controllers/                      Lógica de cada recurso (canción, disquera, usuario, ubicación)
middleware/encodeToken.js         Genera el token (iat y exp de 5 días)
middleware/decodeToken.js         Valida el token y llama a next()
models/                           Esquemas: Cancion, Disquera, Usuario
routes/rutas.js                   Todas las rutas del proyecto
services/ubicacionService.js      Consulta de ciudad por coordenadas (Nominatim)
imagenes/                         Carpeta reservada para imágenes
```

## Configuración

Crea un archivo `variables.env` en la raíz (no se sube al repositorio):

```
DB_MONGO=mongodb+srv://USUARIO:CONTRASEÑA@cluster0.xxxxx.mongodb.net/canciones
SECRET_TOKEN=una_clave_larga_y_secreta
```

- `DB_MONGO`: cadena de conexión de MongoDB Atlas.
- `SECRET_TOKEN`: clave con la que se firman los tokens.

## Inicio

```
npm install
npm start        # node index.js
npm run dev      # con nodemon
```

El servidor corre en `http://localhost:4000`.

## Autenticación

1. `POST /usuarios/login` con `nombre` y `password`. Si el usuario no existe se crea; si existe se valida su contraseña. En ambos casos responde con un `token` válido por 5 días.
2. En las demás rutas se envía el header `Authorization: Bearer <token>`. Sin token válido la API responde `401`.

## Endpoints

| Método | URL | Token | Acción |
|---|---|---|---|
| POST | /usuarios/login | No | Crear usuario o iniciar sesión |
| POST | /canciones/alta | Sí | Registrar canción |
| GET | /canciones/obtenerVarios | Sí | Consultar todas |
| GET | /canciones/obtenerUno/:id | Sí | Consultar una |
| PUT | /canciones/actualizar/:id | Sí | Actualizar |
| DELETE | /canciones/baja/:id · /canciones/eliminar/:id | Sí | Eliminar |
| POST | /disqueras/alta | Sí | Registrar disquera |
| GET | /disqueras/obtenerVarios | Sí | Consultar todas con sus canciones |
| GET | /disqueras/obtenerUno/:id | Sí | Consultar una con sus canciones |
| PUT | /disqueras/actualizar/:id | Sí | Actualizar |
| DELETE | /disqueras/baja/:id · /disqueras/eliminar/:id | Sí | Eliminar (y sus canciones) |
| GET | /ubicacion/dondeEstoy?lat=..&lon=.. | Sí | Ciudad según coordenadas |

## Ejemplos de cuerpo (JSON o x-www-form-urlencoded)

Login:
```json
{ "nombre": "andres", "password": "1234" }
```

Disquera:
```json
{ "nombre": "Sony Music México", "ubicacion": "Ciudad de México" }
```

Canción (`disquera` es el `_id` de una disquera existente):
```json
{
  "titulo": "Sabor a mí",
  "genero": "Bolero",
  "artista": "Trío Los Panchos",
  "precio": 15.5,
  "disquera": "<_id de la disquera>"
}
```
