import React from "react";

export const TablaCarrito = ({ carrito, eliminarDelCarrito }) => {
  const total = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);

  return (
    <div className="table-responsive mt-4">
      <table className="table table-bordered align-middle text-center">
        <thead className="table-light">
          <tr>
            <th>Imagen</th>
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
              <td>
                <img
                  src={p.foto || "https://via.placeholder.com/80"}
                  alt={p.nombre}
                  style={{ width: "80px", height: "80px", objectFit: "cover" }}
                  className="rounded"
                />
              </td>
              <td>{p.nombre}</td>
              <td>${p.precio.toLocaleString("es-CL")}</td>
              <td>{p.cantidad}</td>
              <td>${(p.precio * p.cantidad).toLocaleString("es-CL")}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => eliminarDelCarrito(p.id_producto)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="4" className="text-end fw-bold">Total</td>
            <td colSpan="2" className="fw-bold">${total.toLocaleString("es-CL")}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};