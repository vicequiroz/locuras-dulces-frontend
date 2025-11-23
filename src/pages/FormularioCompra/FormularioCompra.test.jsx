import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { CarritoProvider } from '../../context/CarritoContext'
import { FormularioCompra } from './FormularioCompra'

// Mock de navigate para verificar redirecciones
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => vi.fn()
  }
})

describe('FormularioCompra', () => {
  beforeEach(() => {
    localStorage.clear()
    global.fetch = vi.fn()
    vi.spyOn(window, 'alert').mockImplementation(() => {})
  })

  it('redirige a login si no hay usuario', async () => {
    const user = userEvent.setup()
    // carrito con producto pero sin usuario
    localStorage.setItem('carrito', JSON.stringify([{ id: 1, nombre: 'Producto', precio: 1000, cantidad: 1 }]))

    render(
      <MemoryRouter initialEntries={['/formulario-compra']}>
        <CarritoProvider>
          <FormularioCompra />
        </CarritoProvider>
      </MemoryRouter>
    )

    await user.click(screen.getByRole('button', { name: /pagar ahora/i }))
    expect(window.alert).toHaveBeenCalledWith(expect.stringMatching(/deb(es|e) iniciar sesión/i))
  })

  it('envía payload correcto con usuario y carrito', async () => {
    const user = userEvent.setup()
    localStorage.setItem('usuarioActivo', JSON.stringify({ id: 7, nombre: 'Cliente' }))
    localStorage.setItem('carrito', JSON.stringify([{ id: 5, nombre: 'Producto', precio: 1700, cantidad: 1 }]))

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ idBoleta: 123, total: 1700 })
    })

    render(
      <MemoryRouter initialEntries={['/formulario-compra']}>
        <CarritoProvider>
          <FormularioCompra />
        </CarritoProvider>
      </MemoryRouter>
    )

    await user.click(screen.getByRole('button', { name: /pagar ahora/i }))
    expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost:8080/api/boletas',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: expect.stringContaining('"idUsuario":7')
      })
    )
  })

  it('redirige a compra-fallida si fetch falla', async () => {
    const user = userEvent.setup()
    localStorage.setItem('usuarioActivo', JSON.stringify({ id: 7, nombre: 'Cliente' }))
    localStorage.setItem('carrito', JSON.stringify([{ id: 5, nombre: 'Producto', precio: 1700, cantidad: 1 }]))

    global.fetch.mockResolvedValueOnce({
      ok: false,
      text: async () => 'Error'
    })

    render(
      <MemoryRouter initialEntries={['/formulario-compra']}>
        <CarritoProvider>
          <FormularioCompra />
        </CarritoProvider>
      </MemoryRouter>
    )

    await user.click(screen.getByRole('button', { name: /pagar ahora/i }))
    expect(window.alert).toHaveBeenCalledWith(expect.stringMatching(/no se pudo completar la compra/i))
  })
})