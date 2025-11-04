import { Button } from '@/components/boton/boton'
import { Avatar, Card, Field, Heading, Input, Stack, Text, VStack } from '@chakra-ui/react'

export const PerfilUsuario = () => {
    return(
        <Stack py='5'>
           <Heading as='h1' size='md' textAlign="center">Perfil</Heading>
            {/* Preview de la informacion del usuario */}
           <VStack py='5'>
                <Avatar.Root size='2xl'>
                    <Avatar.Image src='/usuario-chica.png'/>
                </Avatar.Root> 
                <Heading as='h2' size='2xl'>Nombre Apellido</Heading>
                <Text color='parrafos'>email@gmail.com</Text>
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
                            <Input placeholder='Nombre'/>
                        </Field.Root>
                        <Field.Root>
                            <Field.Label>Apellido</Field.Label>
                            <Input placeholder='Apellido'/>
                        </Field.Root>
                        <Field.Root>
                            <Field.Label>Dirección</Field.Label>
                            <Input placeholder='Dirección'/>
                        </Field.Root>
                        <Field.Root>
                            <Field.Label>Ubicación</Field.Label>
                            <Input placeholder='Ciudad, Provincia'/>
                        </Field.Root>
                        <Stack direction='row'>
                            <Field.Root>
                                <Field.Label>Latitud</Field.Label>
                                <Input type='number' placeholder='Ej: -34.61'/>
                            </Field.Root>
                            <Field.Root>
                                <Field.Label>Longitud</Field.Label>
                                <Input type='number' placeholder='Ej: 58.38'/>
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