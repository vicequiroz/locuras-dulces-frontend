import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ComprasAdmin.css";

export const ComprasAdmin = () => {
  const [boletas, setBoletas] = useState([]);
  const [filtroCliente, setFiltroCliente] = useState("");
  const [filtroPago, setFiltroPago] = useState("");
  const [fechaDesde, setFechaDesde] = useState("");
  const [fechaHasta, setFechaHasta] = useState("");

  const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
  const navigate = useNavigate();

  // Normaliza boleta y cliente para soportar snake_case / camelCase
  const normalizeBoleta = (b) => {
    const idBoleta = b.idBoleta ?? b.id_boleta ?? b.id ?? null;
    const medioPago = b.medioPago ?? b.medio_pago ?? "";
    const total = b.total ?? 0;
    const fecha = b.fecha ?? b.fecha_emision ?? b.createdAt ?? null;

    const clienteRaw = b.cliente ?? b.usuario ?? b.user ?? {};
    const clienteNombre =
      clienteRaw?.nombre ??
      clienteRaw?.first_name ??
      clienteRaw?.nombre_cliente ??
      "";
    const clienteApellido =
      clienteRaw?.apellido ??
      clienteRaw?.last_name ??
      clienteRaw?.apellido_cliente ??
      "";

    return {
      idBoleta,
      medioPago,
      total,
      fecha,
      cliente: {
        nombre: clienteNombre,
        apellido: clienteApellido,
      },
    };
  };

  useEffect(() => {
    if (usuario?.rol === "SUPER-ADMIN") {
      fetch("http://localhost:8080/api/boletas")
        .then((res) => {
          if (!res.ok) throw new Error("Error al cargar boletas");
          return res.json();
        })
        .then((data) => {
          const normalizadas = Array.isArray(data)
            ? data.map(normalizeBoleta)
            : [];
          setBoletas(normalizadas);
        })
        .catch((err) => console.error("Error al cargar boletas", err));
    }
  }, [usuario?.rol]);

  // Filtrado robusto (ignora mayúsculas/minúsculas y soporta rangos de fecha)
  const listaFiltrada = useMemo(() => {
    const clienteQuery = filtroCliente.trim().toLowerCase();
    const pagoQuery = filtroPago.trim().toLowerCase();

    return boletas.filter((b) => {
      const nombreCompleto = `${b.cliente?.nombre || ""} ${b.cliente?.apellido || ""}`.trim().toLowerCase();

      // Fecha boleta en formato YYYY-MM-DD para comparación lexicográfica fiable
      const fechaBoletaISO = b.fecha
        ? new Date(b.fecha).toISOString().slice(0, 10)
        : "";

      const matchCliente = !clienteQuery || nombreCompleto.includes(clienteQuery);
      const matchPago = !pagoQuery || (b.medioPago || "").toLowerCase() === pagoQuery;
      const matchDesde = !fechaDesde || (fechaBoletaISO && fechaBoletaISO >= fechaDesde);
      const matchHasta = !fechaHasta || (fechaBoletaISO && fechaBoletaISO <= fechaHasta);

      return matchCliente && matchPago && matchDesde && matchHasta;
    });
  }, [boletas, filtroCliente, filtroPago, fechaDesde, fechaHasta]);

  // Fallback visual para cliente
  const formatCliente = (c) => {
    const nombre = (c?.nombre || "").trim();
    const apellido = (c?.apellido || "").trim();
    const full = `${nombre} ${apellido}`.trim();
    return full || "Sin nombre";
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">📊 Compras realizadas por clientes</h2>

      {/* FILTROS */}
      <div className="row mb-4">
        <div className="col-md-3">
          <label htmlFor="filtroCliente" className="form-label">Cliente</label>
          <input
            id="filtroCliente"
            type="text"
            className="form-control"
            placeholder="Buscar cliente..."
            value={filtroCliente}
            onChange={(e) => setFiltroCliente(e.target.value)}
          />
        </div>

        <div className="col-md-3">
          <label htmlFor="filtroPago" className="form-label">Medio de pago</label>
          <select
            id="filtroPago"
            className="form-select"
            value={filtroPago}
            onChange={(e) => setFiltroPago(e.target.value)}
          >
            <option value="">Todos los medios</option>
            <option value="Débito">Débito</option>
            <option value="Crédito">Crédito</option>
            <option value="Transferencia">Transferencia</option>
          </select>
        </div>

        <div className="col-md-3">
          <label htmlFor="fechaDesde" className="form-label">Desde</label>
          <input
            id="fechaDesde"
            type="date"
            className="form-control"
            value={fechaDesde}
            onChange={(e) => setFechaDesde(e.target.value)}
          />
        </div>

        <div className="col-md-3">
          <label htmlFor="fechaHasta" className="form-label">Hasta</label>
          <input
            id="fechaHasta"
            type="date"
            className="form-control"
            value={fechaHasta}
            onChange={(e) => setFechaHasta(e.target.value)}
          />
        </div>
      </div>

      {/* RESULTADOS */}
      {listaFiltrada.length === 0 ? (
        <p className="text-center">No hay compras que coincidan con los filtros.</p>
      ) : (
        listaFiltrada.map((b) => (
          <div key={b.idBoleta ?? Math.random()} className="card mb-3 shadow-sm">
            <div className="card-body d-flex flex-column flex-md-row justify-content-between align-items-start gap-3">
              <div>
                <h5 className="card-title mb-2">Boleta #{b.idBoleta ?? "—"}</h5>

                <p className="mb-1">
                  👤 <strong>Cliente:</strong> {formatCliente(b.cliente)}
                </p>

                <p className="mb-1">
                  📅 <strong>Fecha:</strong>{" "}
                  {b.fecha
                    ? new Date(b.fecha).toLocaleDateString("es-CL")
                    : "—"}
                </p>

                <p className="mb-1">
                  💳 <strong>Medio de pago:</strong> {b.medioPago || "—"}
                </p>
              </div>

              <div className="text-md-end">
                <p className="mb-1 fw-bold">
                  💰 Total: ${Number(b.total || 0).toLocaleString("es-CL")}
                </p>
                <button
                  className="btn btn-outline-primary mt-2"
                  onClick={() => navigate(`/boleta/${b.idBoleta}`)}
                >
                  Ver detalle
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};