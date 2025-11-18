import { Box, IconButton, Image, Heading, VStack, Text, Flex, HStack, Tabs, useDisclosure } from '@chakra-ui/react'
import { FaStar } from 'react-icons/fa'
import { IoArrowBack } from 'react-icons/io5'
import { useNavigate, useParams } from 'react-router-dom'

import { Plato, type PlatoJSON } from '@/domain/Plato'

import { CardPlato } from '@/components/card-plato/cardPlato'
import { PlatoModal } from '@/components/plato-modal/platoModal'
import { Button } from '@/components/boton/boton'
import { LoadingSpinner } from '@/components/spinnerCargando/spinner'
import { toaster } from '@/components/chakra-toaster/toaster'
import { useState, useEffect } from 'react'

import { platoService } from '@/services/platoService'
import { localService } from '@/services/localServiceTest'
import { useOnInit } from '@/customHooks/useOnInit'

//Minima interface para un item de un pedido
interface ItemPedido {
    plato: Plato,
    cantidad: number
}

//Minima interface para un Pedido
interface Pedido {
    id: number,
    items: ItemPedido[]
    //fechaCreacion: Date,
    //costoTotal: number,
    //etc
}


//Datos de manera momentanea hasta que haya una class Local
interface LocalInfo {
    nombre: string,
    urlImagenLocal: string,
    rating: number,
    reviews: string,
    pedidos?: number
}


