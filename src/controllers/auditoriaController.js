// controllers/auditoriaController.js

const db = require('../models/db'); // Archivo donde se define la conexión a la base de datos

// Método para obtener todas las auditorías
const getAuditoria = async (req, res) => {
  try {
    const query = 'SELECT * FROM auditoria';
    const { rows } = await db.query(query);
    res.json({ auditoria: rows });
  } catch (err) {
    console.error('Error al obtener los datos de la tabla auditoria:', err);
    res.status(500).json({ message: 'Error al obtener los datos de la tabla auditoria', error: err.message });
  }
};

// Método para crear una nueva auditoría
const createAuditoria = async (req, res) => {
  const { aud_usuario, aud_accion, aud_modulo, aud_funcionalidad, aud_observacion } = req.body;
  const aud_fecha = new Date().toISOString(); // Obtén la fecha actual en formato ISO

  try {
    const query = 'INSERT INTO auditoria (aud_usuario, aud_fecha, aud_accion, aud_modulo, aud_funcionalidad, aud_observacion) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
    const values = [aud_usuario, aud_fecha, aud_accion, aud_modulo, aud_funcionalidad, aud_observacion];
    const { rows } = await db.query(query, values);
    res.json({ message: 'Datos insertados correctamente en la tabla auditoria', auditoria: rows[0] });
  } catch (err) {
    console.error('Error al insertar datos en la tabla auditoria:', err);
    res.status(500).json({ message: 'Error al insertar datos en la tabla auditoria', error: err.message });
  }
};

// Método para obtener una auditoría por su ID
const getAuditoriaById = async (req, res) => {
  const aud_id = parseInt(req.params.aud_id, 10);

  try {
    const query = 'SELECT * FROM auditoria WHERE aud_id = $1';
    const { rows } = await db.query(query, [aud_id]);

    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ message: 'Registro no encontrado' });
    }
  } catch (err) {
    console.error('Error al obtener la auditoría por ID:', err);
    res.status(500).json({ message: 'Error al obtener la auditoría por ID', error: err.message });
  }
};

// Método para eliminar una auditoría por su ID
const deleteAuditoria = async (req, res) => {
  const aud_id = parseInt(req.params.aud_id, 10);

  try {
    const query = 'DELETE FROM auditoria WHERE aud_id = $1 RETURNING *';
    const { rows } = await db.query(query, [aud_id]);

    if (rows.length > 0) {
      res.json({ message: 'Registro eliminado correctamente', deleted: rows[0] });
    } else {
      res.status(404).json({ message: 'Registro no encontrado' });
    }
  } catch (err) {
    console.error('Error al eliminar la auditoría por ID:', err);
    res.status(500).json({ message: 'Error al eliminar la auditoría por ID', error: err.message });
  }
};

// Método para actualizar una auditoría por su ID
const updateAuditoria = async (req, res) => {
  const aud_id = parseInt(req.params.aud_id, 10);
  const { aud_usuario, aud_accion, aud_modulo, aud_funcionalidad, aud_observacion } = req.body;

  try {
    const query = 'UPDATE auditoria SET aud_usuario = $1, aud_accion = $2, aud_modulo = $3, aud_funcionalidad = $4, aud_observacion = $5 WHERE aud_id = $6 RETURNING *';
    const values = [aud_usuario, aud_accion, aud_modulo, aud_funcionalidad, aud_observacion, aud_id];
    const { rows } = await db.query(query, values);

    if (rows.length > 0) {
      res.json({ message: 'Registro actualizado correctamente', updated: rows[0] });
    } else {
      res.status(404).json({ message: 'Registro no encontrado' });
    }
  } catch (err) {
    console.error('Error al actualizar la auditoría por ID:', err);
    res.status(500).json({ message: 'Error al actualizar la auditoría por ID', error: err.message });
  }
};

// Exportar todos los métodos
module.exports = {
  getAuditoria,
  createAuditoria,
  getAuditoriaById,
  deleteAuditoria,
  updateAuditoria,
};
