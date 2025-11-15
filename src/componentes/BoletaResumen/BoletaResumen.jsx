import React from "react";

export const BoletaResumen = ({ boleta }) => {
  const { id_boleta, fecha, total, totalAfecto, iva, medioPago, cliente, detalles } = boleta;

  return (
    <div className="container mt-5">
      <h2 className="text-success">✅ Compra realizada con éxito</h2>
      <p>Boleta N° <strong>{id_boleta}</strong></p>
      <p>Fecha: {fecha}</p>
      <p>Código orden: ORDER{id_boleta}</p>

      <h4 className="mt-4">👤 Información del cliente</h4>
      <ul>
        <li>Nombre: {cliente?.nombre}</li>
        <li>Apellido(s): {cliente?.apellido}</li>
        <li>Correo electrónico: {cliente?.email}</li>
      </ul>

      <h4 className="mt-4">📦 Productos comprados</h4>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {detalles.map((d, i) => (
            <tr key={i}>
              <td>{d.producto.nombre}</td>
              <td>${d.precio_unitario}</td>
              <td>{d.cantidad}</td>
              <td>${d.subtotal}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h4 className="mt-4">💳 Resumen de pago</h4>
      <ul>
        <li>Total afecto: ${totalAfecto}</li>
        <li>IVA (19%): ${iva}</li>
        <li><strong>Total pagado: ${total}</strong></li>
        <li>Medio de pago: {medioPago}</li>
      </ul>

      <button className="btn btn-primary mt-3" onClick={() => window.location.href = "/mis-compras"}>
        Ver historial de compras
      </button>
    </div>
  );
};