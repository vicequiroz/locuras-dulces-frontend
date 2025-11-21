import { useContext, useState, useMemo } from "react";
import { CarritoContext } from "../../context/CarritoContext";
import { regiones } from "../../utils/regiones";
import { useNavigate } from "react-router-dom";

export const FormularioCompra = () => {
  const { carrito, vaciarCarrito } = useContext(CarritoContext);
  const rawUsuario = JSON.parse(localStorage.getItem("usuarioActivo")) || {};
  const navigate = useNavigate();

  // Normalizamos id del usuario 
  const usuario = useMemo(() => {
    return {
      ...rawUsuario,
      idNormalized:
        rawUsuario?.id ??
        rawUsuario?.id_usuario ??
        rawUsuario?.idUsuario ??
        null,
    };
  }, [rawUsuario]);

  const [form, setForm] = useState({
    nombre: rawUsuario?.nombre || "",
    apellido: rawUsuario?.apellido || "",
    email: rawUsuario?.email || "",
    calle: rawUsuario?.calle || "",
    numero: rawUsuario?.numero || "",
    comuna: rawUsuario?.comuna || "",
    region: rawUsuario?.region || "",
    referencia: rawUsuario?.referencia || "",
    medioPago: "Débito",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "region" ? { comuna: "" } : {}),
    }));
  };

  const validateBeforeSend = () => {
    if (!carrito || carrito.length === 0) {
      alert("El carrito está vacío.");
      return false;
    }

    if (!usuario.idNormalized) {
      alert(
        "Debes iniciar sesión para finalizar la compra. Serás redirigido al login."
      );
      navigate("/login");
      return false;
    }

    return true;
  };

  const handleConfirmarCompra = async () => {
    if (!validateBeforeSend()) return;

    const detalles = carrito.map((p) => {
      const idProd = p?.id_producto ?? p?.id ?? p?.idProducto ?? null;
      return {
        idProducto: Number(idProd),
        cantidad: Number(p.cantidad ?? 1),
      };
    });

    const faltanIds = detalles.some((d) => !d.idProducto);
    if (faltanIds) {
      console.error("Algún producto del carrito no tiene id válido:", carrito);
      alert("Hay un producto en el carrito sin id. Revisa la consola.");
      return;
    }

    const payload = {
      idUsuario: usuario.idNormalized,
      medioPago: form.medioPago,
      direccion: {
        calle: form.calle || null,
        numero: form.numero || null,
        comuna: form.comuna || null,
        region: form.region || null,
        referencia: form.referencia || null,
      },
      detalles,
    };

    console.log("Payload boleta (enviando):", payload);

    try {
      const res = await fetch("http://localhost:8080/api/boletas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => null);
        console.error("Error response:", res.status, text);
        throw new Error("Error al generar boleta");
      }

      const boleta = await res.json();
      console.log("Boleta recibida:", boleta);

      // Tomamos el ID de forma segura, sin importar camelCase o snake_case
      const boletaId = boleta.idBoleta ?? boleta.id_boleta ?? boleta.id;
      if (!boletaId) {
        throw new Error("El ID de la boleta no está definido en la respuesta.");
      }

      vaciarCarrito();
      navigate(`/boleta/${boletaId}`);
    } catch (error) {
      alert(
        "No se pudo completar la compra. Revisa la consola para más detalles."
      );
      console.error(error);
      navigate("/compra-fallida");
    }
  };

  const handleCancelarCompra = () => {
    navigate("/compra-fallida");
  };

  const total = carrito.reduce(
    (acc, p) => acc + Number(p.precio ?? 0) * Number(p.cantidad ?? 1),
    0
  );

  const comunasDisponibles =
    regiones.find((r) => r.nombre === form.region)?.comunas || [];

  return (
    <div className="container mt-5">
      <h2>🧾 Carrito de compra</h2>
      <p>Completa la información para finalizar tu compra.</p>

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
                  style={{
                    width: "80px",
                    height: "80px",
                    objectFit: "cover",
                  }}
                  className="rounded"
                />
              </td>
              <td>{p.nombre}</td>
              <td>${Number(p.precio ?? 0).toLocaleString("es-CL")}</td>
              <td>{p.cantidad}</td>
              <td>
                $
                {(
                  Number(p.precio ?? 0) * Number(p.cantidad ?? 1)
                ).toLocaleString("es-CL")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* FORM CLIENTE */}
      <h4 className="mt-4">👤 Información del cliente</h4>
      <div className="row">
        <div className="col-md-6 mb-2">
          <input
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            className="form-control"
            placeholder="Nombre"
          />
        </div>
        <div className="col-md-6 mb-2">
          <input
            name="apellido"
            value={form.apellido}
            onChange={handleChange}
            className="form-control"
            placeholder="Apellido"
          />
        </div>
        <div className="col-md-12 mb-2">
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            className="form-control"
            placeholder="Email"
          />
        </div>
      </div>

      {/* DIRECCIÓN */}
      <h4 className="mt-4">📦 Dirección de entrega</h4>
      <div className="row">
        <div className="col-md-6 mb-2">
          <input
            name="calle"
            value={form.calle}
            onChange={handleChange}
            className="form-control"
            placeholder="Calle"
          />
        </div>
        <div className="col-md-2 mb-2">
          <input
            name="numero"
            value={form.numero}
            onChange={handleChange}
            className="form-control"
            placeholder="Número"
          />
        </div>
        <div className="col-md-4 mb-2">
          <select
            name="comuna"
            value={form.comuna}
            onChange={handleChange}
            className="form-select"
            disabled={!form.region}
          >
            <option value="">Seleccione una comuna</option>
            {comunasDisponibles.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-6 mb-2">
          <select
            name="region"
            value={form.region}
            onChange={handleChange}
            className="form-select"
          >
            <option value="">Seleccione una región</option>
            {regiones.map((r) => (
              <option key={r.nombre} value={r.nombre}>
                {r.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-6 mb-2">
          <input
            name="referencia"
            value={form.referencia}
            onChange={handleChange}
            className="form-control"
            placeholder="Referencia (opcional)"
          />
        </div>
      </div>

      {/* MEDIO DE PAGO */}
      <h4 className="mt-4">💳 Medio de pago</h4>
      <select
        name="medioPago"
        value={form.medioPago}
        onChange={handleChange}
        className="form-select mb-4"
      >
        <option>Débito</option>
        <option>Crédito</option>
        <option>Transferencia</option>
      </select>

      {/* BOTONES */}
      <div className="d-flex justify-content-end gap-3">
        <button className="btn btn-danger" onClick={handleCancelarCompra}>
          Cancelar compra
        </button>

        <button className="btn btn-success" onClick={handleConfirmarCompra}>
          Pagar ahora ${total.toLocaleString("es-CL")}
        </button>
      </div>
    </div>
  );
};
