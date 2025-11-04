import './articulo.css'
import '@/pages/checkout-pedido/checkout.css'
import { Stack, IconButton } from '@chakra-ui/react'
import { IoMdClose } from 'react-icons/io'


interface ArticuloProps {
  nombre: string;
  cantidad: number;
  precioUnitario: number;
}

export const Articulo = ({ nombre, cantidad, precioUnitario }: ArticuloProps) => {
    const precioTotal = precioUnitario * cantidad

    return(
        <article className='articulo-container'>
            <Stack gap={0}>
                <h3>{nombre}</h3>
                <span className='texto-secundario-checkout'>Cantidad: {cantidad}</span>
                <span className='texto-secundario-checkout'>Precio unitario: ${precioUnitario}</span>
            </Stack>
            <Stack>
                <span>${precioTotal}</span>
                <IconButton variant="ghost"><IoMdClose /></IconButton>
            </Stack>
        </article>
    )
}