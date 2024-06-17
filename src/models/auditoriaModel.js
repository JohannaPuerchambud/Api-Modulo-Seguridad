// No se necesita un modelo formal como Pydantic en Node.js
// Simplemente una clase o estructura de datos para representar los objetos de auditoría

class Auditoria {
    constructor(aud_id, aud_usuario, aud_fecha, aud_accion, aud_modulo, aud_funcionalidad, aud_observacion) {
      this.aud_id = aud_id;
      this.aud_usuario = aud_usuario;
      this.aud_fecha = aud_fecha;
      this.aud_accion = aud_accion;
      this.aud_modulo = aud_modulo;
      this.aud_funcionalidad = aud_funcionalidad;
      this.aud_observacion = aud_observacion;
    }
  }
  