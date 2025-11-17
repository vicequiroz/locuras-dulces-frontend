import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Navbar } from "../../componentes/Navbar/Navbar";
import { Usuarios } from "../../componentes/Usuarios/Usuarios";
import { Footer } from "../../componentes/Footer/Footer";

export function GestionUsuarios() {
  const location = useLocation();
  const navigate = useNavigate();
  const mensaje = location.state?.message;

  useEffect(() => {
    document.title = "Gestión de Usuarios | Locuras Dulces";
  }, []);

  useEffect(() => {
    if (mensaje) {
      const timer = setTimeout(() => {
        navigate(location.pathname, { replace: true, state: {} });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [mensaje, navigate, location.pathname]);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      <div className="container-fluid flex-grow-1 px-4">
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