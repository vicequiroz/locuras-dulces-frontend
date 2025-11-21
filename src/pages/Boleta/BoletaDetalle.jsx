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
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
  if (!boleta) return <p>No se encontró información de la boleta.</p>;

  const detalles = boleta.detalles ?? boleta.detallesBoleta ?? [];

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Detalle Boleta #{boleta.idBoleta}</h2>

      <div className="card p-3 shadow-sm mb-4">
        <p><strong>📅 Fecha:</strong> {boleta.fecha}</p>
        <p><strong>💳 Medio de pago:</strong> {boleta.medioPago}</p>
        <p><strong>🧾 IVA:</strong> ${boleta.iva?.toLocaleString("es-CL")}</p>
        <h4 className="fw-bold">💰 Total: ${boleta.total?.toLocaleString("es-CL")}</h4>
      </div>

      <h4>Productos comprados</h4>

      {detalles.length === 0 ? (
        <p>No hay detalles de productos.</p>
      ) : (
        <table className="table table-bordered mt-3">
          <thead className="table-light">
            <tr>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Precio unitario</th>
              <th>Subtotal</th>
            </tr>
          </thead>

          <tbody>
            {detalles.map((det, index) => {
              const nombreProd =
                det?.productoNombre ??
                det?.nombreProducto ??
                det?.producto?.nombre ??
                "Producto";

              const precio = det.precioUnitario ?? det.precio_unitario ?? 0;

              return (
                <tr key={index}>
                  <td>{nombreProd}</td>
                  <td>{det.cantidad}</td>
                  <td>${Number(precio).toLocaleString("es-CL")}</td>
                  <td>
                    $
                    {(Number(precio) * Number(det.cantidad)).toLocaleString(
                      "es-CL"
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      <button
        className="btn btn-secondary mt-3"
        onClick={() => window.history.back()}
      >
        Volver
      </button>
    </div>
  );
};

export default BoletaDetalle;
