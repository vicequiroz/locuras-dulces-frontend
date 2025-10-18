import { useLocation } from 'react-router-dom';
import { Navbar } from "../../componentes/Navbar/Navbar";
import { Usuarios } from "../../componentes/Usuarios/Usuarios";
import { Footer } from "../../componentes/Footer/Footer";

export function GestionUsuarios() {
  const location = useLocation();
  const mensaje = location.state?.message;

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      <div className="container flex-grow-1">
        {mensaje && (
          <div className="alert alert-success mt-3 text-center py-2 small">
            {mensaje}
          </div>
        )}

        <Usuarios />
      </div>

      <Footer />
    </div>
  );
}