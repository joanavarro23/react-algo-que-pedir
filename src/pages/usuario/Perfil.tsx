/* eslint-disable no-undef */
import { toaster } from '@/components/chakra-toaster/toaster'
import { useOnInit } from '@/customHooks/useOnInit'
import { Usuario } from '@/domain/Usuario'
import { usuarioService } from '@/services/usuarioService'
import { getMensajeError } from '@/utils/errorHandling'
import { Stack } from '@chakra-ui/react'
import { useState, type Dispatch, type SetStateAction } from 'react'
import { Outlet, useNavigate, type ErrorResponse } from 'react-router-dom'
import type { Preferencias } from './subrutasPerfil'

export type PerfilContextType = {
    usuario: Usuario
    setUsuario: Dispatch<SetStateAction<Usuario>> //
    traerUsuario: () => Promise<Usuario> //
    actualizar: (referencia: keyof Usuario, valor: unknown) => void
    guardar: () => Promise<Usuario>
    navigate: ReturnType<typeof useNavigate> //
    gotoPreferencias: (opcion: Preferencias) => void
}

export const PerfilUsuario = () => {
    const [usuario, setUsuario] = useState<Usuario>(new Usuario())
    
    // Carga de datos inicial
    const traerUsuario = async () => {
        try {
            const usuario = await usuarioService.getById(0) //+id!
            setUsuario(usuario)
        } catch (error: unknown) {
            const mensajeError = getMensajeError(error as ErrorResponse)
            toaster.create({
                title: 'No se puede cargar el usuario',
                description: mensajeError,
                type: 'error',
            })
        }
    }
    useOnInit(traerUsuario)

    // Actualización de los campos inputs
    const actualizar = (referencia: keyof typeof usuario, valor: unknown) => {
        setUsuario(Object.assign(new Usuario(), { ...usuario, [referencia]: valor }))
    }

    // Se guardan los cambios realizados
    const guardar = async () => {
        try {
            usuario.validarCambios()
            await usuarioService.actualizar(usuario)
            toaster.create({
                title: 'Usuario actualizado',
                description: 'Los datos se actualizaron con éxito.',
                type: 'success',
            })
        } catch (error: unknown) {
            const errorMessage = getMensajeError(error)
            toaster.create({
                title: 'Error al actualizar usuario',
                description: errorMessage,
                type: 'error'
            })
        }
    }

    // Navegación a las preferencias
    const navigate = useNavigate()
    const gotoPreferencias = (opcion: Preferencias) => {
        navigate(opcion.path)
    }

    return <>
        <Outlet context={{usuario, setUsuario, traerUsuario, actualizar, guardar, navigate, gotoPreferencias}}/>
    </>           
}