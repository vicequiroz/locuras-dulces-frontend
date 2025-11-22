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

  const cambiarEstado = async (id, accion, nombre) => {
    const confirmacion = window.confirm(`¿Seguro que deseas ${accion} al usuario "${nombre}"?`);
    if (!confirmacion) return;

    try {
      const metodo = accion === "eliminar" ? "DELETE" : "PATCH";
      const url = `http://localhost:8080/api/usuarios/${id}${accion === "eliminar" ? "" : `/${accion}`}`;

      const res = await fetch(url, { method: metodo });
      if (!res.ok) throw new Error(`Error al ${accion}`);

      alert(`Usuario ${accion === "eliminar" ? "eliminado" : accion + "do"} correctamente`);
      cargarUsuarios();
    } catch (err) {
      console.error('Error:', err);
      alert(`No se pudo ${accion} al usuario`);
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
        <div className="col-md-4">
          <Link className="btn btn-outline-secondary" to="/home-admin">
            ⬅ Volver al menú admin
          </Link>
        </div>
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por nombre o correo..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
        <div className="col-md-4 text-end">
          <Link className="btn btn-outline-success" to="/crear-usuario">
            ➕ Crear usuario
          </Link>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-hover w-100">
          <thead className="table-light">
            <tr style={{ whiteSpace: 'nowrap' }}>
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
              <tr key={u.id} style={{ opacity: u.activo ? 1 : 0.5, whiteSpace: 'nowrap' }}>
                <td>{u.id}</td>
                <td>{`${u.nombre} ${u.apellido || ''}`}</td>
                <td>{u.email}</td>
                <td>{u.telefono || '—'}</td>
                <td>{u.calle && u.numero ? `${u.calle} ${u.numero}` : '—'}</td>
                <td>{u.region || '—'}</td>
                <td>{u.comuna || '—'}</td>
                <td>{u.fechaNacimiento ? new Intl.DateTimeFormat('es-CL').format(new Date(u.fechaNacimiento)) : '—'}</td>
                <td>{u.fechaRegistro ? new Intl.DateTimeFormat('es-CL').format(new Date(u.fechaRegistro)) : '—'}
                </td>
                <td>{u.rol}</td>
                <td>
                  <span className={`badge ${u.activo ? "bg-success" : "bg-secondary"}`}>
                    {u.activo ? "Activo" : "Inactivo"}
                  </span>
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
                  <div className="d-grid gap-1">
                    {u.activo ? (
                      <button className="btn btn-sm btn-outline-danger" onClick={() => cambiarEstado(u.id, "desactivar", u.nombre)}>
                        Desactivar
                      </button>
                    ) : (
                      <>
                        <button className="btn btn-sm btn-outline-success" onClick={() => cambiarEstado(u.id, "activar", u.nombre)}>
                          Activar
                        </button>
                        <button className="btn btn-sm btn-outline-dark" onClick={() => cambiarEstado(u.id, "eliminar", u.nombre)}>
                          Eliminar
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}