import React from "react";

export const CompraFallida = ({ onRetry }) => {
  return (
    <div className="container mt-5 text-center">
      <h2 className="text-danger">❌ No se pudo completar la compra</h2>
      <p>Hubo un problema al generar la boleta. Esto puede deberse a un error de conexión o al backend.</p>
      <button className="btn btn-outline-danger mt-3" onClick={onRetry}>
        Reintentar pago
      </button>
    </div>
  );
};