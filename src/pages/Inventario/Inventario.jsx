import { useLocation } from 'react-router-dom';
import { Navbar } from "../../componentes/Navbar/Navbar";
import { Productos } from "../../componentes/Productos/Productos";
import { Footer } from "../../componentes/Footer/Footer";

export function Inventario() {
  const location = useLocation();
  const mensaje = location.state?.message;

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      <div className="container flex-grow-1">
        {/* Mensaje de éxito al volver desde crear o editar */}
        {mensaje && (
          <div className="alert alert-success mt-3 text-center py-2 small">
            {mensaje}
          </div>
        )}

        <Productos />
      </div>

      <Footer />
    </div>
  );

}