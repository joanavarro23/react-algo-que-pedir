import { Box, IconButton } from '@chakra-ui/react'
import { IoArrowBack } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'

export const DetalleLocal = () => {
    const navigate = useNavigate()
    
    //Datos de manera momentanea
    const local = {
       nombre: 'Restaurante Italiano',
       imagenUrl: './restaurante.png',
       reting: 4.5,
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

            <Box position="relative">
                <IconButton aria-label="Volver atras" onClick={ () => navigate(-1)}>
                    <IoArrowBack/>
                </IconButton>
            </Box>

        </Box>
    )
}