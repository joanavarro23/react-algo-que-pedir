import { LuX } from "react-icons/lu" 
import { useNavigate } from "react-router-dom"
import type { Pedido } from "@/pages/detalle-pedido/Pedido"
import { Button, Card, Image, Grid, GridItem, VStack } from "@chakra-ui/react"

interface PedidoCardProps {
  order: Pedido
  onCancel: (id: number) => void
}

export const PedidoCard = ({ order, onCancel }: PedidoCardProps) => {

  const navigate = useNavigate()  
  const clickearCard = () => {
    navigate(`/detalle-pedido/${order.id}`, { state: { pedido: order } })
    }

  const cancelarPedido = (e: React.MouseEvent) => {
      e.stopPropagation() 
      onCancel(order.id)
    }

  return (
    <Card.Root
      w="100%"
      variant = "elevated" //"falopa" //Si le paso un valor que no existe, queda como yo quiero. "Undefined" no funciona.
      overflow="hidden"
    >
      <Card.Body p={0}>
        
        <Grid templateColumns="100px 1fr auto" templateRows="auto auto auto" w="100%" onClick={clickearCard} _hover={{ cursor: "pointer", bg: "gray.50" }}>

          <GridItem gridRow="1 / 4" gridColumn="1 / 2">
            <Image src={order.local.urlImagenLocal} alt={order.local.nombre} width="100px" height="100%" objectFit="fill"
            //No me gusta cómo queda esto, porque hay que hacer que la imagen encaje perfecto con el tamaño del grid. Después lo vemos.
            />
          </GridItem>

          <GridItem gridRow="1 / 4" gridColumn="2 / 3" p={2} display="flex" alignItems="center">
            <VStack align="start" gap={0}>
              <Card.Title fontSize="sm" mb={0}> {order.local.nombre} </Card.Title>
              <Card.Description fontSize="s" color="gray.600">Total: ${order.costoTotalPedido.toFixed(2)} </Card.Description>
              <Card.Description fontSize="s" color="gray.600">{order.fechaPedido} - {order.platosDelPedido.length} artículos </Card.Description>
            </VStack>
          </GridItem>

          <GridItem gridRow="1 / 4" gridColumn="3 / 4" display="flex" alignItems="center" justifyContent="center" p={3}>

            {order.estadoDelPedido !== 'ENTREGADO' && order.estadoDelPedido !== 'CANCELADO' && (
              <Button size="sm" variant="ghost" colorScheme="red" aria-label="Cancelar pedido" onClick={cancelarPedido}>
                <LuX size={20} />
              </Button>
            )}
          </GridItem>
        </Grid>
      </Card.Body>
    </Card.Root>
  )
}

export default PedidoCard