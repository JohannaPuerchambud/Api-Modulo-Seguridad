const db = require('./db'); // Archivo donde se define la conexión a la base de datos

const Role = {
  getAll: async () => {
    const query = 'SELECT * FROM roles';
    const { rows } = await db.query(query);
    return rows;
  },

  create: async (role) => {
    const { rol_role, rol_description, rol_allowed_users, rol_state } = role;
    const query = `
      INSERT INTO roles (rol_role, rol_description, rol_allowed_users, rol_state) 
      VALUES ($1, $2, $3, $4) 
      RETURNING *
    `;
    const values = [rol_role, rol_description, rol_allowed_users, rol_state];
    const { rows } = await db.query(query, values);
    return rows[0];
  },

  getById: async (rol_id) => {
    const query = 'SELECT * FROM roles WHERE rol_id = $1';
    const { rows } = await db.query(query, [rol_id]);
    return rows[0];
  },

  update: async (rol_id, role) => {
    const { rol_role, rol_description, rol_allowed_users, rol_state } = role;
    const query = `
      UPDATE roles 
      SET rol_role = $1, rol_description = $2, rol_allowed_users = $3, rol_state = $4 
      WHERE rol_id = $5 
      RETURNING *
    `;
    const values = [rol_role, rol_description, rol_allowed_users, rol_state, rol_id];
    const { rows } = await db.query(query, values);
    return rows[0];
  },

  delete: async (rol_id) => {
    const query = 'DELETE FROM roles WHERE rol_id = $1 RETURNING *';
    const { rows } = await db.query(query, [rol_id]);
    return rows[0];
  }
};

module.exports = Role;
