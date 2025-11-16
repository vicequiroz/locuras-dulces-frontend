import { useEffect, useState } from "react";
import { ProductoCard } from "../ProductoCard/ProductoCard";

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
      <div className="row justify-content-center">
        {productos.map((p) => (
          <div className="col-md-4 col-sm-6 mb-4" key={p.id}>
            <ProductoCard producto={p} />
          </div>
        ))}
      </div>
    </section>
  );
}