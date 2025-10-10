export function Footer() {
  return (
    <footer className="footer mt-5">
      <div className="container">
        <div className="row text-center text-md-start">
          <div className="col-md-3 mb-4">
            <img src="/img/LOGO LOCURAS DULCES pequeño.png" alt="Logo" className="footer-logo mx-auto d-block" />
          </div>
          <div className="col-md-2 mb-4">
            <h6 className="footer-title">MENÚ</h6>
            <ul className="list-unstyled">
              <li><a href="/">Inicio</a></li>
              <li><a href="/productos">Tienda</a></li>
              <li><a href="/quienesSomos">Quiénes somos</a></li>
              <li><a href="/carrito">Carrito 🛒</a></li>
              <li><a href="/contacto">Contacto</a></li>
            </ul>
          </div>
          <div className="col-md-4 mb-4">
            <h6 className="footer-title">INFORMACIÓN TIENDA FÍSICA</h6>
            <p><strong>Horario:</strong><br />Lunes a sábado 11:00 a 19:00</p>
            <p>Dirección: Av. Hansel y Gretel #987, Maipú<br />Ref: Av. Las Brujas con Willy Wonka</p>
            <p>Contamos con estacionamiento público.</p>
          </div>
          <div className="col-md-3 mb-4">
            <h6 className="footer-title">CONTACTO</h6>
            <p>Atención WhatsApp:<br /><a href="https://wa.me/56989654321" target="_blank">+56 9 8765 4321</a><br />Lunes a viernes 11:00 a 18:00</p>
            <img src="/img/webpay.png" alt="WebPay" className="footer-img mb-2" />
          </div>
        </div>
        <div className="text-center mt-4">
          <p className="small mb-0">Copyright © 2025 <strong>Locuras Dulces</strong> | Powered by TechDesing</p>
        </div>
      </div>
    </footer>
  );
}