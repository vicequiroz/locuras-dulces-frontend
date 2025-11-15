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
      <h2>🧾 Historial de Compras</h2>
      {boletas.length === 0 ? (
        <p>No tienes compras registradas.</p>
      ) : (
        boletas.map(boleta => (
          <div key={boleta.id_boleta} className="card mb-3">
            <div className="card-body">
              <h5>Boleta #{boleta.id_boleta}</h5>
              <p>Fecha: {boleta.fecha}</p>
              <p>Total: ${boleta.total}</p>
              <p>IVA: ${boleta.iva}</p>
              <p>Medio de pago: {boleta.medioPago}</p>
              <button
                className="btn btn-outline-primary"
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