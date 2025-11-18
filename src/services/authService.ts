import axios from 'axios'
import { REST_SERVER_URL } from './constants'

type RegisterData = {
    usuario: string,
    password: string,
    confirmarPassword: string
}

type AuthResponseUsuario = {
    success: boolean,
    message: string,
    usuario?: string
}

export const registro = async (data: RegisterData) : Promise<AuthResponseUsuario> => {
    const url = `${REST_SERVER_URL}/api/registro`

    try {
        const response = await axios.post<AuthResponseUsuario>(url, data)
        return response.data
    } catch(error){
        const e = error as any
        const errorMessage = e.response?.data?.message || 'Error de conexion al servidor'
        throw new Error(errorMessage) //Toaster?
    }
}


