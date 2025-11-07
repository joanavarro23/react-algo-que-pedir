import { Heading, IconButton, Stack } from '@chakra-ui/react'
import { IoMdArrowBack } from 'react-icons/io'

export const IngredientesPreferidos = () => {
    return (
        <Stack py='5'>
            <Stack direction='row' align='center'>
                <IconButton variant="ghost"><IoMdArrowBack/></IconButton>
                <Heading as='h1'>Estas en la vista de ingredientes preferidos </Heading>
            </Stack>

        </Stack>
    )
}

export const IngredientesEvitar = () => {
    return (
        <Stack py='5'>
            <Stack direction='row'>
                <IconButton variant="ghost"><IoMdArrowBack/></IconButton>
                <Heading as='h1'>Estas en la vista de ingredientes a evitar </Heading>
            </Stack>

        </Stack>
    )
}