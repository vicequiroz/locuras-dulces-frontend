export function Carrusel() {
  return (
    <div className="container mt-4">
      <div id="demo" className="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">
        <div className="carousel-indicators">
          {[0, 1, 2, 3, 4].map((i) => (
            <button key={i} type="button" data-bs-target="#demo" data-bs-slide-to={i} className={i === 0 ? "active" : ""}></button>
          ))}
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="/img/carruse portada locuras dulces.jpg" alt="locuras dulces carrusel" className="d-block w-100 img-fluid" />
          </div>
          <div className="carousel-item">
            <img src="/img/carrusel ambrosoli.jpeg" alt="dulces del recuerdo" className="d-block w-100 img-fluid" />
          </div>
          <div className="carousel-item">
            <img src="/img/carrusel evercrips productos.jpeg" alt="dulces del recuerdo" className="d-block w-100 img-fluid" />
          </div>
          <div className="carousel-item">
            <img src="/img/carrusel recuerdo.png" alt="dulces del recuerdo" className="d-block w-100 img-fluid" />
          </div>
          <div className="carousel-item">
            <img src="/img/carrusel choconestle.webp" alt="dulces del recuerdo" className="d-block w-100 img-fluid" />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#demo" data-bs-slide="prev">
          <span className="carousel-control-prev-icon"></span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#demo" data-bs-slide="next">
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>
    </div>
  );
}