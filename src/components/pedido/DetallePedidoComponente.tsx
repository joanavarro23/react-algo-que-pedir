import { IoMdArrowBack } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/boton/boton'
import { Articulo } from '../articulo-checkout/Articulo'
import { Heading, VStack, HStack, IconButton, Text, Image } from '@chakra-ui/react'


interface Restaurante {
  nombre: string
  urlImagenLocal: string
  rating: string
}

interface Articulo {
  nombre: string
  cantidad: number
  precioUnitario: number
}

interface PedidoDetalleProps {
  restaurante: Restaurante
  articulos: Articulo[]
  subtotal: number
  recargo: number
  tarifaEntrega: number
  distancia:string
  total: number
  mostrarFormaDePago?: boolean
  medioDePago?: string
  isCheckout: boolean
}
export const PedidoDetalle = ({
  restaurante,
  articulos,
  subtotal,
  recargo,
  tarifaEntrega,
  distancia,
  total,
  mostrarFormaDePago = false,
  medioDePago,
  isCheckout
}: PedidoDetalleProps) => {

  const navigate = useNavigate()

  const volver = ()  => {
    navigate(-1)
  }

  return (
    <VStack className="main-checkout" align="stretch" w="100%" p={4}>
      <HStack as="header" justify="start" align="center" mb={6}>
        <IconButton aria-label="Volver" variant="ghost" onClick={volver}>
          <IoMdArrowBack />
        </IconButton>
        <Heading as="h1" size="md">Tu pedido</Heading>
      </HStack>

      <VStack align="stretch" mb={6}>
        <Heading as="h2" size="sm" mb={3}>Restaurante</Heading>
        <HStack align="center">
          <Image
            src={restaurante.urlImagenLocal}
            alt={`Imagen de ${restaurante.nombre}`}
            boxSize="100px"
            objectFit="cover"
            mr={4}
          />
          <VStack align="start">
            <Text fontWeight="bold">{restaurante.nombre}</Text>
            <Text fontSize="sm" color="gray.600">
              Puntuación: 🍽️{restaurante.rating} - {distancia} -
              Envío ${tarifaEntrega.toFixed(2)}</Text>
          </VStack>
        </HStack>
      </VStack>

      <VStack align="stretch" mb={6}>
        <Heading as="h2" size="sm" mb={3}>Artículos</Heading>
        {articulos.map((articulo, idArt) => (
          <HStack key={idArt} justify="space-between" align="center" mb={2}>
            <Text>{articulo.nombre} x{articulo.cantidad}</Text>
            <Text fontWeight="bold">${(articulo.precioUnitario * articulo.cantidad).toFixed(2)}</Text>
          </HStack>
        ))}
      </VStack>
        {/* Hacer componentes con el código repetido */}
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

      <Text>Forma de Pago</Text>
      <VStack align="stretch">
        {isCheckout ?
          <select name="medio-de-pago" id="medio-de-pago">
            <option value="efectivo">Efectivo</option>
            <option value="tarjeta">Tarjeta</option>
            <option value="QR">QR</option>
          </select> : <p>{medioDePago}</p>}

        {isCheckout &&
          <>
            <Button mb={2}>Confirmar pedido</Button>
            <Button variant="secundario">Limpiar carrito de compras</Button>
          </>
        }
          </VStack>

      
    </VStack>
  )
}
