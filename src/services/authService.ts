import axios from 'axios'
import { REST_SERVER_URL } from './constants'
import { toaster } from '@/components/chakra-toaster/toaster'
import type { RegisterData, LoginData, AuthResponseUsuario } from '@/types/UsuarioTypes'


export const login = async (data: LoginData): Promise<AuthResponseUsuario> => {
    const url = `${REST_SERVER_URL}/api/login`

    try {
        const response = await axios.post<AuthResponseUsuario>(url, data)

        //Si el back responde todo OK --> login exitoso con el setItem del Local Storage de id y nombre
        if (response.data.success && response.data.usuario) {
            localStorage.setItem('idUsuario', response.data.usuario.id.toString())
            localStorage.setItem('nombreUsuario', response.data.usuario.nombre)
          
        }

        toaster.create({
            title: 'Bienvenido a Algo que Pedir',
            description: `Hola, ${response.data.usuario.nombre}!`,
            type: 'success',
            duration: 3000
        })

        return response.data
    } catch (error) {
        handleAuthError(error, 'Error al iniciar sesión')       //Llama al handler de errores
        throw error
    }
}

export const logout = () => {
    localStorage.removeItem('idUsuario')
    localStorage.removeItem('nombreUsuario')

    toaster.create({
        title: 'Sesión cerrada',
        description: 'Has cerrado la sesion correctamente',
        type: 'info',
        duration: 3000
    })
}

export const registro = async (data: RegisterData): Promise<AuthResponseUsuario> => {
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

    } catch (error) {
        handleAuthError(error, 'Error en el registro')      //Llama al handler de errores
        throw error
    }
}

//Auxiliar para handlear los errores de ambos casos
const handleAuthError = (error: any, titulo: string) => {
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
        title: titulo,
        description: errorMessage,
        type: 'error',
        duration: 4000
    })
}