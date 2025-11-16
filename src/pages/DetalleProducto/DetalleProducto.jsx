import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { CarritoContext } from "../../context/CarritoContext";
import { FormularioCantidad } from "../../componentes/FormularioCantidad/FormularioCantidad";

export const DetalleProducto = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [confirmacion, setConfirmacion] = useState("");
  const { agregarAlCarrito } = useContext(CarritoContext);

  useEffect(() => {
    fetch(`http://localhost:8080/api/productos/${id}`)
      .then(res => res.json())
      .then(data => setProducto(data))
      .catch(err => console.error("Producto no encontrado", err));
  }, [id]);

  const handleAgregar = () => {
    agregarAlCarrito(producto, cantidad);
    const total = producto.precio * cantidad;
    setConfirmacion(`${cantidad} unidad(es) de ${producto.nombre} agregadas al carrito. Total: $${total.toLocaleString("es-CL")}`);
    setTimeout(() => setConfirmacion(""), 3000);
  };

  if (!producto) return <h2 className="mt-5 text-center">Producto no encontrado 😢</h2>;

  return (
    <div className="container mt-5">
      <div className="row justify-content-center align-items-center">
        <div className="col-md-5 text-center mb-4 mb-md-0">
          <img
            src={producto.foto || "https://via.placeholder.com/300"}
            alt={producto.nombre}
            className="img-fluid rounded"
            style={{ maxHeight: "300px" }}
          />
        </div>
        <div className="col-md-7">
          <h2 className="mb-3">{producto.nombre}</h2>
          <p className="mb-3">{producto.descripcion}</p>
          <h4 className="mb-4 text-success">${producto.precio.toLocaleString("es-CL")}</h4>

          <FormularioCantidad
            cantidad={cantidad}
            setCantidad={setCantidad}
            stock={producto.stock}
          />

          <button
            className="btn btn-success mt-3"
            onClick={handleAgregar}
            disabled={producto.stock === 0}
          >
            {producto.stock === 0 ? "Sin stock disponible" : "Agregar al carrito"}
          </button>

          {confirmacion && (
            <div className="mt-3 text-success fw-bold">{confirmacion}</div>
          )}
        </div>
      </div>
    </div>
  );
};