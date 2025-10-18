import { useLocation } from 'react-router-dom';
import { Navbar } from "../../componentes/Navbar/Navbar";
import { Productos } from "../../componentes/Productos/Productos";

export function Inventario() {
  const location = useLocation();
  const mensaje = location.state?.message;

  return (
    <div className="container">
      <Navbar />

      {/* Mensaje de éxito al volver desde crear o editar */}
      {mensaje && (
        <div className="alert alert-success mt-3 text-center py-2 small">
          {mensaje}
        </div>
      )}

      <Productos />
    </div>
  );
}