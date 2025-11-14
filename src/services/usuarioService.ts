import axios from 'axios'
import { REST_SERVER_URL } from './constants'
import { Usuario, type UsuarioJSON } from '@/domain/Usuario'
import { USUARIOS_MOCK } from '@/mocks/usuariosMock'

const usuarioAsJson = (usuarioJSON: UsuarioJSON) => Usuario.fromJson(usuarioJSON)

class UsuarioService {
    async getById(id: number) {
        // const usuarioJson = await axios.get(`${REST_SERVER_URL}/usuario/${id}`)
        // return usuarioAsJson(usuarioJson.data)
        return USUARIOS_MOCK[id]
    }

    actualizar(usuarioActualizar: Usuario) {
        //return axios.put(`${REST_SERVER_URL}/usuario/${usuario.id}`, usuario.toJSON())
        const usuario = this.getById(usuarioActualizar.id!)
        return { ...usuario, ...usuarioActualizar}
    }
}

export const usuarioService = new UsuarioService()