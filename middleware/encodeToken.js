// Genera (codifica) el token de un usuario
const jwt = require('jwt-simple');

const DIAS_EXPIRACION = 5;

const crearToken = (usuario) => {
    const ahora = Math.floor(Date.now() / 1000); // segundos

    const payload = {
        sub: usuario._id,                                  // id del usuario
        nombre: usuario.nombre,
        iat: ahora,                                        // fecha de creación del token
        exp: ahora + (DIAS_EXPIRACION * 24 * 60 * 60)      // expira en 5 días
    };

    return jwt.encode(payload, process.env.SECRET_TOKEN);
};

module.exports = { crearToken };