import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Productos.css'; // opcional si tienes estilos específicos

export function Productos() {
  const [productos, setProductos] = useState([]);

  const cargarProductos = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/productos');
      if (!response.ok) {
        throw new Error('Error en la respuesta del servidor');
      }

      const data = await response.json();
      console.log("Respuesta del backend:", data);

      const productosNormalizados = data.map(p => ({
        ...p,
        activo: p.activo === true || p.activo === 'true',
      }));

      setProductos(productosNormalizados);
    } catch (error) {
      console.error('Error al obtener los productos:', error);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const handleDesactivar = (id, nombre) => {
    if (window.confirm(`¿Estás seguro de desactivar el producto "${nombre}"?`)) {
      fetch(`http://localhost:8080/api/productos/${id}/desactivar`, {
        method: 'PATCH'
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Error al desactivar el producto');
          }
          return response.json();
        })
        .then(data => {
          console.log('Producto desactivado:', data);
          alert('Producto desactivado exitosamente');
          cargarProductos();
        })
        .catch(error => {
          console.error('Error al desactivar:', error);
          alert('Error al desactivar el producto');
        });
    }
  };

  return (
    <div className="container mi-tabla">
      <h3 className="text-center mb-4">🍬 Inventario Locuras Dulces 🍬</h3>

      <div className="row mb-3">
        <div className="col-12 text-end">
          <Link className="btn btn-outline-success" to="/crear-producto">
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
              </tr>
            </thead>
            <tbody>
              {productos.map((prod) => (
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
                  <td>{prod.stock ?? '—'}</td>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}