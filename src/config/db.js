// models/db.js

const { Pool } = require('pg');

// Configurar la conexión a la base de datos utilizando la variable de entorno DATABASE_URL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
