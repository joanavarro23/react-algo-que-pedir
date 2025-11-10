import { CampoTexto } from '@/components/label-input/CampoTexto'
import { useValidacion } from '@/customHooks/useValidacion'
import { Usuario } from '@/domain/Usuario'
import { Card, HStack, IconButton, Stack, Text } from '@chakra-ui/react'
import { preferencias } from '../subrutasPerfil'
import { FaChevronRight } from 'react-icons/fa'
import { CompositeValidacion, validacionStrategy } from '@/utils/validacionStrategy'

export const InformacionPersonal = ({ data, actualizar, navegacion }: { data: Usuario, actualizar: (campo: keyof Usuario, valor: unknown) => void, navegacion: (opcion: { label: string; path: string }) => void}) => {
    // Validaciones compuestas para los numeros:
    const validacionNumerica = new CompositeValidacion()
    validacionNumerica.agregar(validacionStrategy.valorRequerido)
    validacionNumerica.agregar(validacionStrategy.rangoNumerido)
    
    return (
        <Stack>
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
                            key={opcion.path} onClick={(() => navegacion(opcion))}>
                                <Text>{opcion.label}</Text>
                                <IconButton variant='ghost' size="sm"
                                ><FaChevronRight /></IconButton>
                            </HStack>
                        ))}
                    </Stack>
                </Card.Body>
            </Card.Root>
        </Stack>
    )
}