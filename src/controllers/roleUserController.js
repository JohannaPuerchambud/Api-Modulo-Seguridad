const RoleUser = require('../models/roleUser');

// Obtener todos los roles de usuario
exports.getAllRoleUsers = async (req, res) => {
  try {
    const roleUsers = await RoleUser.getAll();
    res.json({ roleUsers });
  } catch (error) {
    console.error('Error al obtener los roles de usuario:', error);
    res.status(500).json({ message: 'Error al obtener los roles de usuario', error: error.message });
  }
};

// Crear un nuevo rol de usuario
exports.createRoleUser = async (req, res) => {
  const roleUser = req.body;
  try {
    const newRoleUser = await RoleUser.create(roleUser);
    res.json({ message: 'Rol de usuario creado correctamente', roleUser: newRoleUser });
  } catch (error) {
    console.error('Error al crear el rol de usuario:', error);
    res.status(500).json({ message: 'Error al crear el rol de usuario', error: error.message });
  }
};

// Obtener un rol de usuario por su ID
exports.getRoleUserById = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    const roleUser = await RoleUser.getById(id);
    if (roleUser) {
      res.json(roleUser);
    } else {
      res.status(404).json({ message: 'Rol de usuario no encontrado' });
    }
  } catch (error) {
    console.error('Error al obtener el rol de usuario por ID:', error);
    res.status(500).json({ message: 'Error al obtener el rol de usuario por ID', error: error.message });
  }
};

// Actualizar un rol de usuario por su ID
exports.updateRoleUser = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const roleUser = req.body;
  try {
    const updatedRoleUser = await RoleUser.update(id, roleUser);
    if (updatedRoleUser) {
      res.json({ message: 'Rol de usuario actualizado correctamente', roleUser: updatedRoleUser });
    } else {
      res.status(404).json({ message: 'Rol de usuario no encontrado' });
    }
  } catch (error) {
    console.error('Error al actualizar el rol de usuario por ID:', error);
    res.status(500).json({ message: 'Error al actualizar el rol de usuario por ID', error: error.message });
  }
};

// Eliminar un rol de usuario por su ID
exports.deleteRoleUser = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    const deletedRoleUser = await RoleUser.delete(id);
    if (deletedRoleUser) {
      res.json({ message: 'Rol de usuario eliminado correctamente', roleUser: deletedRoleUser });
    } else {
      res.status(404).json({ message: 'Rol de usuario no encontrado' });
    }
  } catch (error) {
    console.error('Error al eliminar el rol de usuario por ID:', error);
    res.status(500).json({ message: 'Error al eliminar el rol de usuario por ID', error: error.message });
  }
};
