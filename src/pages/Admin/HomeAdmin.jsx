import React from "react";
import { Link, useLocation } from "react-router-dom"
import { Navbar } from "../../componentes/Navbar/Navbar";
import { Footer } from "../../componentes/Footer/Footer";
import { useNavigate } from "react-router-dom";

import "./HomeAdmin.css";

export default function HomeAdmin() {

    const location = useLocation();
    const usuario = location.state?.usuario;
    const navigate = useNavigate();

    const cerrarSesion = () => {
        localStorage.removeItem("usuarioActivo"); // Borra usuario guardado
        navigate("/"); // Redirige al Home
        };


  return (
    <>
    <Navbar usuario={usuario}/>
    <div className="admin-container">

        
      {/* Sidebar lateral */}
      <div className="sidebar">
        <h2>Panel Admin</h2>
        <Link className="sidebar-btn" to="/admin/usuarios">
          Gestión de Usuarios
        </Link>

        <Link className="sidebar-btn" to="/admin/productos">
          Gestión de Productos
        </Link>
        <button onClick={cerrarSesion}
            style={{
            marginTop: "auto",       // lo empuja hacia abajo
            padding: "10px 20px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#e74c3c",
            color: "white",
            cursor: "pointer"
            }}>Cerrar sesión
        </button>

      </div>

      

      {/* Contenido principal */}
      <div className="main-content">
        <h1>Bienvenido al panel de administración</h1>
        <p>Desde aquí puedes gestionar usuarios y productos.</p>
        <p>Aquí puedes crear, editar y eliminar usuarios, así como administrar los productos de tu tienda.</p>
    </div>

    </div>
    <Footer />
    </>
  );
}
