// controllers/userController.js

const userModel = require('../models/usersModel');
const db = require('../models/db');

// Obtener todos los usuarios
exports.getUsers = async (req, res) => {
  try {
    const users = await userModel.getUsers();
    res.json({ users });
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    res.status(500).json({ message: 'Error al obtener los usuarios', error: error.message });
  }
};

// Crear un nuevo usuario
exports.createUser = async (req, res) => {
  const userData = req.body;
  try {
    const newUser = await userModel.createUser(userData);
    res.status(201).json({ message: 'Usuario creado correctamente', user: newUser });
  } catch (error) {
    console.error('Error al crear el usuario:', error);
    res.status(500).json({ message: 'Error al crear el usuario', error: error.message });
  }
};

// Obtener un usuario por su ID
exports.getUserById = async (req, res) => {
  const usr_id = req.params.usr_id;
  try {
    const user = await userModel.getUserById(usr_id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error('Error al obtener el usuario por ID:', error);
    res.status(500).json({ message: 'Error al obtener el usuario por ID', error: error.message });
  }
};

// Eliminar un usuario por su ID
exports.deleteUserById = async (req, res) => {
  const usr_id = req.params.usr_id;
  try {
    const deletedUser = await userModel.deleteUserById(usr_id);
    if (deletedUser) {
      res.json({ message: 'Usuario eliminado correctamente', deletedUser });
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error('Error al eliminar el usuario por ID:', error);
    res.status(500).json({ message: 'Error al eliminar el usuario por ID', error: error.message });
  }
};

// Actualizar un usuario por su ID
exports.updateUserById = async (req, res) => {
  const usr_id = req.params.usr_id;
  const userData = req.body;
  try {
    const updatedUser = await userModel.updateUserById(usr_id, userData);
    if (updatedUser) {
      res.json({ message: 'Usuario actualizado correctamente', updatedUser });
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error('Error al actualizar el usuario por ID:', error);
    res.status(500).json({ message: 'Error al actualizar el usuario por ID', error: error.message });
  }
};
