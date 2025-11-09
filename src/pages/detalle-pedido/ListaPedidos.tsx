import { useState } from "react"
import type { Pedido } from "./Pedido"
import { Tabs, VStack } from "@chakra-ui/react" 
import { MOCK_PEDIDOS } from "@/mocks/pedidosMocks"
import { PedidoCard } from "../../components/pedido/PedidoCard"
import { LuFolder, LuSquareCheck, LuUser } from "react-icons/lu"

export const DetallePedido = () => {
  
  const [pedidos, setPedidos] = useState<Pedido[]>(MOCK_PEDIDOS)

  const pedidosPendientes = pedidos.filter(p => p.estadoDelPedido === 'PENDIENTE')
  const pedidosCompletados = pedidos.filter(p => p.estadoDelPedido === 'ENTREGADO')
  const pedidosCancelados = pedidos.filter(p => p.estadoDelPedido === 'CANCELADO')

  const cancelarPedido = (id: number) => {
      setPedidos(currentPedidos =>
        currentPedidos.map(p =>
          p.id === id ? { ...p, estadoDelPedido: 'CANCELADO' } : p
        )
      )
    }
  
return (
    <VStack w="100%" maxW="container.md" mx="auto" p={4} gap={4}>
      
      <Tabs.Root defaultValue="pendientes" variant="line" w="100%">
        <Tabs.List>

          <Tabs.Trigger value="pendientes"><LuUser /> Pendientes</Tabs.Trigger>
          <Tabs.Trigger value="completados"><LuFolder /> Completados</Tabs.Trigger>
          <Tabs.Trigger value="cancelados"><LuSquareCheck /> Cancelados</Tabs.Trigger>
        </Tabs.List>
        
        <Tabs.Content value="pendientes">
          <VStack gap={4} mt={4} align="stretch">
            {pedidosPendientes.length > 0 ? (
              pedidosPendientes.map(pedido => (
                <PedidoCard 
                  key={pedido.id}
                  order={pedido}
                  onCancel={cancelarPedido}
                />
              ))
            ) : (
              "No tienes pedidos pendientes"
            )}
          </VStack>
        </Tabs.Content>

        <Tabs.Content value="completados">
          <VStack gap={4} mt={4} align="stretch">
            {pedidosCompletados.length > 0 ? (
              pedidosCompletados.map(pedido => (
                <PedidoCard 
                  key={pedido.id}
                  order={pedido}
                  onCancel={cancelarPedido}
                />
              ))
            ) : (
              "No tienes pedidos completados"
            )}
          </VStack>
        </Tabs.Content>
        
        <Tabs.Content value="cancelados">
          <VStack gap={4} mt={4} align="stretch">
            {pedidosCancelados.length > 0 ? (
              pedidosCancelados.map(pedido => (
                <PedidoCard 
                  key={pedido.id}
                  order={pedido}
                  onCancel={cancelarPedido}
                />
              ))
            ) : (
              "No tienes pedidos completados"
            )}
          </VStack>
        </Tabs.Content>
      </Tabs.Root>

    </VStack>
  )
}