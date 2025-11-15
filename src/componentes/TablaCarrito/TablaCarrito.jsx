import React from "react";

export const TablaCarrito = ({ carrito, eliminarDelCarrito }) => {
  const total = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);

  return (
    <div className="table-responsive mt-4">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {carrito.map((p, i) => (
            <tr key={i}>
              <td>{p.nombre}</td>
              <td>${p.precio}</td>
              <td>{p.cantidad}</td>
              <td>${p.precio * p.cantidad}</td>
              <td>
                <button className="btn btn-danger btn-sm" onClick={() => eliminarDelCarrito(p.id_producto)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3"><strong>Total</strong></td>
            <td colSpan="2"><strong>${total}</strong></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};