import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { regiones } from '../../utils/regiones';
import './Usuarios.css';

export function CrearUsuario() {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState({
    nombre: '',
    apellido: '',
    email: '',
    contrasena: '',
    telefono: '',
    calle: '',
    numero: '',
    region: '',
    comuna: '',
    fechaNacimiento: '',
    rol: 'CLIENTE'
  });

  const [comunasDisponibles, setComunasDisponibles] = useState([]);
  const [errores, setErrores] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario(prev => ({ ...prev, [name]: value }));

    // Actualiza comunas al cambiar región
    if (name === "region") {
      const regionSeleccionada = regiones.find(r => r.nombre === value);
      setComunasDisponibles(regionSeleccionada ? regionSeleccionada.comunas : []);
      setUsuario(prev => ({ ...prev, comuna: "" }));
    }

    validarCampo(name, value);
  };

  const validarCampo = (name, value) => {
    let error = "";
    switch(name) {
      case "nombre":
        if (!value) error = "El nombre es obligatorio.";
        else if (value.length < 3) error = "Debe tener al menos 3 caracteres.";
        break;
      case "apellido":
        if (!value) error = "El apellido es obligatorio."; 
        else if (value.length < 2) error = "Debe tener al menos 2 caracteres.";
        break;
      case "email":
        if (!value) error = "El correo es obligatorio.";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = "Formato de correo inválido.";
        break;
      case "contrasena":
        if (!value) error = "La contraseña es obligatoria.";
        else if (value.length < 6) error = "Debe tener al menos 6 caracteres.";
        break;
      case "telefono":
        if (value && !/^\d{7,10}$/.test(value)) error = "Debe tener entre 7 y 10 dígitos numéricos.";
        break;
      case "region":
        if (!value) error = "Debe seleccionar una región.";
        break;
      case "comuna":
        if (!value) error = "Debe seleccionar una comuna.";
        break;
      default:
        break;
    }
    setErrores(prev => ({ ...prev, [name]: error }));
  };

  const validarFormulario = () => {
    const campos = ["nombre", "email", "contrasena", "region", "comuna"];
    let valido = true;
    campos.forEach(campo => {
      validarCampo(campo, usuario[campo]);
      if (!usuario[campo] || errores[campo]) valido = false;
    });
    return valido;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validarFormulario()) {
      alert("Corrige los errores antes de continuar.");
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuario)
      });
      if (!response.ok) throw new Error('Error al crear usuario');
      setSuccess(true);
      setTimeout(() => navigate('/gestion-usuarios'), 1500);
    } catch (error) {
      alert("No se pudo conectar con el servidor: " + error.message);
    }
  };

  return (
    <div className="container mt-5">
      <h4 className="mb-4 text-center">➕ Crear Nuevo Usuario</h4>
      {success && <div className="alert alert-success py-2 small text-center">Usuario creado exitosamente ✅</div>}

      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Nombre</label>
            <input type="text" name="nombre" className="form-control" value={usuario.nombre} onChange={handleChange} placeholder="Ej: Juan Perez"/>
            {errores.nombre && <small className="text-danger">{errores.nombre}</small>}
          </div>

          <div className="col-md-6">
            <label className="form-label">Apellido</label>
            <input
              type="text"
              name="apellido"
              className="form-control"
              value={usuario.apellido}
              onChange={handleChange}
              placeholder="Ej: Pérez"
            />
            {errores.apellido && <small className="text-danger">{errores.apellido}</small>}
          </div>

          <div className="col-md-6">
            <label className="form-label">Correo</label>
            <input type="email" name="email" className="form-control" value={usuario.email} onChange={handleChange} placeholder="Ej: usuario@gmail.com"/>
            {errores.email && <small className="text-danger">{errores.email}</small>}
          </div>

          <div className="col-md-6">
            <label className="form-label">Contraseña</label>
            <input type="password" name="contrasena" className="form-control" value={usuario.contrasena} onChange={handleChange} placeholder="Mínimo 6 caracteres"/>
            {errores.contrasena && <small className="text-danger">{errores.contrasena}</small>}
          </div>

          <div className="col-md-6">
            <label className="form-label">Teléfono</label>
            <input type="text" name="telefono" className="form-control" value={usuario.telefono} onChange={handleChange} placeholder="Ej: 987654321"/>
            {errores.telefono && <small className="text-danger">{errores.telefono}</small>}
          </div>

          <div className="col-md-4">
            <label className="form-label">Calle</label>
            <input type="text" name="calle" className="form-control" value={usuario.calle} onChange={handleChange} placeholder="Ej: Av. Principal"/>
          </div>

          <div className="col-md-2">
            <label className="form-label">Número</label>
            <input type="text" name="numero" className="form-control" value={usuario.numero} onChange={handleChange} placeholder="1234"/>
          </div>

          <div className="col-md-3">
            <label className="form-label">Región</label>
            <select name="region" value={usuario.region} onChange={handleChange} className="form-select">
              <option value="">Seleccione una región</option>
              {regiones.map(r => <option key={r.nombre} value={r.nombre}>{r.nombre}</option>)}
            </select>
            {errores.region && <small className="text-danger">{errores.region}</small>}
          </div>

          <div className="col-md-3">
            <label className="form-label">Comuna</label>
            <select name="comuna" value={usuario.comuna} onChange={handleChange} className="form-select" disabled={!usuario.region}>
              <option value="">Seleccione una comuna</option>
              {comunasDisponibles.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            {errores.comuna && <small className="text-danger">{errores.comuna}</small>}
          </div>

          <div className="col-md-4">
            <label className="form-label">Fecha de Nacimiento</label>
            <input type="date" name="fechaNacimiento" value={usuario.fechaNacimiento} onChange={handleChange} className="form-control"/>
          </div>

          <div className="col-md-4">
            <label className="form-label">Rol</label>
            <select name="rol" value={usuario.rol} onChange={handleChange} className="form-select">
              <option value="CLIENTE">Cliente</option>
              <option value="VENDEDOR">Vendedor</option>
              <option value="SUPER-ADMIN">Administrador</option>
            </select>
          </div>
        </div>

        <div className="d-flex justify-content-end mt-4 gap-2">
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/gestion-usuarios')}>Cancelar</button>
          <button type="submit" className="btn btn-primary">Guardar Usuario</button>
        </div>
      </form>
    </div>
  );
}
