import { Button } from '@/components/boton/boton'
import { toaster } from '@/components/chakra-toaster/toaster'
import { useOnInit } from '@/customHooks/useOnInit'
import { Usuario } from '@/domain/Usuario'
import { usuarioService } from '@/services/usuarioService'
import { getMensajeError } from '@/utils/errorHandling'
import { Avatar, Heading, Stack, Text, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { useNavigate, type ErrorResponse } from 'react-router-dom'
import { InformacionPersonal } from './formulario/InformacionPersonal'
import { CriteriosBusqueda } from './preferencias/CriteriosBusqueda'
import { IngredientesEvitar, IngredientesPreferidos } from './preferencias/Ingredientes'
import type { Preferencias } from './subrutasPerfil'

export const PerfilUsuario = () => {
    const imagen = '/usuario-chica.png'
    // const { id }= useParams()
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
        setVistaActual(opcion.vista)
        navigate(opcion.path)
    }

    // Manejo de los datos entre la navegacion
    const [vistaActual, setVistaActual] = useState<string>('form')
    const mostrarVista = () => {
        switch (vistaActual) {
            case 'form':
                return <InformacionPersonal data={usuario} actualizar={actualizar} navegacion={gotoPreferencias}/> 
            case 'busqueda':
                return <CriteriosBusqueda/>
            case 'preferidos':
                return <IngredientesPreferidos/>
            case 'evitar':
                return <IngredientesEvitar/>
        }
    }
    
    return(
        <Stack py='5'>
           <Heading as='h1' size='md' textAlign="center">Perfil</Heading>
            {/* Preview de la informacion del usuario */}
           <VStack py='3'>
                <Avatar.Root size='2xl'>
                    <Avatar.Image src={imagen}/>
                </Avatar.Root> 
                <Heading as='h2' size='2xl'>{usuario.nombre} {usuario.apellido}</Heading>
                <Text color='textoSecundario'>{usuario.email}</Text>
           </VStack>

            {mostrarVista()}

           <Button onClick={guardar}>Guardar Cambios</Button>
        </Stack>
    )
}