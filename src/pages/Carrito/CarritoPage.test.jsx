import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { CarritoProvider } from '../../context/CarritoContext'
import { CarritoPage } from './CarritoPage'

// Mock de TablaCarrito para simplificar el test (no interfiere con navegación)
vi.mock('../../componentes/TablaCarrito/TablaCarrito', () => ({
  TablaCarrito: ({ carrito }) => (
    <div>
      {carrito.map((p) => (
        <div key={p.id}>
          {p.nombre} - Cantidad: {p.cantidad}
        </div>
      ))}
    </div>
  )
}))

describe('CarritoPage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('muestra mensaje de carrito vacío', () => {
    render(
      <MemoryRouter>
        <CarritoProvider>
          <CarritoPage />
        </CarritoProvider>
      </MemoryRouter>
    )
    expect(screen.getByText(/tu carrito está vacío/i)).toBeInTheDocument()
  })

  it('renderiza productos y muestra el total', () => {
    localStorage.setItem(
      'carrito',
      JSON.stringify([{ id: 1, nombre: 'Brownie', precio: 1000, cantidad: 2 }])
    )

    render(
      <MemoryRouter>
        <CarritoProvider>
          <CarritoPage />
        </CarritoProvider>
      </MemoryRouter>
    )

    expect(screen.getByText(/brownie/i)).toBeInTheDocument()
    expect(screen.getByText(/total: \$2000/i)).toBeInTheDocument()
  })

  it('vacía el carrito al hacer click en el botón', async () => {
    const user = userEvent.setup()
    localStorage.setItem(
      'carrito',
      JSON.stringify([{ id: 1, nombre: 'Brownie', precio: 1000, cantidad: 1 }])
    )

    render(
      <MemoryRouter>
        <CarritoProvider>
          <CarritoPage />
        </CarritoProvider>
      </MemoryRouter>
    )

    expect(screen.getByText(/brownie/i)).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /vaciar carrito/i }))
    expect(screen.getByText(/tu carrito está vacío/i)).toBeInTheDocument()
  })

  it('navega a formulario de compra al finalizar compra', async () => {
    const user = userEvent.setup()
    localStorage.setItem(
      'carrito',
      JSON.stringify([{ id: 1, nombre: 'Brownie', precio: 1000, cantidad: 1 }])
    )

    render(
      <MemoryRouter initialEntries={['/carrito']}>
        <Routes>
          <Route
            path="/carrito"
            element={
              <CarritoProvider>
                <CarritoPage />
              </CarritoProvider>
            }
          />
          <Route path="/formulario-compra" element={<h1>FormularioCompra</h1>} />
        </Routes>
      </MemoryRouter>
    )

    await user.click(screen.getByRole('button', { name: /finalizar compra/i }))
    // Verificamos por rol heading para mayor robustez
    expect(await screen.findByRole('heading', { name: /FormularioCompra/i })).toBeInTheDocument()
  })
})