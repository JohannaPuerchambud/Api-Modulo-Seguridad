// app.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const auditoriaRoutes = require('./src/routes/auditoriaRoutes');
const moduleRoutes = require('./src/routes/moduleRoutes');
const functionRoutes = require('./src/routes/functionRoutes');
const db = require('./src/models/db'); // Archivo donde se define la conexión a la base de datos

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

// Rutas
app.use('/api', auditoriaRoutes);
app.use('/api', moduleRoutes);
app.use('/api', functionRoutes);
// Puedes añadir más rutas según tus necesidades

app.listen(port, () => {
  console.log(`Servidor backend corriendo en http://localhost:${port}/`); 
});
