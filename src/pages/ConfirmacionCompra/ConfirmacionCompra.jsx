import { useContext } from "react";
import { CarritoContext } from "../context/CarritoContext";
import { useNavigate } from "react-router-dom";

export const ConfirmacionCompra = () => {
  const { carrito, vaciarCarrito } = useContext(CarritoContext);
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));

  const generarBoleta = async () => {
    const detalles = carrito.map(p => ({
      producto: { id: p.id_producto }, // solo enviamos el ID
      cantidad: p.cantidad,
      precio_unitario: p.precio
    }));

    const medioPago = "Débito"; // puedes permitir que el usuario elija

    try {
      const res = await fetch("http://localhost:8080/api/boletas?idUsuario=" + usuario.id + "&medioPago=" + medioPago, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(detalles)
      });

      if (!res.ok) throw new Error("Error al generar boleta");

      const boleta = await res.json();
      alert("Compra realizada con éxito. Boleta #" + boleta.id_boleta);
      vaciarCarrito();
      navigate("/mis-compras");
    } catch (error) {
      console.error(error);
      alert("Hubo un problema al generar la boleta.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Confirmación de Compra</h2>
      <p>Total a pagar: ${carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0)}</p>
      <button className="btn btn-success" onClick={generarBoleta}>
        Confirmar y generar boleta
      </button>
    </div>
  );
};