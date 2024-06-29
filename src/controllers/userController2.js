const User = require('../models/usersModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//const SECRET_KEY = "b1664565cdeb4f67e77ab0cafcb64d09b729639ae2c7e9c9ba315f956de78473";
const ALGORITHM = "HS256";

exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los datos de la tabla users', error: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'Registro no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el usuario', error: error.message });
  }
};

exports.getUserByEmail = async (req, res) => {
  try {
    const user = await User.findOne({ where: { usr_email: req.params.email } });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'Registro no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el usuario', error: error.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { usr_id, usr_first_name, usr_second_name, usr_first_lastname, usr_second_lastname, usr_user, usr_email, usr_password } = req.body;
    const hashedPassword = await bcrypt.hash(usr_password, 10);
    const user = await User.create({
      usr_id,
      usr_first_name,
      usr_second_name,
      usr_first_lastname,
      usr_second_lastname,
      usr_full_name: `${usr_first_name} ${usr_second_name} ${usr_first_lastname} ${usr_second_lastname}`,
      usr_user,
      usr_email,
      usr_password: hashedPassword,
      usr_state: 'A'
    });
    res.json({ message: 'Datos insertados correctamente en la tabla users' });
  } catch (error) {
    res.status(500).json({ message: 'Error al insertar datos en la tabla users', error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { usr_id, usr_first_name, usr_second_name, usr_first_lastname, usr_second_lastname, usr_user, usr_email, usr_password, usr_state } = req.body;
    const user = await User.findByPk(req.params.id);
    if (user) {
      const hashedPassword = await bcrypt.hash(usr_password, 10);
      await user.update({
        usr_id,
        usr_first_name,
        usr_second_name,
        usr_first_lastname,
        usr_second_lastname,
        usr_full_name: `${usr_first_name} ${usr_second_name} ${usr_first_lastname} ${usr_second_lastname}`,
        usr_user,
        usr_email,
        usr_password: hashedPassword,
        usr_state
      });
      res.json({ message: 'Registro actualizado correctamente' });
    } else {
      res.status(404).json({ message: 'Registro no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el usuario', error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      await user.destroy();
      res.json({ message: 'Registro eliminado correctamente' });
    } else {
      res.status(404).json({ message: 'Registro no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el usuario', error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { usr_user, usr_password } = req.body;
    const user = await User.findOne({ where: { usr_user } });
    if (user && bcrypt.compareSync(usr_password, user.usr_password)) {
      const token = jwt.sign({ sub: user.usr_id }, SECRET_KEY, { algorithm: ALGORITHM, expiresIn: '60d' });
      res.json({ access_token: token, token_type: 'bearer' });
    } else {
      res.status(401).json({ message: 'Credenciales no válidas' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión', error: error.message });
  }
};

exports.getCurrentUser = async (req, res) => {
  res.json(req.user);
};
