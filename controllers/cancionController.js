const Cancion = require("../models/Cancion");


exports.crearCancion = async(req, res) => {

    try {
        let cancion;

        // Creamos nuestra canción
        cancion = new Cancion(req.body);

        await cancion.save();
        res.send(cancion);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerVariasCanciones = async(req, res) => {

    try {

        const canciones = await Cancion.find();
        res.json(canciones)

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

}

exports.actualizarCancion = async(req, res) => {

    try {
        const { titulo, genero, artista, precio } = req.body;
        let cancion = await Cancion.findById(req.params.id);

        if (!cancion) {
            return res.status(404).json({ msg: 'No existe la canción' })
        }

        cancion.titulo = titulo;
        cancion.genero = genero;
        cancion.artista = artista;
        cancion.precio = precio;

        cancion = await Cancion.findOneAndUpdate({ _id: req.params.id }, cancion, { new: true })
        res.json(cancion);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}


exports.obtenerUnaCancion = async(req, res) => {

    try {
        let cancion = await Cancion.findById(req.params.id);

        if (!cancion) {
            return res.status(404).json({ msg: 'No existe la canción' })
        }

        res.json(cancion);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.eliminarCancion = async(req, res) => {

    try {
        let cancion = await Cancion.findById(req.params.id);

        if (!cancion) {
            return res.status(404).json({ msg: 'No existe la canción' })
        }

        await Cancion.findOneAndRemove({ _id: req.params.id })
        res.json({ msg: 'Canción eliminada con exito' });

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}