export function Carrusel() {
  const imagenes = [
    { src: "/img/carruse portada locuras dulces.jpg", alt: "Locuras Dulces portada" },
    { src: "/img/carrusel ambrosoli.jpeg", alt: "Ambrosoli clásicos" },
    { src: "/img/carrusel evercrips productos.jpeg", alt: "Evercrips productos" },
    { src: "/img/carrusel recuerdo.png", alt: "Dulces del recuerdo" },
    { src: "/img/carrusel choconestle.webp", alt: "Choconestlé" },
  ];

  return (
    <div className="container-fluid px-0 mt-4 mb-4">
      <div id="carruselLocuras" className="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">
        <div className="carousel-indicators">
          {imagenes.map((_, i) => (
            <button
              key={i}
              type="button"
              data-bs-target="#carruselLocuras"
              data-bs-slide-to={i}
              className={i === 0 ? "active" : ""}
              aria-label={`Slide ${i + 1}`}
            ></button>
          ))}
        </div>

        <div className="carousel-inner">
          {imagenes.map((img, i) => (
            <div key={i} className={`carousel-item ${i === 0 ? "active" : ""}`}>
              <img
                src={img.src}
                alt={img.alt}
                className="d-block w-100 img-fluid"
                style={{ maxHeight: "500px", objectFit: "cover" }}
              />
            </div>
          ))}
        </div>

        <button className="carousel-control-prev" type="button" data-bs-target="#carruselLocuras" data-bs-slide="prev">
          <span className="carousel-control-prev-icon"></span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carruselLocuras" data-bs-slide="next">
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>
    </div>
  );
}