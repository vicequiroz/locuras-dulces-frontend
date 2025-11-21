import { Navbar } from "../../componentes/Navbar/Navbar";
import { Footer } from "../../componentes/Footer/Footer";
import { EstadisticasDashboard } from "../../componentes/EstadisticasDashboard/EstadisticasDashboard";

export function EstadisticasAdmin() {
  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h1 className="text-center mb-4">📊 Panel de Estadísticas</h1>
        <EstadisticasDashboard />
      </div>
      <Footer />
    </>
  );
}
