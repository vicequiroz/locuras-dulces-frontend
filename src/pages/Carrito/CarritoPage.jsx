import { useContext } from "react";
import { CarritoContext } from "../../context/CarritoContext";
import { useNavigate } from "react-router-dom";
import { TablaCarrito } from "../../componentes/TablaCarrito/TablaCarrito";

export const CarritoPage = () => {
  const { carrito, eliminarDelCarrito, vaciarCarrito } = useContext(CarritoContext);
  const navigate = useNavigate();

  const total = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);

  return (
    <div className="container mt-5">
      <h2>🛒 Tu Carrito de Compras</h2>
      {carrito.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <>
          <TablaCarrito carrito={carrito} eliminarDelCarrito={eliminarDelCarrito} />
          <div className="text-end fw-bold">Total: ${total}</div>
          <div className="text-end mt-3">
            <button className="btn btn-warning me-2" onClick={vaciarCarrito}>Vaciar carrito</button>
            <button className="btn btn-success" onClick={() => navigate("/confirmacion")}>Finalizar compra</button>
          </div>
        </>
      )}
    </div>
  );
};