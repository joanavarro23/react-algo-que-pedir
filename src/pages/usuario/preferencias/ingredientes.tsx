import type { Usuario } from '@/domain/Usuario'
import { Heading, IconButton, Stack } from '@chakra-ui/react'
import { IoMdArrowBack } from 'react-icons/io'
import { useOutletContext, type useNavigate } from 'react-router-dom'

type ContextType = {
    data: Usuario
    navigate: ReturnType<typeof useNavigate>
}
export const IngredientesPreferidos = () => {
    const { data, navigate } = useOutletContext<ContextType>()

    const volver = () => { navigate(-1) }
    return (
        <Stack py='5'>
            <Stack direction='row' align='center' onClick={volver}>
                <IconButton variant="ghost"><IoMdArrowBack/></IconButton>
                <Heading as='h1'>Estas en la vista de ingredientes preferidos </Heading>
            </Stack>

        </Stack>
    )
}

export const IngredientesEvitar = () => {
    const { data, navigate } = useOutletContext<ContextType>()

    const volver = () => { navigate(-1) }
    return (
        <Stack py='5'>
            <Stack direction='row' onClick={volver}>
                <IconButton variant="ghost"><IoMdArrowBack/></IconButton>
                <Heading as='h1'>Estas en la vista de ingredientes a evitar </Heading>
            </Stack>

        </Stack>
    )
}