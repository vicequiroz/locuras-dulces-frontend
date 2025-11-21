import React from "react";
import { useNavigate } from "react-router-dom";

export const BoletaResumen = ({ boleta }) => {
  const navigate = useNavigate();

  const {
    idBoleta,
    fecha,
    total,
    totalAfecto,
    iva,
    medioPago,
    cliente,
    detalles
  } = boleta;

  return (
    <div className="container mt-5">
      <h2 className="text-success">✅ Compra realizada con éxito</h2>

      <p>
        Boleta N° <strong>{idBoleta}</strong>
      </p>
      <p>Fecha: {fecha}</p>
      <p>Código orden: ORDER{idBoleta}</p>

      {/* CLIENTE */}
      <h4 className="mt-4">👤 Información del cliente</h4>
      <ul>
        <li>Nombre: {cliente?.nombre}</li>
        <li>Apellido(s): {cliente?.apellido}</li>
        <li>Correo electrónico: {cliente?.email}</li>
      </ul>

      {/* PRODUCTOS */}
      <h4 className="mt-4">📦 Productos comprados</h4>

      <table className="table table-bordered align-middle text-center">
        <thead className="table-light">
          <tr>
            <th>Imagen</th>
            <th>Producto</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {detalles.map((d, i) => (
            <tr key={i}>
              <td>
                <img
                  src={d.productoFoto || "https://via.placeholder.com/80"}
                  alt={d.productoNombre}
                  style={{ width: "80px", height: "80px", objectFit: "cover" }}
                  className="rounded"
                />
              </td>
              <td>{d.productoNombre}</td>
              <td>${d.precioUnitario.toLocaleString("es-CL")}</td>
              <td>{d.cantidad}</td>
              <td>${d.subtotal.toLocaleString("es-CL")}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* RESUMEN */}
      <h4 className="mt-4">💳 Resumen de pago</h4>
      <ul>
        <li>Total afecto: ${totalAfecto.toLocaleString("es-CL")}</li>
        <li>IVA (19%): ${iva.toLocaleString("es-CL")}</li>
        <li>
          <strong>Total pagado: ${total.toLocaleString("es-CL")}</strong>
        </li>
        <li>Medio de pago: {medioPago}</li>
      </ul>

      <button
        className="btn btn-primary mt-3"
        onClick={() => navigate("/mis-compras")}
      >
        Ver historial de compras
      </button>
    </div>
  );
};
