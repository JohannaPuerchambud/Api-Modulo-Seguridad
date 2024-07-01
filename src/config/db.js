const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER, // Usuario de la base de datos desde la variable de entorno
  host: process.env.DB_HOST, // Dirección del servidor de la base de datos desde la variable de entorno
  database: process.env.DB_NAME, // Nombre de la base de datos desde la variable de entorno
  password: String(process.env.DB_PASSWORD), // Contraseña del usuario de la base de datos desde la variable de entorno
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
