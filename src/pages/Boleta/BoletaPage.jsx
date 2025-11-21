import { useEffect, useState } from "react";
import "./BoletaPage.css";

export const BoletaPage = () => {
  const [boletas, setBoletas] = useState([]);
  const rawUsuario = JSON.parse(localStorage.getItem("usuarioActivo")) || {};

  // Normalizamos ID del usuario
  const usuarioId =
    rawUsuario.id ??
    rawUsuario.id_usuario ??
    rawUsuario.idUsuario ??
    null;

  useEffect(() => {
    if (!usuarioId) return;

    fetch(`http://localhost:8080/api/boletas/cliente/${usuarioId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Boletas cargadas:", data);
        setBoletas(data);
      })
      .catch((err) => console.error("Error al cargar boletas", err));
  }, [usuarioId]);

  return (
    <div className="boleta-page-container">
      <h2 className="boleta-page-title">🧾 Historial de Compras</h2>

      {boletas.length === 0 ? (
        <p className="boleta-vacio">No tienes compras registradas.</p>
      ) : (
        <div className="boletas-list">
          {boletas.map((boleta) => (
            <div key={boleta.idBoleta} className="boleta-card">
              <div className="boleta-card-body">
                <h5 className="boleta-card-title">
                  Boleta #{boleta.idBoleta}
                </h5>

                <p>📅 Fecha: {boleta.fecha}</p>
                <p>💳 Medio de pago: {boleta.medioPago}</p>
                <p>🧾 IVA: ${boleta.iva?.toLocaleString("es-CL")}</p>

                <p className="boleta-total">
                  💰 Total: ${boleta.total?.toLocaleString("es-CL")}
                </p>

                <button
                  className="btn-detalle"
                  onClick={() =>
                    (window.location.href = `/boleta/${boleta.idBoleta}`)
                  }
                >
                  Ver detalle
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
