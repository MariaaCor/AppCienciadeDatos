# API Canciones

API REST para administrar el catálogo de canciones (Node.js + Express + Mongoose + MongoDB + dotenv).

Arquitectura: Cliente → Ruta → Controlador → Modelo → MongoDB

## Requisitos

| Herramienta | Versión |
|---|---|
| Node.js | 18 o superior |
| Mongoose | 8.x |
| MongoDB | 4.4 a 8.x, instalado localmente |

## Configuración

La aplicación lee la configuración del archivo `variables.env`:

```
PORT=4000
MONGODB_URI=mongodb://localhost:27017/musica
```

La base de datos de esta versión es **local**. La URI de `variables.env` y la de este documento deben ser la misma; no se usa MongoDB Atlas (`mongodb+srv://`).

## Inicio

```
npm install
npm start        # producción
npm run dev      # desarrollo con nodemon
```

## Endpoints

| Método | URL | Acción |
|---|---|---|
| POST | /api/canciones | Registrar canción |
| GET | /api/canciones | Consultar todas |
| GET | /api/canciones/:id | Consultar una |
| PUT | /api/canciones/:id | Actualizar (parcial) |
| DELETE | /api/canciones/:id | Eliminar |

Ejemplo de cuerpo para registrar:

```json
{
  "titulo": "Sabor a mí",
  "genero": "Bolero",
  "artista": "Trío Los Panchos",
  "precio": 15.5,
  "copias": 20
}
```

## Reglas de negocio

| Req. | Regla | Dónde se cumple |
|---|---|---|
| RF01 | Registro con titulo, genero, artista, precio, copias y fechaCreacion | Modelo |
| RF02 | Precio mayor que cero | Modelo |
| RF03 | Una canción nueva necesita al menos una copia | Controlador (crear) |
| RF04 | Título único (sin distinguir mayúsculas ni acentos) | Modelo (índice) + Controlador |
| RF05 | Consultar todas las canciones | Controlador |
| RF06 | Canción inexistente → HTTP 404 | Controlador |
| RF07 | La actualización parcial conserva los campos no enviados | Controlador (actualizar) |
| RF08 | No se elimina una canción con copias disponibles → HTTP 409 | Controlador (eliminar) |
