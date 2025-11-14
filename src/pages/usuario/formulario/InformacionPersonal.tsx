import { CampoTexto } from '@/components/label-input/CampoTexto'
import { validar } from '@/utils/validar'
import { Avatar, Card, Heading, HStack, IconButton, Stack, Text, VStack } from '@chakra-ui/react'
import { preferencias } from '../subrutasPerfil'
import { FaChevronRight } from 'react-icons/fa'
import type { PerfilContextType } from '../Perfil'
import { useOutletContext } from 'react-router-dom'
import { CompositeValidacion, validacionStrategy } from '@/utils/validacionStrategy'
import { Button } from '@/components/boton/boton'
import { useEffect, useState } from 'react'
import { Usuario } from '@/domain/Usuario'
import { usuarioService } from '@/services/usuarioService'
import { toaster } from '@/components/chakra-toaster/toaster'
import { getMensajeError } from '@/utils/errorHandling'

export const InformacionPersonal = () => {
    const { usuario, setUsuario, actualizar, gotoPreferencias } = useOutletContext<PerfilContextType>()
    const [usuarioForm, setUsuarioForm] = useState<Usuario>(usuario)
    
    // Sincroniza el estado local cuando cambia el usuario principal
    useEffect(() => {
        setUsuarioForm(usuario)
    }, [usuario])

    // Actualizacion local del form
    const actualizarForm = (referencia: keyof Usuario, valor: unknown) => {
        setUsuarioForm(Object.assign(new Usuario(), { ...usuarioForm, [referencia]: valor }))
    }

    // Guardar cambios
    const guardar = () => {
        try {
            setUsuario(usuarioForm)

            // Validar y guardar en el back
            // usuarioForm.validarCambios()
            // await 
            usuarioService.actualizar(usuarioForm)

            toaster.create({
                title: 'Usuario actualizado',
                description: 'Los datos se actualizaron con éxito.',
                type: 'success'
            })
        } catch (error: unknown) {
            const errorMessage = getMensajeError(error)
            toaster.create({
                title: 'Error al actualizar',
                description: errorMessage,
                type: 'error'
            })
        }
    }

    // Validaciones compuestas para los numeros:
    const validacionNumerica = new CompositeValidacion()
    validacionNumerica.agregar(validacionStrategy.valorRequerido)
    validacionNumerica.agregar(validacionStrategy.rangoNumerido)
    
    return (
        <Stack py='5'>
            <Heading as='h1' size='md' textAlign="center">Perfil</Heading>
                        
            {/* Preview de la informacion del usuario */}
            <VStack py='3'>
                <Avatar.Root size='2xl'>
                    <Avatar.Image src={usuario.imagen}/>
                </Avatar.Root> 
                <Heading as='h2' size='2xl'>{usuario.nombre} {usuario.apellido}</Heading>
                <Text color='textoSecundario'>{usuario.email}</Text>
            </VStack>
            
            <Card.Root variant='outline'>
                <Card.Header>
                    <Card.Title>Informacion Personal</Card.Title>
                </Card.Header>
                <Card.Body>
                    <Stack gap='4'>
                        <CampoTexto validacion={validar(usuarioForm.nombre, 'textoRequerido', 'nombre')} nombreLabel='Nombre' nombreTest='nombre' placeholder='Nombre'
                        value={usuarioForm.nombre} onChange={(event) => actualizarForm('nombre', event.target.value)} />

                        <CampoTexto validacion={validar(usuarioForm.apellido, 'textoRequerido', 'apellido')} nombreLabel='Apellido' nombreTest='apellido' placeholder='Apellido'
                        value={usuarioForm.apellido} onChange={(event) => actualizarForm('apellido', event.target.value)} />
                        
                        <CampoTexto validacion={validar(usuarioForm.direccion, 'textoRequerido', 'direccion')} nombreLabel='Direccion' nombreTest='direccion' placeholder='Direccion'
                        value={usuarioForm.direccion} onChange={(event) => actualizarForm('direccion', event.target.value)} />

                        <CampoTexto validacion={validar(usuarioForm.ubicacion, 'textoRequerido', 'ubicacion')} nombreLabel='Ubicación' nombreTest='ubicacion' placeholder='Ciudad, Provincia'
                        value={usuarioForm.ubicacion} onChange={(event) => actualizarForm('ubicacion', event.target.value)} />

                        <Stack direction='row'>
                            <CampoTexto validacion={validar(usuarioForm.latitud, validacionNumerica, 'latitud', {min: -90, max: 90})} nombreLabel='Latitud' nombreTest='latitud' 
                            placeholder='Ej: -34.61' type='number' value={usuarioForm.latitud} onChange={(event) => actualizarForm('latitud', event.target.value)} />
                            
                            <CampoTexto validacion={validar(usuarioForm.longitud, validacionNumerica, 'longitud', {min: -180, max: 180})} nombreLabel='Longitud' nombreTest='longitud' 
                            placeholder='Ej: 58.38' type='number' value={usuarioForm.longitud} onChange={(event) => actualizarForm('longitud', event.target.value)} />
                        </Stack>
                    </Stack>
                </Card.Body>
            </Card.Root>

            {/* Navegacion a preferencias */}
            <Card.Root variant='outline'>
                <Card.Header>
                    <Card.Title>Preferencias</Card.Title>
                </Card.Header>
                <Card.Body>
                    <Stack>
                        {preferencias.map((opcion) => (
                            <HStack justify="space-between" align="center"
                            key={opcion.vista} onClick={(() => gotoPreferencias(opcion))}>
                                <Text>{opcion.label}</Text>
                                <IconButton variant='ghost' size="sm"
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