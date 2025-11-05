// RUTAS DE LA PAGINA [React Routes]
import { CheckoutPedido } from '@/pages/checkout-pedido/Checkout'
import { PerfilUsuario } from '@/pages/usuario/Perfil'
import { CriteriosBusqueda } from '@/pages/usuario/preferencias/criteriosBusqueda'
import { Ingredientes } from '@/pages/usuario/preferencias/ingredientes'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { AppLayout } from '@/components/layout/AppLayout'
import { DetalleLocal } from '@/pages/detalle-local/DetalleLocal'

export const AQPRoutes = () =>
    <Routes>
        /*El layout envuelve al resto de las paginas*/
        <Route path="/" element={ <AppLayout /> }>
            <Route path="/perfil-usuario" element={<PerfilUsuario/>} />
            <Route path="/perfilUsuario/preferencias/criteriosBusqueda" element={<CriteriosBusqueda />} />
            <Route path="/perfilUsuario/preferencias/ingredientes" element={<Ingredientes />} />
            <Route path="/checkout-pedido" element={<CheckoutPedido/>}> </Route>
            <Route path="/crear-pedido" element={<DetalleLocal/>} />
            <Route path="/detalle-pedido" element={<div style={{ textAlign: "center"}}>
                                                <img 
                                                    src="https://img.buzzfeed.com/buzzfeed-static/static/2018-11/2/10/asset/buzzfeed-prod-web-06/sub-buzz-4633-1541168774-1.png" 
                                                    alt="Detalle del Pedido" 
                                                    style={{ maxWidth: "100%", height: "auto" }} 
                                                />
                                                </div>} />
        </Route>
    </Routes>

export const AlgoQuePedirRouter = () =>
    <Router>
        <AQPRoutes />
    </Router>