import { useEffect, useState } from "react";
import { Navbar } from "../../componentes/Navbar/Navbar";
import { BotonesSesion } from "../../componentes/BotonesSesion/BotonesSesion";
import { Footer } from "../../componentes/Footer/Footer";
import { ProductoCard } from "../../componentes/ProductoCard/ProductoCard";

export function NuestrosProductos() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);

  // Cargar productos
  useEffect(() => {
    fetch("http://localhost:8080/api/productos")
      .then((res) => res.json())
      .then((data) => setProductos(data))
      .catch((error) => console.error("Error al cargar productos:", error));
  }, []);

  // Cargar categorías dinámicamente
  useEffect(() => {
    fetch("http://localhost:8080/api/categorias")
      .then((res) => res.json())
      .then((data) => setCategorias(data.map(c => c.nombre)))
      .catch((error) => console.error("Error al cargar categorías:", error));
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <BotonesSesion />

      <section className="container mt-5 flex-grow-1">
        <h2 className="text-center mb-5">🍬 Nuestros Productos 🍬</h2>

        {categorias.map((cat) => {
          const filtrados = productos.filter(
            (p) => p.categoria?.nombre === cat
          );

          return (
            <div key={cat} className="mb-5">
              <h3 className="text-center text-decoration-underline mb-4">{cat}</h3>
              <div className="row justify-content-center g-4">
                {filtrados.length > 0 ? (
                  filtrados.map((p) => (
                    <div className="col-md-4 col-sm-6 d-flex" key={p.id}>
                      <ProductoCard producto={p} />
                    </div>
                  ))
                ) : (
                  <p className="text-center text-muted">No hay productos en esta categoría.</p>
                )}
              </div>
            </div>
          );
        })}
      </section>

      <Footer />
    </div>
  );
}