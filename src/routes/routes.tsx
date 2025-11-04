// RUTAS DE LA PAGINA [React Routes]
import { CheckoutPedido } from '@/pages/checkout-pedido/Checkout'
import { PerfilUsuario } from '@/pages/usuario/Perfil'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

export const AQPRoutes = () =>
    <Routes>
        <Route path="/" element={<PerfilUsuario/>} />
        <Route path="/checkout-pedido" element={<CheckoutPedido/>}> </Route>
    </Routes>

export const AlgoQuePedirRouter = () =>
    <Router>
        <AQPRoutes />
    </Router>