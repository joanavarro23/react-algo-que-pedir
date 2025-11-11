import { MOCK_PEDIDOS } from "@/mocks/pedidosMocks"
import { useLocation, useParams } from 'react-router-dom'
import type { Pedido } from "@/pages/detalle-pedido/Pedido"
import { Box, Heading, Text, VStack } from '@chakra-ui/react'

export const PaginaDetallePedido = () => {

  const { id } = useParams()

  const location = useLocation()
  const pedidoDelState = location.state?.pedido as Pedido | undefined

  let pedido: Pedido | undefined = pedidoDelState

  if (pedidoDelState) {
    console.log("MODO NAVEGACIÓN RÁPIDA: Usando datos de location.state")
  } else {
    console.warn("MODO REFRESH (F5): 'location.state' está vacío. Simulando fetch...")
    pedido = MOCK_PEDIDOS.find(p => p.id === Number(id))
  } //Esto lo hizo la IA

  if (!pedido) {
    return (
      <VStack p={4} flex={1}>
        <Heading>Error</Heading>
        <Text>Pedido con ID "{id}" no encontrado.</Text>
      </VStack>
    )
  }

  return (
    <VStack p={4} flex={1} align="start" gap={4}>
      <Heading>Detalle del Pedido (ID: {pedido.id})</Heading>
      
      <Heading size="md" mt={4}>Datos del Pedido (JSON):</Heading>
      <Box as="pre" bg="gray.100" p={4} borderRadius="md" w="100%">
        {JSON.stringify(pedido, null, 2)}
      </Box>
    </VStack>
  )
}
