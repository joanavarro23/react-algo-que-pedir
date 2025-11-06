import { Button } from '@/components/boton/boton'
import { criterios, restaurantes } from '@/pages/usuario/preferencias/criterios'
import { CheckboxCard, CheckboxGroup, Heading, HStack, IconButton, Stack, Text } from '@chakra-ui/react'
import { IoMdArrowBack } from 'react-icons/io'
import { MdClose } from 'react-icons/md'

export const CriteriosBusqueda = () => {
    return (
        <Stack py='5'>
            <HStack alignItems='center' justifyContent='center'>
                <IconButton variant="ghost"><IoMdArrowBack/></IconButton>
                <Heading as='h1'>Selecciona tu criterio</Heading>
            </HStack>

            <CheckboxGroup>
                <Stack gap="2">
                    {criterios.map((item) => (
                        <CheckboxCard.Root key={item.value} value={item.value} >
                            <CheckboxCard.HiddenInput />
                            <CheckboxCard.Control >
                                <CheckboxCard.Content>
                                    <CheckboxCard.Label>{item.title}</CheckboxCard.Label>
                                    <CheckboxCard.Description>
                                        {item.description}
                                    </CheckboxCard.Description>
                                </CheckboxCard.Content>
                                <CheckboxCard.Indicator />
                            </CheckboxCard.Control>
                            {item.extra && (
                                <CheckboxCard.Addon>
                                    {restaurantes.map((restaurante) => (
                                        <HStack justifyContent='space-between'>
                                            <Stack key={restaurante.id} align='center'>
                                                <Heading as='h2'>{restaurante.nombre}</Heading>
                                                <Text>{restaurante.detalles}</Text>
                                            </Stack>
                                            <IconButton variant='ghost'><MdClose/></IconButton>
                                        </HStack>
                                    ))}
                                </CheckboxCard.Addon>
                            )}    
                        </CheckboxCard.Root>
                    ))}
                </Stack>
                {/* <CheckboxCard.Root key='fiel' value='fiel' >
                    <CheckboxCard.HiddenInput />
                    <CheckboxCard.Control >
                        <CheckboxCard.Content>
                            <CheckboxCard.Label>Fieles</CheckboxCard.Label>
                            <CheckboxCard.Description>
                                Sólo los restaurantes preferidos
                            </CheckboxCard.Description>
                        </CheckboxCard.Content>
                        <CheckboxCard.Indicator />
                    </CheckboxCard.Control>
                    <CheckboxCard.Addon>
                        <HStack gap={3}>

                        </HStack>
                    </CheckboxCard.Addon>
                </CheckboxCard.Root> */}
            </CheckboxGroup>

            <Button>Guardar</Button>
        </Stack>
    )
}