// RUTAS DE LA PAGINA [React Routes]
import { CheckoutPedido } from '@/pages/checkout-pedido/Checkout'
import { PerfilUsuario } from '@/pages/usuario/Perfil'
import { CriteriosBusqueda } from '@/pages/usuario/preferencias/criteriosBusqueda'
import { IngredientesEvitar, IngredientesPreferidos } from '@/pages/usuario/preferencias/Ingredientes'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { AppLayout } from '@/components/layout/AppLayout'
import { DetalleLocal } from '@/pages/detalle-local/DetalleLocal'
import { InformacionPersonal } from '@/pages/usuario/formulario/InformacionPersonal'
import { LoginUsuario } from '@/pages/login/login'
import { RegisterUsuario } from '@/pages/register/register'

export const AQPRoutes = () =>
    <Routes>
        {/* El layout envuelve al resto de las paginas*/ }
        <Route path="/" element={ <AppLayout /> }>
            <Route path="perfil-usuario" element={ <PerfilUsuario/> }>
                <Route index element={<InformacionPersonal />} />
                <Route path="criterios-busqueda" element={<CriteriosBusqueda />} />
                <Route path="ingredientes-preferidos" element={<IngredientesPreferidos />} />
                <Route path="ingredientes-evitar" element={<IngredientesEvitar />} />
            </Route>
            <Route path="/checkout-pedido" element={<CheckoutPedido/>}> </Route>
            <Route path="/crear-pedido" element={<DetalleLocal/>} />
            <Route path="/login" element={<LoginUsuario/>} />
            <Route path="/register" element={<RegisterUsuario/>} />
        </Route>
        <Route path="*" element={ <Navigate to={'/'}/> } />
    </Routes>

export const AlgoQuePedirRouter = () =>
    <Router>
        <AQPRoutes />
    </Router>