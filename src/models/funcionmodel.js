// src/models/functionModel.js
const pool = require('../config/db');

const getAllFunctions = async () => {
  const result = await pool.query('SELECT * FROM public.functions');
  return result.rows;
};

const getFunctionById = async (func_id) => {
  const result = await pool.query('SELECT * FROM public.functions WHERE func_id = $1', [func_id]);
  return result.rows[0];
};

const createFunction = async (func_name, func_module, func_state) => {
  const result = await pool.query(
    'INSERT INTO public.functions (func_name, func_module, func_state) VALUES ($1, $2, $3) RETURNING *',
    [func_name, func_module, func_state]
  );
  return result.rows[0];
};

const updateFunction = async (func_id, func_name, func_module, func_state) => {
  const result = await pool.query(
    'UPDATE public.functions SET func_name = $1, func_module = $2, func_state = $3 WHERE func_id = $4 RETURNING *',
    [func_name, func_module, func_state, func_id]
  );
  return result.rows[0];
};

const deleteFunction = async (func_id) => {
  await pool.query('DELETE FROM public.functions WHERE func_id = $1', [func_id]);
};

module.exports = {
  getAllFunctions,
  getFunctionById,
  createFunction,
  updateFunction,
  deleteFunction,
};
