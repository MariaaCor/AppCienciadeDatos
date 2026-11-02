const Disquera = require('../models/Disquera');
const Cancion = require('../models/Cancion');

const crearDisquera = async (req, res) => {
  console.log('Datos recibidos para crear disquera:', req.body);
  try {
    const { nombre, ubicacion } = req.body;

    if (!nombre || !ubicacion) {
      return res.status(400).json({ mensaje: '400 Bad Request: faltan campos requeridos' });
    }

    const disquera = new Disquera({ nombre, ubicacion });
    await disquera.save();

    return res.status(200).json({ mensaje: '200 OK: disquera creada', disquera });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ mensaje: '400 Bad Request: datos invalidos', error: error.message });
    }
    return res.status(500).json({ mensaje: '500 Internal Server Error', error: error.message });
  }
};

const eliminarDisquera = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ mensaje: '400 Bad Request: falta el id de la disquera' });
    }

    const disquera = await Disquera.findByIdAndDelete(id);

    if (!disquera) {
      return res.status(400).json({ mensaje: '400 Bad Request: disquera no encontrada' });
    }

    const { deletedCount } = await Cancion.deleteMany({ disquera: id });

    return res.status(200).json({
      mensaje: `200 OK: disquera eliminada junto con ${deletedCount} cancion(es)`,
      disquera
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ mensaje: '400 Bad Request: id invalido', error: error.message });
    }
    return res.status(500).json({ mensaje: '500 Internal Server Error', error: error.message });
  }
};

const actualizarDisquera = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, ubicacion } = req.body;
    console.log('Datos recibidos para actualizar disquera:', req.body);

    if (!nombre || !ubicacion) {
      return res.status(400).json({ mensaje: '400 Bad Request: faltan campos requeridos' });
    }

    const disquera = await Disquera.findByIdAndUpdate(
      id,
      { nombre, ubicacion },
      { new: true, runValidators: true }
    );

    if (!disquera) {
      return res.status(400).json({ mensaje: '400 Bad Request: disquera no encontrada' });
    }

    return res.status(200).json({ mensaje: '200 OK: disquera actualizada', disquera });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ mensaje: '400 Bad Request: id invalido', error: error.message });
    }
    if (error.name === 'ValidationError') {
      return res.status(400).json({ mensaje: '400 Bad Request: datos invalidos', error: error.message });
    }
    return res.status(500).json({ mensaje: '500 Internal Server Error', error: error.message });
  }
};

const obtenerUnaDisquera = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ mensaje: '400 Bad Request: falta el id de la disquera' });
    }

    const disquera = await Disquera.findById(id).populate('canciones');

    if (!disquera) {
      return res.status(400).json({ mensaje: '400 Bad Request: disquera no encontrada' });
    }

    return res.status(200).json({ mensaje: '200 OK: disquera encontrada', disquera });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ mensaje: '400 Bad Request: id invalido', error: error.message });
    }
    return res.status(500).json({ mensaje: '500 Internal Server Error', error: error.message });
  }
};

const obtenerVariasDisqueras = async (req, res) => {
  try {
    const disqueras = await Disquera.find().populate('canciones');

    return res.status(200).json({ mensaje: '200 OK: lista de disqueras', disqueras });
  } catch (error) {
    return res.status(500).json({ mensaje: '500 Internal Server Error', error: error.message });
  }
};

module.exports = {
  crearDisquera,
  eliminarDisquera,
  actualizarDisquera,
  obtenerUnaDisquera,
  obtenerVariasDisqueras
};
