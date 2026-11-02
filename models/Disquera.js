const mongoose = require('mongoose');

const disqueraSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    ubicacion: { type: String, required: true },
    fechaCreacion: { type: Date, default: Date.now }
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

disqueraSchema.virtual('canciones', {
  ref: 'Cancion',
  localField: '_id',
  foreignField: 'disquera'
});

module.exports = mongoose.model('Disquera', disqueraSchema);
