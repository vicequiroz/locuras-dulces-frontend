import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CarritoContext } from "../../context/CarritoContext";

export const ProductoCard = ({ producto }) => {
  const navigate = useNavigate();
  const { agregarAlCarrito } = useContext(CarritoContext);
  const [agregado, setAgregado] = useState(false);

  const verDetalle = () => {
    navigate(`/producto/${producto.id}`);
  };

  const handleAgregar = () => {
    agregarAlCarrito(producto, 1);
    setAgregado(true);
    setTimeout(() => setAgregado(false), 2000);
  };

  return (
    <div className="card h-100">
      <img
        src={producto.foto || "https://via.placeholder.com/150"}
        className="card-img-top"
        alt={producto.nombre}
        style={{ cursor: "pointer" }}
        onClick={verDetalle}
      />
      <div className="card-body text-center">
        <h5 className="card-title">{producto.nombre}</h5>
        <p className="price">${producto.precio.toLocaleString()}</p>
        <p className="card-text">{producto.descripcion}</p>
        <button
          className={`btn btn-sm ${agregado ? "btn-success" : "btn-outline-success"}`}
          onClick={handleAgregar}
        >
          {agregado ? "✔ Agregado" : "Agregar"}
        </button>
      </div>
    </div>
  );
};