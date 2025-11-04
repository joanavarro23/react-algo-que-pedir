import { chakra, Box, Flex, Link, VStack, Image, Text } from '@chakra-ui/react'
import { Link as RouterLink, useLocation } from 'react-router-dom'

import home from '/home.svg'
import ticketRecibo from '/ticketRecibo.svg'
import perfil from '/perfil.svg'
import estrellaPuntuacion  from '/estrellaPuntuacion.svg'

//Hay que agregar las rutas aca y en el routes.tsx
const linksFooter = [
    { link: '/', label:'Inicio', icon: home },
    { link: '/', label: 'Pedidos', icon: ticketRecibo },
    { link: '/', label: 'Calificar', icon: estrellaPuntuacion },
    { link: '/perfil-usuario', label: 'Perfil', icon: perfil }  
]

export const ALTURA_FOOTER = '15px'

export const FooterApp = () => {
    return (
        <Box as="footer" className="footer-app">
            <Flex direction="row" className="rutas-footer">
                { linksFooter.map((item) => (
                    <Link as={RouterLink} to={item.link} key={item.label}>
                        <VStack>
                            <Image src={item.icon} alt={item.label}/>
                            <Text>{item.label}</Text>
                        </VStack >
                    </Link>
                 ))}
            </Flex>
        </Box>
    )
}