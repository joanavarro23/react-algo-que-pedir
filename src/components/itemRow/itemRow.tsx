import { HStack, IconButton, Stack, Text } from '@chakra-ui/react'
import type { ReactNode } from 'react'

interface ItemRowProps {
    key: number,
    titulo: string
    subtitulo?: string
    icono?: ReactNode //Iconos de react
    onClick?: () => void
}

export const ItemRow = ({ key, titulo, subtitulo, icono, onClick }: ItemRowProps ) => {
    return(
        <HStack justifyContent='space-between' key={key}>
            <Stack>
                <Text fontWeight='semibold' fontSize='md'>{titulo}</Text>
                {subtitulo && (
                    <Text fontSize='sm'>{subtitulo}</Text>
                )}
            </Stack>
            {icono && (
                <IconButton variant='ghost' onClick={onClick}>{icono}</IconButton>
            )}
        </HStack>
    )
}