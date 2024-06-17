const RoleFunction = require('../models/roles_funcions');

const getRoleFunctions = async (req, res) => {
  try {
    const roleFunctions = await RoleFunction.getAll();
    res.json({ roleFunctions });
  } catch (err) {
    console.error('Error al obtener los role functions:', err);
    res.status(500).json({ message: 'Error al obtener los role functions', error: err.message });
  }
};

const createRoleFunction = async (req, res) => {
  try {
    const newRoleFunction = await RoleFunction.create(req.body);
    res.json({ message: 'Role Function creado correctamente', roleFunction: newRoleFunction });
  } catch (err) {
    console.error('Error al crear el role function:', err);
    res.status(500).json({ message: 'Error al crear el role function', error: err.message });
  }
};

const getRoleFunctionById = async (req, res) => {
  try {
    const roleFunction = await RoleFunction.getById(parseInt(req.params.rol_func_id, 10));
    if (roleFunction) {
      res.json(roleFunction);
    } else {
      res.status(404).json({ message: 'Role Function no encontrado' });
    }
  } catch (err) {
    console.error('Error al obtener el role function por ID:', err);
    res.status(500).json({ message: 'Error al obtener el role function por ID', error: err.message });
  }
};

const updateRoleFunction = async (req, res) => {
  try {
    const updatedRoleFunction = await RoleFunction.update(parseInt(req.params.rol_func_id, 10), req.body);
    if (updatedRoleFunction) {
      res.json({ message: 'Role Function actualizado correctamente', roleFunction: updatedRoleFunction });
    } else {
      res.status(404).json({ message: 'Role Function no encontrado' });
    }
  } catch (err) {
    console.error('Error al actualizar el role function:', err);
    res.status(500).json({ message: 'Error al actualizar el role function', error: err.message });
  }
};

const deleteRoleFunction = async (req, res) => {
  try {
    const deletedRoleFunction = await RoleFunction.delete(parseInt(req.params.rol_func_id, 10));
    if (deletedRoleFunction) {
      res.json({ message: 'Role Function eliminado correctamente', roleFunction: deletedRoleFunction });
    } else {
      res.status(404).json({ message: 'Role Function no encontrado' });
    }
  } catch (err) {
    console.error('Error al eliminar el role function:', err);
    res.status(500).json({ message: 'Error al eliminar el role function', error: err.message });
  }
};

module.exports = {
  getRoleFunctions,
  createRoleFunction,
  getRoleFunctionById,
  updateRoleFunction,
  deleteRoleFunction
};
