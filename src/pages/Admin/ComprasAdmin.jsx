import { useEffect, useState } from "react";

export const ComprasAdmin = () => {
  const [boletas, setBoletas] = useState([]);
  const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));

  useEffect(() => {
    if (usuario.rol === "SUPER-ADMIN") {
      fetch("http://localhost:8080/api/boletas")
        .then(res => res.json())
        .then(data => setBoletas(data))
        .catch(err => console.error("Error al cargar boletas", err));
    }
  }, [usuario.rol]);

  return (
    <div className="container mt-5">
      <h2>📊 Compras Realizadas por Clientes</h2>
      {boletas.length === 0 ? (
        <p>No hay compras registradas.</p>
      ) : (
        boletas.map(boleta => (
          <div key={boleta.id_boleta} className="card mb-3">
            <div className="card-body">
              <h5>Boleta #{boleta.id_boleta}</h5>
              <p>Cliente: {boleta.cliente.nombre} {boleta.cliente.apellido}</p>
              <p>Fecha: {boleta.fecha}</p>
              <p>Total: ${boleta.total}</p>
              <p>Medio de pago: {boleta.medioPago}</p>
              <button
                className="btn btn-outline-secondary"
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