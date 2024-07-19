const pool = require('../config/db');

// Obtener todos los módulos
const getModules = async () => {
    const result = await pool.query('SELECT * FROM public.modules');
    return result.rows;
};

// Obtener módulo por ID
const getModuleById = async (id) => {
    const result = await pool.query('SELECT * FROM public.modules WHERE mod_id = $1', [id]);
    return result.rows[0];
};

// Crear un nuevo módulo
const createModule = async (module) => {
    const { mod_name, mod_state } = module;
    const result = await pool.query(
        'INSERT INTO public.modules (mod_name, mod_state) VALUES ($1, $2) RETURNING *',
        [mod_name, mod_state]
    );
    return result.rows[0];
};

// Actualizar un módulo existente
const updateModule = async (id, module) => {
    const { mod_name, mod_state } = module;
    const result = await pool.query(
        'UPDATE public.modules SET mod_name = $1, mod_state = $2 WHERE mod_id = $3 RETURNING *',
        [mod_name, mod_state, id]
    );
    return result.rows[0];
};

// Eliminar un módulo
const deleteModule = async (id) => {
    await pool.query('DELETE FROM public.modules WHERE mod_id = $1', [id]);
};

// Obtener módulo por nombre
const getModuleByName = async (mod_name) => {
    const result = await pool.query('SELECT * FROM public.modules WHERE mod_name = $1', [mod_name]);
    return result.rows[0];
};

module.exports = {
    getModules,
    getModuleById,
    createModule,
    updateModule,
    deleteModule,
    getModuleByName
};
