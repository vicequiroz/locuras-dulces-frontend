import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Usuarios.css';

export function EditarUsuario() {
  const { id } = useParams();
  const navigate = useNavigate();
  const usuarioId = parseInt(id);

  const [usuario, setUsuario] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    direccion: '',
    region: '',
    comuna: '',
    fechaNacimiento: '',
    fechaRegistro: '',
    rol: '',
    activo: true
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const cargarUsuario = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/usuarios/${usuarioId}`);
        if (!response.ok) throw new Error('Error al cargar usuario');
        const data = await response.json();
        setUsuario(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (usuarioId) {
      cargarUsuario();
    }
  }, [usuarioId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setUsuario(prev => ({ ...prev, [name]: val }));
  };

  const handleSubmit = async () => {
    setSaving(true);
    setError(null);
    setSuccess(false);

    if (!usuario.nombre || !usuario.correo) {
      setError("Nombre y correo son obligatorios");
      setSaving(false);
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/usuarios/${usuarioId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuario)
      });

      if (!response.ok) throw new Error('Error al actualizar usuario');

      setSuccess(true);
      setTimeout(() => {
        navigate('/gestion-usuarios', { state: { message: 'Usuario actualizado exitosamente' } });
      }, 1500);

    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const cambiarEstado = async (accion) => {
    const confirmacion = window.confirm(`¿Seguro que deseas ${accion} este usuario?`);
    if (!confirmacion) return;

    try {
      const response = await fetch(`http://localhost:8080/api/usuarios/${usuarioId}/${accion}`, {
        method: "PATCH"
      });

      if (!response.ok) throw new Error("Error al cambiar estado");

      const actualizado = await response.json();
      setUsuario(actualizado);
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  const handleVolver = () => {
    navigate('/gestion-usuarios');
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-3 text-muted">Cargando usuario...</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h4 className="mb-4 text-center">✏️ Editar Usuario</h4>

      {error && <div className="alert alert-danger py-2 small">{error}</div>}
      {success && <div className="alert alert-success py-2 small">Usuario actualizado exitosamente</div>}

      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Nombre</label>
          <input type="text" name="nombre" value={usuario.nombre} onChange={handleChange} className="form-control" />
        </div>

        <div className="col-md-6">
          <label className="form-label">Correo</label>
          <input type="email" name="correo" value={usuario.correo} onChange={handleChange} className="form-control" />
        </div>

        <div className="col-md-6">
          <label className="form-label">Teléfono</label>
          <input type="text" name="telefono" value={usuario.telefono} onChange={handleChange} className="form-control" />
        </div>

        <div className="col-md-6">
          <label className="form-label">Dirección</label>
          <input type="text" name="direccion" value={usuario.direccion} onChange={handleChange} className="form-control" />
        </div>

        <div className="col-md-3">
          <label className="form-label">Región</label>
          <input type="text" name="region" value={usuario.region} onChange={handleChange} className="form-control" />
        </div>

        <div className="col-md-3">
          <label className="form-label">Comuna</label>
          <input type="text" name="comuna" value={usuario.comuna} onChange={handleChange} className="form-control" />
        </div>

        <div className="col-md-3">
          <label className="form-label">Fecha de Nacimiento</label>
          <input type="date" name="fechaNacimiento" value={usuario.fechaNacimiento || ''} disabled className="form-control bg-light" />
        </div>

        <div className="col-md-3">
          <label className="form-label">Fecha de Registro</label>
          <input type="text" value={usuario.fechaRegistro?.slice(0, 10) || ''} disabled className="form-control bg-light" />
        </div>

        <div className="col-md-4">
          <label className="form-label">Rol</label>
          <select name="rol" value={usuario.rol} onChange={handleChange} className="form-select">
            <option value="CLIENTE">Cliente</option>
            <option value="VENDEDOR">Vendedor</option>
            <option value="SUPER-ADMIN">Administrador</option>
          </select>
        </div>

        <div className="col-md-4 d-flex align-items-center">
          <div className="mt-4">
            <span className={`badge ${usuario.activo ? "bg-success" : "bg-secondary"}`}>
              {usuario.activo ? "Activo" : "Inactivo"}
            </span>
            <div className="mt-2">
              {usuario.activo ? (
                <button className="btn btn-warning btn-sm" onClick={() => cambiarEstado("desactivar")}>
                  Desactivar
                </button>
              ) : (
                <button className="btn btn-success btn-sm" onClick={() => cambiarEstado("activar")}>
                  Activar
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-end mt-4 gap-2">
        <button className="btn btn-secondary" onClick={handleVolver}>Cancelar</button>
        <button className="btn btn-primary" onClick={handleSubmit} disabled={saving}>
          {saving ? 'Guardando...' : 'Guardar Cambios'}
        </button>
      </div>
    </div>
  );
}