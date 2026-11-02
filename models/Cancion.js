const mongoose = require('mongoose');

const CancionSchema = mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    genero: {
        type: String,
        required: true
    },
    artista: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    disquera: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Disquera',
        required: true
    },
    fechaCreacion: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Cancion', CancionSchema);