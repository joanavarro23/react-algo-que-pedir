import { Stack, Image, HStack, Text } from '@chakra-ui/react'

export type RestaurenteItemProps = {
    id: number
    nombre: string
    puntuacion: number
    tiempo: string
    precio: string
    onEliminar?: (id: number) => void
}

export const RestaurenteItem = ({ id, nombre, puntuacion, tiempo, precio, onEliminar }: RestaurenteItemProps) => {
    return(
        <HStack>
            <Image src='/restaurante.png' objectFit='cover' overflow='hidden' boxSize='2.5rem'/>
            <Stack>
                <Text>{nombre}</Text>
                <Text>{puntuacion} {tiempo} {precio}</Text>
            </Stack>
        </HStack>
    )
}