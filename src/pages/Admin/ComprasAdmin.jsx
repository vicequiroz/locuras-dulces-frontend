import { useEffect, useState } from "react";

export const ComprasAdmin = () => {
  const [boletas, setBoletas] = useState([]);
  const [filtroCliente, setFiltroCliente] = useState("");
  const [filtroPago, setFiltroPago] = useState("");
  const [fechaDesde, setFechaDesde] = useState("");
  const [fechaHasta, setFechaHasta] = useState("");
  const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));

  useEffect(() => {
    if (usuario?.rol === "SUPER-ADMIN") {
      fetch("http://localhost:8080/api/boletas")
        .then(res => res.json())
        .then(data => setBoletas(data))
        .catch(err => console.error("Error al cargar boletas", err));
    }
  }, [usuario?.rol]);

  const filtrarBoletas = () => {
    return boletas.filter(b => {
      const nombreCompleto = `${b.cliente.nombre} ${b.cliente.apellido}`.toLowerCase();
      const fechaBoleta = new Date(b.fecha).toISOString().split("T")[0];

      return (
        (!filtroCliente || nombreCompleto.includes(filtroCliente.toLowerCase())) &&
        (!filtroPago || b.medioPago === filtroPago) &&
        (!fechaDesde || fechaBoleta >= fechaDesde) &&
        (!fechaHasta || fechaBoleta <= fechaHasta)
      );
    });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">📊 Compras Realizadas por Clientes</h2>

      <div className="row mb-4">
        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar cliente"
            value={filtroCliente}
            onChange={e => setFiltroCliente(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <select
            className="form-select"
            value={filtroPago}
            onChange={e => setFiltroPago(e.target.value)}
          >
            <option value="">Todos los medios</option>
            <option value="Débito">Débito</option>
            <option value="Crédito">Crédito</option>
            <option value="Transferencia">Transferencia</option>
          </select>
        </div>
        <div className="col-md-3">
          <input
            type="date"
            className="form-control"
            value={fechaDesde}
            onChange={e => setFechaDesde(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <input
            type="date"
            className="form-control"
            value={fechaHasta}
            onChange={e => setFechaHasta(e.target.value)}
          />
        </div>
      </div>

      {filtrarBoletas().length === 0 ? (
        <p className="text-center">No hay compras que coincidan con los filtros.</p>
      ) : (
        filtrarBoletas().map(boleta => (
          <div key={boleta.id_boleta} className="card mb-3 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Boleta #{boleta.id_boleta}</h5>
              <p className="mb-1">👤 Cliente: <strong>{boleta.cliente.nombre} {boleta.cliente.apellido}</strong></p>
              <p className="mb-1">📅 Fecha: {boleta.fecha}</p>
              <p className="mb-1">💳 Medio de pago: {boleta.medioPago}</p>
              <p className="mb-1 fw-bold">💰 Total: ${boleta.total.toLocaleString("es-CL")}</p>
              <button
                className="btn btn-outline-primary mt-2"
                onClick={() => window.location.href = `/boleta/${boleta.id_boleta}`}
              >
                Ver detalle
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};