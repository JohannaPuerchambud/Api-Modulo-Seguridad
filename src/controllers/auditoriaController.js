// controllers/auditoriaController.js

const db = require('../models/db'); // Archivo donde se define la conexión a la base de datos

// Obtener todas las auditorías
exports.getAuditoria = async (req, res) => {
  try {
    const query = 'SELECT * FROM auditoria';
    const { rows } = await db.query(query);
    res.json({ auditoria: rows });
  } catch (err) {
    console.error('Error al obtener los datos de la tabla auditoria:', err);
    res.status(500).json({ message: 'Error al obtener los datos de la tabla auditoria', error: err.message });
  }
};

// Crear una nueva auditoría
exports.createAuditoria = async (req, res) => {
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

// Obtener una auditoría por su ID
exports.getAuditoriaById = async (req, res) => {
  const aud_id = req.params.aud_id;

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

// Eliminar una auditoría por su ID
exports.deleteAuditoria = async (req, res) => {
  const aud_id = req.params.aud_id;

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

// Actualizar una auditoría por su ID
exports.updateAuditoria = async (req, res) => {
  const aud_id = req.params.aud_id;
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
