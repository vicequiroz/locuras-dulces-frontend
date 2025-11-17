import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../componentes/Navbar/Navbar";
import { Footer } from "../../componentes/Footer/Footer";
import "./Registro.css";

const regiones = [
  {
    nombre: "Región Metropolitana",
    comunas: [
      "Santiago", "Maipú", "La Florida", "Puente Alto", "Ñuñoa", "Providencia",
      "Las Condes", "San Bernardo", "Pudahuel", "Recoleta", "Peñalolén", "Lo Barnechea",
      "Macul", "La Reina", "Cerrillos", "El Bosque", "Estación Central", "La Cisterna",
      "Lo Prado", "Pedro Aguirre Cerda", "Quilicura", "Renca", "San Joaquín", "San Miguel",
      "San Ramón", "Vitacura", "Huechuraba", "Independencia", "Lo Espejo", "Conchalí"
    ]
  },
  {
    nombre: "Valparaíso",
    comunas: [
      "Valparaíso", "Viña del Mar", "Quilpué", "Villa Alemana", "San Antonio",
      "Los Andes", "San Felipe", "La Calera", "Quillota", "Concón", "Limache", "Llay Llay"
    ]
  },
  {
    nombre: "Biobío",
    comunas: [
      "Concepción", "Chillán", "Los Ángeles", "Coronel", "Talcahuano", "San Pedro de la Paz",
      "Hualpén", "Lota", "Penco", "Tomé", "Chiguayante", "Nacimiento", "Mulchén"
    ]
  },
  {
    nombre: "Coquimbo",
    comunas: [
      "La Serena", "Coquimbo", "Ovalle", "Illapel", "Andacollo", "Vicuña", "Monte Patria"
    ]
  },
  {
    nombre: "Araucanía",
    comunas: [
      "Temuco", "Padre Las Casas", "Angol", "Victoria", "Villarrica", "Pucón", "Lautaro"
    ]
  },
  {
    nombre: "Los Lagos",
    comunas: [
      "Puerto Montt", "Osorno", "Castro", "Ancud", "Calbuco", "Quellón", "Frutillar"
    ]
  },
  {
    nombre: "Antofagasta",
    comunas: [
      "Antofagasta", "Calama", "Mejillones", "Tocopilla", "Taltal"
    ]
  },
  {
    nombre: "Atacama",
    comunas: [
      "Copiapó", "Vallenar", "Caldera", "Chañaral", "Diego de Almagro"
    ]
  },
  {
    nombre: "O'Higgins",
    comunas: [
      "Rancagua", "San Fernando", "Santa Cruz", "Machalí", "Graneros", "Pichilemu"
    ]
  },
  {
    nombre: "Magallanes",
    comunas: [
      "Punta Arenas", "Puerto Natales", "Porvenir", "Cabo de Hornos"
    ]
  }
];


export function Registro() {
  const [usuario, setUsuario] = useState({
    nombre: "",
    correo: "",
    contrasena: "",
    confirmarContrasena: "",
    telefono: "",
    direccion: "",
    region: "",
    comuna: "",
    fechaNacimiento: "",
  });

  const [comunasDisponibles, setComunasDisponibles] = useState([]);
  const [errores, setErrores] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario(prev => ({ ...prev, [name]: value }));

    if (name === "region") {
      const regionSeleccionada = regiones.find(r => r.nombre === value);
      setComunasDisponibles(regionSeleccionada ? regionSeleccionada.comunas : []);
      setUsuario(prev => ({ ...prev, comuna: "" }));
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
      case "correo":
        if (!value) error = "El correo es obligatorio.";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = "Formato inválido.";
        break;
      case "contrasena":
        if (!value) error = "La contraseña es obligatoria.";
        else if (value.length < 6) error = "Debe tener al menos 6 caracteres.";
        break;
      case "confirmarContrasena":
        if (!value) error = "Debes confirmar la contraseña.";
        else if (value !== usuario.contrasena) error = "Las contraseñas no coinciden.";
        break;
      case "telefono":
        if (value && !/^\d{7,10}$/.test(value)) error = "Solo números (7-10 dígitos).";
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
    const campos = ["nombre","correo","contrasena","confirmarContrasena","region","comuna"];
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
      const response = await fetch("http://localhost:8080/api/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuario),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("usuarioActivo", JSON.stringify(data));
        alert("Usuario registrado con éxito");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        const error = await response.text();
        alert("Error al registrar: " + error);
      }
    } catch (error) {
      console.error("Error:", error);
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
            <input type="text" name="nombre" placeholder="Nombre completo" value={usuario.nombre} onChange={handleChange} />
            {errores.nombre && <span className="error">{errores.nombre}</span>}

            <input type="email" name="correo" placeholder="Correo electrónico" value={usuario.correo} onChange={handleChange} />
            {errores.correo && <span className="error">{errores.correo}</span>}

            <input type="password" name="contrasena" placeholder="Contraseña" value={usuario.contrasena} onChange={handleChange} />
            {errores.contrasena && <span className="error">{errores.contrasena}</span>}

            <input type="password" name="confirmarContrasena" placeholder="Confirmar contraseña" value={usuario.confirmarContrasena} onChange={handleChange} />
            {errores.confirmarContrasena && <span className="error">{errores.confirmarContrasena}</span>}

            <input type="tel" name="telefono" placeholder="Teléfono" value={usuario.telefono} onChange={handleChange} />
            {errores.telefono && <span className="error">{errores.telefono}</span>}

            <input type="text" name="direccion" placeholder="Dirección" value={usuario.direccion} onChange={handleChange} />

            <select name="region" value={usuario.region} onChange={handleChange}>
              <option value="">Seleccione una región</option>
              {regiones.map(r => <option key={r.nombre} value={r.nombre}>{r.nombre}</option>)}
            </select>
            {errores.region && <span className="error">{errores.region}</span>}

            <select name="comuna" value={usuario.comuna} onChange={handleChange} disabled={!usuario.region}>
              <option value="">Seleccione una comuna</option>
              {comunasDisponibles.map(c => <option key={c} value={c}>{c}</option>)}
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
