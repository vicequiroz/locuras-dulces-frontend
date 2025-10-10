import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// 🧩 Páginas
import { Home } from './pages/Home/Home';
import { Contacto } from './pages/Contacto/Contacto';
import { Inventario } from './pages/Inventario/Inventario';
import { Blogs } from './pages/Blogs/Blogs';
import { Nosotros } from './pages/Nosotros/Nosotros';
import { Carrito } from './pages/Carrito/Carrito';
import { Login } from './pages/Login/Login';
import { Registro } from './pages/Registro/Registro';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { DetalleProducto } from './pages/DetalleProducto/DetalleProducto';

// 🧩 Componentes de gestión
import { CrearProducto } from './componentes/CrearProd/CrearProducto';
import { EditarProducto } from './componentes/EditarProd/EditarProducto';
import { GestionUsuarios } from './componentes/GestionUsuarios/GestionUsuarios';

function App() {
  return (
    <Router>
      <Routes>
        {/* 🏠 Páginas principales */}
        <Route path="/" element={<Home />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/inventario" element={<Inventario />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/detalleproducto/:id" element={<DetalleProducto />} />

        {/* 🛠️ Módulos administrativos */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/crear-producto" element={<CrearProducto />} />
        <Route path="/editar-producto/:id" element={<EditarProducto />} />
        <Route path="/usuarios" element={<GestionUsuarios />} />
      </Routes>
    </Router>
  );
}

export default App;