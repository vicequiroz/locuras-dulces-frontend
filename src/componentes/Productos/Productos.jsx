import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export function Productos() {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [categoriaFiltro, setCategoriaFiltro] = useState('');
  const [categorias, setCategorias] = useState([]);

  const cargarProductos = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/productos');
      if (!response.ok) throw new Error('Error en la respuesta del servidor');
      const data = await response.json();

      const normalizados = data.map(p => ({
        ...p,
        activo: p.activo === true || p.activo === 'true',
      }));

      setProductos(normalizados);
    } catch (error) {
      console.error('Error al obtener los productos:', error);
    }
  };

  const cargarCategorias = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/categorias');
      if (!response.ok) throw new Error('Error al obtener categorías');
      const data = await response.json();
      setCategorias(data);
    } catch (error) {
      console.error('Error al obtener categorías:', error);
    }
  };

  useEffect(() => {
    cargarProductos();
    cargarCategorias();
  }, []);

  const handleDesactivar = (id, nombre) => {
    if (window.confirm(`¿Estás seguro de desactivar el producto "${nombre}"?`)) {
      fetch(`http://localhost:8080/api/productos/${id}/desactivar`, {
        method: 'PATCH'
      })
        .then(response => {
          if (!response.ok) throw new Error('Error al desactivar el producto');
          return response.json();
        })
        .then(() => {
          alert('Producto desactivado exitosamente');
          cargarProductos();
        })
        .catch(error => {
          console.error('Error al desactivar:', error);
          alert('Error al desactivar el producto');
        });
    }
  };

  const handleActivar = (id, nombre) => {
    if (window.confirm(`¿Deseas activar nuevamente el producto "${nombre}"?`)) {
      fetch(`http://localhost:8080/api/productos/${id}/activar`, {
        method: 'PATCH'
      })
        .then(response => {
          if (!response.ok) throw new Error('Error al activar el producto');
          return response.json();
        })
        .then(() => {
          alert('Producto activado exitosamente');
          cargarProductos();
        })
        .catch(error => {
          console.error('Error al activar:', error);
          alert('Error al activar el producto');
        });
    }
  };

  const handleEliminar = async (id, nombre) => {
    if (window.confirm(`¿Deseas eliminar definitivamente el producto "${nombre}"?`)) {
      try {
        const response = await fetch(`http://localhost:8080/api/productos/${id}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          alert(`El producto "${nombre}" fue eliminado correctamente`);
          cargarProductos();
        } else {
          alert("Error al eliminar el producto");
        }
      } catch (error) {
        console.error("Error al eliminar producto:", error);
        alert("Error al eliminar el producto");
      }
    }
  };

  const productosFiltrados = productos.filter(p => {
    const coincideNombre = p.nombre.toLowerCase().includes(busqueda.toLowerCase());
    const coincideCategoria = categoriaFiltro ? p.categoria?.id === parseInt(categoriaFiltro) : true;
    return coincideNombre && coincideCategoria;
  });

  return (
    <div className="container mi-tabla mt-5">
      <h3 className="text-center mb-4 mt-5">🍬 Inventario Locuras Dulces 🍬</h3>

      <div className="row mb-3 align-items-center">
        <div className="col-md-3">
          <Link className="btn btn-outline-secondary w-100" to="/home-admin">
            ⬅ Volver al menú admin
          </Link>
        </div>
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por nombre..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <select
            className="form-select"
            value={categoriaFiltro}
            onChange={(e) => setCategoriaFiltro(e.target.value)}
          >
            <option value="">Todas las categorías</option>
            {categorias.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.nombre}</option>
            ))}
          </select>
        </div>
        <div className="col-md-2 text-end">
          <Link className="btn btn-outline-success w-100" to="/crear-producto">
            ➕ Agregar producto
          </Link>
        </div>
      </div>

      <div className="row">
        <div className="col-md">
          <table className="table table-hover table-bordered">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Foto</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Categoría</th>
                <th>Editar</th>
                <th>Estado</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {productosFiltrados.map((prod) => (
                <tr key={prod.id}
                  style={{
                    opacity: prod.activo ? 1 : 0.5,
                    backgroundColor: prod.activo ? 'white' : '#f8f8f8'
                  }}>
                  <td>{prod.id}</td>
                  <td>
                    {prod.foto ? (
                      <img src={prod.foto} alt={prod.nombre} style={{ width: '60px', borderRadius: '8px' }} />
                    ) : (
                      <span className="text-muted">Sin imagen</span>
                    )}
                  </td>
                  <td>{prod.nombre}</td>
                  <td>{prod.descripcion}</td>
                  <td>${prod.precio.toLocaleString()}</td>
                  <td>
                    {prod.stock}
                    {prod.stock < 5 && (
                      <span className="badge bg-warning text-dark ms-2">Stock bajo</span>
                    )}
                  </td>
                  <td>{prod.categoria?.nombre}</td>
                  <td>
                    {prod.activo ? (
                      <Link className="btn btn-outline-primary btn-sm" to={`/editar-producto/${prod.id}`}>
                        Editar
                      </Link>
                    ) : (
                      <button className="btn btn-outline-secondary btn-sm" disabled>
                        Editar
                      </button>
                    )}
                  </td>
                  <td>
                    {prod.activo ? (
                      <button className="btn btn-sm btn-outline-danger" onClick={() => handleDesactivar(prod.id, prod.nombre)}>
                        Desactivar
                      </button>
                    ) : (
                      <span className="badge bg-secondary">Desactivado</span>
                    )}
                  </td>
                  <td>
                    <div className="d-grid gap-1">
                      {prod.activo ? (
                        <button className="btn btn-sm btn-outline-secondary" disabled>
                          🗑️ Eliminar
                        </button>
                      ) : (
                        <>
                          <button
                            className="btn btn-sm btn-outline-success"
                            onClick={() => handleActivar(prod.id, prod.nombre)}
                          >
                            Activar
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleEliminar(prod.id, prod.nombre)}
                          >
                            🗑️ Eliminar
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
    </div>
  );
}