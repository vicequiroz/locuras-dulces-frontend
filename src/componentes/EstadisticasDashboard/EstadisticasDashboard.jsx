import { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import "./EstadisticasDashboard.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

export const EstadisticasDashboard = () => {
  const [totalProductos, setTotalProductos] = useState(0);
  const [totalUsuarios, setTotalUsuarios] = useState(0);
  const [stockBajo, setStockBajo] = useState([]);
  const [boletas, setBoletas] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/productos/total")
      .then(res => res.json())
      .then(data => setTotalProductos(data));

    fetch("http://localhost:8080/api/usuarios/total")
      .then(res => res.json())
      .then(data => setTotalUsuarios(data));

    fetch("http://localhost:8080/api/productos/stock-bajo")
      .then(res => res.json())
      .then(data => setStockBajo(data));

    fetch("http://localhost:8080/api/boletas")
      .then(res => res.json())
      .then(data => setBoletas(data));
  }, []);

  const totalVendido = boletas.reduce((acc, b) => acc + b.total, 0);
  const medios = {};
  boletas.forEach(b => {
    medios[b.medioPago] = (medios[b.medioPago] || 0) + b.total;
  });

  const mediosLabels = Object.keys(medios);
  const mediosData = Object.values(medios);

  const chartBarData = {
    labels: ["Productos", "Usuarios", "Boletas"],
    datasets: [
      {
        label: "Totales del sistema",
        data: [totalProductos, totalUsuarios, boletas.length],
        backgroundColor: ["#36A2EB", "#FF6384", "#4BC0C0"],
      },
    ],
  };

  const chartPieData = {
    labels: mediosLabels,
    datasets: [
      {
        label: "Ventas por medio de pago",
        data: mediosData,
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
      },
    ],
  };

  return (
    <div className="estadisticas-dashboard container mt-5">
      <h2 className="text-center mb-4">📊 Estadísticas del sistema</h2>

      <div className="row text-center mb-4">
        <div className="col-md-3 mb-3">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5>🛒 Productos</h5>
              <p className="fw-bold">{totalProductos}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5>👥 Usuarios</h5>
              <p className="fw-bold">{totalUsuarios}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5>🧾 Boletas</h5>
              <p className="fw-bold">{boletas.length}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5>💰 Total vendido</h5>
              <p className="fw-bold text-success">${totalVendido.toLocaleString("es-CL")}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-5">
        <h4>📉 Stock bajo</h4>
        {stockBajo.length === 0 ? (
          <p className="text-muted">Todos los productos tienen stock suficiente.</p>
        ) : (
          <ul>
            {stockBajo.map(p => (
              <li key={p.id_producto}>
                {p.nombre} ({p.stock} unidades)
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="row">
        <div className="col-md-6 mb-4">
          <h5 className="text-center">📊 Totales del sistema</h5>
          <Bar data={chartBarData} />
        </div>
        <div className="col-md-6 mb-4">
          <h5 className="text-center">💳 Ventas por medio de pago</h5>
          <Pie data={chartPieData} />
        </div>
      </div>
    </div>
  );
};