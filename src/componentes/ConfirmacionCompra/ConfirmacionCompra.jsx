import { useContext, useState } from "react";
import { CarritoContext } from "../../context/CarritoContext";
import { BoletaResumen } from "../../componentes/BoletaResumen/BoletaResumen";
import { CompraFallida } from "../../componentes/ConfirmacionCompra/CompraFallida";

export const ConfirmacionCompra = () => {
  const { carrito, vaciarCarrito } = useContext(CarritoContext);
  const [boletaGenerada, setBoletaGenerada] = useState(null);
  const [error, setError] = useState(false);

  const generarBoleta = async () => {
    setError(false);

    // 📌 Tomar usuario desde localStorage
    const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
    const idUsuario =
      usuarioActivo?.id ||
      usuarioActivo?.id_usuario ||
      usuarioActivo?.idUsuario;

    if (!idUsuario) {
      console.error("ID de usuario no encontrado", usuarioActivo);
      setError(true);
      return;
    }

    // 📌 Detalles que el backend espera
    const detalles = carrito.map((p) => ({
      idProducto: p.id_producto || p.id,
      cantidad: p.cantidad,
    }));

    const boletaRequest = {
      idUsuario,
      medioPago: "Débito",
      direccion: null,
      detalles,
    };

    try {
      const res = await fetch(
        "http://localhost:8080/api/boletas/generar",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(boletaRequest),
        }
      );

      if (!res.ok) throw new Error("Error al generar boleta");

      const boleta = await res.json();
      setBoletaGenerada(boleta);
      vaciarCarrito();
    } catch (err) {
      console.error("Error generando boleta:", err);
      setError(true);
    }
  };

  const total = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);

  return (
    <div className="container mt-5">
      {!boletaGenerada && !error && (
        <>
          <h2>Confirmación de Compra</h2>
          <p>
            Total a pagar:{" "}
            <strong>${total.toLocaleString("es-CL")}</strong>
          </p>
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
