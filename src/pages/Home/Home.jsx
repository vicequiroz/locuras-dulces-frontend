import { Navbar } from "../../componentes/Navbar/Navbar";
import { Carrusel } from "../../componentes/Carrusel/Carrusel";
import { Destacados } from "../../componentes/Destacados/Destacados";
import { Footer } from "../../componentes/Footer/Footer";
import { Link } from "react-router-dom";

export function Home() {
  const usuarioActivo = localStorage.getItem("usuarioActivo");
  const usuario = usuarioActivo ? JSON.parse(usuarioActivo) : null;

  return (
    <div className="container-fluid">
      <Navbar />

      {/* Mostrar botones solo si NO hay usuario logueado */}
      {!usuario && (
        <div style={{ textAlign: "right", margin: "20px", display: "flex", justifyContent: "flex-end", gap: "10px" }}>
          <Link to="/registro">
            <button
              style={{
                padding: "12px 30px",
                fontSize: "16px",
                borderRadius: "25px",
                border: "none",
                backgroundColor: "#c327a1ff",
                color: "white",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#4CAF50")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#c91678ff")}
            >
              Registrarse
            </button>
          </Link>

          <Link to="/login">
            <button
              style={{
                padding: "12px 30px",
                fontSize: "16px",
                borderRadius: "25px",
                border: "none",
                backgroundColor: "#c327a1ff",
                color: "white",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#4CAF50")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#c91678ff")}
            >
              Iniciar Sesión
            </button>
          </Link>
        </div>
      )}

      <Carrusel />
      <Destacados />
      <Footer />
    </div>
  );
}
