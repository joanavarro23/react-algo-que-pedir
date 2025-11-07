import { HStack, IconButton, Stack, Text } from '@chakra-ui/react'
import type { ReactNode } from 'react'

interface ItemRowProps {
    titulo: string
    subtitulo?: string
    id?: string | number
    icono?: ReactNode //Iconos de react
    onClick?: () => void
}

export const ItemRow = ({ titulo, subtitulo, id, icono, onClick }: ItemRowProps ) => {
    return(
        <HStack justifyContent='space-between' cursor={onClick ? 'pointer' : 'default'} onClick={onClick}>
            <Stack key={id}>
                <Text>{titulo}</Text>
                {subtitulo && (
                    <Text>{subtitulo}</Text>
                )}
            </Stack>
            {icono && <IconButton variant='ghost' onClick={onClick}>{icono}</IconButton>}
        </HStack>
    )
}