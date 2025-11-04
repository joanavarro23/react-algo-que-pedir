import { Box } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import { FooterApp, ALTURA_FOOTER } from '../footer/footer'

export const AppLayout = () => {
    return (
        <Box>
            <Outlet />
            <FooterApp />
            <Box height= {ALTURA_FOOTER} /> {/*Es para que el footer no se "coma" parte de la pagina*/}
        </Box>
    )
}