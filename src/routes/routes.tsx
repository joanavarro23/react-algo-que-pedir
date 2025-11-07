// RUTAS DE LA PAGINA [React Routes]
import { CheckoutPedido } from '@/pages/checkout-pedido/Checkout'
import { PerfilUsuario } from '@/pages/usuario/Perfil'
import { CriteriosBusqueda } from '@/pages/usuario/preferencias/CriteriosBusqueda'
import { IngredientesEvitar, IngredientesPreferidos } from '@/pages/usuario/preferencias/Ingredientes'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { AppLayout } from '@/components/layout/AppLayout'
import { DetalleLocal } from '@/pages/detalle-local/DetalleLocal'

export const AQPRoutes = () =>
    <Routes>
        {/* El layout envuelve al resto de las paginas*/ }
        <Route path="/" element={ <AppLayout /> }>
            <Route path="/perfil-usuario" element={ <PerfilUsuario/> }> {/* ACA IRIAN LAS SUBRUTAS DEL PERFIL */}</Route>
            <Route path="criterios-busqueda" element={<CriteriosBusqueda />} />
            <Route path="ingredientes-preferidos" element={<IngredientesPreferidos />} />
            <Route path="ingredientes-evitar" element={<IngredientesEvitar />} />
            <Route path="/checkout-pedido" element={<CheckoutPedido/>}> </Route>
            <Route path="/crear-pedido" element={<DetalleLocal/>} />
        </Route>
        <Route path="*" element={ <Navigate to={'/'}/> } />
    </Routes>

export const AlgoQuePedirRouter = () =>
    <Router>
        <AQPRoutes />
    </Router>