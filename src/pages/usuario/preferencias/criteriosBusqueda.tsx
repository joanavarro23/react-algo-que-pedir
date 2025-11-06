import { Button } from '@/components/boton/boton'
import { criterios } from '@/pages/usuario/preferencias/criterios'
import { Badge, CheckboxCard, CheckboxGroup, Flex, Heading, HStack, IconButton, Stack } from '@chakra-ui/react'
import { IoMdArrowBack } from 'react-icons/io'

export const CriteriosBusqueda = () => {
    return (
        <Stack py='5'>
            <HStack alignItems='center' justifyContent='center'>
                <IconButton variant="ghost"><IoMdArrowBack/></IconButton>
                <Heading as='h1'>Selecciona tu criterio</Heading>
            </HStack>

            <CheckboxGroup>
                <Flex gap="2" direction='column'>
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
                            <CheckboxCard.Addon>
                                <HStack>
                                Some supporting text
                                <Badge variant="solid">New</Badge>
                                </HStack>
                            </CheckboxCard.Addon>
                        </CheckboxCard.Root>
                    ))}
                </Flex>
            </CheckboxGroup>

            <Button>Guardar</Button>
        </Stack>
    )
}