// Rutas del proyecto
const express = require('express');

const { validarToken } = require('../middleware/decodeToken');

const { login } = require('../controllers/usuarioController');

const {
    crearCancion,
    eliminarCancion,
    actualizarCancion,
    obtenerUnaCancion,
    obtenerVariasCanciones
} = require('../controllers/cancionController');

const {
    crearDisquera,
    eliminarDisquera,
    actualizarDisquera,
    obtenerUnaDisquera,
    obtenerVariasDisqueras
} = require('../controllers/disqueraController');

const { obtenerDondeEstoy } = require('../controllers/ubicacionController');

const usuarioRouter = express.Router();
const cancionRouter = express.Router();
const disqueraRouter = express.Router();
const ubicacionRouter = express.Router();

// usuarios (pública: aquí se obtiene el token)
usuarioRouter.post('/login', login);

// canciones (validarToken -> next() -> controlador)
cancionRouter.post('/alta', validarToken, crearCancion);
cancionRouter.delete('/baja/:id', validarToken, eliminarCancion);
cancionRouter.delete('/eliminar/:id', validarToken, eliminarCancion);
cancionRouter.put('/actualizar/:id', validarToken, actualizarCancion);
cancionRouter.get('/obtenerUno/:id', validarToken, obtenerUnaCancion);
cancionRouter.get('/obtenerVarios', validarToken, obtenerVariasCanciones);

// disqueras
disqueraRouter.post('/alta', validarToken, crearDisquera);
disqueraRouter.delete('/baja/:id', validarToken, eliminarDisquera);
disqueraRouter.delete('/eliminar/:id', validarToken, eliminarDisquera);
disqueraRouter.put('/actualizar/:id', validarToken, actualizarDisquera);
disqueraRouter.get('/obtenerUno/:id', validarToken, obtenerUnaDisquera);
disqueraRouter.get('/obtenerVarios', validarToken, obtenerVariasDisqueras);

// ubicacion
ubicacionRouter.get('/dondeEstoy', validarToken, obtenerDondeEstoy);

module.exports = {
    usuarios: usuarioRouter,
    canciones: cancionRouter,
    disqueras: disqueraRouter,
    ubicacion: ubicacionRouter
};