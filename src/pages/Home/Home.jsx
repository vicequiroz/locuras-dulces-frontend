import { Navbar } from "../../componentes/Navbar/Navbar";
import { Carrusel } from "../../componentes/Carrusel/Carrusel";
import { Destacados } from "../../componentes/Destacados/Destacados";
import { Footer } from "../../componentes/Footer/Footer";


export function Home() {
  return (
    <div className="container">
      <Navbar />
      <Carrusel />
      <Destacados />
      <Footer />
    </div>
  );
}