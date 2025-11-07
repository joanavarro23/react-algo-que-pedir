import { Button } from '@/components/boton/boton'
import { ItemRow } from '@/components/itemRow/itemRow'
import { criterios } from '@/pages/usuario/preferencias/criterios'
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
                    {criterios.map((criterio) => (
                        <CheckboxCard.Root key={criterio.value} value={criterio.value} >
                            <CheckboxCard.HiddenInput />
                            <CheckboxCard.Control >
                                <CheckboxCard.Content>
                                    <CheckboxCard.Label>{criterio.titulo}</CheckboxCard.Label>
                                    <CheckboxCard.Description>
                                        {criterio.descripcion}
                                    </CheckboxCard.Description>
                                </CheckboxCard.Content>
                                <CheckboxCard.Indicator />
                            </CheckboxCard.Control>
                            {criterio.items && (
                                <CheckboxCard.Addon>
                                    {criterio.items.map((item) => (
                                        <ItemRow titulo={item.nombre} subtitulo={item.detalles} id={item.id} icono={<MdClose/>} />
                                    ))}
                                </CheckboxCard.Addon>
                            )}    
                        </CheckboxCard.Root>
                    ))}
                </Stack>
            </CheckboxGroup>

            <Button>Guardar</Button>
        </Stack>
    )
}