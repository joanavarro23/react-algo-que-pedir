import { IoMdArrowBack } from 'react-icons/io'
import { Heading, VStack, HStack, IconButton, Text, Image } from '@chakra-ui/react'
import { Button } from '@/components/boton/boton'

interface Restaurante {
  nombre: string
  urlImagen: string
  puntuacion: string // Ej: "⭐ 4.5 • 1 km • Envío gratis"
}

interface Articulo {
  nombre: string
  cantidad: number
  precioUnitario: number
}

interface PedidoDetalleProps {
  restaurante?: Restaurante
  articulos?: Articulo[]
  subtotal?: number
  recargo?: number
  tarifaEntrega?: number
  total?: number
  mostrarFormaDePago?: boolean // para Checkout vs Detalle
  medioDePago?: string
  onVolver?: () => void
}

export const PedidoDetalle = ({
  restaurante,
  articulos,
  subtotal,
  recargo,
  tarifaEntrega,
  total,
  mostrarFormaDePago = false,
  medioDePago,
  onVolver,
}: PedidoDetalleProps) => {

  return (
    <VStack className="main-checkout" align="stretch" w="100%" p={4}>
      
      <HStack as="header" justify="start" align="center" mb={6}>
        <IconButton aria-label="Volver" variant="ghost" onClick={onVolver}>
          <IoMdArrowBack />
        </IconButton>
        <Heading as="h1" size="md">Tu pedido</Heading>
      </HStack>

      <VStack align="stretch" mb={6}>
        <Heading as="h2" size="sm" mb={3}>Restaurante</Heading>
        <HStack align="center">
          <Image
            src={restaurante.urlImagen}
            alt={`Imagen de ${restaurante.nombre}`}
            boxSize="100px"
            objectFit="cover"
            mr={4}
          />
          <VStack align="start">
            <Text fontWeight="bold">{restaurante.nombre}</Text>
            <Text fontSize="sm" color="gray.600">{restaurante.puntuacion}</Text>
          </VStack>
        </HStack>
      </VStack>

      <VStack align="stretch" mb={6}>
        <Heading as="h2" size="sm" mb={3}>Artículos</Heading>
        {articulos.map((art, idx) => (
          <HStack key={idx} justify="space-between" align="center" mb={2}>
            <Text>{art.nombre} x{art.cantidad}</Text>
            <Text fontWeight="bold">${(art.precioUnitario * art.cantidad).toFixed(2)}</Text>
          </HStack>
        ))}
      </VStack>

      <VStack align="stretch" mb={6}>
        <Heading as="h2" size="sm" mb={3}>Resumen</Heading>
        <HStack justify="space-between" mb={1}>
          <Text>Subtotal</Text>
          <Text>${subtotal.toFixed(2)}</Text>
        </HStack>
        <HStack justify="space-between" mb={1}>
          <Text>Recargo por tipo de pago</Text>
          <Text>${recargo.toFixed(2)}</Text>
        </HStack>
        <HStack justify="space-between" mb={1}>
          <Text>Tarifa de entrega</Text>
          <Text>${tarifaEntrega.toFixed(2)}</Text>
        </HStack>
        <HStack justify="space-between" fontWeight="bold">
          <Text>Total</Text>
          <Text>${total.toFixed(2)}</Text>
        </HStack>
      </VStack>

      {mostrarFormaDePago && medioDePago && (
        <VStack align="stretch" mb={6}>
          <Text>Forma de pago: {medioDePago}</Text>
        </VStack>
      )}

      <VStack align="stretch">
        <Button mb={2}>Confirmar pedido</Button>
        <Button variant="secundario">Limpiar carrito de compras</Button>
      </VStack>

    </VStack>
  )
}
