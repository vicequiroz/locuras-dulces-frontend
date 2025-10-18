import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Navbar } from '../Navbar/Navbar';
import { Footer } from "../../componentes/Footer/Footer";
import './EditarProducto.css';

export function EditarProducto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const productoId = parseInt(id);

  const [producto, setProducto] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
    foto: '',
    nuevaFoto: null,
    categoria: {
      id: '',
      nombre: ''
    }
  });

  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setLoading(true);

        const respProducto = await fetch(`http://localhost:8080/api/productos/${productoId}`);
        if (!respProducto.ok) throw new Error('Error al cargar el producto');
        const dataProducto = await respProducto.json();

        setProducto(prev => ({
          ...prev,
          ...dataProducto,
          descripcion: dataProducto.descripcion || '',
          foto: dataProducto.foto || ''
        }));

        const respCategorias = await fetch('http://localhost:8080/api/categorias');
        if (!respCategorias.ok) throw new Error('Error al cargar categorías');
        const dataCategorias = await respCategorias.json();
        setCategorias(dataCategorias);

        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (productoId) {
      cargarDatos();
    }
  }, [productoId]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'nuevaFoto') {
      setProducto(prev => ({ ...prev, nuevaFoto: files[0] }));
    } else if (name === 'categoriaId') {
      const categoriaSeleccionada = categorias.find(c => c.id === parseInt(value));
      setProducto(prev => ({
        ...prev,
        categoria: categoriaSeleccionada || { id: value, nombre: '' }
      }));
    } else {
      setProducto(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async () => {
    setSaving(true);
    setError(null);
    setSuccess(false);

    let urlImagen = producto.foto;

    if (producto.nuevaFoto) {
      const formData = new FormData();
      formData.append("file", producto.nuevaFoto);

      try {
        const uploadResponse = await fetch(`http://localhost:8080/api/productos/upload`, {
          method: 'POST',
          body: formData
        });

        if (!uploadResponse.ok) {
          throw new Error('Error al subir la nueva imagen');
        }

        urlImagen = await uploadResponse.text();
      } catch (error) {
        setError("No se pudo subir la nueva imagen");
        setSaving(false);
        return;
      }
    }

    try {
      const datosActualizados = {
        id: producto.id,
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        precio: parseInt(producto.precio) || 0,
        stock: parseInt(producto.stock) || 0,
        foto: urlImagen
      };

      if (producto.categoria && producto.categoria.id) {
        datosActualizados.categoria = {
          id: producto.categoria.id,
          nombre: producto.categoria.nombre
        };
      }

      const response = await fetch(`http://localhost:8080/api/productos/${productoId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datosActualizados)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error('Error al actualizar el producto');
      }

      setSuccess(true);
      setTimeout(() => {
        navigate('/productos');
      }, 1500);

    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleVolver = () => {
    navigate('/productos');
  };

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-3 text-muted">Cargando producto...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      <div className="editar-producto-container flex-grow-1">
        <div className="editar-card">
          <div className="editar-card-header d-flex justify-content-between align-items-center py-2 px-3 rounded-top">
            <h6 className="mb-0">Editar Producto</h6>
            <button
              onClick={handleVolver}
              type="button"
              className="btn-close btn-close-white"
              aria-label="Cerrar"
            ></button>
          </div>

          <div className="card-body p-3">
            {error && (
              <div className="alert alert-danger py-2 mb-2 small">
                {error}
              </div>
            )}

            {success && (
              <div className="alert alert-success py-2 mb-2 small">
                Producto actualizado exitosamente
              </div>
            )}

            <div className="mb-2">
              <label className="form-label small mb-1">Nombre del Producto</label>
              <input
                type="text"
                value={producto.nombre}
                disabled
                className="form-control form-control-sm bg-light"
              />
            </div>

            <div className="mb-2">
              <label className="form-label small mb-1">Descripción</label>
              <textarea
                name="descripcion"
                value={producto.descripcion}
                onChange={handleChange}
                rows={2}
                className="form-control form-control-sm"
                placeholder="Descripción del producto"
              />
            </div>

            <div className="row g-2 mb-2">
              <div className="col-6">
                <label className="form-label small mb-1">Precio</label>
                <div className="input-group input-group-sm">
                  <span className="input-group-text">$</span>
                  <input
                    type="number"
                    name="precio"
                    value={producto.precio}
                    onChange={handleChange}
                    min="0"
                    className="form-control"
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="col-6">
                <label className="form-label small mb-1">Stock</label>
                <input
                  type="number"
                  name="stock"
                  value={producto.stock}
                  onChange={handleChange}
                  min="0"
                  className="form-control form-control-sm"
                  placeholder="0"
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label small mb-1">Categoría</label>
              <input
                type="text"
                value={producto.categoria?.nombre || 'Sin categoría'}
                disabled
                className="form-control form-control-sm bg-light"
              />
            </div>

            {producto.foto && (
              <div className="mb-2 text-center">
                <img src={producto.foto} alt="Imagen actual" style={{ width: '100px', borderRadius: '8px' }} />
                <p className="small text-muted">Imagen actual</p>
              </div>
            )}

            <div className="mb-3">
              <label className="form-label small mb-1">Nueva imagen (opcional)</label>
              <input
                type="file"
                name="nuevaFoto"
                accept="image/*"
                onChange={handleChange}
                className="form-control form-control-sm"
              />
            </div>

            <div className="d-flex gap-2 pt-2 border-top">
              <button
                onClick={handleVolver}
                type="button"
                className="btn btn-sm btn-secondary">
                Cancelar
              </button>
              <button
                onClick={handleSubmit}
                disabled={saving}
                type="button"
                className="btn btn-sm btn-primary flex-grow-1">
                {saving ? 'Guardando...' : 'Guardar Cambios'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}