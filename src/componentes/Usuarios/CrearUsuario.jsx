import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Usuarios.css';

export function CrearUsuario() {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState({
    nombre: '',
    correo: '',
    contrasena: '',
    telefono: '',
    direccion: '',
    region: '',
    comuna: '',
    fechaNacimiento: '',
    rol: 'USER'
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setError(null);
    setSuccess(false);

    // Validaciones básicas
    if (!usuario.nombre || !usuario.correo || !usuario.contrasena) {
      setError("Nombre, correo y contraseña son obligatorios");
      return;
    }

    if (!usuario.correo.includes('@')) {
      setError("Correo inválido");
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuario)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Error al crear usuario');
      }

      setSuccess(true);
      setTimeout(() => {
        navigate('/gestion-usuarios', { state: { message: 'Usuario creado exitosamente' } });
      }, 1500);

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container mt-5">
      <h4 className="mb-4 text-center">➕ Crear Nuevo Usuario</h4>

      {error && <div className="alert alert-danger py-2 small">{error}</div>}
      {success && <div className="alert alert-success py-2 small">Usuario creado exitosamente</div>}

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
          <label className="form-label">Contraseña</label>
          <input type="password" name="contrasena" value={usuario.contrasena} onChange={handleChange} className="form-control" />
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

        <div className="col-md-4">
          <label className="form-label">Fecha de Nacimiento</label>
          <input type="date" name="fechaNacimiento" value={usuario.fechaNacimiento} onChange={handleChange} className="form-control" />
        </div>

        <div className="col-md-4">
          <label className="form-label">Rol</label>
          <select name="rol" value={usuario.rol} onChange={handleChange} className="form-select">
            <option value="USER">Cliente</option>
            <option value="VENDEDOR">Vendedor</option>
            <option value="ADMIN">Administrador</option>
          </select>
        </div>
      </div>

      <div className="d-flex justify-content-end mt-4 gap-2">
        <button className="btn btn-secondary" onClick={() => navigate('/gestion-usuarios')}>Cancelar</button>
        <button className="btn btn-primary" onClick={handleSubmit}>Guardar Usuario</button>
      </div>
    </div>
  );
}