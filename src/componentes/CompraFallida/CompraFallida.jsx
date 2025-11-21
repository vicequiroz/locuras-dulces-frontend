import React from "react";
import { useNavigate } from "react-router-dom";

export const CompraFallida = () => {
  const navigate = useNavigate();

  return (
    <div className="container mt-5 text-center">
      <h2 className="text-danger mb-3">❌ No se pudo completar la compra</h2>
      <p className="mb-4">
        Hubo un problema al procesar tu pago o generar la boleta.
        <br />
        Inténtalo nuevamente en unos segundos.
      </p>

      <div className="d-flex justify-content-center gap-3">
        <button
          className="btn btn-danger"
          onClick={() => navigate("/carrito")}
        >
          Reintentar compra
        </button>

        <button
          className="btn btn-outline-secondary"
          onClick={() => navigate("/productos")}
        >
          Volver a la tienda
        </button>
      </div>
    </div>
  );
};
