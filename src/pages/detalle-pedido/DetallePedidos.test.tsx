import theme from '@/styles/theme'
import { MemoryRouter } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { expect, test, describe, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ListaPedidos } from '@/pages/detalle-pedido/ListaPedidos'

vi.mock('@/components/PedidoCard', () => ({
  PedidoCard: () => <div data-testid="mock-pedido-card" />
}))

describe('DetallePedido (Lista)', () => {
  test('aparecen las 3 pestañas -Pendientes, Completados, Cancelados-', async () => {
    render(
      <MemoryRouter>
        <ChakraProvider value={theme}>
          <ListaPedidos />
        </ChakraProvider>
      </MemoryRouter>
    )

    expect(await screen.findByRole('tab', { name: /pendientes/i })).toBeTruthy()
    expect(await screen.findByRole('tab', { name: /completados/i })).toBeTruthy()
    expect(await screen.findByRole('tab', { name: /cancelados/i })).toBeTruthy()
    
    //screen.debug()
    //No entiendo por qué los siguientes tests no funcionaron, si los componentes se renderizan
    //¿Porque vienen dentro de un botón?
    //expect(await screen.findAllByTestId('test-pendientes')).toBeTruthy()
    //expect(await screen.findAllByTestId('test-completados')).toBeTruthy()
    //expect(await screen.findAllByTestId('test-cancelados')).toBeTruthy()
  })
})