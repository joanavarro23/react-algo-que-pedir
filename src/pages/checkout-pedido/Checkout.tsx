import { Button } from '@/components/boton/boton'
import { Articulo } from '@/components/articulo-checkout/Articulo'
import { Heading, Stack, IconButton, Select, createListCollection, Portal } from '@chakra-ui/react'
import { IoMdArrowBack } from 'react-icons/io'
import { useState } from 'react'
import { Pedido } from '@/domain/Pedido'
import { pedidoService } from '@/services/pedidoService'
import { useParams, type ErrorResponse } from 'react-router-dom'
import { Plato } from '@/domain/Plato'
import { getMensajeError } from '@/utils/errorHandling'
import { toaster } from '@/components/chakra-toaster/toaster'
import { useOnInit } from '@/customHooks/useOnInit'

const mediosDePago = createListCollection({
            items: [
                { label: 'Tarjeta de crédito', value: 'tarjeta' },
                { label: 'Efectivo', value: 'efectivo' },
                { label: 'QR', value: 'qr' }
            ]
        }) // Esto supongo que es temporal ya que hay que traer los medios de pago del back

export const CheckoutPedido = () => {
    //Temporalmente uso el id de la url para traer el pedido
    const { idPedido } = useParams<{ idPedido: string }>()
    const pedidoID = Number(idPedido)
    
    const [pedido, setPedido] = useState<Pedido>(new Pedido())
    
    const traerPedido = async () => {
        try {
            const pedido = await pedidoService.getPedidoById(pedidoID)
            setPedido(pedido)
        } catch (error: unknown) {
            const mensajeError = getMensajeError(error as ErrorResponse)
            toaster.create({
                title: 'No se puede cargar el pedido',
                description: mensajeError,
                type: 'error',
            })
        }
    }
    useOnInit(traerPedido)

    const displayEnvio = () => {
        if (pedido.tarifaEntrega == 0){
            return 'Envío Gratis'
        } else {
            return `Envío $${pedido.tarifaEntrega.toFixed(2)}`
        }
    }

    return(
        <main className="main-checkout">
            <Heading as="header" className="checkout-header">
                <IconButton variant="ghost"><IoMdArrowBack/></IconButton>
                <h1 className="checkout-titulo">Tu pedido</h1>
            </Heading>
            <Stack as="section" className="container-checkout">
                <Heading as="h2">Restaurante</Heading>
                <figure className="restaurante-figure">
                    <img className="imagen-restaurante" src={pedido.local?.urlImagenLocal} alt='Imágen del restaurante'/>
                    <Stack as='figcaption' gap={0}>
                        <h3>{pedido.local?.nombre}</h3>
                        <span className='texto-secundario-checkout'>{pedido.local?.rating.toFixed(1)} · Distancia · {displayEnvio()}</span>
                    </Stack>
                </figure>
            </Stack>
            <Stack as="section" className="container-checkout">
                <Heading as="h2">Artículos</Heading>
                {pedido.platosDelPedido?.map((plato) => (
                    <Articulo key={plato.id} nombre={plato.nombre} cantidad={1} precioUnitario={plato.precioUnitario} />
                ))}
            </Stack>
            <Stack as="section" className="container-checkout">
                <Heading as="h2">Resumen</Heading>
                <article className="container-resumen">
                    <Stack>
                        <span className="texto-secundario-checkout">Subtotal</span>
                        <span className="texto-secundario-checkout">Recargo por tipo de pago</span>
                        <span className="texto-secundario-checkout">Tarifa de entrega</span>
                        <span className="texto-secundario-checkout">Total</span>
                    </Stack>
                    <Stack>
                        <span className="precio-resumen">{pedido.costoSubtotalPedido.toFixed(2)}</span>
                        <span className="precio-resumen">{pedido.recargoMedioDePago.toFixed(2)}</span>
                        <span className="precio-resumen">{pedido.tarifaEntrega.toFixed(2)}</span>
                        <span className="precio-resumen">{pedido.costoTotalPedido.toFixed(2)}</span>
                    </Stack>
                </article>
            </Stack>
            <Stack as="section" className="container-checkout">
                <Select.Root collection={mediosDePago} size="lg">
                    <Select.HiddenSelect />
                    <Select.Label>Forma de pago</Select.Label>
                    <Select.Control>
                        <Select.Trigger>
                            <Select.ValueText placeholder="Selecciona un medio de pago" />
                        </Select.Trigger>
                        <Select.IndicatorGroup>
                            <Select.Indicator />
                        </Select.IndicatorGroup>
                    </Select.Control>
                    <Portal>
                        <Select.Positioner>
                            <Select.Content>
                                {mediosDePago.items.map((item) => (
                                    <Select.Item item={item} key={item.value}>
                                        {item.label}
                                        <Select.ItemIndicator />
                                    </Select.Item>
                                ))}
                            </Select.Content>
                        </Select.Positioner>
                    </Portal>
                </Select.Root>
                <Button className='boton-checkout'>Confirmar pedido</Button>
                <Button variant="secundario" className='boton-checkout'>Limpiar carrito de compras</Button>
            </Stack>
        </main>
    )
}