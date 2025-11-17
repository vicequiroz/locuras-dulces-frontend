import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../componentes/Navbar/Navbar";
import { Footer } from "../../componentes/Footer/Footer";
import "./login.css";

export function Login() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState({ email: "", contrasena: "" });
  const [errores, setErrores] = useState({});
  const [errorGeneral, setErrorGeneral] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario((prev) => ({ ...prev, [name]: value }));
    validarCampo(name, value);
  };

  const validarCampo = (name, value) => {
    let error = "";
    if (!value) error = "Este campo es obligatorio";
    else if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
      error = "Formato de correo inválido";
    else if (name === "contrasena" && value.length < 6)
      error = "La contraseña debe tener al menos 6 caracteres";
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
      localStorage.setItem("usuarioActivo", JSON.stringify(data));

      if (data.rol?.toUpperCase() === "SUPER-ADMIN") {
        navigate("/home-admin", { state: { usuario: data } });
      } else {
        navigate("/", { state: { usuario: data } });
      }
    } catch (err) {
      console.error(err);
      setErrorGeneral("Error de conexión con el servidor");
    }
  };

  return (
    <div className="login-page">
      <Navbar />

      <div className="login-container">
        <div className="login-card">
          <div className="login-image">
            <img src="/LOGO LOCURAS DULCES pequeño.png" alt="Bienvenida" />
          </div>

          <div className="login-form">
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                placeholder="Correo electrónico"
                value={usuario.email}
                onChange={handleChange}
                className={errores.email ? "error" : ""}
              />
              {errores.email && <span className="error-msg">{errores.email}</span>}

              <input
                type="password"
                name="contrasena"
                placeholder="Contraseña"
                value={usuario.contrasena}
                onChange={handleChange}
                className={errores.contrasena ? "error" : ""}
              />
              {errores.contrasena && (
                <span className="error-msg">{errores.contrasena}</span>
              )}

              {errorGeneral && <span className="error-msg">{errorGeneral}</span>}

              <button type="submit">Iniciar Sesión</button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}