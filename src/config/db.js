// models/db.js

const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres', // Usuario de la base de datos
  host: 'localhost', // Dirección del servidor de la base de datos
  database: 'api_seguridad', // Nombre de la base de datos
  password: 'root', // Contraseña del usuario de la base de datos
  port: 5432, // Puerto por defecto de PostgreSQL
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};