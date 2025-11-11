/* eslint-disable react-hooks/rules-of-hooks */
import { CampoTexto } from '@/components/label-input/CampoTexto'
import { useValidacion } from '@/customHooks/useValidacion'
import { Avatar, Card, Heading, HStack, IconButton, Stack, Text, VStack } from '@chakra-ui/react'
import { preferencias, type Preferencias } from '../subrutasPerfil'
import { FaChevronRight } from 'react-icons/fa'
import type { PerfilContextType } from '../Perfil'
import { useOutletContext } from 'react-router-dom'
import { validacionStrategy } from '@/utils/validacionStrategy'

export const InformacionPersonal = () => {
    const { usuario, actualizar, guardar, gotoPreferencias } = useOutletContext<PerfilContextType>()

    // Validaciones compuestas para los numeros:
    const validacionNumerica = new CompositeValidacion()
    validacionNumerica.agregar(validacionStrategy.valorRequerido)
    validacionNumerica.agregar(validacionStrategy.rangoNumerido)
    
    return (
        <Stack>
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
                        <CampoTexto validacion={useValidacion(data.nombre, 'textoRequerido', 'nombre')} nombreLabel='Nombre' nombreTest='nombre' placeholder='Nombre'
                        value={data.nombre} onChange={(event) => actualizar('nombre', event.target.value)} />

                        <CampoTexto validacion={useValidacion(data.apellido, 'textoRequerido', 'apellido')} nombreLabel='Apellido' nombreTest='apellido' placeholder='Apellido'
                        value={data.apellido} onChange={(event) => actualizar('apellido', event.target.value)} />
                        
                        <CampoTexto validacion={useValidacion(data.direccion, 'textoRequerido', 'direccion')} nombreLabel='Direccion' nombreTest='direccion' placeholder='Direccion'
                        value={data.direccion} onChange={(event) => actualizar('direccion', event.target.value)} />

                        <CampoTexto validacion={useValidacion(data.ubicacion, 'textoRequerido', 'ubicacion')} nombreLabel='Ubicación' nombreTest='ubicacion' placeholder='Ciudad, Provincia'
                        value={data.ubicacion} onChange={(event) => actualizar('ubicacion', event.target.value)} />

                        <Stack direction='row'>
                            <CampoTexto validacion={useValidacion(data.latitud, validacionNumerica, 'latitud', {min: -90, max: 90})} nombreLabel='Latitud' nombreTest='latitud' 
                            placeholder='Ej: -34.61' type='number' value={data.latitud} onChange={(event) => actualizar('latitud', event.target.value)} />
                            
                            <CampoTexto validacion={useValidacion(data.longitud, validacionNumerica, 'longitud', {min: -180, max: 180})} nombreLabel='Longitud' nombreTest='longitud' 
                            placeholder='Ej: 58.38' type='number' value={data.longitud} onChange={(event) => actualizar('longitud', event.target.value)} />
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