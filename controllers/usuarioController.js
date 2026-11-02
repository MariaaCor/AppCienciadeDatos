const crypto = require('crypto');
const Usuario = require('../models/Usuario');
const { crearToken } = require('../middleware/encodeToken');

// Nunca guardamos la contraseña tal cual: guardamos "sal:hash"
const encriptarPassword = (password) => {
    const sal = crypto.randomBytes(16).toString('hex');
    const hash = crypto.scryptSync(password, sal, 64).toString('hex');
    return `${sal}:${hash}`;
};

const compararPassword = (password, guardado) => {
    const [sal, hash] = guardado.split(':');
    const hashIntento = crypto.scryptSync(password, sal, 64);
    return crypto.timingSafeEqual(hashIntento, Buffer.from(hash, 'hex'));
};

// POST /usuarios/login
// Si el usuario no existe lo crea; si existe valida su contraseña. En ambos casos devuelve el token.
const login = async (req, res) => {
    try {
        const { nombre, password } = req.body;

        if (!nombre || !password) {
            return res.status(400).json({ mensaje: '400 Bad Request: faltan nombre o password' });
        }

        let usuario = await Usuario.findOne({ nombre });

        if (!usuario) {
            usuario = new Usuario({ nombre, password: encriptarPassword(password) });
            await usuario.save();

            return res.status(201).json({
                mensaje: '201 Created: usuario creado',
                usuario: { _id: usuario._id, nombre: usuario.nombre },
                token: crearToken(usuario)
            });
        }

        if (!compararPassword(password, usuario.password)) {
            return res.status(401).json({ mensaje: '401 Unauthorized: contraseña incorrecta' });
        }

        return res.status(200).json({
            mensaje: '200 OK: sesión iniciada',
            usuario: { _id: usuario._id, nombre: usuario.nombre },
            token: crearToken(usuario)
        });

    } catch (error) {
        return res.status(500).json({ mensaje: '500 Internal Server Error', error: error.message });
    }
};

module.exports = { login };