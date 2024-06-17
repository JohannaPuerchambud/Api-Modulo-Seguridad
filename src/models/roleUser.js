const db = require('../config/db');

const RoleUser = {
  // Obtener todos los roles de usuario
  async getAll() {
    try {
      const query = `
        SELECT ru.*, u.usr_full_name AS user_name, r.rol_role AS role_name
        FROM role_users ru
        INNER JOIN users u ON ru.rol_usr_user = u.usr_id
        INNER JOIN roles r ON ru.rol_usr_role = r.rol_id
      `;
      const { rows } = await db.query(query);
      return rows;
    } catch (error) {
      throw error;
    }
  },

  // Crear un nuevo rol de usuario
  async create(roleUser) {
    const { rol_usr_user, rol_usr_role, rol_usr_state } = roleUser;

    try {
      const query = `
        INSERT INTO role_users (rol_usr_user, rol_usr_role, rol_usr_state)
        VALUES ($1, $2, $3)
        RETURNING *
      `;
      const values = [rol_usr_user, rol_usr_role, rol_usr_state];
      const { rows } = await db.query(query, values);
      return rows[0];
    } catch (error) {
      throw error;
    }
  },

  // Obtener un rol de usuario por su ID
  async getById(id) {
    try {
      const query = `
        SELECT ru.*, u.usr_full_name AS user_name, r.rol_role AS role_name
        FROM role_users ru
        INNER JOIN users u ON ru.rol_usr_user = u.usr_id
        INNER JOIN roles r ON ru.rol_usr_role = r.rol_id
        WHERE ru.rol_usr_id = $1
      `;
      const { rows } = await db.query(query, [id]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  },

  // Actualizar un rol de usuario por su ID
  async update(id, roleUser) {
    const { rol_usr_user, rol_usr_role, rol_usr_state } = roleUser;

    try {
      const query = `
        UPDATE role_users
        SET rol_usr_user = $1, rol_usr_role = $2, rol_usr_state = $3
        WHERE rol_usr_id = $4
        RETURNING *
      `;
      const values = [rol_usr_user, rol_usr_role, rol_usr_state, id];
      const { rows } = await db.query(query, values);
      return rows[0];
    } catch (error) {
      throw error;
    }
  },

  // Eliminar un rol de usuario por su ID
  async delete(id) {
    try {
      const query = `
        DELETE FROM role_users
        WHERE rol_usr_id = $1
        RETURNING *
      `;
      const { rows } = await db.query(query, [id]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }
};

module.exports = RoleUser;
