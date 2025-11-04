import { Box, IconButton, Image, Heading, VStack, Text } from '@chakra-ui/react'
import { IoArrowBack } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'

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

    const menuLocal = [
        { id: 1, popular: true, nombre: 'Hamburguesa', descripcionPlato: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '},
        { id: 2, popular: true, nombre: 'Quesadillas de Pollo', descripcionPlato: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '},
        { id: 3, popular: false, nombre: 'Guacamole con Totopos', descripcionPlato: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '},
    ]

    return (
        <Box className="main-detalleLocal">

            <Box position="relative">   {/*Header de foto del local*/}
                <IconButton aria-label="Volver atras" onClick={ () => navigate(-1)}>
                    <IoArrowBack/>
                </IconButton>
                <Heading size="lg">{local.nombre}</Heading>

                <Image src="./restaurante.png" alt="Foto del local" w="100%" h="300px" objectFit="cover"/>
            </Box>

            <VStack>
                <Heading size="lg">{local.nombre}</Heading>
                <Text fontSize="md" color="textoSecundario">
                    {`${local.rating} (${local.reviews}+ reviews) · ${local.pedidos} pedidos`}
                </Text>
            </VStack>

        </Box>
    )
}