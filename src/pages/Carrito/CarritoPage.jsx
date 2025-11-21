import { useContext } from "react";
import { CarritoContext } from "../../context/CarritoContext";
import { useNavigate } from "react-router-dom";
import { TablaCarrito } from "../../componentes/TablaCarrito/TablaCarrito";

export const CarritoPage = () => {
  const { carrito, eliminarDelCarrito, vaciarCarrito, setCarrito } = useContext(CarritoContext);
  const navigate = useNavigate();

  const total = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);

  const actualizarCantidad = (id, nuevaCantidad) => {
    if (nuevaCantidad < 1) return;

    const actualizado = carrito.map(p =>
      p.id_producto === id ? { ...p, cantidad: nuevaCantidad } : p
    );

    setCarrito(actualizado);
  };

  return (
    <div className="container mt-5">
      <h2>🛒 Tu Carrito de Compras</h2>

      {carrito.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <>
          <TablaCarrito
            carrito={carrito}
            eliminarDelCarrito={eliminarDelCarrito}
            actualizarCantidad={actualizarCantidad}
          />

          <div className="text-end fw-bold">
            Total: ${total}
          </div>

          <div className="text-end mt-3">
            <button 
              className="btn btn-warning me-2" 
              onClick={vaciarCarrito}
            >
              Vaciar carrito
            </button>

            <button 
              className="btn btn-success" 
              onClick={() => navigate("/formulario-compra")}
            >
              Finalizar compra
            </button>
          </div>
        </>
      )}
    </div>
  );
};
