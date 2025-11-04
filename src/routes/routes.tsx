// RUTAS DE LA PAGINA [React Routes]
import { PerfilUsuario } from '@/pages/usuario/Perfil'
import { CriteriosBusqueda } from '@/pages/usuario/preferencias/criteriosBusqueda'
import { Ingredientes } from '@/pages/usuario/preferencias/ingredientes'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

export const AQPRoutes = () =>
    <Routes>
        <Route path="/perfilUsuario" element={<PerfilUsuario/>} />
        <Route path="/perfilUsuario/preferencias/criteriosBusqueda" element={<CriteriosBusqueda />} />
        <Route path="/perfilUsuario/preferencias/ingredientes" element={<Ingredientes />} />
    </Routes>

export const AlgoQuePedirRouter = () =>
    <Router>
        <AQPRoutes />
    </Router>