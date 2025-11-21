import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BoletaDetalle = () => {
  const { id } = useParams();
  const [boleta, setBoleta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setError("ID de boleta no válido");
      setLoading(false);
      return;
    }

    const fetchBoleta = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/boletas/${id}`);

        if (!response.ok) {
          throw new Error("Boleta no encontrada");
        }

        const data = await response.json();
        console.log("Boleta detalle recibida:", data);
        setBoleta(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBoleta();
  }, [id]);

  if (loading) return <p>Cargando boleta...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!boleta) return <p>No se encontró información de la boleta.</p>;

  // Asegurar compatibilidad con diferentes nombres usados en backend
  const detalles = boleta.detalles ?? boleta.detallesBoleta ?? [];

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Detalle de Boleta #{boleta.idBoleta}</h2>

      {/* Información general */}
      <div className="card p-3 shadow-sm mb-4">
        <p><strong>📅 Fecha:</strong> {boleta.fecha}</p>
        <p><strong>💳 Medio de pago:</strong> {boleta.medioPago}</p>
        <p><strong>🧾 IVA:</strong> ${boleta.iva?.toLocaleString("es-CL")}</p>
        <h4 className="fw-bold">💰 Total: ${boleta.total?.toLocaleString("es-CL")}</h4>
      </div>

      {/* Tabla de productos */}
      <h4>Productos comprados</h4>

      {detalles.length === 0 ? (
        <p>No hay detalles registrados.</p>
      ) : (
        <table className="table table-bordered mt-3">
          <thead className="table-light">
            <tr>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Precio Unitario</th>
              <th>Subtotal</th>
            </tr>
          </thead>

          <tbody>
            {detalles.map((det) => {
              const nombreProducto =
                det.producto?.nombre ||
                det.productoNombre ||
                "Producto";

              const precioUnitario =
                det.precioUnitario ??
                det.precio_unitario ??
                0;

              const subtotal =
                det.subtotal ??
                precioUnitario * det.cantidad;

              return (
                <tr key={det.idDetalle ?? det.idProducto}>
                  <td>{nombreProducto}</td>
                  <td>{det.cantidad}</td>
                  <td>${Number(precioUnitario).toLocaleString("es-CL")}</td>
                  <td>${Number(subtotal).toLocaleString("es-CL")}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      <button className="btn btn-secondary mt-3" onClick={() => window.history.back()}>
        Volver
      </button>
    </div>
  );
};

export default BoletaDetalle;
