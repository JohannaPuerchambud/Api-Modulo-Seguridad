const db = require('../config/db'); // Archivo donde se define la conexión a la base de datos

const RoleFunction = {
    getRoleFunctions2: async (roles, moduleId) => {
      try {
        const query = `
          SELECT rf.*, f.func_name
          FROM role_functions rf
          INNER JOIN functions f ON rf.rol_func_function = f.func_id
          WHERE rf.rol_func_role = $2
          AND f.func_module = $1
        `;
        const params = [moduleId, roles];
        const { rows } = await db.query(query, params);
        return rows;
      } catch (error) {
        throw error;
      }
    },
  getAll: async () => {
    const query = `
      SELECT rf.rol_func_id, rf.rol_func_state,
             r.rol_id, r.rol_role, r.rol_description, r.rol_allowed_users, r.rol_state AS rol_state_role,
             f.func_id, f.func_name, f.func_module, f.func_state AS func_state_function
      FROM role_functions rf
      JOIN roles r ON rf.rol_func_role = r.rol_id
      JOIN functions f ON rf.rol_func_function = f.func_id
    `;
    const { rows } = await db.query(query);
    return rows;
  },
  getRoleFunctions: async (roles, moduleId) => {
    try {
      const roleIds = roles.map(role => role.rol_usr_role);
      const roleIdsParams = roleIds.map((_, index) => `$${index + 2}`).join(',');
      const query = `
        SELECT rf.*, f.func_name
        FROM role_functions rf
        INNER JOIN functions f ON rf.rol_func_function = f.func_id
        WHERE rf.rol_func_role IN (${roleIdsParams})
        AND f.func_module = $1
      `;
      const params = [moduleId, ...roleIds];
      const { rows } = await db.query(query, params);
      return rows;
    } catch (error) {
      throw error;
    }
  },
  
  create: async (roleFunction) => {
    const { rol_func_role, rol_func_function, rol_func_state } = roleFunction;
    const query = `
      INSERT INTO role_functions (rol_func_role, rol_func_function, rol_func_state) 
      VALUES ($1, $2, $3) 
      RETURNING *
    `;
    const values = [rol_func_role, rol_func_function, rol_func_state];
    const { rows } = await db.query(query, values);
    return rows[0];
  },

  getById: async (rol_func_id) => {
    const query = `
      SELECT rf.rol_func_id, rf.rol_func_state,
             r.rol_id, r.rol_role, r.rol_description, r.rol_allowed_users, r.rol_state AS rol_state_role,
             f.func_id, f.func_name, f.func_module, f.func_state AS func_state_function
      FROM role_functions rf
      JOIN roles r ON rf.rol_func_role = r.rol_id
      JOIN functions f ON rf.rol_func_function = f.func_id
      WHERE rf.rol_func_id = $1
    `;
    const { rows } = await db.query(query, [rol_func_id]);
    return rows[0];
  },

  update: async (rol_func_id, roleFunction) => {
    const { rol_func_role, rol_func_function, rol_func_state } = roleFunction;
    const query = `
      UPDATE role_functions 
      SET rol_func_role = $1, rol_func_function = $2, rol_func_state = $3 
      WHERE rol_func_id = $4 
      RETURNING *
    `;
    const values = [rol_func_role, rol_func_function, rol_func_state, rol_func_id];
    const { rows } = await db.query(query, values);
    return rows[0];
  },

  delete: async (rol_func_id) => {
    const query = 'DELETE FROM role_functions WHERE rol_func_id = $1 RETURNING *';
    const { rows } = await db.query(query, [rol_func_id]);
    return rows[0];
  }
};

module.exports = RoleFunction;
