import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState('');

  const cargarUsuarios = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/usuarios');
      if (!response.ok) throw new Error('Error al obtener usuarios');
      const data = await response.json();

      const normalizados = data.map(u => ({
        ...u,
        activo: u.activo === true || u.activo === 'true',
      }));

      setUsuarios(normalizados);
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const handleDesactivar = (id, nombre) => {
    if (window.confirm(`¿Desactivar usuario "${nombre}"?`)) {
      fetch(`http://localhost:8080/api/usuarios/${id}/desactivar`, {
        method: 'PATCH'
      })
        .then(res => {
          if (!res.ok) throw new Error('Error al desactivar');
          return res.json();
        })
        .then(() => {
          alert('Usuario desactivado');
          cargarUsuarios();
        })
        .catch(err => {
          console.error('Error:', err);
          alert('No se pudo desactivar');
        });
    }
  };

  const usuariosFiltrados = usuarios.filter(u =>
    u.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    u.correo.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4">👥 Gestión de Usuarios</h3>

      <div className="row mb-3">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por nombre o correo..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
        <div className="col-md-6 text-end">
          <Link className="btn btn-outline-success" to="/crear-usuario">
            ➕ Crear usuario
          </Link>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Teléfono</th>
              <th>Dirección</th>
              <th>Región</th>
              <th>Comuna</th>
              <th>Fecha Nacimiento</th>
              <th>Fecha Registro</th>
              <th>Rol</th>
              <th>Estado</th>
              <th>Editar</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {usuariosFiltrados.map(u => (
              <tr key={u.id} style={{ opacity: u.activo ? 1 : 0.5 }}>
                <td>{u.id}</td>
                <td>{u.nombre}</td>
                <td>{u.correo}</td>
                <td>{u.telefono || '—'}</td>
                <td>{u.direccion || '—'}</td>
                <td>{u.region || '—'}</td>
                <td>{u.comuna || '—'}</td>
                <td>{u.fechaNacimiento || '—'}</td>
                <td>{u.fechaRegistro?.slice(0, 10) || '—'}</td>
                <td>{u.rol}</td>
                <td>
                  {u.activo ? (
                    <span className="badge bg-success">Activo</span>
                  ) : (
                    <span className="badge bg-secondary">Inactivo</span>
                  )}
                </td>
                <td>
                  {u.activo ? (
                    <Link className="btn btn-outline-primary btn-sm" to={`/editar-usuario/${u.id}`}>
                      Editar
                    </Link>
                  ) : (
                    <button className="btn btn-outline-secondary btn-sm" disabled>
                      Editar
                    </button>
                  )}
                </td>
                <td>
                  {u.activo ? (
                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleDesactivar(u.id, u.nombre)}>
                      Desactivar
                    </button>
                  ) : (
                    <span className="text-muted">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}