import './checkout.css'
import { Button } from '@/components/boton/boton'
import { Articulo } from '@/components/articulo-checkout/Articulo'
import { Heading, Stack, IconButton } from '@chakra-ui/react'
import { IoMdArrowBack } from 'react-icons/io'

export const CheckoutPedido = () => {
    return(
        <main className="main-checkout">
            <Heading as="header" className="checkout-header">
                <IconButton variant="ghost"><IoMdArrowBack/></IconButton>
                <h1 className="checkout-titulo">Tu pedido</h1>
            </Heading>
            <Stack as="section" className="container-checkout">
                <Heading as="h2">Restaurante</Heading>
                <figure className="restaurante-figure">
                    <img className="imagen-restaurante" src='/restaurante.png' alt='Imágen del restaurante'/>
                    <Stack as='figcaption' gap={0}>
                        <h3>Nombre restaurante</h3>
                        <span className='texto-secundario-checkout'>Puntuacion + Distancia + Envio</span>
                    </Stack>
                </figure>
            </Stack>
            <Stack as="section" className="container-checkout">
                <Heading as="h2">Artículos</Heading>
                <Articulo nombre="Hamburguesa" cantidad={1} precioUnitario={29.99}/>
                <Articulo nombre="Quesadillas de Pollo" cantidad={2} precioUnitario={7.99} />
                <Articulo nombre="Guacamole con Totopos" cantidad={1} precioUnitario={8.50} />
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
                        <span className="precio-resumen">$37.47</span>
                        <span className="precio-resumen">$2.62</span>
                        <span className="precio-resumen">$0.00</span>
                        <span className="precio-resumen">$42.22</span>
                    </Stack>
                </article>
            </Stack>
            <Stack as="section" className="container-checkout">
                <span>Forma de pago</span>
                <select name="medio-de-pago" id="medio-de-pago">
                    <option value="efectivo">Efectivo</option>
                    <option value="tarjeta">Tarjeta</option>
                    <option value="QR">QR</option>
                </select>
                <Button>Confirmar pedido</Button>
                <Button variant="secundario">Limpiar carrito de compras</Button>
            </Stack>
        </main>
    )
}