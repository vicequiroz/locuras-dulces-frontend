import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { Navbar } from './Navbar'

// Mock de navigate para verificar redirección
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => vi.fn()
  }
})

describe('Navbar', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('muestra saludo de visitante por defecto', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    )
    expect(screen.getByText(/bienvenido, visitante/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /home/i })).toHaveAttribute('href', '/')
  })

  it('muestra saludo y botón de cerrar sesión si hay usuario', () => {
    localStorage.setItem('usuarioActivo', JSON.stringify({ nombre: 'Vicente', rol: 'CLIENTE' }))
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    )
    expect(screen.getByText(/hola, vicente/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /cerrar sesión/i })).toBeInTheDocument()
  })

  it('renderiza links de admin si rol es ADMIN', () => {
    localStorage.setItem('usuarioActivo', JSON.stringify({ nombre: 'Admin', rol: 'ADMIN' }))
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    )
    expect(screen.getByRole('link', { name: /inventario/i })).toHaveAttribute('href', '/inventario')
    expect(screen.getByRole('link', { name: /gestión de usuarios/i })).toHaveAttribute('href', '/gestion-usuarios')
  })

  it('renderiza links de cliente si rol es CLIENTE', () => {
    localStorage.setItem('usuarioActivo', JSON.stringify({ nombre: 'Cliente', rol: 'CLIENTE' }))
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    )
    expect(screen.getByRole('link', { name: /nuestros productos/i })).toHaveAttribute('href', '/nuestros-productos')
    expect(screen.getByRole('link', { name: /carrito/i })).toHaveAttribute('href', '/carrito')
  })

  it('cierra sesión al hacer click en el botón', async () => {
    const user = userEvent.setup()
    localStorage.setItem('usuarioActivo', JSON.stringify({ nombre: 'Vicente', rol: 'CLIENTE' }))
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    )
    const btn = screen.getByRole('button', { name: /cerrar sesión/i })
    await user.click(btn)
    expect(localStorage.getItem('usuarioActivo')).toBeNull()
  })
})