import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export const BoletaDetalle = () => {
  const { id } = useParams();
  const [boleta, setBoleta] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8080/api/boletas/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Boleta no encontrada");
        return res.json();
      })
      .then(data => setBoleta(data))
      .catch(err => {
        console.error(err);
        setError(true);
      });
  }, [id]);

  if (error) {
    return <h2 className="text-center mt-5 text-danger">❌ Boleta no encontrada</h2>;
  }

  if (!boleta) {
    return <h2 className="text-center mt-5">Cargando boleta...</h2>;
  }

  const { id_boleta, fecha, total, totalAfecto, iva, medioPago, cliente, detalles } = boleta;

  return (
    <div className="container mt-5">
      <h2 className="text-success">🧾 Detalle de Boleta #{id_boleta}</h2>
      <p>Fecha: {fecha}</p>
      <p>Código orden: ORDER{id_boleta}</p>

      <h4 className="mt-4">👤 Cliente</h4>
      <ul>
        <li>Nombre: {cliente?.nombre}</li>
        <li>Apellido(s): {cliente?.apellido}</li>
        <li>Email: {cliente?.email}</li>
      </ul>

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
                  src={d.producto.foto || "https://via.placeholder.com/80"}
                  alt={d.producto.nombre}
                  style={{ width: "80px", height: "80px", objectFit: "cover" }}
                  className="rounded"
                />
              </td>
              <td>{d.producto.nombre}</td>
              <td>${d.precio_unitario.toLocaleString("es-CL")}</td>
              <td>{d.cantidad}</td>
              <td>${d.subtotal.toLocaleString("es-CL")}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h4 className="mt-4">💳 Resumen de pago</h4>
      <ul>
        <li>Total afecto: ${totalAfecto.toLocaleString("es-CL")}</li>
        <li>IVA (19%): ${iva.toLocaleString("es-CL")}</li>
        <li><strong>Total pagado: ${total.toLocaleString("es-CL")}</strong></li>
        <li>Medio de pago: {medioPago}</li>
      </ul>

      <button className="btn btn-outline-secondary mt-3" onClick={() => window.history.back()}>
        ← Volver al historial
      </button>
    </div>
  );
};