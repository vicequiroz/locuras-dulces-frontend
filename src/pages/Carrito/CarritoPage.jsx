import { useContext } from "react";
import { CarritoContext } from "../context/CarritoContext";
import { useNavigate } from "react-router-dom";

export const CarritoPage = () => {
  const { carrito, eliminarDelCarrito, vaciarCarrito } = useContext(CarritoContext);
  const navigate = useNavigate();

  const total = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);

  return (
    <div className="container mt-5">
      <h2>Tu Carrito de Compras</h2>
      {carrito.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <>
          <table className="table">
            <thead>
              <tr>
                <th>Eliminar</th>
                <th>Producto</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {carrito.map((p, i) => (
                <tr key={i}>
                  <td><button onClick={() => eliminarDelCarrito(p.id_producto)}>✖</button></td>
                  <td>{p.nombre}</td>
                  <td>${p.precio}</td>
                  <td>{p.cantidad}</td>
                  <td>${p.precio * p.cantidad}</td>
                </tr>
              ))}
            </tbody>
          </table>
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