import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// 🧩 Páginas
import { Home } from './pages/Home/Home';
import { Blogs } from './pages/Blogs/Blogs';
import { Nosotros } from './pages/Nosotros/Nosotros';
import { Login } from './pages/Login/Login';
import { Registro } from './pages/Registro/Registro';

// 🧩 Componentes de gestión
import { HomeAdmin } from "./pages/Admin/HomeAdmin";
import { CrearProducto } from './componentes/CrearProducto/CrearProducto';
import { EditarProducto } from './componentes/EditarProducto/EditarProducto';
import { Inventario } from './pages/Inventario/Inventario';
import { GestionUsuarios } from "./pages/GestionUsuarios/GestionUsuarios";
import { CrearUsuario } from './componentes/Usuarios/CrearUsuario';
import { EditarUsuario } from './componentes/Usuarios/EditarUsuario';
import { NuestrosProductos } from './pages/NuestrosProductos/NuestrosProductos';

function App() {
  return (
    <Router>
      <Routes>
        {/* 🏠 Páginas principales */}
        <Route path="/" element={<Home />} />
        <Route path="/nuestros-productos" element={<NuestrosProductos />} />

        <Route path="/blogs" element={<Blogs />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />

        {/* 🛠️ Módulos administrativos */}
        <Route path="/home-admin" element={<HomeAdmin />} />
        <Route path="/crear-producto" element={<CrearProducto />} />
        <Route path="/editar-producto/:id" element={<EditarProducto />} />
        <Route path="/inventario" element={<Inventario />} />
        <Route path="/gestion-usuarios" element={<GestionUsuarios />} />
        <Route path="/crear-usuario" element={<CrearUsuario />} />
        <Route path="/editar-usuario/:id" element={<EditarUsuario />} />
      </Routes>
    </Router>
  );
}

export default App;