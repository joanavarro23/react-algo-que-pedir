// RUTAS DE LA PAGINA [React Routes]
import { CheckoutPedido } from '@/pages/checkout-pedido/Checkout'
import { PerfilUsuario } from '@/pages/usuario/Perfil'
import { CriteriosBusqueda } from '@/pages/usuario/preferencias/criteriosBusqueda'
import { Ingredientes } from '@/pages/usuario/preferencias/ingredientes'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { AppLayout } from '@/components/layout/AppLayout'
import { DetalleLocal } from '@/pages/detalle-local/DetalleLocal'
import { DetallePedido } from '@/pages/detalle-pedido/DetallePedido'
import { PaginaDetallePedido } from '@/pages/detalle-pedido/Orders'

export const AQPRoutes = () =>
    <Routes>
        /*El layout envuelve al resto de las paginas*/
        <Route path="/" element={ <AppLayout /> }>
            <Route path="/perfil-usuario" element={<PerfilUsuario/>} />
            <Route path="/perfilUsuario/preferencias/criteriosBusqueda" element={<CriteriosBusqueda />} />
            <Route path="/perfilUsuario/preferencias/ingredientes" element={<Ingredientes />} />
            <Route path="/checkout-pedido" element={<CheckoutPedido/>}> </Route>
            <Route path="/crear-pedido" element={<DetalleLocal/>} />
            <Route path="/detalle-pedido">
                <Route index element={<DetallePedido />} />
                <Route path=":id" element={<PaginaDetallePedido />} />
            </Route>
        </Route>
    </Routes>

export const AlgoQuePedirRouter = () =>
    <Router>
        <AQPRoutes />
    </Router>