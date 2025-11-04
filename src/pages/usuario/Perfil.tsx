import { Button } from '@/components/boton/boton'
import { Avatar, Card, Field, Heading, Input, Stack, Text, VStack } from '@chakra-ui/react'
import { useState } from 'react'

export const PerfilUsuario = () => {
    const usuarioInicial = {
        nombre: 'Pepita', apellido: 'Rodriguez',
        email: 'pepita-correo@gmai.com',
        direccion: 'Calle Falsa', ubicacion: 'Disney Landia',
        latitud: -52.2, longitud: 3.6,
    }

    const [usuario, setUsuario] = useState(usuarioInicial)

    const actualizar = (referencia: keyof typeof usuario, valor: unknown) => {
        setUsuario({
            ...usuario,
            [referencia]: valor
        })
    }

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
                            <Input data-testid='input-nombre' value={usuario.nombre} placeholder='Nombre' onChange={(event: { target: {value: unknown} }) => actualizar('nombre', event.target.value)}/>
                        </Field.Root>
                        <Field.Root>
                            <Field.Label>Apellido</Field.Label>
                            <Input value={usuario.apellido} placeholder='Apellido' onChange={(event: { target: {value: unknown} }) => actualizar('apellido', event.target.value)}/>
                        </Field.Root>
                        <Field.Root>
                            <Field.Label>Dirección</Field.Label>
                            <Input value={usuario.direccion} placeholder='Dirección' onChange={(event: { target: {value: unknown} }) => actualizar('direccion', event.target.value)}/>
                        </Field.Root>
                        <Field.Root>
                            <Field.Label>Ubicación</Field.Label>
                            <Input value={usuario.ubicacion} placeholder='Ciudad, Provincia' onChange={(event: { target: {value: unknown} }) => actualizar('ubicacion', event.target.value)}/>
                        </Field.Root>
                        <Stack direction='row'>
                            <Field.Root>
                                <Field.Label>Latitud</Field.Label>
                                <Input type='number' value={usuario.latitud} placeholder='Ej: -34.61' onChange={(event: { target: {value: unknown} }) => actualizar('latitud', event.target.value)}/>
                            </Field.Root>
                            <Field.Root>
                                <Field.Label>Longitud</Field.Label>
                                <Input type='number' value={usuario.longitud} placeholder='Ej: 58.38' onChange={(event: { target: {value: unknown} }) => actualizar('longitud', event.target.value)}/>
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
                        <Text>Criterios de búsqueda</Text>
                        <Text>Ingredientes preferidos</Text>
                        <Text>Ingredientes a evitar</Text>
                    </Stack>
                </Card.Body>
           </Card.Root>

           <Button>Guardar Cambios</Button>
        </Stack>
    )
}