import { useState, useEffect } from "react";
import { Navbar } from "../../componentes/Navbar/Navbar";
import { Footer } from "../../componentes/Footer/Footer";

// Listado de regiones y comunas (RM completa resumida)
const regiones = [
  {
    nombre: "Región Metropolitana",
    comunas: [
      "Santiago","Cerrillos","Cerro Navia","Conchalí","El Bosque","Estación Central",
      "Huechuraba","Independencia","La Cisterna","La Florida","La Granja","La Pintana",
      "La Reina","Las Condes","Lo Barnechea","Lo Espejo","Lo Prado","Macul","Maipú",
      "Ñuñoa","Pedro Aguirre Cerda","Peñalolén","Providencia","Pudahuel","Quilicura",
      "Quinta Normal","Recoleta","Renca","San Joaquín","San Miguel","San Ramón",
      "Vitacura","Puente Alto","Pirque","San José de Maipo","Colina","Lampa",
      "Tiltil","San Bernardo","Buin","Calera de Tango","Paine","Melipilla","Alhué",
      "Curacaví","María Pinto","San Pedro"
    ]
  },
  { nombre: "Valparaíso", comunas: ["Valparaíso","Viña del Mar","Quilpué"] },
  { nombre: "Biobío", comunas: ["Concepción","Chillán","Los Ángeles"] },
];

export default function Registro() {
  const [usuario, setUsuario] = useState({
    nombre: "",
    correo: "",
    contrasena: "",
    telefono: "",
    direccion: "",
    region: "",
    comuna: "",
    fechaNacimiento: "",
  });

  const [comunasDisponibles, setComunasDisponibles] = useState([]);
  const [errores, setErrores] = useState({}); // mensajes de error

  // Manejo de cambios de inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario((prev) => ({ ...prev, [name]: value }));

    // Si cambia la región, actualizar comunas disponibles
    if (name === "region") {
      const regionSeleccionada = regiones.find((r) => r.nombre === value);
      setComunasDisponibles(regionSeleccionada ? regionSeleccionada.comunas : []);
      setUsuario((prev) => ({ ...prev, comuna: "" }));
    }

    // Validación en tiempo real
    validarCampo(name, value);
  };

  // Función para validar campos
  const validarCampo = (name, value) => {
    let error = "";

    switch(name) {
      case "nombre":
        if (!value) error = "El nombre es obligatorio.";
        else if (value.length < 3) error = "El nombre debe tener al menos 3 caracteres.";
        break;
      case "correo":
        if (!value) error = "El correo es obligatorio.";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = "Formato de correo inválido.";
        break;
      case "contrasena":
        if (!value) error = "La contraseña es obligatoria.";
        else if (value.length < 6) error = "La contraseña debe tener al menos 6 caracteres.";
        break;
      case "telefono":
        if (value && !/^\d{7,15}$/.test(value)) error = "Teléfono inválido, solo números (7-15 dígitos).";
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

    setErrores((prev) => ({ ...prev, [name]: error }));
  };

  // Validar todos los campos antes de enviar
  const validarFormulario = () => {
    const campos = ["nombre","correo","contrasena","region","comuna"];
    let valido = true;

    campos.forEach((campo) => {
      validarCampo(campo, usuario[campo]);
      if (usuario[campo] === "" || errores[campo]) valido = false;
    });

    return valido;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validarFormulario()) {
      alert("Por favor corrige los errores del formulario.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/usuarios/registrar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuario),
      });

      if (response.ok) {
        alert("Usuario registrado correctamente");
        setUsuario({
          nombre: "",
          correo: "",
          contrasena: "",
          telefono: "",
          direccion: "",
          region: "",
          comuna: "",
          fechaNacimiento: "",
        });
        setErrores({});
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

      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
        padding: "20px"
      }}>
        <div style={{
          backgroundColor: "#f5f5f5",
          padding: "30px",
          borderRadius: "15px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          width: "500px"
        }}>
          <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Registro de Usuario</h2>

          <form style={{ display: "flex", flexDirection: "column", gap: "12px" }} onSubmit={handleSubmit}>
            
            {/* Nombre */}
            <input
              type="text"
              name="nombre"
              placeholder="Nombre completo"
              value={usuario.nombre}
              onChange={handleChange}
              style={{
                padding: "12px", fontSize: "16px", borderRadius: "8px",
                border: errores.nombre ? "2px solid red" : "1px solid #ccc"
              }}
            />
            {errores.nombre && <span style={{ color: "red" }}>{errores.nombre}</span>}

            {/* Correo */}
            <input
              type="email"
              name="correo"
              placeholder="Correo electrónico"
              value={usuario.correo}
              onChange={handleChange}
              style={{
                padding: "12px", fontSize: "16px", borderRadius: "8px",
                border: errores.correo ? "2px solid red" : "1px solid #ccc"
              }}
            />
            {errores.correo && <span style={{ color: "red" }}>{errores.correo}</span>}

            {/* Contraseña */}
            <input
              type="password"
              name="contrasena"
              placeholder="Contraseña"
              value={usuario.contrasena}
              onChange={handleChange}
              style={{
                padding: "12px", fontSize: "16px", borderRadius: "8px",
                border: errores.contrasena ? "2px solid red" : "1px solid #ccc"
              }}
            />
            {errores.contrasena && <span style={{ color: "red" }}>{errores.contrasena}</span>}

            {/* Teléfono */}
            <input
              type="tel"
              name="telefono"
              placeholder="Teléfono"
              value={usuario.telefono}
              onChange={handleChange}
              style={{
                padding: "12px", fontSize: "16px", borderRadius: "8px",
                border: errores.telefono ? "2px solid red" : "1px solid #ccc"
              }}
            />
            {errores.telefono && <span style={{ color: "red" }}>{errores.telefono}</span>}

            {/* Dirección */}
            <input
              type="text"
              name="direccion"
              placeholder="Dirección"
              value={usuario.direccion}
              onChange={handleChange}
              style={{ padding: "12px", fontSize: "16px", borderRadius: "8px", border: "1px solid #ccc" }}
            />

            {/* Región */}
            <select
              name="region"
              value={usuario.region}
              onChange={handleChange}
              style={{
                padding: "12px", fontSize: "16px", borderRadius: "8px",
                border: errores.region ? "2px solid red" : "1px solid #ccc"
              }}
            >
              <option value="">Seleccione una región</option>
              {regiones.map((r) => (
                <option key={r.nombre} value={r.nombre}>{r.nombre}</option>
              ))}
            </select>
            {errores.region && <span style={{ color: "red" }}>{errores.region}</span>}

            {/* Comuna */}
            <select
              name="comuna"
              value={usuario.comuna}
              onChange={handleChange}
              disabled={!usuario.region}
              style={{
                padding: "12px", fontSize: "16px", borderRadius: "8px",
                border: errores.comuna ? "2px solid red" : "1px solid #ccc"
              }}
            >
              <option value="">Seleccione una comuna</option>
              {comunasDisponibles.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            {errores.comuna && <span style={{ color: "red" }}>{errores.comuna}</span>}

            {/* Fecha de nacimiento */}
            <input
              type="date"
              name="fechaNacimiento"
              value={usuario.fechaNacimiento}
              onChange={handleChange}
              style={{ padding: "12px", fontSize: "16px", borderRadius: "8px", border: "1px solid #ccc" }}
            />

            {/* Botón */}
            <button
              type="submit"
              style={{
                padding: "14px",
                fontSize: "16px",
                borderRadius: "25px",
                border: "none",
                backgroundColor: "#4CAF50",
                color: "white",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#45a049")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#4CAF50")}
            >
              Registrarse
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}
