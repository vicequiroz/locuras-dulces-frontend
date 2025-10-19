import { useEffect, useState } from "react";

export function Destacados() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/productos/destacados")
      .then((res) => res.json())
      .then((data) => setProductos(data))
      .catch((error) => console.error("Error al cargar productos destacados:", error));
  }, []);

  return (
    <section className="container mt-5">
      <h2 className="text-center mb-4">✨ Productos Destacados ✨</h2>
      <div className="row justify-content-center" id="destacados-index">
        {productos.map((p) => (
          <div className="col-md-4 col-sm-6 mb-4" key={p.id}>

            <div className="card h-100">
              <a href={`/detalleproducto/${p.id}`}>
                <img className="card-img-top" src={p.foto} alt={p.nombre} />
              </a>
              <div className="card-body text-center">
                <h5 className="card-title">
                  <a href={`/detalleproducto/${p.id}`} className="text-decoration-none text-dark">
                    {p.nombre}
                  </a>
                </h5>
                <p className="price">${p.precio.toLocaleString()}</p>
                <p className="card-text">{p.descripcion}</p>
                <button className="btn btn-outline-success btn-sm">Agregar</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}