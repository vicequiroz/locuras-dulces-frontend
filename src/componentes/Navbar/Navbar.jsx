import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export function Navbar() {
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const usuarioActivo = localStorage.getItem("usuarioActivo");
    if (usuarioActivo) {
      setUsuario(JSON.parse(usuarioActivo));
    }
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem("usuarioActivo");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-sm navbar-dulces">
      <div className="container-fluid d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <Link className="navbar-brand me-3" to="/">
            <img
              src="/img/LOGO LOCURAS DULCES pequeño.png"
              alt="Logo locuras dulces"
              width="120"
              height="120"
            />
          </Link>
          <div className="text-white">
            <span className="fw-bold">
              {usuario ? `Hola, ${usuario.nombre} (${usuario.rol}) 👋` : "Bienvenido, visitante"}
            </span>
            {usuario && (
              <button
                onClick={cerrarSesion}
                className="btn btn-outline-light btn-sm ms-2"
              >
                Cerrar sesión
              </button>
            )}
          </div>
        </div>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#menucollapse"
        >
          <img
            src="/img/hamburguesa.png"
            alt="Menu"
            style={{ width: "30px", height: "30px" }}
          />
        </button>

        <div className="collapse navbar-collapse" id="menucollapse">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            {usuario?.rol === "ADMIN" && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/inventario">Inventario</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/gestion-usuarios">Gestión de Usuarios</Link>
                </li>
              </>
            )}
            {usuario?.rol !== "ADMIN" && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/nuestros-productos">Nuestros Productos</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/blogs">Blogs</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/nosotros">Nosotros</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/contacto">Contacto</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/carrito">🛒 Carrito</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}