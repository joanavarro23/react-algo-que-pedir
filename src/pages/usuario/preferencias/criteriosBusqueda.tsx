import { Button } from '@/components/boton/boton'
import { ItemRow } from '@/components/itemRow/itemRow'
import { CRITERIOS_MOCK } from '@/pages/usuario/preferencias/criterios'
import { CheckboxCard, CheckboxGroup, Collapsible, Heading, HStack, IconButton, Stack, Text } from '@chakra-ui/react'
import { IoMdArrowBack } from 'react-icons/io'
import { MdClose } from 'react-icons/md'
import type { PerfilContextType } from '../Perfil'
import { useOutletContext } from 'react-router-dom'
import { useState } from 'react'
import { toaster } from '@/components/chakra-toaster/toaster'
import { RestaurenteItem } from '@/components/perfil-usuario/restauranteItem'
import { Contador } from '@/components/contador/contador'

export const CriteriosBusqueda = () => {
    const { usuario, setTareas, traerUsuario, actualizar, navigate } = useOutletContext<PerfilContextType>()
    
    const [criterios, setCriterios] = useState(CRITERIOS_MOCK)
    const [seleccionados, setSeleccionados] = useState(
        criterios.filter((criterio) => criterio.checked).map((criterio) => criterio.value)
    )

    // seleccionar y agregar criterio
    const toggleCriterio = (valor: string) => {
        setCriterios((prev) => prev
        .map((criterio) => criterio.value === valor
            ? { ...criterio, checked: !criterio.checked }
            : criterio
        ))
        setSeleccionados((prev) => prev
        .includes(valor) ? prev.filter((v) => v !== valor) : [...prev, valor] )
    }
    
    const volver = () => { navigate(-1) }
    const guardarCriterios = () => {
        toaster.create({
            title: 'Criterios seleccionados:',
            description: seleccionados.join(', '),
            type: 'info',
        })
        volver()
    }

    return (
        <Stack py='5'>
            <HStack alignItems='center' justifyContent='center' onClick={volver}>
                <IconButton variant="ghost" ><IoMdArrowBack/></IconButton>
                <Heading as='h1'>Selecciona tu criterio</Heading>
            </HStack>

            <CheckboxGroup bg='white'>
                <Stack gap="2">
                    {criterios.map((criterio) => (
                        <CheckboxCard.Root key={criterio.value} checked={criterio.checked} onCheckedChange={() => toggleCriterio(criterio.value)}>
                            <CheckboxCard.HiddenInput />
                            <CheckboxCard.Control >
                                <CheckboxCard.Content>
                                    <CheckboxCard.Label>{criterio.titulo}</CheckboxCard.Label>
                                    <CheckboxCard.Description>
                                        {criterio.descripcion}
                                    </CheckboxCard.Description>
                                </CheckboxCard.Content>
                                <CheckboxCard.Indicator />
                            </CheckboxCard.Control>
                            {criterio.items && criterio.type === 'restaurantes' && (
                                <Collapsible.Root open={criterio.checked}>
                                    <Collapsible.Trigger display='none'></Collapsible.Trigger> {/* es necesario para el collapsible */}
                                    <Collapsible.Content>
                                        <CheckboxCard.Addon>
                                            {criterio.items.map((item) => (
                                                <RestaurenteItem id={item.id} nombre={item.nombre} puntuacion={item.puntuacion} tiempo={item.tiempo} precio={item.precio} />
                                                // <ItemRow titulo={item.nombre} subtitulo={item.tiempo} id={item.id} icono={<MdClose/>} />
                                            ))}
                                        </CheckboxCard.Addon>
                                    </Collapsible.Content>
                                </Collapsible.Root>
                            )}
                            {criterio.items && criterio.type === 'palabras' && (
                                <Collapsible.Root open={criterio.checked}>
                                    <Collapsible.Trigger display='none'></Collapsible.Trigger> {/* es necesario para el collapsible */}
                                    <Collapsible.Content>
                                        <CheckboxCard.Addon>
                                            {criterio.items.map((item) => (
                                                <ItemRow titulo={item.nombre} subtitulo={item.tiempo} id={item.id} icono={<MdClose/>} />
                                            ))}
                                        </CheckboxCard.Addon>
                                    </Collapsible.Content>
                                </Collapsible.Root>
                            )}
                            {criterio.type === 'distancia' && (
                                <Collapsible.Root open={criterio.checked}>
                                    <Collapsible.Trigger display='none'></Collapsible.Trigger> {/* es necesario para el collapsible */}
                                    <Collapsible.Content>
                                        <CheckboxCard.Addon>
                                            <HStack justifyContent='space-between'>
                                                <Text>Distancia</Text>
                                                <Contador valor={10} />
                                            </HStack>
                                        </CheckboxCard.Addon>
                                    </Collapsible.Content>
                                </Collapsible.Root>
                            )}

                        </CheckboxCard.Root>
                    ))}
                </Stack>
            </CheckboxGroup>

            <Button onClick={guardarCriterios}>Guardar</Button>
        </Stack>
    )
}