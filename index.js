const express = require('express');
const conectarDB = require('./config/db');
const { usuarios, canciones, disqueras, ubicacion } = require('./routes/rutas');
var cors = require("cors");
// Creamos el servidor
const app = express();
app.use(express.json()); // recibe datos en formato JSON
app.use(express.urlencoded({ extended: true })); // recibir datos de formularios
// Conectamos a la BD
conectarDB();
app.use(cors());

app.use('/usuarios', usuarios);
app.use('/canciones', canciones);
app.use('/disqueras', disqueras);
app.use('/ubicacion', ubicacion);

app.listen(4000, () => {
    console.log('El servidor esta corriendo perfectamente')
})