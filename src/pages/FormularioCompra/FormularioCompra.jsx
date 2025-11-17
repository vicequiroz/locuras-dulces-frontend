import { useContext, useState } from "react";
import { CarritoContext } from "../../context/CarritoContext";
import { useNavigate } from "react-router-dom";

export const FormularioCompra = () => {
  const { carrito, vaciarCarrito } = useContext(CarritoContext);
  const usuario = JSON.parse(localStorage.getItem("usuarioActivo")) || {};
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: usuario.nombre || "",
    apellido: usuario.apellido || "",
    email: usuario.email || "",
    calle: "",
    numero: "",
    comuna: "",
    region: "Región Metropolitana",
    referencia: "",
    medioPago: "Débito"
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleConfirmarCompra = async () => {
    const detalles = carrito.map(p => ({
      producto: { id: p.id_producto },
      cantidad: p.cantidad,
      precio_unitario: p.precio
    }));

    const payload = {
      cliente: {
        id: usuario.id,
        nombre: form.nombre,
        apellido: form.apellido,
        email: form.email
      },
      direccion: {
        calle: form.calle,
        numero: form.numero,
        comuna: form.comuna,
        region: form.region,
        referencia: form.referencia
      },
      medioPago: form.medioPago,
      detalles
    };

    try {
      const res = await fetch("http://localhost:8080/api/boletas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error("Error al generar boleta");

      const boleta = await res.json();
      vaciarCarrito();
      navigate(`/boleta/${boleta.id_boleta}`);
    } catch (error) {
      alert("No se pudo completar la compra");
      console.error(error);
    }
  };

  const total = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);

  return (
    <div className="container mt-5">
      <h2>🧾 Carrito de compra</h2>
      <p>Completa la siguiente información para finalizar tu compra.</p>

      {/* 🛒 Tabla del carrito */}
      <table className="table table-bordered align-middle text-center mt-4">
        <thead className="table-light">
          <tr>
            <th>Imagen</th>
            <th>Producto</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {carrito.map((p, i) => (
            <tr key={i}>
              <td>
                <img
                  src={p.foto || "https://via.placeholder.com/80"}
                  alt={p.nombre}
                  style={{ width: "80px", height: "80px", objectFit: "cover" }}
                  className="rounded"
                />
              </td>
              <td>{p.nombre}</td>
              <td>${p.precio.toLocaleString("es-CL")}</td>
              <td>{p.cantidad}</td>
              <td>${(p.precio * p.cantidad).toLocaleString("es-CL")}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 👤 Información del cliente */}
      <h4 className="mt-4">👤 Información del cliente</h4>
      <div className="row">
        <div className="col-md-6 mb-2">
          <input name="nombre" value={form.nombre} onChange={handleChange} className="form-control" placeholder="Nombre" />
        </div>
        <div className="col-md-6 mb-2">
          <input name="apellido" value={form.apellido} onChange={handleChange} className="form-control" placeholder="Apellido" />
        </div>
        <div className="col-md-12 mb-2">
          <input name="email" value={form.email} onChange={handleChange} className="form-control" placeholder="Email" />
        </div>
      </div>

      {/* 📦 Dirección de entrega */}
      <h4 className="mt-4">📦 Dirección de entrega</h4>
      <div className="row">
        <div className="col-md-6 mb-2">
          <input name="calle" value={form.calle} onChange={handleChange} className="form-control" placeholder="Calle" />
        </div>
        <div className="col-md-2 mb-2">
          <input name="numero" value={form.numero} onChange={handleChange} className="form-control" placeholder="Número" />
        </div>
        <div className="col-md-4 mb-2">
          <input name="comuna" value={form.comuna} onChange={handleChange} className="form-control" placeholder="Comuna" />
        </div>
        <div className="col-md-6 mb-2">
          <select name="region" value={form.region} onChange={handleChange} className="form-select">
            <option>Región Metropolitana</option>
            <option>Valparaíso</option>
            <option>Biobío</option>
          </select>
        </div>
        <div className="col-md-6 mb-2">
          <input name="referencia" value={form.referencia} onChange={handleChange} className="form-control" placeholder="Referencia (opcional)" />
        </div>
      </div>

      {/* 💳 Medio de pago */}
      <h4 className="mt-4">💳 Medio de pago</h4>
      <select name="medioPago" value={form.medioPago} onChange={handleChange} className="form-select mb-4">
        <option>Débito</option>
        <option>Crédito</option>
        <option>Transferencia</option>
      </select>

      {/* ✅ Botón de pago */}
      <div className="text-end">
        <button className="btn btn-success" onClick={handleConfirmarCompra}>
          Pagar ahora ${total.toLocaleString("es-CL")}
        </button>
      </div>
    </div>
  );
};