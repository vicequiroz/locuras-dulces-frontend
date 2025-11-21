import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "../../componentes/Navbar/Navbar";
import { Footer } from "../../componentes/Footer/Footer";
import { EstadisticasDashboard } from "../../componentes/EstadisticasDashboard/EstadisticasDashboard";
import "./HomeAdmin.css";

export function HomeAdmin() {
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const usuarioActivo = localStorage.getItem("usuarioActivo");
    if (usuarioActivo) {
      const user = JSON.parse(usuarioActivo);
      if (user.rol === "SUPER-ADMIN") {
        setUsuario(user);
      } else {
        navigate("/"); // No es admin, redirige al home
      }
    } else {
      navigate("/login"); // No hay sesión, redirige al login
    }
  }, [navigate]);

  const cerrarSesion = () => {
    localStorage.removeItem("usuarioActivo");
    navigate("/login");
  };

  return (
    <>
      <Navbar />
      <div className="admin-container">
        {/* Sidebar lateral */}
        <div className="sidebar">
          <h2>Panel Admin</h2>

          <Link className="sidebar-btn" to="/gestion-usuarios">
            Gestión de Usuarios
          </Link>

          <Link className="sidebar-btn" to="/inventario">
            Gestión de Productos
          </Link>

          <Link className="sidebar-btn" to="/compras-admin">
            Compras / Ventas
          </Link>

          <Link className="sidebar-btn" to="/admin/estadisticas">
            Estadísticas
          </Link>
        </div>

        {/* Contenido principal */}
        <div className="main-content">
          <h1>Bienvenido al panel de administración</h1>
          <p>Desde aquí puedes gestionar usuarios y productos.</p>
          <p>
            Crea, edita y desactiva usuarios, administra el inventario y
            destaca productos en tu tienda.
          </p>

        </div>
      </div>
      <Footer />
    </>
  );
}