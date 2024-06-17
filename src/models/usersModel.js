// models/user.js

const db = require('./db');

// Obtener todos los usuarios
const getUsers = async () => {
  try {
    const query = 'SELECT * FROM users';
    const { rows } = await db.query(query);
    return rows;
  } catch (error) {
    throw error;
  }
};

// Crear un nuevo usuario
const createUser = async (userData) => {
  const {
    usr_id,
    usr_first_name,
    usr_second_name,
    usr_first_lastname,
    usr_second_lastname,
    usr_full_name,
    usr_user,
    usr_email,
    usr_password,
    usr_state,
  } = userData;

  try {
    const query =
      'INSERT INTO users (usr_id, usr_first_name, usr_second_name, usr_first_lastname, usr_second_lastname, usr_full_name, usr_user, usr_email, usr_password, usr_state) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *';
    const values = [
      usr_id,
      usr_first_name,
      usr_second_name,
      usr_first_lastname,
      usr_second_lastname,
      usr_full_name,
      usr_user,
      usr_email,
      usr_password,
      usr_state,
    ];
    const { rows } = await db.query(query, values);
    return rows[0];
  } catch (error) {
    throw error;
  }
};

// Obtener un usuario por su ID
const getUserById = async (usr_id) => {
  try {
    const query = 'SELECT * FROM users WHERE usr_id = $1';
    const { rows } = await db.query(query, [usr_id]);
    return rows[0];
  } catch (error) {
    throw error;
  }
};

// Eliminar un usuario por su ID
const deleteUserById = async (usr_id) => {
  try {
    const query = 'DELETE FROM users WHERE usr_id = $1 RETURNING *';
    const { rows } = await db.query(query, [usr_id]);
    return rows[0];
  } catch (error) {
    throw error;
  }
};

// Actualizar un usuario por su ID
const updateUserById = async (usr_id, userData) => {
  const {
    usr_first_name,
    usr_second_name,
    usr_first_lastname,
    usr_second_lastname,
    usr_full_name,
    usr_user,
    usr_email,
    usr_password,
    usr_state,
  } = userData;

  try {
    const query =
      'UPDATE users SET usr_first_name = $1, usr_second_name = $2, usr_first_lastname = $3, usr_second_lastname = $4, usr_full_name = $5, usr_user = $6, usr_email = $7, usr_password = $8, usr_state = $9 WHERE usr_id = $10 RETURNING *';
    const values = [
      usr_first_name,
      usr_second_name,
      usr_first_lastname,
      usr_second_lastname,
      usr_full_name,
      usr_user,
      usr_email,
      usr_password,
      usr_state,
      usr_id,
    ];
    const { rows } = await db.query(query, values);
    return rows[0];
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getUsers,
  createUser,
  getUserById,
  deleteUserById,
  updateUserById,
};
