import { Button } from '@/components/boton/boton'
import { Articulo } from '@/components/articulo-checkout/Articulo'
import { Heading, Stack, IconButton, Select, createListCollection, Portal, Flex, Text } from '@chakra-ui/react'
import { IoMdArrowBack } from 'react-icons/io'
import { use, useEffect, useState } from 'react'
import { Pedido } from '@/domain/Pedido'
import { pedidoService } from '@/services/pedidoService'
import { useNavigate, useOutlet, useOutletContext, useParams, type ErrorResponse } from 'react-router-dom'
import { getMensajeError } from '@/utils/errorHandling'
import { toaster } from '@/components/chakra-toaster/toaster'
import { useOnInit } from '@/customHooks/useOnInit'
import { localService, medioDePagoLabels, type LocalJSON, type MedioDePago } from '@/services/localServiceTest'
import type { CarritoContext } from '../layout-carrito/CarritoLayout'
import { Plato } from '@/domain/Plato'
import { Carrito, ItemPedido } from '@/domain/Carrito'
import { LoadingSpinner } from '@/components/spinnerCargando/spinner'

const useMock = true

const mockPlatos = [
    Plato.fromJSON({ id: 1, nombre: 'Pizza Margherita', descripcion: 'Queso, tomate', precioUnitario: 12.50, imagenUrl: 'pizza-margherita.png', popular: true }),
    Plato.fromJSON({ id: 2, nombre: 'Spaghetti Carbonara', descripcion: 'Huevo, panceta, queso', precioUnitario: 15.00, imagenUrl: 'spaghetti-carbonara.png', popular: false }),
    Plato.fromJSON({ id: 3, nombre: 'Fettuccine Alfredo', descripcion: 'Crema, manteca, queso', precioUnitario: 14.00, imagenUrl: 'fettuccine-alfredo.png', popular: true }),
]

const mockItems = [
    new ItemPedido(mockPlatos[0], 2), // 2 Margheritas
    new ItemPedido(mockPlatos[1], 3), // 1 Carbonara
]

const mockCarrito = new Carrito(mockItems, 1) // Assume localId is 1 for the mock

const mockContext: CarritoContext = {
    carrito: mockCarrito,
    setPlatoCantidad: (plato, cantidad, localId) => console.log(`Mock set ${cantidad} of ${plato.nombre} for local ${localId}`),
    limpiarCarrito: () => console.log('Mock clear cart'),
    decrementarPlato: (platoId) => console.log('Mock decrement plato:', platoId),
}

