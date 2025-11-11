import { Heading, HStack, IconButton, Stack, Text } from '@chakra-ui/react'
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
        <HStack justifyContent='space-between'>
            <Stack key={id}>
                <Text>{titulo}</Text>
                {subtitulo && (
                    <Heading as='p' size='xs'>{subtitulo}</Heading>
                )}
            </Stack>
            {icono && (
                <IconButton variant='ghost' onClick={onClick}>{icono}</IconButton>
            )}
        </HStack>
    )
}