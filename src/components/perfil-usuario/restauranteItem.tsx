import { Stack, Image, HStack, Text, IconButton } from '@chakra-ui/react'
import { MdClose } from 'react-icons/md'

export type RestaurenteItemProps = {
    id: number
    nombre: string
    imagen: string
    puntuacion: number
    onEliminar: (id: number) => void
}

export const RestaurenteItem = ({ id, nombre, imagen ,puntuacion, onEliminar }: RestaurenteItemProps) => {
    return(
        <HStack justifyContent='space-between' key={id}>
            <HStack>
                <Image src={imagen} objectFit='cover' overflow='hidden' boxSize='2.5rem'/>
                <Stack>
                    <Text fontSize='md'>{nombre}</Text>
                    <Text fontSize='sm'>{puntuacion} ⭐</Text>
                </Stack>
            </HStack>
            <IconButton variant='ghost' onClick={() => onEliminar(id)}> <MdClose/> </IconButton>
        </HStack>
    )
}