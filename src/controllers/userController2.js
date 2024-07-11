const User = require('../models/usersModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Module = require('../models/module');
const Function = require('../models/funcionmodel');
const Role = require('../models/rolesmodel');
const RoleFunction = require('../models/roles_funcions');
const RoleUser = require('../models/roleUser');



const SECRET_KEY = "b1664565cdeb4f67e77ab0cafcb64d09b729639ae2c7e9c9ba315f956de78473";
const ALGORITHM = "HS256";

exports.getUsers = async (req, res) => {
  try {
    const users = await User.getUsers();
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
    //const user = await User.findOne({ where: { usr_user } });
    const user = await User.getUserByUsername(usr_user);
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

exports.login_Modules = async (req, res) => {
  try {
    const { usr_user, usr_password, mod_name } = req.body;
    
    // Obtener el usuario por su nombre de usuario
    const user = await User.getUserByUsername(usr_user);
    //console.log(user);
    if (user && bcrypt.compareSync(usr_password, user.usr_password)) {
      // Obtener el módulo por su nombre
      const module = await Module.getModuleByName(mod_name);
      
      if (!module) {
        return res.status(404).json({ message: 'Módulo no encontrado o inactivo' });
      }

      // Obtener los roles del usuario
      const roles = await RoleUser.getByUserIdAndState(user.usr_id);
      
      if (!roles) {
        return res.status(403).json({ message: 'Usuario no tiene roles asignados' });
      }

      // Obtener las funcionalidades permitidas para el usuario en el módulo especificado
      const roleFunctions = await RoleFunction.getRoleFunctions2(roles.map(roles => roles.rol_usr_role)+"", module.mod_id);
      if (!roleFunctions) {
        return res.status(403).json({ message: 'Usuario no tiene roleFunctions asignados' });
      }
      const functionalities = roleFunctions.map(roleFunction => roleFunction.func_name);
      
      //console.log(roles.map(roles => roles.rol_usr_role));
      //console.log("roles name ",roles.rol_usr_user);
      //console.log(module.mod_id);

      if (!functionalities) {
        return res.status(403).json({ message: 'Usuario no tiene roleFunctions asignados' });
      }
      // Crear el token JWT
      const token = jwt.sign({ sub: user.usr_id }, SECRET_KEY, { algorithm: ALGORITHM, expiresIn: '60d' });

      res.json({ access_token: token, token_type: 'bearer', functionalities ,  roles});
    } else {
      res.status(401).json({ message: 'Credenciales no válidas' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión', error: error.message });
  }
};

exports.getCurrentUser = async (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: 'Usuario no autenticado' });
      }
      res.json(req.user);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener el usuario actual', error: error.message });
    }
  };

  exports.getCurrentUser2 = async (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: 'Usuario no autenticado' });
      }
      res.json(req.user);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener el usuario actual', error: error.message });
    }
  };
  exports.getUserById2 = async (user) => {
    try {
      const userId = user.usr_id; // or however you identify the user ID in your user object
      const userData = await User.getUserById(userId);
      if (!userData) {
        throw new Error('Usuario no encontrado');
      }
      return userData;
    } catch (error) {
      throw new Error(`Error al obtener el usuario: ${error.message}`);
    }
  };
