import React from "react";
import { Navbar } from "../../componentes/Navbar/Navbar";
import { Footer } from "../../componentes/Footer/Footer";

export function Nosotros() {
  return (
    <>
      <Navbar />

      <div className="container mt-5">
        <h2 className="text-center mb-5 fw-bold display-5">¡Quiénes Somos!</h2>


        <div className="row align-items-center">
          <div className="col-md-6">
            <p className="fs-5 text-start">
              En <strong>Locuras Dulces</strong> creemos que cada momento especial merece un sabor único. Nacimos hace un año con la ilusión de endulzar la vida de nuestros clientes, y desde entonces, cada dulce que preparamos lleva dedicación, cariño y un toque de locura creativa.
            </p>
            <p className="fs-5 text-start">
              Ofrecemos una variedad de productos pensados para compartir, regalar o simplemente disfrutar: <em>snacks, galletas, dulces unitarios y sorpresas que cambian cada temporada</em>. Nuestro compromiso es entregar calidad y alegría en cada detalle.
            </p>
            <p className="fs-5 text-start">
              Porque para nosotros, lo dulce no es solo un antojo... <strong>¡es una experiencia que se celebra!</strong> 🎉🧁🍩
            </p>
          </div>

          <div className="col-md-6 text-center">
            <img
              src="/img/carrusel productos fruna.jpg"
              alt="Productos Locuras Dulces"
              className="img-fluid rounded shadow mb-3"
              style={{ maxWidth: '100%' }}
            />
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-md-4 text-center mb-3">
            <img
              src="/img/confiteria 3.jpeg"
              alt="Interior tienda Locuras Dulces"
              className="img-fluid rounded shadow"
              style={{ maxHeight: '300px', objectFit: 'cover' }}
            />
          </div>
          <div className="col-md-4 text-center mb-3">
            <img
              src="/img/confiteria1.jpeg"
              alt="Mostrador Locuras Dulces"
              className="img-fluid rounded shadow"
              style={{ maxHeight: '300px', objectFit: 'cover' }}
            />
          </div>
          <div className="col-md-4 text-center mb-3">
            <img
              src="/img/confiteria 2.jpeg"
              alt="Clientes felices"
              className="img-fluid rounded shadow"
              style={{ maxHeight: '300px', objectFit: 'cover' }}
            />
          </div>
        </div>

        <div className="text-center mt-5">
          <h4 className="mb-4">¿Por qué elegirnos?</h4>
          <div className="row justify-content-center">
            <div className="col-md-4 mb-3">
              <div className="p-4 border rounded bg-light h-100">
                <img src="/img/calidad.png" alt="Calidad" style={{ width: '50px' }} />
                <p className="mt-3 mb-0">
                  <strong>Calidad garantizada</strong><br />
                  Productos frescos y seleccionados con cariño
                </p>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="p-4 border rounded bg-light h-100">
                <img src="/img/atencion.png" alt="Cercanía" style={{ width: '50px' }} />
                <p className="mt-3 mb-0">
                  <strong>Atención cercana</strong><br />
                  Nos importa tu experiencia desde el primer saludo
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