export const CheckoutPedido = () => {
    const navigate = useNavigate()
    const realContext = useOutletContext<CarritoContext>()
    const { carrito, setPlatoCantidad, decrementarPlato, limpiarCarrito } = useMock ? mockContext : realContext
    
    const [local, setLocal] = useState<LocalJSON | null>(null)
    const [medioSeleccionado, setMedioSeleccionado] = useState<MedioDePago>('EFECTIVO')
    
    const [tarifaEntregaMonto, setTarifaEntregaMonto] = useState(0)
    const [recargo, setRecargo] = useState(0)
    const [total, setTotal] = useState(0)

    const [estaCargando, setEstaCargando] = useState(true)
    
    
    useOnInit(async () => {
        if (carrito.localId) {
            try {
                const localData = await localService.obtenerLocalPorId(carrito.localId)
                setLocal(localData)
            } catch (error) {
                toaster.create({ title: 'Error', description: 'No se pudo cargar la información del local.', type: 'error' })
                navigate('/home')
            } finally {
                setEstaCargando(false)
            }
        } else {
            setEstaCargando(false)
        }
    })

    useEffect(() => { //Recalcula valores cuando cambia medio de pago
        if (!local) return

        // Monto de entrega
        const tarifaEntregaMonto = carrito.subtotal * local.tarifaEntrega
        setTarifaEntregaMonto(tarifaEntregaMonto)

        //Monto medio de pago
        const subtotalConEnvio = carrito.subtotal + tarifaEntregaMonto
        const tarifaMedioDePago = local.recargosMedioDePago[medioSeleccionado] || 0
        const tarifaMedioDePagoMonto = subtotalConEnvio * tarifaMedioDePago
        setRecargo(tarifaMedioDePagoMonto)

        //Monto total
        const montoTotal = carrito.subtotal + tarifaEntregaMonto + tarifaMedioDePagoMonto
        setTotal(montoTotal)
    }, [carrito.subtotal, local, medioSeleccionado])

    const confirmarPedido = async () => {
        if (!local) return

        const fechaPedido = new Date()
        const pedido = Pedido.fromCarrito(carrito, local, medioSeleccionado, total, fechaPedido)

        try {
            await pedidoService.crearPedido(pedido)
            toaster.create({
                title: 'Pedido confirmado!',
                description: 'Tu pedido ha sido realizado con éxito.',
                type: 'success',
            })
            limpiarCarrito()
            navigate('/home')
        } catch (error: unknown) {
            const mensajeError = getMensajeError(error as ErrorResponse)
            toaster.create({
                title: 'No se pudo confirmar el pedido',
                description: mensajeError,
                type: 'error',
            })
        }
    }

    if (estaCargando) {
        return <LoadingSpinner mensaje = "Cargando checkout..." />
    }

    if (!local || carrito.items.length === 0) {
        return (
            <Flex direction="column" gap="4" align="center" justify="center" minH="80vh" width="100%">
                <Heading as="h1">Tu carrito está vacío</Heading>
                <Text>Agrega platos del menú para continuar.</Text>
                <Button onClick={() => local ? navigate(`/local/${local.idLocal}/platos`) : navigate('/home')}>
                    Volver al menú
                </Button>
            </Flex>
        )
    }

    const itemsSelect = local.mediosDePago.map((medio) => ({
        label: medioDePagoLabels[medio],
        value: medio,
    })
    )

    const collection = createListCollection({ items: itemsSelect })

    return(
        <main className="main-checkout">
            <Heading as="header" className="checkout-header">
                <IconButton variant="ghost" onClick={() => navigate(-1)}><IoMdArrowBack/></IconButton>
                <h1 className="checkout-titulo">Tu pedido</h1>
            </Heading>
            <Stack as="section" className="container-checkout">
                <Heading as="h2">Restaurante</Heading>
                <figure className="restaurante-figure">
                    <img className="imagen-restaurante" src={local.urlImagenLocal} alt='Imágen del restaurante'/>
                    <Stack as='figcaption' gap={0}>
                        <h3>{local.nombre}</h3>
                        <span className='texto-secundario-checkout'>{local.rating.toFixed(1)} ★</span>
                    </Stack>
                </figure>
            </Stack>
            <Stack as="section" className="container-checkout">
                <Heading as="h2">Artículos</Heading>
                {carrito.items.map((item) => (
                    <Articulo 
                    key={item.plato.id} 
                    nombre={item.plato.nombre} 
                    cantidad={item.cantidad} 
                    precioUnitario={item.plato.precioUnitario}
                    onDecrement={() => decrementarPlato(item.plato.id)} />
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
                        <span className="precio-resumen">${carrito.subtotal.toFixed(2)}</span>
                        <span className="precio-resumen">${recargo.toFixed(2)}</span>
                        <span className="precio-resumen">${tarifaEntregaMonto.toFixed(2)}</span>
                        <span className="precio-resumen">${total.toFixed(2)}</span>
                    </Stack>
                </article>
            </Stack>
            <Stack as="section" className="container-checkout">
                <Select.Root collection={collection} size="lg" value={[medioSeleccionado]}
                    onValueChange={(details) => {
                        const seleccionado = details.value[0] as MedioDePago
                        if (seleccionado) {
                            setMedioSeleccionado(seleccionado)
                        }
                    }}
                >
                    <Select.HiddenSelect />
                    <Select.Label>Forma de pago</Select.Label>
                    <Select.Control>
                        <Select.Trigger>
                            <Select.ValueText />
                        </Select.Trigger>
                        <Select.IndicatorGroup>
                            <Select.Indicator />
                        </Select.IndicatorGroup>
                    </Select.Control>
                    <Portal>
                        <Select.Positioner>
                            <Select.Content>
                                {collection.items.map((item) => (
                                    <Select.Item item={item} key={item.value}>
                                        {item.label}
                                        <Select.ItemIndicator />
                                    </Select.Item>
                                ))}
                            </Select.Content>
                        </Select.Positioner>
                    </Portal>
                </Select.Root>
                <Button className='boton-checkout' onClick={confirmarPedido}>Confirmar pedido</Button>
                <Button variant="secundario" className='boton-checkout' onClick={limpiarCarrito}>Limpiar carrito de compras</Button>
            </Stack>
        </main>
    )
}