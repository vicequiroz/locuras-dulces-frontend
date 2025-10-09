import { Navbar } from "../../componentes/Navbar/Navbar";

export function Home() {
  return (
    <div className="container">
      <Navbar />
      <h2 className="mt-4">Bienvenido a Locuras Dulces</h2>
      {/* Aquí puedes agregar el carrusel y productos destacados */}
    </div>
  );
}