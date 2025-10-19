import { useEffect, useState } from "react";
import { Navbar } from "../../componentes/Navbar/Navbar";
import { Footer } from "../../componentes/Footer/Footer";

export function NuestrosProductos() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/productos") // Todos los productos
      .then((res) => res.json())
      .then((data) => setProductos(data))
      .catch((error) => console.error("Error al cargar productos:", error));
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      <section className="container mt-5 flex-grow-1">
        <h2 className="text-center mb-4">🍬 Nuestros Productos 🍬</h2>
        <div className="row g-4 justify-content-center">
          {productos.map((p) => (
            <div className="col-md-4 col-sm-6" key={p.id}>
              <div className="card h-100">
                <a href={`/detalleproducto/${p.id}`}>
                  <img
                    className="card-img-top"
                    src={p.foto}
                    alt={p.nombre}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                </a>
                <div className="card-body text-center">
                  <h5 className="card-title">
                    <a
                      href={`/detalleproducto/${p.id}`}
                      className="text-decoration-none text-dark"
                    >
                      {p.nombre}
                    </a>
                  </h5>
                  <p className="price">${p.precio.toLocaleString()}</p>
                  <p className="card-text">{p.descripcion}</p>
                  <button className="btn btn-outline-success btn-sm">
                    Agregar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
