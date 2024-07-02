const RoleFunction = require('../models/roles_funcions');
const db = require('../config/db');

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
const getRoleFunctionsByRole = async (req, res) => {
  const { rol_func_role } = req.params;
  try {
    const query = `
      SELECT rf.rol_func_id, rf.rol_func_state,
             r.rol_id, r.rol_role, r.rol_description, r.rol_allowed_users, r.rol_state AS rol_state_role,
             f.func_id, f.func_name, f.func_module, f.func_state AS func_state_function
      FROM role_functions rf
      INNER JOIN roles r ON rf.rol_func_role = r.rol_id
      INNER JOIN functions f ON rf.rol_func_function = f.func_id
      WHERE rf.rol_func_role = $1
    `;
    const { rows } = await db.query(query, [rol_func_role]);
    
    if (rows.length === 0) {
      return res.status(404).json({ message: `No functions found for role ${rol_func_role}` });
    }

    return res.json({ tb_role_function: rows });
  } catch (error) {
    return res.status(500).json({ message: `Error retrieving functions for role ${rol_func_role}`, error: error.message });
  }
};

module.exports = {
  getRoleFunctions,
  createRoleFunction,
  getRoleFunctionById,
  updateRoleFunction,
  deleteRoleFunction,
  getRoleFunctionsByRole,
};
