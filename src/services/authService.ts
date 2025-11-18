import axios from 'axios'
import { REST_SERVER_URL } from './constants'
import { toaster } from '@/components/chakra-toaster/toaster'


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

        toaster.create({
            title: 'Exito!',
            description: 'Usuario registrado exitosamente!',
            type: 'success',
            duration: 4000
        })

        return response.data

    } catch(error){
        let errorMessage = 'Ocurrio un error inesperado'

        if (axios.isAxiosError(error)) {
            if (error.response) {
                errorMessage = error.response.data.message || 'Error en la solicitud'
            } else if (error.request) {
                errorMessage = 'No se pudo conectar con el servidor. Intente más tarde.'
            } else {
                errorMessage = error.message
            }
        }

        toaster.create({
            title: 'Ocurrio un error!',
            description: errorMessage,
            type: 'error',
            duration: 4000
        })

        throw new Error(errorMessage)
    }
}


