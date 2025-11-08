/* eslint-disable react-hooks/rules-of-hooks */
import { Button } from '@/components/boton/boton'
import { toaster } from '@/components/chakra-toaster/toaster'
import { useOnInit } from '@/customHooks/useOnInit'
import { Usuario } from '@/domain/Usuario'
import { usuarioService } from '@/services/usuarioService'
import { getMensajeError } from '@/utils/errorHandling'
import { Avatar, Card, Heading, HStack, IconButton, Stack, Text, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { FaChevronRight } from 'react-icons/fa'
import { useNavigate, type ErrorResponse } from 'react-router-dom'
import { preferencias } from './preferencias/rutas'
import { useValidacion } from '@/customHooks/useValidacion'
import { CampoTexto } from '@/components/label-input/CampoTexto'

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

    // Validaciones compuestas para los numeros:
    const latitudValidacion = useValidacion(usuario.latitud, 'valorRequerido') || useValidacion(usuario.latitud, 'rangoNumerido', {min: -90, max: 90})
    const longitudValidacion = useValidacion(usuario.longitud, 'valorRequerido') || useValidacion(usuario.longitud, 'rangoNumerido', {min: -180, max: 180})

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
    const gotoPreferencias = (opcion: { label: string; path: string }) => {
        navigate(opcion.path)
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

           {/* Informacion personal */}
           <Card.Root variant='outline'>
                <Card.Header>
                    <Card.Title>Informacion Personal</Card.Title>
                </Card.Header>
                <Card.Body>
                    <Stack gap='4'>
                        <CampoTexto invalid={useValidacion(usuario.nombre, 'textoRequerido')} nombreLabel='Nombre' nombreTest='nombre' placeholder='Nombre'
                        value={usuario.nombre} onChange={(event) => actualizar('nombre', event.target.value)} msjError='El campo nombre es requerido' />

                        <CampoTexto invalid={useValidacion(usuario.apellido, 'textoRequerido')} nombreLabel='Apellido' nombreTest='apellido' placeholder='Apellido'
                        value={usuario.apellido} onChange={(event) => actualizar('apellido', event.target.value)} msjError='El campo apellido es requerido' />
                        
                        <CampoTexto invalid={useValidacion(usuario.direccion, 'textoRequerido')} nombreLabel='Direccion' nombreTest='direccion' placeholder='Direccion'
                        value={usuario.direccion} onChange={(event) => actualizar('direccion', event.target.value)} msjError='El campo dirección es requerido' />

                        <CampoTexto invalid={useValidacion(usuario.ubicacion, 'textoRequerido')} nombreLabel='Ubicación' nombreTest='ubicacion' placeholder='Ciudad, Provincia'
                        value={usuario.ubicacion} onChange={(event) => actualizar('ubicacion', event.target.value)} msjError='El campo ubicación es requerido' />

                        <Stack direction='row'>
                            <CampoTexto invalid={latitudValidacion} nombreLabel='Latitud' nombreTest='latitud' placeholder='Ej: -34.61' type='number'
                            value={usuario.latitud} onChange={(event) => actualizar('latitud', event.target.value)} msjError='El campo latitud es requerido y debe estar entre -90 y 90' />
                            
                            <CampoTexto invalid={longitudValidacion} nombreLabel='Longitud' nombreTest='longitud' placeholder='Ej: 58.38' type='number'
                            value={usuario.longitud} onChange={(event) => actualizar('longitud', event.target.value)} msjError='El campo longitud es requerido y debe estar entre -180 y 180' />
                        </Stack>
                    </Stack>
                </Card.Body>
           </Card.Root>

           {/* Preferencias */}
           <Card.Root variant='outline'>
                <Card.Header>
                    <Card.Title>Preferencias</Card.Title>
                </Card.Header>
                <Card.Body>
                    <Stack>
                        {preferencias.map((opcion) => (
                            <HStack justify="space-between" align="center"
                            key={opcion.path} onClick={(() => gotoPreferencias(opcion))}>
                                <Text>{opcion.label}</Text>
                                <IconButton variant="ghost" size="sm"
                                ><FaChevronRight /></IconButton>
                            </HStack>
                        ))}
                    </Stack>
                </Card.Body>
           </Card.Root>

           <Button onClick={guardar}>Guardar Cambios</Button>
        </Stack>
    )
}