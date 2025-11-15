import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { CarritoContext } from "../context/CarritoContext";
import { FormularioCantidad } from "../componentes/FormularioCantidad/FormularioCantidad";

export const DetalleProducto = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const { agregarAlCarrito } = useContext(CarritoContext);

  useEffect(() => {
    fetch(`http://localhost:8080/api/productos/${id}`)
      .then(res => res.json())
      .then(data => setProducto(data))
      .catch(err => console.error("Producto no encontrado", err));
  }, [id]);

  if (!producto) return <h2 className="mt-5 text-center">Producto no encontrado 😢</h2>;

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-5">
          <img
            src={producto.foto || "https://via.placeholder.com/300"}
            alt={producto.nombre}
            className="img-fluid rounded"
          />
        </div>
        <div className="col-md-7">
          <h2>{producto.nombre}</h2>
          <p>{producto.descripcion}</p>
          <h4 className="text-success">${producto.precio.toLocaleString()}</h4>

          <FormularioCantidad
            cantidad={cantidad}
            setCantidad={setCantidad}
            stock={producto.stock}
          />

          <button
            className="btn btn-primary mt-3"
            onClick={() => agregarAlCarrito(producto, cantidad)}
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
};