export const DetalleLocal = () => {
    const navigate = useNavigate()
    
    const volverAlHome = () => {
        navigate('/home')
    }
    
    //Uso el useParams para conseguir el id en la url
    const { idLocal } = useParams<{ idLocal: string }>()
    const localID = Number(idLocal)

    // --- ESTADOS ---
    const [local, setLocal] = useState<LocalInfo | null>(null)
    const [estaCargando, setEstaCargando] = useState(true)             //estados para diferenciar si el local esta cargando
    const [errorCarga, setErrorCarga] = useState<string | null>(null)   //o si fallo en la carga

    const [platos, setPlatos] = useState<Plato[]>([])
    const [platoSeleccionado, setPlatoSeleccionado] = useState<Plato | null>(null)

    //Estado para el Pedido que arma la vista   
    const [pedido, setPedido] = useState<Pedido>({
        id: 1,
        items: []
    })       

    // ----- testeo de como se agregan los platos en consola!!!!!------
    useEffect(() => {
        console.log('--- ESTADO ACTUAL DEL PEDIDO ---')
        console.log('ID del Pedido:', pedido.id || 'No Asignado')
        
        if (pedido.items.length === 0) {
            console.log('El pedido está vacío.')
        } else {
            console.log(`Total de Items Únicos: ${pedido.items.length}`)
            
            pedido.items.forEach(item => {
                console.log(`- Plato ID: ${item.plato.id}, Nombre: ${item.plato.nombre}, Cantidad: ${item.cantidad}`)
            })
        }
        console.log('-------------------------------')
    }, [pedido])


    //--- MODAL DE PLATO ---
    const { open, onOpen, onClose } = useDisclosure()

    //Abre el modal
    const handlePlatoClickeado = (plato: Plato) => {
        setPlatoSeleccionado(plato)
        onOpen()
    }

    // --- AGREGAR PLATO AL PEDIDO ---
    const handleAgregarPlato = (plato : Plato, cantidad : number) => {
        setPedido( pedidoActual => {
            //Accedo a la lista de platos del Pedido
            const pedidoItems = pedidoActual.items

            //Match de id de plato para saber si ya existe en mi pedido
            const idPlatoItem = pedidoItems.findIndex( item => item.plato.id === plato.id)
            
            //Si no matchea, es un plato nuevo. Agrego la cantidad elegida y retorna el pedido
            if(idPlatoItem !== -1) {
                const nuevoPedidoItems = [...pedidoItems]
                nuevoPedidoItems[idPlatoItem] = { plato, cantidad}
                return {
                    ...pedidoActual,
                    items: nuevoPedidoItems
                }
            }
            
            //Y si era el mismo plato, se reactualiza la cantidad
            return {
                ...pedidoActual,
                items: [...pedidoItems, {plato, cantidad}]
            }
        })
        onClose()

        toaster.create({
            title: 'Plato agregado exitosamente!',
            description: `${cantidad} de ${plato.nombre} agregado(s) al pedido`,
            type: 'success',
            duration: 1500
        })
    }

    const obtenerCantidadActual = (plato : Plato) => {
        const item = pedido.items.find(item => item.plato.id === plato.id)
        return item ? item.cantidad : 0
    }


    //--- CARGA DE PLATOS DEL LOCAL ---
    const cargarDatos = async () => {
        setEstaCargando(true)           //el local esta cargando
        setErrorCarga(null)

        //Valida el id del local que viene de la url    
        if (!localID || Number.isNaN(localID)) {
            setErrorCarga('El id del local es invalido!')         //Marca que hubo error porque el id de la url o no esta o es invalido 
            setEstaCargando(false)
            return
        }

        try {
            const [localData, platosData] = await Promise.all([
                localService.obtenerLocalPorId(localID),            //Llama a ambos services para traer
                platoService.obtenerPlatosPorLocal(localID)         //el local y sus platos
            ])

            //Al local le mapeo lo que vino del service
            setLocal({
                nombre: localData.nombre,
                urlImagenLocal: localData.urlImagenLocal,
                rating: localData.rating,
                reviews: localData.reviews.toString(),
                pedidos: 0 // TODO: completar cuando el back devuelva cantidad de pedidos
            })

            //A los platos los mapea con lo del service
            setPlatos(platosData.map((plato: PlatoJSON) => Plato.fromJSON(plato)))
        } catch (error) {
            console.error('Error cargando los platos del local', error)

            setErrorCarga('No se pudo cargar los platos del local')
        } finally {
            setEstaCargando(false)
        }
    }

    useOnInit(() => {
        cargarDatos()
    })

    //Spinner para cuando esta tardando en cargar los platos
    if (estaCargando) {
        return (<LoadingSpinner mensaje="platos del local" />)
    }

    //Mensaje de error con boton para volver al Home (si falla la carga o si el local es null/invalido)
    if (errorCarga || !local) {
        return (
            <Flex direction="column" gap="4" align="center" justify="center" minH="100vh" width="100%">
                <Text>{errorCarga}</Text>
                <Button onClick={volverAlHome} colorScheme="red">Volver</Button>
            </Flex>
        )
    }


    //--- VISTA /local/{id}/platos ---
    return (
        <Box>
            <VStack marginTop="0.5rem" align="stretch" gap="3"> {/* Contenedor vertical para toda la pagina */}

                <Flex direction="row" justify="space-between" w="100%" align="center" p="">   {/* Barra navegacion para atras */}
                    <IconButton aria-label="Volver atras" onClick={() => navigate(-1)} bg="none" color="black">
                        <IoArrowBack />
                    </IconButton>
                    <Heading size="md" fontWeight="semibold" textAlign="center">{local.nombre}</Heading>
                    <Box w="40px" />
                </Flex>

                <Image src={local.urlImagenLocal} alt="Foto del local" w="100%" h="250px" objectFit="cover" />

                <Flex direction="column" align="flex-start" gap="0.5rem" px="1rem"> {/* Nombre local + info puntuacion */}
                    <Heading size="xl" fontWeight="bold">{local.nombre}</Heading>

                    <HStack fontSize="sm">
                        <FaStar color="#f9d44dff" />
                        <Text>
                            {`${local.rating} (${local.reviews}+ reviews) · ${local.pedidos} pedidos`}
                        </Text>
                    </HStack>
                </Flex>
            </VStack>

            <Tabs.Root variant="line" w="100%" defaultValue="menu" px="1rem" marginTop="3"> {/* Navbar para tabs de Menu y Reseñas */}
                <Tabs.List>
                    <Tabs.Trigger value="menu" fontWeight="semibold"> Menú </Tabs.Trigger>
                    <Tabs.Trigger value="reseñas" fontWeight="semibold"> Reseñas </Tabs.Trigger>
                </Tabs.List>

                <Tabs.Content value="menu">
                    <VStack w="100%" gap="1">
                        {platos.map(plato => (
                            <CardPlato key={plato.id} plato={plato} onClickPlato={() => handlePlatoClickeado(plato)} />
                        ))}
                    </VStack>
                </Tabs.Content>

                <Tabs.Content value="reseñas">
                    <Text>Developing... jeje</Text>
                </Tabs.Content>
            </Tabs.Root>

            <Box p="4" bg="white">                                          {/* Boton para ver el detalle del pedido */}
                <Button colorScheme="red" w="100%"> Ver pedido ({pedido.items.length})</Button>
            </Box>


            {/*--- AUN EN TESTING ---*/}
            {platoSeleccionado && (
                <PlatoModal
                    open={open}
                    onClose={onClose}
                    plato={platoSeleccionado}
                    cantidadActual={obtenerCantidadActual(platoSeleccionado)}
                    onAgregar={handleAgregarPlato}
                />
            )}

        </Box>
    )
}