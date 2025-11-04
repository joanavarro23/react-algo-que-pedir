// RUTAS DE LA PAGINA [React Routes]
import { PerfilUsuario } from '@/pages/usuario/Perfil'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

export const AQPRoutes = () =>
    <Routes>
        <Route path="/perfilUsuario" element={<PerfilUsuario/>} />
    </Routes>

export const AlgoQuePedirRouter = () =>
    <Router>
        <AQPRoutes />
    </Router>