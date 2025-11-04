// RUTAS DE LA PAGINA [React Routes]
import { CheckoutPedido } from '@/pages/checkout-pedido/Checkout'
import { PerfilUsuario } from '@/pages/usuario/Perfil'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { AppLayout } from '@/components/layout/AppLayout'

export const AQPRoutes = () =>
    <Routes>
        /*El layout envuelve al resto de las paginas*/
        <Route path="/" element={ <AppLayout /> }>
            <Route path="/perfil-usuario" element={<PerfilUsuario/>} />
            <Route path="/checkout-pedido" element={<CheckoutPedido/>}> </Route>
        </Route>
    </Routes>

export const AlgoQuePedirRouter = () =>
    <Router>
        <AQPRoutes />
    </Router>