import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import BoletaDetalle from './BoletaDetalle'

// Mock de useParams y useNavigate
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useParams: () => ({ id: '3' }),
    useNavigate: () => vi.fn()
  }
})

describe('BoletaDetalle', () => {
  beforeEach(() => {
    global.fetch = vi.fn()
  })

  it('muestra datos de boleta y productos', async () => {
    // Mock de fetch para boleta
    global.fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          idBoleta: 3,
          fecha: '2025-11-19',
          medioPago: 'Débito',
          iva: 271,
          total: 1700,
          detalles: [
            { idDetalle: 1, idProducto: 5, cantidad: 1, precioUnitario: 1700, subtotal: 1700 }
          ]
        })
      })
      // Mock de fetch para producto
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          id: 5,
          nombre: 'Torta Selva Negra',
          foto: 'https://via.placeholder.com/60'
        })
      })

    render(
      <MemoryRouter initialEntries={['/boleta/3']}>
        <Routes>
          <Route path="/boleta/:id" element={<BoletaDetalle />} />
        </Routes>
      </MemoryRouter>
    )

    // Espera que se renderice el título
    expect(await screen.findByText(/detalle de boleta #3/i)).toBeInTheDocument()

    // Verifica datos generales
    expect(screen.getByText(/débito/i)).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /total: \$1\.700/i })).toBeInTheDocument()

    // Verifica producto
    expect(screen.getByText(/torta selva negra/i)).toBeInTheDocument()

    // Busca solo las celdas de tabla con $1.700 (precio unitario y subtotal)
    const preciosTabla = screen.getAllByRole('cell', { name: /\$1\.700/ })
    expect(preciosTabla).toHaveLength(2)
  })

  it('muestra mensaje de error si la boleta no existe', async () => {
    global.fetch.mockResolvedValueOnce({ ok: false })

    render(
      <MemoryRouter initialEntries={['/boleta/99']}>
        <Routes>
          <Route path="/boleta/:id" element={<BoletaDetalle />} />
        </Routes>
      </MemoryRouter>
    )

    expect(await screen.findByText(/boleta no encontrada/i)).toBeInTheDocument()
  })
})