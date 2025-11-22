/* eslint-disable no-undef */
import { toaster } from '@/components/chakra-toaster/toaster'
import { useOnInit } from '@/customHooks/useOnInit'
import { Usuario } from '@/domain/Usuario'
import { usuarioService } from '@/services/usuarioService'
import { getMensajeError } from '@/utils/errorHandling'
import { useState, type Dispatch, type SetStateAction } from 'react'
import { Outlet, useNavigate, type ErrorResponse } from 'react-router-dom'
import type { Preferencias } from './subrutasPerfil'

export type PerfilContextType = {
    usuario: Usuario
    setUsuario: Dispatch<SetStateAction<Usuario>> //
    guardarUsuario: (usuarioActualizado: Usuario) => void
    navigate: ReturnType<typeof useNavigate>
    gotoPreferencias: (opcion: Preferencias) => void
}

export const PerfilUsuario = () => {
    const [usuario, setUsuario] = useState<Usuario>(new Usuario())
    const navigate = useNavigate()
    
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

    // Guardar y actualizar el usuario
    const guardarUsuario = async (usuarioActualizado: Usuario) => {
        try {
            usuarioActualizado.validarCambios()
            const usuarioGuardado = await usuarioService.actualizar(usuarioActualizado)
            setUsuario(usuarioGuardado)

            toaster.create({
                title: 'Usuario actualizado',
                description: 'Los datos se actualizaron con éxito.',
                type: 'success'
            })
        } catch (error: unknown) {
            const errorMessage = getMensajeError(error as ErrorResponse)
            toaster.create({
                title: 'Error al guardar cambios',
                description: errorMessage,
                type: 'error'
            })
        }
    }

    // Navegación a las preferencias
    const gotoPreferencias = (opcion: Preferencias) => {
        navigate(opcion.path)
    }

    return <>
        <Outlet context={{usuario, setUsuario, traerUsuario, navigate, gotoPreferencias}}/>
    </>           
}