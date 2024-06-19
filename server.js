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
const db = require('./src/config/db'); // Archivo donde se define la conexión a la base de datos

// Cargar variables de entorno desde .env (si existe)
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

// Rutas
app.use('/', auditoriaRoutes);
app.use('/', moduleRoutes);
app.use('/', functionRoutes);
app.use('/', roleFunctionRoutes);
app.use('/', rolesusersRouters);
app.use('/', userRoutes);
app.use('/', rolesRouters);
// Puedes añadir más rutas según tus necesidades


app.get('/', (req, res) => {
  res.send('Bienvenidos a mi API-Modulo-Seguridad');
});

app.listen(port, () => {
  console.log(`Servidor corriendo en: http://localhost:${port}`);
});
