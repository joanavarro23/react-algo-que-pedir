import { Box, IconButton, Image, Heading, VStack, Text, Flex, HStack, Tabs } from '@chakra-ui/react'
import { FaStar } from 'react-icons/fa'
import { IoArrowBack } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import { PLATOS_MOCK } from '@/mocks/platosMock'
import { CardPlato } from '@/components/card-plato/cardPlato'
import { platoModal } from '@/components/plato-modal/platoModal'

export const DetalleLocal = () => {
    const navigate = useNavigate()

    //Datos de manera momentanea
    const local = {
       nombre: 'Restaurante Italiano',
       imagenUrl: './restaurante.png',
       rating: 4.5,
       reviews: 1200,
       pedidos: 546
    }

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
                    
                    <HStack fontSize="sm" color="textoSecundario">
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
                            <CardPlato key={plato.id} plato={plato}/>
                        ))}
                    </VStack>
                </Tabs.Content>

                <Tabs.Content value="reseñas">
                    <Text>Developing... jeje</Text>
                </Tabs.Content>
            </Tabs.Root>

        </Box>
    )
}