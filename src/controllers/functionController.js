// src/controllers/functionController.js
const functionModel = require('../models/funcionmodel');
const db = require('../config/db');

const getFunctions = async (req, res) => {
  try {
    const functions = await functionModel.getAllFunctions();
    res.status(200).json(functions);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching functions' });
  }
};


const getFunction = async (req, res) => {
  try {
    const func_id = parseInt(req.params.id);
    const func = await functionModel.getFunctionById(func_id);
    if (func) {
      res.status(200).json(func);
    } else {
      res.status(404).json({ error: 'Function not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching function' });
  }
};

const createFunction = async (req, res) => {
  try {
    const { func_name, func_module, func_state } = req.body;
    const newFunction = await functionModel.createFunction(func_name, func_module, func_state);
    res.status(201).json(newFunction);
  } catch (error) {
    res.status(500).json({ error: 'Error creating function' });
  }
};

const updateFunction = async (req, res) => {
  try {
    const func_id = parseInt(req.params.id);
    const { func_name, func_module, func_state } = req.body;
    const updatedFunction = await functionModel.updateFunction(func_id, func_name, func_module, func_state);
    if (updatedFunction) {
      res.status(200).json(updatedFunction);
    } else {
      res.status(404).json({ error: 'Function not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error updating function' });
  }
};

const deleteFunction = async (req, res) => {
  try {
    const func_id = parseInt(req.params.id);
    await functionModel.deleteFunction(func_id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error deleting function' });
  }
};

const getFunctionsByModule = async (req, res) => {
  const { mod_id } = req.params;
  try {
    const query = 'SELECT * FROM functions WHERE func_module = $1';
    const { rows } = await db.query(query, [mod_id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ message: `No functions found for module ${mod_id}` });
    }

    return res.json({ tb_function: rows });
  } catch (error) {
    return res.status(500).json({ message: `Error retrieving functions for module ${mod_id}`, error: error.message });
  }
};

module.exports = {
  getFunctions,
  getFunction,
  createFunction,
  updateFunction,
  deleteFunction,
  getFunctionsByModule,
};
