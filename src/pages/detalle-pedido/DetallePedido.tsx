import axios from 'axios'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { VStack, Spinner, Box, Heading, Text } from '@chakra-ui/react'
import { PedidoDetalle } from '@/components/pedido/DetallePedidoComponente'


const API_URL = 'http://localhost:9000/checkout-pedido'

export const PaginaDetallePedido = () => {
  const { id } = useParams()
  const [loading, setLoading] = useState(false)
  const [pedido, setPedido] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  if (!pedido && !loading && id) {
    setLoading(true)
    axios.get(`${API_URL}/${id}`)
      .then(res => setPedido(res.data))
      .catch(err => setError('Error al cargar el pedido'))
      .finally(() => setLoading(false))
  }

  if (loading) {
    return (
      <VStack p={4} flex={1}>
        <Spinner size="xl" />
        <Text>Cargando pedido...</Text>
      </VStack>
    )
  }

  if (error) {
    return (
      <VStack p={4} flex={1}>
        <Heading>Error</Heading>
        <Text>{error}</Text>
      </VStack>
    )
  }

  if (!pedido) {
    return (
      <VStack p={4} flex={1}>
        <Text>No se encontró el pedido con ID "{id}"</Text>
      </VStack>
    )
  }

  return (
    <PedidoDetalle
    restaurante={pedido.local.nombre}
    articulos={pedido.platosDelPedido}
    subtotal={pedido.costoSubtotalPedido}
    recargo={pedido.recargoMedioDePago}
    tarifaEntrega={pedido.tarifaEntrega}
    total={pedido.costoTotalPedido}
    mostrarFormaDePago={false}>
    </PedidoDetalle>
  )
}
