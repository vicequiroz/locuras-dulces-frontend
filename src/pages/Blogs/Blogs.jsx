import React from "react";
import { Navbar } from "../../componentes/Navbar/Navbar";
import { BotonesSesion } from "../../componentes/BotonesSesion/BotonesSesion";
import { Footer } from "../../componentes/Footer/Footer";

export function Blogs() {
  return (
    <>
      <Navbar />
      <BotonesSesion />

      <div className="container mt-5">
        <h2 className="text-center mb-5 fw-bold display-4">
          Casos Curiosos del Mundo Dulce
        </h2>

        {/* Caso 1: Tabletón Fruna */}
        <div className="row align-items-center mb-5">
          <div className="col-md-6">
            <h4>Tabletón Fruna: El "mejor error" chileno</h4>
            <p>
              <strong>Historia:</strong> Esta icónica golosina chilena nació de un accidente. 
              Un colegio hizo un pedido de galletas con sabor a naranja a la fábrica Fruna. 
              Sin embargo, por un error en la producción, las galletas terminaron con sabor a vainilla y fueron devueltas a la empresa.
            </p>
            <p>
              <strong>Dato curioso:</strong> En lugar de desechar el pedido, el dueño de Fruna tuvo una idea genial: bañar esas galletas de vainilla en chocolate. 
              El resultado fue el Tabletón, un producto que no solo se salvó del descarte, sino que se convirtió en un clásico de la infancia y en uno de los mayores éxitos accidentales de la marca.
            </p>
          </div>
          <div className="col-md-6 text-center">
            <img
              src="/img/tableton.webp"
              alt="Tabletón Fruna"
              className="img-blog"
            />
          </div>
        </div>

        {/* Caso 2: Chupa Chups */}
        <div className="row align-items-center mb-5">
          <div className="col-md-6">
            <h4>Chupa Chups: El chupete "coyac" español que conquistó el mundo</h4>
            <p>
              <strong>Historia:</strong> Fue inventada en 1958 por el español Enric Bernat. Su idea era simple pero genial: crear un caramelo en un palo para que los niños pudieran disfrutarlo sin ensuciarse las manos, un problema común en la época.
            </p>
            <p>
              <strong>Dato curioso:</strong> El logo icónico de la margarita no fue diseñado por un publicista, sino por el famoso pintor Salvador Dalí. En 1969, Bernat le pidió ayuda y en menos de una hora, Dalí dibujó el logo que conocemos hoy, sugiriendo además que se colocara en la parte superior del envoltorio para que fuera más visible y llamativo.
            </p>
          </div>
          <div className="col-md-6 text-center">
            <img
              src="/img/chupa%20chups.jpeg"
              alt="Logo Chupa Chups por Dalí"
              className="img-blog"
            />
          </div>
        </div>

        {/* Caso 3: El chocolate */}
        <div className="row align-items-center mb-5">
          <div className="col-md-6">
            <h4>El chocolate: De moneda a dulce placer</h4>
            <p>
              <strong>Historia:</strong> El chocolate tiene su origen en las antiguas civilizaciones de Mesoamérica, como los mayas y los aztecas. 
              Ellos consideraban el cacao "el alimento de los dioses" y lo consumían como una bebida amarga y especiada, muy diferente de la tableta dulce que conocemos hoy en día.
            </p>
            <p>
              <strong>Dato curioso:</strong> El cacao era tan valioso que se utilizaba como moneda de cambio. Los granos se usaban para comprar de todo, desde alimentos hasta esclavos. 
              Fueron los europeos quienes, al descubrirlo, le agregaron azúcar y lo popularizaron como el dulce irresistible que es hoy.
            </p>
          </div>
          <div className="col-md-6 text-center">
            <img
              src="/img/cacaomaya.jpg"
              alt="Cacao como moneda"
              className="img-blog"
            />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
