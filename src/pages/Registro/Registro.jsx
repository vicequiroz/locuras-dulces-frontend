import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../componentes/Navbar/Navbar";
import { Footer } from "../../componentes/Footer/Footer";
import { regiones } from "../../utils/regiones";
import "./Registro.css";

export function Registro() {
  const [usuario, setUsuario] = useState({
    nombre: "",
    apellido: "",
    email: "",
    contrasena: "",
    confirmarContrasena: "",
    telefono: "",
    calle: "",
    numero: "",
    region: "",
    comuna: "",
    fechaNacimiento: ""
  });

  const [comunasDisponibles, setComunasDisponibles] = useState([]);
  const [errores, setErrores] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "region") {
      const regionSeleccionada = regiones.find(r => r.nombre === value);
      setComunasDisponibles(regionSeleccionada ? regionSeleccionada.comunas : []);
      setUsuario(prev => ({ ...prev, region: value, comuna: "" }));
    } else {
      setUsuario(prev => ({ ...prev, [name]: value }));
    }

    validarCampo(name, value);
  };

  const validarCampo = (name, value) => {
    let error = "";

    switch (name) {
      case "nombre":
        if (!value) error = "El nombre es obligatorio.";
        else if (value.length < 3) error = "Debe tener al menos 3 caracteres.";
        break;
      case "apellido":
        if (!value) error = "El apellido es obligatorio.";
        else if (value.length < 3) error = "Debe tener al menos 3 caracteres.";
        break;
      case "email":
        if (!value) error = "El correo es obligatorio.";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = "Correo inválido.";
        break;
      case "contrasena":
        if (!value) error = "La contraseña es obligatoria.";
        else if (value.length < 6) error = "Debe tener mínimo 6 caracteres.";
        break;
      case "confirmarContrasena":
        if (!value) error = "Debes confirmar la contraseña.";
        else if (value !== usuario.contrasena) error = "No coincide con la anterior.";
        break;
      case "telefono":
        if (value && !/^\d{7,10}$/.test(value)) error = "Formato inválido (7-10 dígitos).";
        break;
      case "calle":
        if (!value) error = "La calle es obligatoria.";
        break;
      case "numero":
        if (!value) error = "El número es obligatorio.";
        break;
      case "region":
        if (!value) error = "Selecciona una región.";
        break;
      case "comuna":
        if (!value) error = "Selecciona una comuna.";
        break;
      default:
        break;
    }

    setErrores(prev => ({ ...prev, [name]: error }));
  };

  const validarFormulario = () => {
    const campos = [
      "nombre", "apellido", "email", "contrasena",
      "confirmarContrasena", "region", "comuna", "calle", "numero"
    ];

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

    // Eliminar confirmarContrasena (backend no la necesita)
    const payload = { ...usuario };
    delete payload.confirmarContrasena;

    try {
      const res = await fetch("http://localhost:8080/api/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const error = await res.text();
        alert("Error al registrar: " + error);
        return;
      }

      const data = await res.json();

      // Guardamos el usuario logueado
      localStorage.setItem(
        "usuarioActivo",
        JSON.stringify({
          ...data,
          id: data.id
        })
      );

      alert("Usuario registrado con éxito");
      setTimeout(() => navigate("/login"), 1200);

    } catch (error) {
      console.error(error);
      alert("No se pudo conectar con el servidor");
    }
  };

  return (
    <div className="container-fluid">
      <Navbar />

      <div className="registro-form-wrapper">
        <div className="registro-card">
          <h2>Registro de Usuario</h2>

          <form onSubmit={handleSubmit}>
            <input type="text" name="nombre" placeholder="Nombre" value={usuario.nombre} onChange={handleChange} />
            {errores.nombre && <span className="error">{errores.nombre}</span>}

            <input type="text" name="apellido" placeholder="Apellido" value={usuario.apellido} onChange={handleChange} />
            {errores.apellido && <span className="error">{errores.apellido}</span>}

            <input type="email" name="email" placeholder="Correo electrónico" value={usuario.email} onChange={handleChange} />
            {errores.email && <span className="error">{errores.email}</span>}

            <input type="password" name="contrasena" placeholder="Contraseña" value={usuario.contrasena} onChange={handleChange} />
            {errores.contrasena && <span className="error">{errores.contrasena}</span>}

            <input type="password" name="confirmarContrasena" placeholder="Confirmar contraseña" value={usuario.confirmarContrasena} onChange={handleChange} />
            {errores.confirmarContrasena && <span className="error">{errores.confirmarContrasena}</span>}

            <input type="tel" name="telefono" placeholder="Teléfono (opcional)" value={usuario.telefono} onChange={handleChange} />
            {errores.telefono && <span className="error">{errores.telefono}</span>}

            <input type="text" name="calle" placeholder="Calle" value={usuario.calle} onChange={handleChange} />
            {errores.calle && <span className="error">{errores.calle}</span>}

            <input type="text" name="numero" placeholder="Número" value={usuario.numero} onChange={handleChange} />
            {errores.numero && <span className="error">{errores.numero}</span>}

            <select name="region" value={usuario.region} onChange={handleChange}>
              <option value="">Seleccione una región</option>
              {regiones.map(r => (
                <option key={r.nombre} value={r.nombre}>{r.nombre}</option>
              ))}
            </select>
            {errores.region && <span className="error">{errores.region}</span>}

            <select name="comuna" value={usuario.comuna} onChange={handleChange} disabled={!usuario.region}>
              <option value="">Seleccione una comuna</option>
              {comunasDisponibles.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            {errores.comuna && <span className="error">{errores.comuna}</span>}

            <input type="date" name="fechaNacimiento" value={usuario.fechaNacimiento} onChange={handleChange} />

            <button type="submit">Registrarse</button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}
