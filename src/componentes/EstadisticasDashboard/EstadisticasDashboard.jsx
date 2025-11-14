import { useEffect, useState } from "react";
import "./EstadisticasDashboard.css"; // puedes crear estilos aparte

export const EstadisticasDashboard = () => {
  const [totalProductos, setTotalProductos] = useState(0);
  const [totalUsuarios, setTotalUsuarios] = useState(0);
  const [stockBajo, setStockBajo] = useState([]);

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
  }, []);

  return (
    <div className="estadisticas-dashboard">
      <h2>📊 Estadísticas del sistema</h2>
      <div className="estadisticas-cards">
        <div className="card">
          <h3>🛒 Productos</h3>
          <p>{totalProductos}</p>
        </div>
        <div className="card">
          <h3>👥 Usuarios</h3>
          <p>{totalUsuarios}</p>
        </div>
        <div className="card">
          <h3>⚠️ Stock bajo</h3>
          <p>{stockBajo.length}</p>
          {stockBajo.length > 0 && (
            <ul>
              {stockBajo.map(p => (
                <li key={p.id_producto}>{p.nombre} ({p.stock} unidades)</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};