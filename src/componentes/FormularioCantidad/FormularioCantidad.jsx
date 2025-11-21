import React from "react";
import "./FormularioCantidad.css";

export const FormularioCantidad = ({ cantidad, setCantidad, stock }) => {
  const aumentar = () => {
    if (cantidad < stock) setCantidad(cantidad + 1);
  };

  const disminuir = () => {
    if (cantidad > 1) setCantidad(cantidad - 1);
  };

  return (
    <div className="cantidad-container">
      <button className="btn-cantidad" onClick={disminuir}>-</button>
      <span className="cantidad-numero">{cantidad}</span>
      <button className="btn-cantidad" onClick={aumentar}>+</button>
    </div>
  );
};
