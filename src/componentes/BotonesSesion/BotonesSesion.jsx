import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const BotonesSesion = () => {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const activo = localStorage.getItem("usuarioActivo");
    if (activo) {
      try {
        setUsuario(JSON.parse(activo));
      } catch {
        setUsuario(null);
      }
    }
  }, []);

  if (usuario) return null;

  return (
      <div style={{
          textAlign: "right",
          marginTop: "20px",
          marginBottom: "16px", // antes era 20px, ahora más equilibrado
          marginLeft: "20px",
          marginRight: "20px",
          display: "flex",
          justifyContent: "flex-end",
          gap: "10px"
      }}>
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
  );
};