const Module = require('../models/module');

// Obtener todos los módulos
const getModules = async (req, res) => {
    try {
        const modules = await Module.getModules();
        res.json(modules);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los módulos', error });
    }
};

// Obtener módulo por ID
const getModuleById = async (req, res) => {
    try {
        const module = await Module.getModuleById(req.params.id);
        if (!module) {
            return res.status(404).json({ message: 'Módulo no encontrado' });
        }
        res.json(module);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el módulo', error });
    }
};

// Crear un nuevo módulo
const createModule = async (req, res) => {
    try {
        const module = await Module.createModule(req.body);
        res.status(201).json(module);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el módulo', error });
    }
};

// Actualizar un módulo existente
const updateModule = async (req, res) => {
    try {
        const module = await Module.updateModule(req.params.id, req.body);
        if (!module) {
            return res.status(404).json({ message: 'Módulo no encontrado' });
        }
        res.json(module);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el módulo', error });
    }
};

// Eliminar un módulo
const deleteModule = async (req, res) => {
    try {
        await Module.deleteModule(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el módulo', error });
    }
};

module.exports = {
    getModules,
    getModuleById,
    createModule,
    updateModule,
    deleteModule,
};
