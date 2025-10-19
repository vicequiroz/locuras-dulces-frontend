import { useState } from "react";
import { Navbar } from "../../componentes/Navbar/Navbar";
import { Footer } from "../../componentes/Footer/Footer";
import "./Contacto.css";

export function Contacto() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    motivo: "",
    asunto: "",
    mensaje: "",
    politicas: false,
  });

  const [errores, setErrores] = useState({});
  const [alerta, setAlerta] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    validarCampo(name, value, type, checked);
  };

  const validarCampo = (name, value, type, checked) => {
    let error = "";

    switch (name) {
      case "nombre":
        if (!value || value.trim().length < 3) error = "Ingresa tu nombre (mín. 3 caracteres)";
        break;
      case "email":
        if (!value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          error = "Ingresa un correo válido";
        break;
      case "telefono":
        if (value && !/^\+569\d{8}$/.test(value))
          error = "Formato inválido, ej: +56912345678";
        break;
      case "motivo":
        if (!value) error = "Selecciona un motivo";
        break;
      case "asunto":
        if (!value || value.trim().length < 5) error = "Ingresa un asunto (mín. 5 caracteres)";
        break;
      case "mensaje":
        if (!value || value.trim().length < 10 || value.trim().length > 1000)
          error = "Debe tener entre 10 y 1000 caracteres";
        break;
      case "politicas":
        if (!checked) error = "Debes aceptar la política de privacidad";
        break;
      default:
        break;
    }

    setErrores((prev) => ({ ...prev, [name]: error }));
  };

  const validarFormulario = () => {
    let valido = true;
    Object.keys(formData).forEach((campo) => {
      validarCampo(campo, formData[campo], campo === "politicas" ? "checkbox" : "text", formData[campo]);
      if (errores[campo]) valido = false;
    });
    return valido;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlerta("");

    if (!validarFormulario()) return;

    try {
      const response = await fetch("http://localhost:8080/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        setAlerta("Error al enviar el mensaje");
        return;
      }

      const data = await response.json(); // objeto guardado con id y fecha
      console.log(data);

      setAlerta("Mensaje enviado correctamente");
      setFormData({
        nombre: "",
        email: "",
        telefono: "",
        motivo: "",
        asunto: "",
        mensaje: "",
        politicas: false,
      });
      setErrores({});
    } catch (err) {
      console.error(err);
      setAlerta("Error de conexión con el servidor");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container my-5">
        <h2 className="text-center mb-5">Formulario de Contacto</h2>
        <div className="card shadow-sm">
          <div className="card-header">Envíanos un mensaje</div>
          <div className="card-body">
            {alerta && <div className="alert alert-info">{alerta}</div>}

            <form onSubmit={handleSubmit} noValidate>
              <div className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="nombre" className="form-label">Nombre y apellido</label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    className={`form-control ${errores.nombre ? "is-invalid" : ""}`}
                    placeholder="Ej: Juan Pérez"
                    value={formData.nombre}
                    onChange={handleChange}
                  />
                  <div className="invalid-feedback">{errores.nombre}</div>
                </div>

                <div className="col-md-6">
                  <label htmlFor="email" className="form-label">Correo electrónico</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className={`form-control ${errores.email ? "is-invalid" : ""}`}
                    placeholder="tucorreo@dominio.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <div className="invalid-feedback">{errores.email}</div>
                </div>
              </div>

              <div className="row g-3 mt-1">
                <div className="col-md-6">
                  <label htmlFor="telefono" className="form-label">Teléfono (opcional)</label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    className={`form-control ${errores.telefono ? "is-invalid" : ""}`}
                    placeholder="+56912345678"
                    value={formData.telefono}
                    onChange={handleChange}
                  />
                  <div className="invalid-feedback">{errores.telefono}</div>
                </div>

                <div className="col-md-6">
                  <label htmlFor="motivo" className="form-label">Motivo de contacto</label>
                  <select
                    id="motivo"
                    name="motivo"
                    className={`form-select ${errores.motivo ? "is-invalid" : ""}`}
                    value={formData.motivo}
                    onChange={handleChange}
                  >
                    <option value="">Selecciona una opción</option>
                    <option>Producto y Stock</option>
                    <option>Estado de pedido</option>
                    <option>Ventas por mayor</option>
                    <option>Sugerencias y reclamos</option>
                    <option>Otro</option>
                  </select>
                  <div className="invalid-feedback">{errores.motivo}</div>
                </div>
              </div>

              <div className="mt-3">
                <label htmlFor="asunto" className="form-label">Asunto</label>
                <input
                  type="text"
                  id="asunto"
                  name="asunto"
                  className={`form-control ${errores.asunto ? "is-invalid" : ""}`}
                  placeholder="Escribe un asunto"
                  value={formData.asunto}
                  onChange={handleChange}
                />
                <div className="invalid-feedback">{errores.asunto}</div>
              </div>

              <div className="mt-3">
                <label htmlFor="mensaje" className="form-label">Mensaje</label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  className={`form-control ${errores.mensaje ? "is-invalid" : ""}`}
                  rows="5"
                  placeholder="Cuéntanos los detalles..."
                  value={formData.mensaje}
                  onChange={handleChange}
                />
                <div className="invalid-feedback">{errores.mensaje}</div>
              </div>

              <div className="form-check mt-3">
                <input
                  id="politicas"
                  name="politicas"
                  type="checkbox"
                  className={`form-check-input ${errores.politicas ? "is-invalid" : ""}`}
                  checked={formData.politicas}
                  onChange={handleChange}
                />
                <label htmlFor="politicas" className="form-check-label">
                  Acepto la Política de Privacidad.
                </label>
                <div className="invalid-feedback">{errores.politicas}</div>
              </div>

              <div className="d-flex justify-content-between align-items-center mt-4">
                <div className="d-flex gap-2">
                  <button className="btn btn-primary" type="submit">Enviar</button>
                  <button
                    className="btn btn-outline-secondary"
                    type="reset"
                    onClick={() => {
                      setFormData({
                        nombre: "",
                        email: "",
                        telefono: "",
                        motivo: "",
                        asunto: "",
                        mensaje: "",
                        politicas: false,
                      });
                      setErrores({});
                      setAlerta("");
                    }}
                  >
                    Limpiar
                  </button>
                </div>
              </div>
            </form>

          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
