// app.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const auditoriaRoutes = require('./src/routes/auditoriaRoutes');
const moduleRoutes = require('./src/routes/moduleRoutes');
const functionRoutes = require('./src/routes/functionRoutes');
const roleFunctionRoutes = require('./src/routes/roles_funcionsRoutes');
const rolesusersRouters = require('./src/routes/roleusersRoutes');
const rolesRouters = require('./src/routes/rolesRoutes');
const userRoutes = require('./src/routes/userRoutes');
const usersRoutes = require('./src/routes/userRoutes2');
const db = require('./src/config/db'); // Archivo donde se define la conexión a la base de datos

// Cargar variables de entorno desde .env (si existe)
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

// Rutas
app.use('/api', auditoriaRoutes);
app.use('/api', moduleRoutes);
app.use('/api', functionRoutes);
app.use('/api', roleFunctionRoutes);
app.use('/api', rolesusersRouters);
app.use('/api', userRoutes);
app.use('/api', rolesRouters);
//app.use('/api', usersRoutes);
// Puedes añadir más rutas según tus necesidades

app.listen(port, () => {
  console.log(`Servidor backend corriendo en http://localhost:${port}/`); 
});
