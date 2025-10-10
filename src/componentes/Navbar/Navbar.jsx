import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export function Navbar() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const usuarioActivo = localStorage.getItem("usuarioActivo");
    setUsuario(usuarioActivo);
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem("usuarioActivo");
    window.location.reload();
  };

  return (
    <nav className="navbar navbar-expand-sm navbar-dulces">
      <div className="container d-flex align-items-center justify-content-between">
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
              {usuario ? `Hola, ${usuario} 👋` : "Bienvenido, visitante"}
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
            <li className="nav-item">
              <Link className="nav-link" to="/productos">Nuestros Productos</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/nosotros">Nosotros</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/blogs">Blogs</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contacto">Contacto</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/carrito">🛒 Carrito</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}