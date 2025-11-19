import axios from "axios"
import { useState } from "react"
import type { Pedido } from "./Pedido"
import { useOnInit } from "@/customHooks/useOnInit"
import { toaster } from "@/components/chakra-toaster/toaster"
import { PedidoCard } from "../../components/pedido/PedidoCard"
import { LuFolder, LuSquareCheck, LuUser } from "react-icons/lu"
import { VStack, Heading, Spinner, Tabs } from "@chakra-ui/react"
import { cancelarPedidoService } from "@/services/detallePedidoService"
import { getPedidosPorEstados } from "@/services/detallePedidoService"

/* Las llamadas que las haga el service */
const API_URL = 'http://localhost:9000/pedidos'

export const ListaPedidos = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [tabActual, setTabActual] = useState('pendientes')
  const [pedidosCancelados, setPedidosCancelados] = useState<Pedido[]>([])
  const [pedidosPendientes, setPedidosPendientes] = useState<Pedido[]>([])
  const [pedidosCompletados, setPedidosCompletados] = useState<Pedido[]>([])

  const cargarPedidosPorEstados = async (
    estados: string[],
    setter: (p: Pedido[]) => void
  ) => {
    try {
      setIsLoading(true)
      setError(null)

      const pedidos = await getPedidosPorEstados(estados)
      setter(pedidos)

    } catch (err) {
      setError((err as Error).message)
    } finally {
      setIsLoading(false)
    }
  }

  const cancelarPedidoBackend = async (id: number) => {
    const pedido = pedidosPendientes.find(p => p.id === id)
    if (!pedido) return

    try {
      await cancelarPedidoService(id)

      // Esto es para sacar el pedido cancelado de la lista de pendientes
      // sin tener que actualizar la página ni volver a pegarle al backend
      setPedidosPendientes(prev => prev.filter(p => p.id !== id))

      toaster.create({
        description: "El pedido se canceló correctamente",
        type: "success"
      })

    } catch (error) {
      console.error(error)

      toaster.create({
        description: "No se pudo cancelar el pedido",
        type: "error"
      })
    }
  }

  const cargarCancelados = () => cargarPedidosPorEstados(["CANCELADO"], setPedidosCancelados)
  const cargarCompletados = () => cargarPedidosPorEstados(["ENTREGADO"], setPedidosCompletados)
  const cargarPendientes = () => cargarPedidosPorEstados(["PENDIENTE", "PREPARADO"], setPedidosPendientes)

  useOnInit(() => {
    cargarPendientes()
  })

  /* Spinner dentro de la página, que se sigan visualizando los tabs */
  if (isLoading) return (
    <VStack flex={1} justify="center">
      <Spinner size="xl" />
      Cargando pedidos...
    </VStack>
  )

  if (error) return (
    <VStack flex={1} justify="center" color="red.500">
      <Heading>Error al cargar</Heading>
      {error}
    </VStack>
  )

  return (
    <VStack w="100%" maxW="container.md" mx="auto" p={4} gap={4}>
      <Tabs.Root
        value={tabActual}
        onValueChange={(details) => {
          const value = details.value
          setTabActual(value)
          if (value === "pendientes") cargarPendientes()
          if (value === "completados") cargarCompletados()
          if (value === "cancelados") cargarCancelados()
        }}
        variant="line"
        w="100%"
      >
        <Tabs.List>
          <Tabs.Trigger value="pendientes" data-testid="test-pendientes"><LuUser /> Pendientes</Tabs.Trigger>
          <Tabs.Trigger value="completados" data-testid="test-completados"><LuFolder /> Completados</Tabs.Trigger>
          <Tabs.Trigger value="cancelados" data-testid="test-cancelados"><LuSquareCheck /> Cancelados</Tabs.Trigger>
        </Tabs.List>

        {/* Se puede componentizar o achicar el código*/}
        <Tabs.Content value="pendientes">
          <VStack gap={4} mt={4} align="stretch">
            {pedidosPendientes.length > 0 ? (
              pedidosPendientes.map(pedido => (
                <PedidoCard
                  key={pedido.id}
                  order={pedido}
                  onCancel={cancelarPedidoBackend}
                />
              ))
            ) : "No tenés pedidos pendientes"}
          </VStack>
        </Tabs.Content>

        <Tabs.Content value="completados">
          <VStack gap={4} mt={4} align="stretch">
            {pedidosCompletados.length > 0 ? (
              pedidosCompletados.map(pedido => (
                <PedidoCard
                  key={pedido.id}
                  order={pedido}
                />
              ))
            ) : "No tenés pedidos completados"}
          </VStack>
        </Tabs.Content>

        <Tabs.Content value="cancelados">
          <VStack gap={4} mt={4} align="stretch">
            {pedidosCancelados.length > 0 ? (
              pedidosCancelados.map(pedido => (
                <PedidoCard
                  key={pedido.id}
                  order={pedido}
                />
              ))
            ) : "No tenés pedidos cancelados"}
          </VStack>
        </Tabs.Content>
      </Tabs.Root>
    </VStack>
  )
}
