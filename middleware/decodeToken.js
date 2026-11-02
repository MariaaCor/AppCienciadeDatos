// Lee (decodifica) el token y decide si la petición puede pasar al controlador
const jwt = require('jwt-simple');

const decodificarToken = (token) => {
    const payload = jwt.decode(token, process.env.SECRET_TOKEN);

    // Revisamos la expiración (exp está en segundos)
    if (payload.exp <= Math.floor(Date.now() / 1000)) {
        throw new Error('El token ha expirado');
    }

    return payload;
};

const validarToken = (req, res, next) => {
    // El token llega en el header: Authorization: Bearer <token>
    const autorizacion = req.headers.authorization;

    if (!autorizacion) {
        return res.status(401).json({ mensaje: '401 Unauthorized: no se envió el token' });
    }

    const token = autorizacion.split(' ')[1];

    if (!token) {
        return res.status(401).json({ mensaje: '401 Unauthorized: formato de token inválido, usa Bearer <token>' });
    }

    try {
        const payload = decodificarToken(token);
        req.usuario = payload.sub; // id del usuario disponible en el controlador
        next(); // el token es válido: pasamos de la ruta al controlador
    } catch (error) {
        const expirado = error.message.toLowerCase().includes('expir');
        return res.status(401).json({
            mensaje: expirado
                ? '401 Unauthorized: el token ha expirado, vuelve a iniciar sesión'
                : '401 Unauthorized: token inválido'
        });
    }
};

module.exports = { decodificarToken, validarToken };