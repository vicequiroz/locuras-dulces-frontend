import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React, { useContext } from 'react'
import { CarritoContext, CarritoProvider } from './CarritoContext'

function Dummy() {
  const { carrito, agregarAlCarrito, eliminarDelCarrito, vaciarCarrito } = useContext(CarritoContext)
  return (
    <div>
      <button onClick={() => agregarAlCarrito({ id: 1, nombre: 'Producto A', precio: 1000 }, 1)}>
        Agregar A
      </button>
      <button onClick={() => agregarAlCarrito({ id: 1, nombre: 'Producto A', precio: 1000 }, 2)}>
        Agregar A x2
      </button>
      <button onClick={() => eliminarDelCarrito(1)}>Eliminar A</button>
      <button onClick={vaciarCarrito}>Vaciar</button>
      <div data-testid="count">{carrito.find(p => p.id === 1)?.cantidad || 0}</div>
      <div data-testid="length">{carrito.length}</div>
    </div>
  )
}

describe('CarritoContext', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('agrega y acumula cantidades del mismo producto', async () => {
    const user = userEvent.setup()
    render(
      <CarritoProvider>
        <Dummy />
      </CarritoProvider>
    )
    await user.click(screen.getByText(/agregar a$/i))
    await user.click(screen.getByText(/agregar a x2/i))
    expect(screen.getByTestId('count')).toHaveTextContent('3')
  })

  it('elimina producto por id', async () => {
    const user = userEvent.setup()
    render(
      <CarritoProvider>
        <Dummy />
      </CarritoProvider>
    )
    await user.click(screen.getByText(/agregar a$/i))
    await user.click(screen.getByText(/eliminar a/i))
    expect(screen.getByTestId('count')).toHaveTextContent('0')
    expect(screen.getByTestId('length')).toHaveTextContent('0')
  })

  it('vacía el carrito', async () => {
    const user = userEvent.setup()
    render(
      <CarritoProvider>
        <Dummy />
      </CarritoProvider>
    )
    await user.click(screen.getByText(/agregar a$/i))
    await user.click(screen.getByText(/vaciar/i))
    expect(screen.getByTestId('length')).toHaveTextContent('0')
  })
})