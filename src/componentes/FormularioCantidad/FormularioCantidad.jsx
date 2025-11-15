import React from "react";

export const FormularioCantidad = ({ cantidad, setCantidad, stock }) => {
  const aumentar = () => {
    if (cantidad < stock) setCantidad(cantidad + 1);
  };

  const disminuir = () => {
    if (cantidad > 1) setCantidad(cantidad - 1);
  };

  return (
    <div className="d-flex align-items-center gap-2">
      <button className="btn btn-outline-secondary" onClick={disminuir}>-</button>
      <span>{cantidad}</span>
      <button className="btn btn-outline-secondary" onClick={aumentar}>+</button>
      <span className="text-muted ms-2">Stock disponible: {stock}</span>
    </div>
  );
};