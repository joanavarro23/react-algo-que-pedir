import { Dialog, VStack, Image, Heading, Text, HStack, IconButton, Flex } from '@chakra-ui/react'
import { FaPlus, FaMinus } from 'react-icons/fa'
import { useState } from 'react'
import type { Plato } from '@/mocks/platosMock'
import { Button } from '@/components/boton/boton'

interface PlatoModalProps {
    plato: Plato
    open: boolean
    onClose: () => void
    onAgregar: (plato: Plato, cantidad: number) => void
    cantidadActual: number
}

export const PlatoModal = ({
    plato,
    open,
    onClose,
    onAgregar,
    cantidadActual = 0
}: PlatoModalProps) => {
    {/*Entiendo que muestra lo que agregas o 1 si es por 1era vez*/}
    const [cantidad, setCantidad] = useState(cantidadActual > 0 ? cantidadActual : 1) 

    {/*Cada modal arranca con cantidad en 0*/}
    const resetCantidad = () => setCantidad(cantidadActual)

    {/*Funciones para los botones de sumar/restar item*/}
    const incrementaItem = () => setCantidad( numero => numero + 1 )
    const decrementaItem = () => setCantidad( numero => numero > 1 ? numero - 1 : 1)

    {/* Funcion para agregar ligada al boton */}
    const botonAgregarItem = () => {
        onAgregar(plato, cantidad)
    }

    return(
        <Dialog.Root open={open} onOpenChange={onClose} placement="center"> {/* Codigo del modal */}
            <Dialog.Backdrop />
            <Dialog.Positioner>
                <Dialog.Content>
                    <VStack gap="3" w="100%">
                        <Image src={plato.imagenUrl} alt={plato.nombre} w="80%" h="200px" objectFit="cover"/>

                        <Dialog.Header>
                            <Heading size="lg" fontWeight="bold">{plato.nombre}</Heading>
                        </Dialog.Header>

                        <Dialog.Body>
                            <Text textStyle="sm" fontWeight="medium"> {plato.descripcion} </Text>       {/*Info del plato*/}
                            <Text textStyle="sm" fontWeight="medium"> Precio unitario: ${plato.precio.toFixed(2)}</Text>
                        </Dialog.Body>

                        <HStack>
                            <IconButton aria-label="Decrementar" onClick={decrementaItem}> <FaMinus/> </IconButton> {/*Seccion boton agregar/sacar item*/}
                            <Text fontSize="md" fontWeight="bold" px="5"> {cantidad} </Text>
                            <IconButton aria-label="Incrementar" onClick={incrementaItem}> <FaPlus/> </IconButton>
                        </HStack>

                        <Text fontSize="lg"> Precio total: ${(plato.precio * cantidad).toFixed(2)}</Text> {/*Precio final calculado*/}

                        <Dialog.Footer as={Flex} w="100%" justifyContent="space-around">     {/*Seccion botones para finalizar*/}
                            <Button onClick={onClose}>Cancelar</Button>
                            <Button onClick={botonAgregarItem}>Agregar al Pedido</Button>
                        </Dialog.Footer>
                    </VStack>
                </Dialog.Content>
            </Dialog.Positioner>
        </Dialog.Root>
    )

}