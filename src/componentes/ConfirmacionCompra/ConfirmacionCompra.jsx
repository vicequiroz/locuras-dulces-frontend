import { useContext, useState } from "react";
import { CarritoContext } from "../../context/CarritoContext";
import { BoletaResumen } from "../../componentes/BoletaResumen/BoletaResumen";
import { CompraFallida } from "../../componentes/ConfirmacionCompra/CompraFallida";

export const ConfirmacionCompra = () => {
  const { carrito, vaciarCarrito } = useContext(CarritoContext);
  const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
  const [boletaGenerada, setBoletaGenerada] = useState(null);
  const [error, setError] = useState(false);

  const generarBoleta = async () => {
    setError(false);

    const detalles = carrito.map(p => ({
      producto: { id: p.id_producto },
      cantidad: p.cantidad,
      precio_unitario: p.precio
    }));

    const medioPago = "Débito";

    try {
      const res = await fetch(`http://localhost:8080/api/boletas?idUsuario=${usuario.id}&medioPago=${medioPago}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(detalles)
      });

      if (!res.ok) throw new Error("Error al generar boleta");

      const boleta = await res.json();
      setBoletaGenerada(boleta);
      vaciarCarrito();
    } catch (error) {
      console.error(error);
      setError(true);
    }
  };

  const total = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);

  return (
    <div className="container mt-5">
      {!boletaGenerada && !error && (
        <>
          <h2>Confirmación de Compra</h2>
          <p>Total a pagar: <strong>${total.toLocaleString("es-CL")}</strong></p>
          <button
            className="btn btn-success"
            onClick={generarBoleta}
            disabled={carrito.length === 0}
          >
            Confirmar y generar boleta
          </button>
        </>
      )}

      {boletaGenerada && <BoletaResumen boleta={boletaGenerada} />}
      {error && <CompraFallida onRetry={generarBoleta} />}
    </div>
  );
};