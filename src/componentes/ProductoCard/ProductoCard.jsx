import React from "react";
import { useNavigate } from "react-router-dom";

export const ProductoCard = ({ producto }) => {
  const navigate = useNavigate();

  const verDetalle = () => {
    navigate(`/producto/${producto.id}`);
  };

  return (
    <div className="card m-2" style={{ width: "18rem" }}>
      <img
        src={producto.foto || "https://via.placeholder.com/150"}
        className="card-img-top"
        alt={producto.nombre}
      />
      <div className="card-body">
        <h5 className="card-title">{producto.nombre}</h5>
        <p className="card-text">{producto.descripcion}</p>
        <p className="card-text"><strong>${producto.precio}</strong></p>
        <button className="btn btn-primary" onClick={verDetalle}>
          Ver detalle
        </button>
      </div>
    </div>
  );
};