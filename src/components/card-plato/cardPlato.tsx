import type { Plato } from  '@/mocks/platosMock'
import { Box, Flex, Heading, Image, Tag, Text, VStack } from '@chakra-ui/react'

interface CardPlatoProps {
    plato: Plato
}

export const CardPlato = ( {plato} : CardPlatoProps ) => {
    return (
        <Flex w="100%" align="center" py="1" px="0" gap="1.5">
            
            <VStack align="flex-start" w="70%">
                {plato.popular && <Tag.Root size="sm" color="parrafos" bg="none" variant="subtle" p="0"><Tag.Label>Popular</Tag.Label></Tag.Root>}
                <Heading as="h1" size="md" fontWeight="semibold"> {plato.nombre} </Heading>
                <Text textStyle="xs" fontWeight="medium" color="parrafos">
                {plato.descripcion}
                </Text>
                <Text textStyle="xs" fontWeight="semibold" bgColor="#fcebebff" borderRadius="md" p="1" px="3.5">${plato.precio.toFixed(2)}</Text>
            </VStack>

            <Box w="35%">
                <Image 
                src={plato.imagenUrl} 
                alt={plato.nombre} 
                boxSize="120px" 
                objectFit="cover" 
                borderRadius="md" 
                />
            </Box>
        </Flex>
    )
}