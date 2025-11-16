import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { CarritoContext } from "../../context/CarritoContext";
import { FormularioCantidad } from "../../componentes/FormularioCantidad/FormularioCantidad";

export const DetalleProducto = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [confirmacion, setConfirmacion] = useState("");
  const [alertaStock, setAlertaStock] = useState("");
  const { carrito, agregarAlCarrito } = useContext(CarritoContext);

  // Cargar producto
  useEffect(() => {
    fetch(`http://localhost:8080/api/productos/${id}`)
      .then(res => res.json())
      .then(data => setProducto(data))
      .catch(err => console.error("Producto no encontrado", err));
  }, [id]);

  // Derivados del producto y carrito (si producto aún no está, usamos valores seguros)
  const enCarrito = producto ? carrito.find(p => p.id_producto === producto.id) : null;
  const cantidadEnCarrito = enCarrito?.cantidad || 0;
  const stockDisponible = producto ? producto.stock - cantidadEnCarrito : 0;

  // Alerta si el stock es bajo
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
      setConfirmacion(`Solo quedan ${stockDisponible} unidad(es) disponibles. Ajusta la cantidad antes de agregar.`);
      return;
    }

    agregarAlCarrito({ ...producto, id_producto: producto.id }, cantidad);
    const total = producto.precio * cantidad;
    setConfirmacion(`${cantidad} unidad(es) de ${producto.nombre} agregadas al carrito. Total: $${total.toLocaleString("es-CL")}`);
    setTimeout(() => setConfirmacion(""), 3000);
  };

  if (!producto) {
    return <h2 className="mt-5 text-center">Producto no encontrado 😢</h2>;
  }

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

          <p className="text-muted">Stock disponible: {stockDisponible}</p>
          {cantidadEnCarrito > 0 && (
            <p className="text-muted">Ya tienes {cantidadEnCarrito} unidad(es) en el carrito.</p>
          )}
          {alertaStock && (
            <div className="alert alert-warning py-2">{alertaStock}</div>
          )}

          <FormularioCantidad
            cantidad={cantidad}
            setCantidad={setCantidad}
            stock={stockDisponible}
          />

          <button
            className="btn btn-success mt-3"
            onClick={handleAgregar}
            disabled={stockDisponible === 0}
          >
            {stockDisponible === 0 ? "Sin stock disponible" : "Agregar al carrito"}
          </button>

          {confirmacion && (
            <div className="mt-3 text-success fw-bold">{confirmacion}</div>
          )}
        </div>
      </div>
    </div>
  );
};