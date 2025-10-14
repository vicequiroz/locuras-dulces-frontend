import { Navbar } from "../../componentes/Navbar/Navbar";
import { Carrusel } from "../../componentes/Carrusel/Carrusel";
import { Destacados } from "../../componentes/Destacados/Destacados";
import { Footer } from "../../componentes/Footer/Footer";
import { Link } from "react-router-dom";

export function Home() {
  return (
    <div className="container-fluid">
      <Navbar />
     
    
      <div style={{ textAlign: "right", margin: "20px" }}>
        <Link to="/registro">
          <button
            style={{
              padding: "12px 30px",
              fontSize: "16px",
              borderRadius: "25px",  // 🔹 puntas redondeadas
              border: "none",
              backgroundColor: "#c327a1ff", // verde bonito
              color: "white",
              cursor: "pointer",
              transition: "all 0.3s ease", // animación al pasar el mouse
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#4CAF50")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#c91678ff")}>Registrarse</button>
        </Link>

      </div>
       <Carrusel />
      <Destacados />
      <Footer />
    </div>
  );
}