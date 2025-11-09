import { MOCK_PEDIDOS } from "@/mocks/pedidosMocks"
import { useLocation, useParams } from 'react-router-dom'
import { Box, Heading, Text, VStack } from '@chakra-ui/react'
import type { Pedido } from "@/pages/detalle-pedido/Pedido"

export const PaginaDetallePedido = () => {

  // A. Leemos el ID de la URL (para el caso de F5 o link directo)
  // ej: /detalle-pedido/1 -> id valdrá "1"
  const { id } = useParams()

  // B. Leemos el 'state' de la navegación (para el clic normal)
  const location = useLocation()
  const pedidoDelState = location.state?.pedido as Pedido | undefined

  // C. Decidimos qué datos usar
  let pedido: Pedido | undefined = pedidoDelState

  if (pedidoDelState) {
    // Caso 1: Navegación normal.
    // Usamos los datos pasados por 'state'. Es instantáneo.
    console.log("MODO NAVEGACIÓN RÁPIDA: Usando datos de location.state")
  } else {
    // Caso 2: El usuario refrescó (F5) o entró a la URL directo.
    // 'location.state' está vacío.
    // Simulamos un 'fetch' al backend usando el ID de la URL.
    console.warn("MODO REFRESH (F5): 'location.state' está vacío. Simulando fetch...")
    pedido = MOCK_PEDIDOS.find(p => p.id === Number(id))
  }

  if (!pedido) {
    return (
      <VStack p={4} flex={1}>
        <Heading>Error</Heading>
        <Text>Pedido con ID "{id}" no encontrado.</Text>
      </VStack>
    )
  }

  // E. Render SIN DISEÑO (como pediste)
  //    Solo mostramos los datos para probar que la lógica funciona.
  return (
    <VStack p={4} flex={1} align="start" gap={4}>
      <Heading>Detalle del Pedido (ID: {pedido.id})</Heading>
      
      <Text fontWeight="bold">
        Esta página es un placeholder y no tiene diseño.
      </Text>
      <Text>
        (Usará el componente reutilizable de Checkout más adelante).
      </Text>

      <Heading size="md" mt={4}>Datos del Pedido (JSON):</Heading>
      <Box as="pre" bg="gray.100" p={4} borderRadius="md" w="100%">
        {JSON.stringify(pedido, null, 2)}
      </Box>
    </VStack>
  )
}

// No olvides exportarlo si no lo hiciste con 'export const'
// export default PaginaDetallePedido