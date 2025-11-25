import { Button } from '@/components/boton/boton'
import { ModalIngredientes } from '@/components/perfil-usuario/modalListaIngredientes'
import { Usuario } from '@/domain/Usuario'
import { Flex, Heading, HStack, IconButton, Stack, Text } from '@chakra-ui/react'
import { IoMdArrowBack } from 'react-icons/io'
import { useOutletContext, type useNavigate } from 'react-router-dom'
import type { PerfilContextType } from '../Perfil'
import { useState } from 'react'
import type { Ingrediente } from '@/domain/Ingrediente'
import { toaster } from '@/components/chakra-toaster/toaster'
import { MdClose } from 'react-icons/md'

type ContextType = {
    data: Usuario
    navigate: ReturnType<typeof useNavigate>
}
export const IngredientesPreferidos = () => {
    const { usuario, setUsuario, navigate } = useOutletContext<PerfilContextType>()

    const [modalAbierto, setModalAbierto] = useState(false)

    const agregarIngredientes = (ingredientes: Ingrediente[]) => {
        setUsuario(Object.assign(new Usuario(), {...usuario, ingredientesPreferidos: ingredientes}))
        
        toaster.create({
            title: 'Ingredientes actualizados',
            description: 'Los cambios se guardarán cuando presiones "Guardar cambios"',
            type: 'info',
        })
    }

    const eliminarIngrediente = (id: number) => {
        
    }

    const volver = () => navigate(-1)

    return (
        <>
            <Stack py={5} px={4} minH="100vh" bg="gray.50">
                {/* Header */}
                <HStack mb={4}>
                    <IconButton 
                        variant="ghost" 
                        onClick={volver}
                        aria-label="Volver"
                    >
                        <IoMdArrowBack size={24} />
                    </IconButton>
                    <Heading as='h1' size="lg">Ingredientes preferidos</Heading>
                </HStack>

                {/* Lista de ingredientes */}
                <Stack gap={2} flex={1}>
                    {usuario.ingredientesPreferidos.length > 0 ? (
                        usuario.ingredientesPreferidos.map((ingrediente) => (
                            <Flex
                                key={ingrediente.id}
                                justify="space-between"
                                align="center"
                                p={3}
                                bg="white"
                                borderRadius="md"
                                shadow="sm"
                            >
                                <Text fontWeight="medium">{ingrediente.nombre}</Text>
                                <IconButton
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => eliminarIngrediente(ingrediente.id!)}
                                    aria-label="Eliminar ingrediente"
                                >
                                    <MdClose size={20} />
                                </IconButton>
                            </Flex>
                        ))
                    ) : (
                        <Flex 
                            justify="center" 
                            align="center" 
                            minH="200px"
                        >
                            <Text color="gray.500">
                                No hay ingredientes preferidos
                            </Text>
                        </Flex>
                    )}
                </Stack>

                {/* Botón agregar ingrediente */}
                <Button
                    onClick={() => setModalAbierto(true)}
                    colorScheme="red"
                    w="full"
                    position="sticky"
                    bottom={4}
                >
                    Añadir ingrediente
                </Button>
            </Stack>

            {/* Modal de selección */}
            <ModalIngredientes
                open={modalAbierto}
                onClose={() => setModalAbierto(false)}
                ingredientesSeleccionados={usuario.ingredientesPreferidos}
                ingredientesExcluidos={usuario.ingredientesEvitar}
                onSeleccionar={agregarIngredientes}
                titulo="Seleccionar ingredientes preferidos"
            />
        </>
    )
}

export const IngredientesEvitar = () => {
    const { usuario, setUsuario, navigate } = useOutletContext<PerfilContextType>()
    
    const [modalAbierto, setModalAbierto] = useState(false)

    const agregarIngredientes = (ingredientes: Ingrediente[]) => {
        setUsuario(Object.assign(new Usuario(), {...usuario, ingredientesEvitar: ingredientes}))
        
        toaster.create({
            title: 'Ingredientes actualizados',
            description: 'Los cambios se guardarán cuando presiones "Guardar cambios"',
            type: 'info',
        })
    }

    const eliminarIngrediente = (id: number) => {

    }

    const volver = () => navigate(-1)

    return (
        <>
            <Stack py={5} px={4} minH="100vh" bg="gray.50">
                {/* Header */}
                <HStack mb={4}>
                    <IconButton 
                        variant="ghost" 
                        onClick={volver}
                        aria-label="Volver"
                    >
                        <IoMdArrowBack size={24} />
                    </IconButton>
                    <Heading as='h1' size="lg">Ingredientes a evitar</Heading>
                </HStack>

                {/* Lista de ingredientes */}
                <Stack gap={2} flex={1}>
                    {usuario.ingredientesEvitar.length > 0 ? (
                        usuario.ingredientesEvitar.map((ingrediente) => (
                            <Flex
                                key={ingrediente.id}
                                justify="space-between"
                                align="center"
                                p={3}
                                bg="white"
                                borderRadius="md"
                                shadow="sm"
                            >
                                <Text fontWeight="medium">{ingrediente.nombre}</Text>
                                <IconButton
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => eliminarIngrediente(ingrediente.id!)}
                                    aria-label="Eliminar ingrediente"
                                >
                                    <MdClose size={20} />
                                </IconButton>
                            </Flex>
                        ))
                    ) : (
                        <Flex 
                            justify="center" 
                            align="center" 
                            minH="200px"
                        >
                            <Text color="gray.500">
                                No hay ingredientes a evitar
                            </Text>
                        </Flex>
                    )}
                </Stack>

                {/* Botón agregar ingrediente */}
                <Button
                    onClick={() => setModalAbierto(true)}
                    colorScheme="red"
                    w="full"
                    position="sticky"
                    bottom={4}
                >
                    Añadir ingrediente
                </Button>
            </Stack>

            {/* Modal de selección */}
            <ModalIngredientes
                open={modalAbierto}
                onClose={() => setModalAbierto(false)}
                ingredientesSeleccionados={usuario.ingredientesEvitar}
                ingredientesExcluidos={usuario.ingredientesPreferidos}
                onSeleccionar={agregarIngredientes}
                titulo="Seleccionar ingredientes a evitar"
            />
        </>
    )
}