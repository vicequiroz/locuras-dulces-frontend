import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { CarritoContext } from "../context/CarritoContext";

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

  if (!producto) return <h2>Producto no encontrado 😢</h2>;

  return (
    <div className="detalle-producto">
      <img src={producto.foto} alt={producto.nombre} />
      <h2>{producto.nombre}</h2>
      <p>{producto.descripcion}</p>
      <h4>${producto.precio.toLocaleString()}</h4>

      <input
        type="number"
        value={cantidad}
        min={1}
        onChange={(e) => setCantidad(parseInt(e.target.value))}
      />

      <button onClick={() => agregarAlCarrito(producto, cantidad)}>
        Agregar al carrito
      </button>
    </div>
  );
};