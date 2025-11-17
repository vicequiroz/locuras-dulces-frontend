import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// 🧩 Contexto
import { CarritoProvider } from './context/CarritoContext';

// 🧩 Páginas
import { Home } from './pages/Home/Home';
import { Blogs } from './pages/Blogs/Blogs';
import { Nosotros } from './pages/Nosotros/Nosotros';
import { Login } from './pages/Login/Login';
import { Registro } from './pages/Registro/Registro';
import { ConfirmacionCompra } from "./componentes/ConfirmacionCompra/ConfirmacionCompra";

// 🧩 Componentes de gestión
import { HomeAdmin } from "./pages/Admin/HomeAdmin";
import { CrearProducto } from './componentes/CrearProducto/CrearProducto';
import { EditarProducto } from './componentes/EditarProducto/EditarProducto';
import { Inventario } from './pages/Inventario/Inventario';
import { GestionUsuarios } from "./pages/GestionUsuarios/GestionUsuarios";
import { CrearUsuario } from './componentes/Usuarios/CrearUsuario';
import { EditarUsuario } from './componentes/Usuarios/EditarUsuario';
import { NuestrosProductos } from './pages/NuestrosProductos/NuestrosProductos';
import { Contacto } from "./componentes/Contacto/Contacto";
import { DetalleProducto } from './pages/DetalleProducto/DetalleProducto';
import { CarritoPage } from './pages/Carrito/CarritoPage';
import { BoletaPage } from './pages/Boleta/BoletaPage';
import { FormularioCompra } from "./pages/FormularioCompra/FormularioCompra";
import { BoletaDetalle } from './pages/Boleta/BoletaDetalle';
import { ComprasAdmin } from './pages/Admin/ComprasAdmin';

function App() {
  return (
    <CarritoProvider>
      <Router>
        <Routes>
          {/* 🏠 Páginas principales */}
          <Route path="/" element={<Home />} />
          <Route path="/nuestros-productos" element={<NuestrosProductos />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/confirmacion" element={<ConfirmacionCompra />} />
          <Route path="/producto/:id" element={<DetalleProducto />} />
          <Route path="/carrito" element={<CarritoPage />} />
          <Route path="/formulario-compra" element={<FormularioCompra />} />
          <Route path="/mis-compras" element={<BoletaPage />} />
          <Route path="/boleta/:id" element={<BoletaDetalle />} />

          {/* 🛠️ Módulos administrativos */}
          <Route path="/home-admin" element={<HomeAdmin />} />
          <Route path="/crear-producto" element={<CrearProducto />} />
          <Route path="/editar-producto/:id" element={<EditarProducto />} />
          <Route path="/inventario" element={<Inventario />} />
          <Route path="/gestion-usuarios" element={<GestionUsuarios />} />
          <Route path="/crear-usuario" element={<CrearUsuario />} />
          <Route path="/editar-usuario/:id" element={<EditarUsuario />} />
          <Route path="/compras-admin" element={<ComprasAdmin />} />
        </Routes>
      </Router>
    </CarritoProvider>
  );
}

export default App;