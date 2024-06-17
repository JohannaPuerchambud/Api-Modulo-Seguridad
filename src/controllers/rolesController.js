const Role = require('../models/rolesmodel');

const getRoles = async (req, res) => {
  try {
    const roles = await Role.getAll();
    res.json({ roles });
  } catch (err) {
    console.error('Error al obtener los roles:', err);
    res.status(500).json({ message: 'Error al obtener los roles', error: err.message });
  }
};

const createRole = async (req, res) => {
  try {
    const newRole = await Role.create(req.body);
    res.json({ message: 'Rol creado correctamente', role: newRole });
  } catch (err) {
    console.error('Error al crear el rol:', err);
    res.status(500).json({ message: 'Error al crear el rol', error: err.message });
  }
};

const getRoleById = async (req, res) => {
  try {
    const role = await Role.getById(parseInt(req.params.rol_id, 10));
    if (role) {
      res.json(role);
    } else {
      res.status(404).json({ message: 'Rol no encontrado' });
    }
  } catch (err) {
    console.error('Error al obtener el rol por ID:', err);
    res.status(500).json({ message: 'Error al obtener el rol por ID', error: err.message });
  }
};

const updateRole = async (req, res) => {
  try {
    const updatedRole = await Role.update(parseInt(req.params.rol_id, 10), req.body);
    if (updatedRole) {
      res.json({ message: 'Rol actualizado correctamente', role: updatedRole });
    } else {
      res.status(404).json({ message: 'Rol no encontrado' });
    }
  } catch (err) {
    console.error('Error al actualizar el rol:', err);
    res.status(500).json({ message: 'Error al actualizar el rol', error: err.message });
  }
};

const deleteRole = async (req, res) => {
  try {
    const deletedRole = await Role.delete(parseInt(req.params.rol_id, 10));
    if (deletedRole) {
      res.json({ message: 'Rol eliminado correctamente', role: deletedRole });
    } else {
      res.status(404).json({ message: 'Rol no encontrado' });
    }
  } catch (err) {
    console.error('Error al eliminar el rol:', err);
    res.status(500).json({ message: 'Error al eliminar el rol', error: err.message });
  }
};

module.exports = {
  getRoles,
  createRole,
  getRoleById,
  updateRole,
  deleteRole
};
