const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
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
app.use('/api', usersRoutes);

// Configuración de Swagger
const options = {
  definition: {
    openapi: '3.0.0', // Especificación de OpenAPI que estamos utilizando
    info: {
      title: 'API Módulo de Seguridad', // Título de tu documentación
      version: '1.0.0', // Versión de tu API
    },
  },
  apis: ['./src/routes/*.js'], // Rutas donde se encuentran tus archivos de rutas
};

const specs = swaggerJsdoc(options);

// Middleware para servir la documentación Swagger UI
app.use('/api', swaggerUi.serve, swaggerUi.setup(specs));

// Ruta de bienvenida redirigida a la documentación
app.get('/', (req, res) => {
  res.redirect('/api');
});

// Arranque del servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en: http://localhost:${port}`);
});