import { Navbar } from "../../componentes/Navbar/Navbar";
import { Carrusel } from "../../componentes/Carrusel/Carrusel";
import { Destacados } from "../../componentes/Destacados/Destacados";
import { Footer } from "../../componentes/Footer/Footer";
import { BotonesSesion } from "../../componentes/BotonesSesion/BotonesSesion";

export function Home() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      {/* Botones de sesión en rosa (solo si no hay usuario activo) */}
      <BotonesSesion />

      {/* Carrusel principal */}
      <section>
        <Carrusel />
      </section>

      {/* Productos Destacados */}
        <Destacados />
      <Footer />
    </div>
  );
}
