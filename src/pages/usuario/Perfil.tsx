import { Button } from '@/components/boton/boton'
import { Avatar, Card, Field, Heading, Input, Stack, Text, VStack } from '@chakra-ui/react'

export const PerfilUsuario = () => {
    return(
        <Stack>
            {/* Preview de la informacion del usuario */}
           <Heading as='h1'>Perfil</Heading>
           <VStack>
                <Avatar.Root>
                    <Avatar.Image src='/usuario-chica.png'/>
                </Avatar.Root> 
                <Heading as='h2'>Nombre</Heading>
                <Text color='parrafos'>Email</Text>
           </VStack>
           {/* Informacion personal */}
           <Card.Root>
                <Card.Header>
                    <Card.Title>Informacion Personal</Card.Title>
                </Card.Header>
                <Card.Body>
                    <Stack>
                        <Field.Root>
                            <Field.Label>Nombre</Field.Label>
                            <Input />
                        </Field.Root>
                        <Field.Root>
                            <Field.Label>Apellido</Field.Label>
                            <Input />
                        </Field.Root>
                        <Field.Root>
                            <Field.Label>Dirección</Field.Label>
                            <Input />
                        </Field.Root>
                        <Field.Root>
                            <Field.Label>Ubicación</Field.Label>
                            <Input />
                        </Field.Root>
                        <Stack direction='row'>
                            <Field.Root>
                                <Field.Label>Latitud</Field.Label>
                                <Input type='number'/>
                            </Field.Root>
                            <Field.Root>
                                <Field.Label>Longitud</Field.Label>
                                <Input type='number'/>
                            </Field.Root>
                        </Stack>
                    </Stack>
                </Card.Body>
           </Card.Root>
           {/* Preferencias */}
           <Stack>
                <Heading as='h2'>Preferencias</Heading>
                <Text>Criterios de búsqueda</Text>
                <Text>Ingredientes preferidos</Text>
                <Text>Ingredientes a evitar</Text>
           </Stack>
           <Button>Guardar Cambios</Button>
        </Stack>
    )
}