/* eslint-disable react-hooks/rules-of-hooks */
import { CampoTexto } from '@/components/label-input/CampoTexto'
import { useValidacion } from '@/customHooks/useValidacion'
import { Usuario } from '@/domain/Usuario'
import { Card, HStack, IconButton, Stack, Text } from '@chakra-ui/react'
import { preferencias, type Preferencias } from '../subrutasPerfil'
import { FaChevronRight } from 'react-icons/fa'

export const InformacionPersonal = ({ data, actualizar, navegacion }: { data: Usuario, actualizar: (campo: keyof Usuario, valor: unknown) => void, navegacion: (opcion: Preferencias) => void}) => {
    // Validaciones compuestas para los numeros:
    const latitudValidacion = useValidacion(data.latitud, 'valorRequerido') || useValidacion(data.latitud, 'rangoNumerido', {min: -90, max: 90})
    const longitudValidacion = useValidacion(data.longitud, 'valorRequerido') || useValidacion(data.longitud, 'rangoNumerido', {min: -180, max: 180})

    return (
        <Stack>
            <Card.Root variant='outline'>
                <Card.Header>
                    <Card.Title>Informacion Personal</Card.Title>
                </Card.Header>
                <Card.Body>
                    <Stack gap='4'>
                        <CampoTexto invalid={useValidacion(data.nombre, 'textoRequerido')} nombreLabel='Nombre' nombreTest='nombre' placeholder='Nombre'
                        value={data.nombre} onChange={(event) => actualizar('nombre', event.target.value)} msjError='El campo nombre es requerido' />

                        <CampoTexto invalid={useValidacion(data.apellido, 'textoRequerido')} nombreLabel='Apellido' nombreTest='apellido' placeholder='Apellido'
                        value={data.apellido} onChange={(event) => actualizar('apellido', event.target.value)} msjError='El campo apellido es requerido' />
                        
                        <CampoTexto invalid={useValidacion(data.direccion, 'textoRequerido')} nombreLabel='Direccion' nombreTest='direccion' placeholder='Direccion'
                        value={data.direccion} onChange={(event) => actualizar('direccion', event.target.value)} msjError='El campo dirección es requerido' />

                        <CampoTexto invalid={useValidacion(data.ubicacion, 'textoRequerido')} nombreLabel='Ubicación' nombreTest='ubicacion' placeholder='Ciudad, Provincia'
                        value={data.ubicacion} onChange={(event) => actualizar('ubicacion', event.target.value)} msjError='El campo ubicación es requerido' />

                        <Stack direction='row'>
                            <CampoTexto invalid={latitudValidacion} nombreLabel='Latitud' nombreTest='latitud' placeholder='Ej: -34.61' type='number'
                            value={data.latitud} onChange={(event) => actualizar('latitud', event.target.value)} msjError='El campo latitud es requerido y debe estar entre -90 y 90' />
                            
                            <CampoTexto invalid={longitudValidacion} nombreLabel='Longitud' nombreTest='longitud' placeholder='Ej: 58.38' type='number'
                            value={data.longitud} onChange={(event) => actualizar('longitud', event.target.value)} msjError='El campo longitud es requerido y debe estar entre -180 y 180' />
                        </Stack>
                    </Stack>
                </Card.Body>
            </Card.Root>

            <Card.Root variant='outline'>
                <Card.Header>
                    <Card.Title>Preferencias</Card.Title>
                </Card.Header>
                <Card.Body>
                    <Stack>
                        {preferencias.map((opcion) => (
                            <HStack justify="space-between" align="center"
                            key={opcion.path} onClick={(() => navegacion(opcion))}>
                                <Text>{opcion.label}</Text>
                                <IconButton variant='outline' size="sm"
                                ><FaChevronRight /></IconButton>
                            </HStack>
                        ))}
                    </Stack>
                </Card.Body>
            </Card.Root>
        </Stack>
    )
}