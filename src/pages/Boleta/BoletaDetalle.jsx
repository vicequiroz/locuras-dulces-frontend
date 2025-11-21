import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./BoletaDetalle.css";

const BoletaDetalle = () => {
  const { id } = useParams();
  const [boleta, setBoleta] = useState(null);
  const [detallesConProducto, setDetallesConProducto] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBoleta = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/boletas/${id}`);
        if (!res.ok) throw new Error("Boleta no encontrada");

        const data = await res.json();
        setBoleta(data);

        const detalles = data.detalles ?? data.detallesBoleta ?? [];

        // ▸ Obtener detalles completos del producto
        const detallesExtendidos = await Promise.all(
          detalles.map(async (d) => {
            try {
              const productoRes = await fetch(
                `http://localhost:8080/api/productos/${d.idProducto}`
              );
              const producto = productoRes.ok
                ? await productoRes.json()
                : null;

              return { ...d, productoCompleto: producto };
            } catch {
              return { ...d, productoCompleto: null };
            }
          })
        );

        setDetallesConProducto(detallesExtendidos);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBoleta();
  }, [id]);

  if (loading) return <p className="cargando">Cargando boleta...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!boleta) return <p>No se encontró información de la boleta.</p>;

  return (
    <div className="boleta-container">
      <h2 className="titulo-boleta">
        🧾 Detalle de Boleta #{boleta.idBoleta}
      </h2>

      <div className="boleta-info card-elegante">
        <p><strong>📅 Fecha:</strong> {boleta.fecha}</p>
        <p><strong>💳 Medio de pago:</strong> {boleta.medioPago}</p>
        <p><strong>🧾 IVA:</strong> ${boleta.iva?.toLocaleString("es-CL")}</p>
        <h3 className="total-boleta">💰 Total: ${boleta.total?.toLocaleString("es-CL")}</h3>
      </div>

      <h3 className="subtitulo">🛒 Productos comprados</h3>

      {detallesConProducto.length === 0 ? (
        <p>No hay detalles registrados.</p>
      ) : (
        <div className="tabla-wrapper">
          <table className="tabla-productos">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio Unitario</th>
                <th>Subtotal</th>
              </tr>
            </thead>

            <tbody>
              {detallesConProducto.map((det) => {
                const producto = det.productoCompleto;

                return (
                  <tr key={det.idDetalle ?? det.idProducto}>
                    <td className="producto-col">
                      <img
                        src={producto?.foto || "https://via.placeholder.com/60"}
                        alt={producto?.nombre || "Producto"}
                        className="producto-img"
                      />
                      <span className="producto-nombre">
                        {producto?.nombre || det.productoNombre || "Producto"}
                      </span>
                    </td>

                    <td className="text-center">{det.cantidad}</td>

                    <td className="text-center">
                      ${Number(det.precioUnitario ?? 0).toLocaleString("es-CL")}
                    </td>

                    <td className="text-center subtotal">
                      ${Number(det.subtotal ?? det.precioUnitario * det.cantidad).toLocaleString("es-CL")}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <div className="btn-volver-wrapper">
        <button className="btn-volver" onClick={() => window.history.back()}>
          ← Volver
        </button>
      </div>
    </div>
  );
};

export default BoletaDetalle;
