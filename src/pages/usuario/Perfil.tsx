import { Button } from '@/components/boton/boton'
import { toaster } from '@/components/ui/toaster'
import { useOnInit } from '@/customHooks/hooks'
import { Usuario } from '@/domain/Usuario'
import { usuarioService } from '@/services/usuarioService'
import { getMensajeError } from '@/utils/errorHandling'
import { Avatar, Card, Field, Heading, IconButton, Input, Stack, Text, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { FaChevronRight } from 'react-icons/fa'
import { useNavigate, type ErrorResponse } from 'react-router-dom'

export const PerfilUsuario = () => {
    const navigate = useNavigate()
    const usuarioVacio = new Usuario()
    const [usuario, setUsuario] = useState<Usuario>(usuarioVacio)

    const opciones = [
        { label: 'Criterios de búsqueda', path: '/perfilUsuario/preferencias/criteriosBusqueda' },
        { label: 'Ingredientes preferidos', path: '/perfilUsuario/preferencias/ingredientes' },
        { label: 'Ingredientes a evitar', path: '/perfilUsuario/preferencias/ingredientes' },
    ]

    const gotoPreferencias = (opcion: { label: string; path: string }) => {
        navigate(opcion.path)
    }

    const actualizar = (referencia: keyof typeof usuario, valor: unknown) => {
        setUsuario({
            ...usuario,
            [referencia]: valor
        })
    }

    const traerUsuario = async () => {
        try {
            const usuario = await usuarioService.getById(0)
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

    const guardar = () => {
        toaster.create({
            title: 'Usuario actualizado',
            description: 'Los datos se actualizaron con éxito.',
            type: 'success',
        })
    }

    useOnInit(traerUsuario)
    
    return(
        <Stack py='5'>
           <Heading as='h1' size='md' textAlign="center">Perfil</Heading>
            {/* Preview de la informacion del usuario */}
           <VStack py='5'>
                <Avatar.Root size='2xl'>
                    <Avatar.Image src='/usuario-chica.png'/>
                </Avatar.Root> 
                <Heading as='h2' size='2xl'>{usuario.nombre} {usuario.apellido}</Heading>
                <Text color='parrafos'>{usuario.email}</Text>
           </VStack>

           {/* Informacion personal */}
           <Card.Root variant='subtle'>
                <Card.Header>
                    <Card.Title>Informacion Personal</Card.Title>
                </Card.Header>
                <Card.Body>
                    <Stack gap='4'>
                        <Field.Root>
                            <Field.Label>Nombre</Field.Label>
                            <Input data-testid='input-nombre' value={usuario.nombre} placeholder='Nombre' 
                            onChange={(event: { target: {value: unknown} }) => actualizar('nombre', event.target.value)}/>
                        </Field.Root>
                        <Field.Root>
                            <Field.Label>Apellido</Field.Label>
                            <Input value={usuario.apellido} placeholder='Apellido' 
                            onChange={(event: { target: {value: unknown} }) => actualizar('apellido', event.target.value)}/>
                        </Field.Root>
                        <Field.Root>
                            <Field.Label>Dirección</Field.Label>
                            <Input value={usuario.direccion} placeholder='Dirección' 
                            onChange={(event: { target: {value: unknown} }) => actualizar('direccion', event.target.value)}/>
                        </Field.Root>
                        <Field.Root>
                            <Field.Label>Ubicación</Field.Label>
                            <Input value={usuario.ubicacion} placeholder='Ciudad, Provincia' 
                            onChange={(event: { target: {value: unknown} }) => actualizar('ubicacion', event.target.value)}/>
                        </Field.Root>
                        <Stack direction='row'>
                            <Field.Root>
                                <Field.Label>Latitud</Field.Label>
                                <Input type='number' value={usuario.latitud} placeholder='Ej: -34.61' 
                                onChange={(event: { target: {value: unknown} }) => actualizar('latitud', event.target.value)}/>
                            </Field.Root>
                            <Field.Root>
                                <Field.Label>Longitud</Field.Label>
                                <Input type='number' value={usuario.longitud} placeholder='Ej: 58.38' 
                                onChange={(event: { target: {value: unknown} }) => actualizar('longitud', event.target.value)}/>
                            </Field.Root>
                        </Stack>
                    </Stack>
                </Card.Body>
           </Card.Root>

           {/* Preferencias */}
           <Card.Root variant='subtle'>
                <Card.Header>
                    <Card.Title>Preferencias</Card.Title>
                </Card.Header>
                <Card.Body>
                    <Stack>
                        {opciones.map((opcion) => (
                            <Stack direction="row"
                            justify="space-between"
                            align="center"
                            key={opcion.path}
                            onClick={(() => gotoPreferencias(opcion))}
                            >
                            <Text>{opcion.label}</Text>
                            <IconButton
                                aria-label="Ir a sección"
                                variant="ghost"
                                size="sm"
                            > <FaChevronRight /> </IconButton>
                            </Stack>
                        ))}
                    </Stack>
                </Card.Body>
           </Card.Root>

           <Button onClick={guardar}>Guardar Cambios</Button>
        </Stack>
    )
}