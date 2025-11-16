import { useEffect, useState } from "react";

export const BoletaPage = () => {
  const [boletas, setBoletas] = useState([]);
  const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));

  useEffect(() => {
    fetch(`http://localhost:8080/api/boletas/cliente/${usuario.id}`)
      .then(res => res.json())
      .then(data => setBoletas(data))
      .catch(err => console.error("Error al cargar boletas", err));
  }, [usuario.id]);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">🧾 Historial de Compras</h2>

      {boletas.length === 0 ? (
        <p className="text-center">No tienes compras registradas.</p>
      ) : (
        boletas.map(boleta => (
          <div key={boleta.id_boleta} className="card mb-3 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Boleta #{boleta.id_boleta}</h5>
              <p className="mb-1">📅 Fecha: {boleta.fecha}</p>
              <p className="mb-1">💳 Medio de pago: {boleta.medioPago}</p>
              <p className="mb-1">🧾 IVA: ${boleta.iva.toLocaleString("es-CL")}</p>
              <p className="mb-1 fw-bold">💰 Total: ${boleta.total.toLocaleString("es-CL")}</p>
              <button
                className="btn btn-outline-primary mt-2"
                onClick={() => window.location.href = `/boleta/${boleta.id_boleta}`}
              >
                Ver detalle
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};