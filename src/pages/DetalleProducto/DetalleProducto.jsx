import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { CarritoContext } from "../../context/CarritoContext";
import { FormularioCantidad } from "../../componentes/FormularioCantidad/FormularioCantidad";
import "./DetalleProducto.css";

export const DetalleProducto = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [confirmacion, setConfirmacion] = useState("");
  const [alertaStock, setAlertaStock] = useState("");
  const { carrito, agregarAlCarrito } = useContext(CarritoContext);

  useEffect(() => {
    fetch(`http://localhost:8080/api/productos/${id}`)
      .then((res) => res.json())
      .then((data) => setProducto(data))
      .catch((err) => console.error("Producto no encontrado", err));
  }, [id]);

  const enCarrito = producto ? carrito.find((p) => p.id_producto === producto.id) : null;
  const cantidadEnCarrito = enCarrito?.cantidad || 0;
  const stockDisponible = producto ? producto.stock - cantidadEnCarrito : 0;

  useEffect(() => {
    if (stockDisponible <= 5 && stockDisponible > 0) {
      setAlertaStock(`⚠️ Quedan solo ${stockDisponible} unidad(es) disponibles.`);
    } else {
      setAlertaStock("");
    }
  }, [stockDisponible]);

  const handleAgregar = () => {
    if (!producto) return;

    if (cantidad > stockDisponible) {
      setConfirmacion(
        `Solo quedan ${stockDisponible} unidades disponibles. Ajusta la cantidad antes de agregar.`
      );
      return;
    }

    agregarAlCarrito({ ...producto, id_producto: producto.id }, cantidad);
    const total = producto.precio * cantidad;
    setConfirmacion(
      `${cantidad} unidad(es) de ${producto.nombre} agregadas al carrito. Total: $${total.toLocaleString(
        "es-CL"
      )}`
    );
    setTimeout(() => setConfirmacion(""), 3000);
  };

  if (!producto) {
    return <h2 className="mt-5 text-center">Producto no encontrado 😢</h2>;
  }

  return (
    <div className="detalle-producto-container">
      <div className="detalle-producto-card">
        <div className="detalle-producto-img-wrapper">
          <img
            src={producto.foto || "https://via.placeholder.com/300"}
            alt={producto.nombre}
            className="detalle-producto-img"
          />
        </div>

        <div className="detalle-producto-info">
          <h2>{producto.nombre}</h2>
          <p className="descripcion">{producto.descripcion}</p>
          <h4 className="precio">${producto.precio.toLocaleString("es-CL")}</h4>

          <p className="stock-info">Stock disponible: {stockDisponible}</p>
          {cantidadEnCarrito > 0 && (
            <p className="en-carrito">Ya tienes {cantidadEnCarrito} en el carrito.</p>
          )}
          {alertaStock && <div className="alerta-stock">{alertaStock}</div>}

          <FormularioCantidad
            cantidad={cantidad}
            setCantidad={setCantidad}
            stock={stockDisponible}
          />

          <button
            className="btn-agregar"
            onClick={handleAgregar}
            disabled={stockDisponible === 0}
          >
            {stockDisponible === 0 ? "Sin stock disponible" : "Agregar al carrito"}
          </button>

          <button className="btn-carrito" onClick={() => (window.location.href = "/carrito")}>
            Ir al carrito 🛒
          </button>

          {confirmacion && <div className="mensaje-confirmacion">{confirmacion}</div>}
        </div>
      </div>
    </div>
  );
};
