import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../componentes/Navbar/Navbar";
import { Footer } from "../../componentes/Footer/Footer";

export function Login() {

  const navigate = useNavigate();
  const [usuario, setUsuario] = useState({
    correo: "",
    contrasena: "",
  });
  const [errores, setErrores] = useState({});
  const [errorGeneral, setErrorGeneral] = useState("");

  // Manejo de cambios y validación en tiempo real
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario((prev) => ({ ...prev, [name]: value }));
    validarCampo(name, value);
  };

  const validarCampo = (name, value) => {
    let error = "";

    if (!value) {
      error = "Este campo es obligatorio";
    } else {
      if (name === "correo" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        error = "Formato de correo inválido";
      }
      if (name === "contrasena" && value.length < 6) {
        error = "La contraseña debe tener al menos 6 caracteres";
      }
    }

    setErrores((prev) => ({ ...prev, [name]: error }));
  };

  const validarFormulario = () => {
    let valido = true;
    Object.keys(usuario).forEach((campo) => {
      validarCampo(campo, usuario[campo]);
      if (!usuario[campo] || errores[campo]) valido = false;
    });
    return valido;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorGeneral("");

    if (!validarFormulario()) return;

    try {
      const response = await fetch("http://localhost:8080/api/usuarios/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuario),
      });

      if (!response.ok) {
        setErrorGeneral("Correo o contraseña incorrectos");
        return;
      }

    const data = await response.json();

     // Guardar usuario en localStorage
    localStorage.setItem("usuarioActivo", JSON.stringify(data));


      // Redirección según rol
      if (data.rol?.toUpperCase()=== "ADMIN") {
          navigate("/home-admin", { state: { usuario: data } });
      } else {
          navigate("/home", { state: { usuario: data } });
      }



    } catch (err) {
      console.error(err);
      setErrorGeneral("Error de conexión con el servidor");
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
          width: "400px"
        }}>
          <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Iniciar Sesión</h2>

          <form style={{ display: "flex", flexDirection: "column", gap: "12px" }} onSubmit={handleSubmit}>
            
            {/* Correo */}
            <input
              type="email"
              name="correo"
              placeholder="Correo electrónico"
              value={usuario.correo}
              onChange={handleChange}
              style={{
                padding: "12px",
                fontSize: "16px",
                borderRadius: "8px",
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
                padding: "12px",
                fontSize: "16px",
                borderRadius: "8px",
                border: errores.contrasena ? "2px solid red" : "1px solid #ccc"
              }}
            />
            {errores.contrasena && <span style={{ color: "red" }}>{errores.contrasena}</span>}

            {errorGeneral && <span style={{ color: "red", textAlign: "center" }}>{errorGeneral}</span>}

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
              Iniciar Sesión
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}
