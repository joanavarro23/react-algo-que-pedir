import { Box, IconButton, Image, Heading, VStack, Text, Flex, HStack, Tabs, useDisclosure } from '@chakra-ui/react'
import { FaStar } from 'react-icons/fa'
import { IoArrowBack } from 'react-icons/io5'
import { useNavigate, useParams } from 'react-router-dom'
// import { PLATOS_MOCK, type Plato } from '@/mocks/platosMock'
import type { Plato } from '@/domain/Plato'
import type { LocalDTO } from '@/services/localServiceTest'

import { CardPlato } from '@/components/card-plato/cardPlato'
import { PlatoModal } from '@/components/plato-modal/platoModal'
import { Button } from '@/components/boton/boton'
import { useState, useEffect } from 'react'

import { PlatoService } from '@/services/platoService'
import { LocalService } from '@/services/localServiceTest'


interface ItemPedido {
    plato: Plato,
    cantidad: number
}

//Datos de manera momentanea
interface localInfo {
    nombre: string,
    imagenUrl: string,
    rating: number,
    reviews: number,
    pedidos: number
}


export const DetalleLocal = () => {
    const navigate = useNavigate()
    //Uso el useParams para conseguir el id en la url
    const { idLocal } = useParams<{idLocal: string}>()
    const localID = Number(idLocal)

    //Estados
    const [local, setLocal] = useState<localInfo | null>(null)
    const [platos, setPlatos] = useState<Plato[]>([])
        
    const [platoSeleccionado, setPlatoSeleccionado] = useState<Plato | null>(null)
    const [pedido, setPedido] = useState<ItemPedido[]>([])

    //Para el modal de Plato
    const { open, onOpen, onClose } = useDisclosure()

    const handlePlatoClickeado = (plato : Plato) => {
        setPlatoSeleccionado(plato)
        onOpen()
    }

    //

    return (
        <Box className="main-detalleLocal">
            
            <VStack marginTop="0.5rem" align="stretch" gap="2"> {/* Contenedor vertical para toda la pagina */}

                <Flex direction="row" justify="space-between" w="100%" align="center" p="">   {/* Barra navegacion para atras */}
                    <IconButton aria-label="Volver atras" onClick={ () => navigate(-1) } bg="none" color="black">
                        <IoArrowBack/>
                    </IconButton>
                    <Heading size="md" fontWeight="semibold" textAlign="center">{local.nombre}</Heading>
                    <Box w="40px" />
                </Flex>
                
                <Image src="./restaurante.png" alt="Foto del local" w="100%" h="250px" objectFit="cover"/>
                
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
                        {PLATOS_MOCK.map( plato => (
                            <CardPlato key={plato.id} plato={plato} onClickPlato={() => handlePlatoClickeado(plato)}/>
                        ))}
                    </VStack>
                </Tabs.Content>

                <Tabs.Content value="reseñas">
                    <Text>Developing... jeje</Text>
                </Tabs.Content>
            </Tabs.Root>

            <Box p="4" bg="white">                                          {/* Boton para ver el detalle del pedido */}
                <Button colorScheme="red" w="100%"> Ver pedido ()</Button>
            </Box>


            {/*--- AUN EN TESTING ---*/}
            {platoSeleccionado && (
                 <PlatoModal
                open={open}
                onClose={onClose}
                plato={platoSeleccionado}
                cantidadActual={0}
                onAgregar={() => onClose()} 
                />
            )}
           
        </Box>
    )
}