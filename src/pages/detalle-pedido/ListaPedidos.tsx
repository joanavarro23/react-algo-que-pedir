import axios from "axios"
import { useState } from "react"
import type { Pedido } from "./Pedido"
import { MOCK_PEDIDOS } from "@/mocks/pedidosMocks"
import { useOnInit } from "@/customHooks/useOnInit"
import { PedidoCard } from "../../components/pedido/PedidoCard"
import { LuFolder, LuSquareCheck, LuUser } from "react-icons/lu"
import { Heading, Spinner, Tabs, VStack } from "@chakra-ui/react" 

const API_URL = 'http://localhost:9000/pedidos'

export const ListaPedidos = () => {

  const cargarPedidosPorEstados = async (estados: string[], setter: (p: Pedido[]) => void) => {
    try {
      setIsLoading(true)
      setError(null)

      const responses = await Promise.all(
        estados.map(estado => axios.get(API_URL, { params: { estado } }))
      )

      const pedidos = responses.flatMap(r => r.data)
      setter(pedidos)

    } catch (err) {
      console.error(err)
      setError("Error al cargar pedidos")
    } finally {
      setIsLoading(false)
    }
  } // Fin cargarPedidosPorEstados()

  const cargarPendientes = () => {
    cargarPedidosPorEstados(["PENDIENTE", "PREPARADO"], setPedidosPendientes)
  }

  const cargarCompletados = () => {
  cargarPedidosPorEstados(["ENTREGADO"], setPedidosCompletados)
  }

  const cargarCancelados = () => {
    cargarPedidosPorEstados(["CANCELADO"], setPedidosCancelados)
  }

  const [pedidosPendientes, setPedidosPendientes] = useState<Pedido[]>([])
  const [pedidosCompletados, setPedidosCompletados] = useState<Pedido[]>([])
  const [pedidosCancelados, setPedidosCancelados] = useState<Pedido[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [tabActual, setTabActual] = useState('pendientes')

useOnInit(() => {
  cargarPendientes()
})

  if (isLoading) {
      return (
        <VStack flex={1} justify="center">
          <Spinner size="xl" />
          Cargando pedidos...
        </VStack>
      )
    }

  if (error) {
      return (
        <VStack flex={1} justify="center" color="red.500">
          <Heading>Error al cargar</Heading>
          {error}
        </VStack>
      )
    }

  const cancelarPedido = (id: number) => {
    const pedido = pedidosPendientes.find(p => p.id === id)
    if (!pedido) return
    
    setPedidosPendientes(prev => prev.filter(p => p.id !== id))
    setPedidosCancelados(prev => [...prev, { ...pedido, estadoPedido: "CANCELADO" }])
  }
  
return (
    <VStack w="100%" maxW="container.md" mx="auto" p={4} gap={4}>
      
    <Tabs.Root
      value={tabActual}
      onValueChange={(details) => {
        const value = details.value
        setTabActual(value)
        if (value === "pendientes") cargarPendientes()
        if (value === "completados") cargarCompletados()
        if (value == "cancelados") cargarCancelados()
      }}
      variant="line"
      w="100%"
    >
        <Tabs.List>

          <Tabs.Trigger value="pendientes" data-testid="test-pendientes" ><LuUser /> Pendientes</Tabs.Trigger>
          <Tabs.Trigger value="completados" data-testid="test-completados"><LuFolder /> Completados</Tabs.Trigger>
          <Tabs.Trigger value="cancelados" data-testid="test-cancelados"><LuSquareCheck /> Cancelados</Tabs.Trigger>
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
              "No tenés pedidos pendientes"
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
              "No tenés pedidos completados"
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
              "No tenés pedidos cancelados"
            )}
          </VStack>
        </Tabs.Content>
      </Tabs.Root>

    </VStack>
  )
}
