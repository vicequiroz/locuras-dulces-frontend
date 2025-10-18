import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from "../../componentes/Navbar/Navbar";
import { Footer } from "../../componentes/Footer/Footer";
import './CrearProducto.css';

const API_BASE_URL = 'http://localhost:8080/api';

export function CrearProducto() {
  const navigate = useNavigate();

  const [producto, setProducto] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
    categoria: '',
    foto: null // aquí se guarda el archivo seleccionado
  });

  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loadingCategorias, setLoadingCategorias] = useState(true);

  // Carga las categorías al montar el componente
  useEffect(() => {
    fetch(`${API_BASE_URL}/categorias`)
      .then(response => {
        if (!response.ok) throw new Error('Error al cargar categorías');
        return response.json();
      })
      .then(data => {
        setCategorias(data);
        setLoadingCategorias(false);
      })
      .catch(error => {
        console.error('Error al obtener las categorías:', error);
        setError('No se pudieron cargar las categorías');
        setLoadingCategorias(false);
      });
  }, []);

  // Maneja los cambios en los inputs
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "foto") {
      setProducto(prev => ({ ...prev, foto: files[0] }));
    } else {
      setProducto(prev => ({ ...prev, [name]: value }));
    }
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    let urlImagen = "";

    // Si hay imagen seleccionada, se sube primero
    if (producto.foto) {
      const formData = new FormData();
      formData.append("file", producto.foto);

      try {
        const uploadResponse = await fetch(`${API_BASE_URL}/productos/upload`, {
          method: 'POST',
          body: formData
        });

        if (!uploadResponse.ok) {
          throw new Error('Error al subir la imagen');
        }

        urlImagen = await uploadResponse.text(); // el backend devuelve la URL como texto

      } catch (error) {
        console.error("Error al subir imagen:", error);
        setError("No se pudo subir la imagen");
        setLoading(false);
        return;
      }
    }

    // Se arma el objeto final para enviar al backend
    const productoParaEnviar = {
      nombre: producto.nombre.trim(),
      descripcion: producto.descripcion.trim(),
      precio: parseFloat(producto.precio),
      stock: parseInt(producto.stock, 10),
      categoria: { id: parseInt(producto.categoria, 10) },
      foto: urlImagen // se asigna la URL obtenida
    };

    try {
      const response = await fetch(`${API_BASE_URL}/productos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productoParaEnviar)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Error al crear el producto');
      }

      navigate('/inventario', {
        state: { message: 'Producto creado exitosamente' }
      });

    } catch (err) {
      setError(err.message || 'No se pudo crear el producto');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    const tieneContenido = Object.values(producto).some(val => val !== '');
    if (!tieneContenido || window.confirm('¿Cancelar y perder los datos ingresados?')) {
      navigate('/inventario');
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      <div className="container flex-grow-1">
        <div className="crear-producto-container mt-5">
          <div className="form-card">
            <h2>🍬 Agregar Producto </h2>

            {error && (
              <div className="error-message">
                {error}
                <button onClick={() => setError(null)} className="error-close">×</button>
              </div>
            )}

            {loadingCategorias ? (
              <div className="loading">Cargando categorías...</div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="nombre">Nombre del dulce <span className="required">*</span></label>
                    <input
                      type="text" id="nombre" name="nombre" value={producto.nombre}
                      onChange={handleChange} disabled={loading} maxLength={100}
                      placeholder="Ej: Trufas de frambuesa" required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="precio">Precio <span className="required">*</span></label>
                    <div className="price-input">
                      <span className="currency">$</span>
                      <input
                        type="number" id="precio" name="precio" step="1" min="1"
                        value={producto.precio} onChange={handleChange} disabled={loading}
                        placeholder="1000" required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="stock">Stock disponible <span className="required">*</span></label>
                    <input
                      type="number" id="stock" name="stock" min="0"
                      value={producto.stock} onChange={handleChange} disabled={loading}
                      placeholder="Ej: 20" required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="descripcion">Descripción <span className="required">*</span></label>
                  <textarea
                    id="descripcion" name="descripcion" rows="4"
                    value={producto.descripcion} onChange={handleChange} disabled={loading}
                    maxLength={500} placeholder="Características principales del dulce..." required
                  />
                  <small className="char-count">{producto.descripcion.length}/500 caracteres</small>
                </div>

                <div className="form-group">
                  <label htmlFor="categoria">Categoría <span className="required">*</span></label>
                  <select
                    id="categoria" name="categoria" value={producto.categoria}
                    onChange={handleChange} disabled={loading || categorias.length === 0}
                    required>
                    <option value="">Seleccione una categoría</option>
                    {categorias.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="foto">Imagen del dulce</label>
                  <input
                    type="file" id="foto" name="foto" accept="image/*"
                    onChange={handleChange} disabled={loading}
                  />
                </div>

                <div className="form-actions">
                  <button type="submit" disabled={loading} className="btn-primary">
                    {loading ? 'Guardando...' : 'Crear Dulce'}
                  </button>
                  <button type="button" onClick={handleCancel} disabled={loading} className="btn-secondary">
                    Cancelar
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}