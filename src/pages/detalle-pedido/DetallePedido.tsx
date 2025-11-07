import { Tabs, VStack } from "@chakra-ui/react" 
import { PedidoCard } from "../../components/pedido/PedidoCard"
import { LuFolder, LuSquareCheck, LuUser } from "react-icons/lu"

export const DetallePedido = () => {
  
  return (
    <VStack w="100%" maxW="container.md" mx="auto" p={4} gap={4}>
      
      <Tabs.Root defaultValue="pendientes" variant="line" w="100%">
        <Tabs.List>
          <Tabs.Trigger value="pendientes"><LuUser /> Pendientes</Tabs.Trigger>
          <Tabs.Trigger value="completados"><LuFolder /> Completados</Tabs.Trigger>
          <Tabs.Trigger value="cancelados"><LuSquareCheck /> Cancelados</Tabs.Trigger>
        </Tabs.List>
        
        <Tabs.Content value="pendientes">
          <VStack 
            gap={4}
            mt={4}
            align="stretch"
          >
            <PedidoCard></PedidoCard>
            <PedidoCard></PedidoCard>
            <PedidoCard></PedidoCard>
            
          </VStack>
        </Tabs.Content>

        <Tabs.Content value="completados">
          <VStack gap={4} mt={4} align="stretch">
            <PedidoCard />
          </VStack>
        </Tabs.Content>
        
        <Tabs.Content value="cancelados">
          Acá mostramos pedidos cancelados, si los hubiera. Próximamente, también, un renderizado condicional.
        </Tabs.Content>
      </Tabs.Root>

    </VStack>
  )
}