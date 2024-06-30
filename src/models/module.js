const pool = require('../config/db');

const getmoduless = async () => {
    const result = await pool.query('SELECT * FROM modules');
    return result.rows;
};

const getmodulesById = async (id) => {
    const result = await pool.query('SELECT * FROM moduless WHERE mod_id = $1', [id]);
    return result.rows[0];
};

const createmodules = async (modules) => {
    const { mod_name, mod_admin, mod_state } = modules;
    const result = await pool.query(
        'INSERT INTO moduless (mod_name, mod_admin, mod_state) VALUES ($1, $2, $3) RETURNING *',
        [mod_name, mod_admin, mod_state]
    );
    return result.rows[0];
};

const updatemodules = async (id, modules) => {
    const { mod_name, mod_admin, mod_state } = modules;
    const result = await pool.query(
        'UPDATE modules SET mod_name = $1, mod_admin = $2, mod_state = $3 WHERE mod_id = $4 RETURNING *',
        [mod_name, mod_admin, mod_state, id]
    );
    return result.rows[0];
};

const deletemodules = async (id) => {
    await pool.query('DELETE FROM modules WHERE mod_id = $1', [id]);
};

module.exports = {
    getmoduless,
    getmodulesById,
    createmodules,
    updatemodules,
    deletemodules,
};
