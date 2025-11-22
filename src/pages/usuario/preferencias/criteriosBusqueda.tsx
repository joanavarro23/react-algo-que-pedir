import { Button } from '@/components/boton/boton'
import { ItemRow } from '@/components/itemRow/itemRow'
import { CheckboxCard, CheckboxGroup, Collapsible, Heading, HStack, IconButton, Stack, Text } from '@chakra-ui/react'
import { IoMdArrowBack } from 'react-icons/io'
import { MdClose } from 'react-icons/md'
import type { PerfilContextType } from '../Perfil'
import { useOutletContext } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { toaster } from '@/components/chakra-toaster/toaster'
import { RestaurenteItem } from '@/components/perfil-usuario/restauranteItem'
import { Contador } from '@/components/contador/contador'
import { Criterio, type TipoCriterio } from '@/domain/CriterioUsuario'
import { CRITERIOS_CONFIG } from '@/types/criterios'
import { C } from 'vitest/dist/chunks/reporters.d.BFLkQcL6.js'

export const CriteriosBusqueda = () => {
    const { usuario, navigate } = useOutletContext<PerfilContextType>()
    
    // Estado local para manejar los criterios seleccionados
    const [seleccionados, setSeleccionados] = useState<TipoCriterio[]>([])
    const [localesPreferidos, setLocalesPreferidos] = useState<number[]>([])
    const [distancia, setDistancia] = useState(usuario.distancia)
    const [palabrasClave, setPalabrasClave] = useState<string[]>([])
    const [nuevaPalabra, setNuevaPalabra] = useState('')

    // Inicializar desde el usuario los criterios que trae
    useEffect(() => {
        const criteriosActuales = obtenerCriteriosActuales(usuario.criterio)
        setSeleccionados(criteriosActuales)
        setDistancia(usuario.distancia)
        
    }, [usuario])
    // Extraigo los criterios con los que viene para mostrarlos
    const obtenerCriteriosActuales = (criterio: Criterio): TipoCriterio[] => {
        if(criterio.tipo === 'COMBINADO') {
            return criterio.subCriterios.map(subCriterio => subCriterio.tipo)
        }
        return [criterio.tipo]
    }

    // seleccionar y agregar criterio
    const toggleCriterio = (tipo: TipoCriterio) => {
        setSeleccionados(prev => { return prev.filter(t => t !== tipo) })
    }

    // seleccionar el criterio
    const estaSeleccionado = (tipo: TipoCriterio) => seleccionados.includes(tipo)
    
    // Manejo de las palabras claves
    const agregarPalabra = () => {
        if(nuevaPalabra.trim() && !palabrasClave.includes(nuevaPalabra.trim())) {
            setPalabrasClave(prev => [...prev, nuevaPalabra.trim()])
            setNuevaPalabra('')
        }
    }
    const eliminarPalabra = (palabra: string) => {
        setPalabrasClave(prev => prev.filter(p => p !== palabra))
    }

    // Construir el criterio para guardar
    const construirCriterio = (): Criterio => {
        if (seleccionados.length === 0 || seleccionados.includes('GENERAL')) {
            return new Criterio('GENERAL')
        }

        if (seleccionados.length === 1) {
            const tipo = seleccionados[0]
            return new Criterio(
                tipo,
                tipo === 'FIEL' ? localesPreferidos : [],
                tipo === 'MARKETING' ? palabrasClave : []
            )
        }

        // Múltiples criterios -> Combinado
        const subCriterios = seleccionados.map(tipo => new Criterio(
            tipo,
            tipo === 'FIEL' ? localesPreferidos : [],
            tipo === 'MARKETING' ? palabrasClave : []
        ))

        return new Criterio('COMBINADO', [], [], subCriterios)
    }
    
    const guardarCriterios = () => {
        toaster.create({
            title: 'Criterios seleccionados:',
            description: seleccionados.join(', '),
            type: 'info',
        })
        volver()
    }
    
    const volver = () => { navigate(-1) }

    return (
        <Stack py='5'>
            <HStack alignItems='center' justifyContent='center' onClick={volver}>
                <IconButton variant="ghost" ><IoMdArrowBack/></IconButton>
                <Heading as='h1'>Selecciona tu criterio</Heading>
            </HStack>

            <CheckboxGroup bg='white'>
                <Stack gap="2">
                    {CRITERIOS_CONFIG.map((criterio) => (
                        <CheckboxCard.Root key={criterio.value} checked={estaSeleccionado(criterio.value)} onCheckedChange={() => toggleCriterio(criterio.value)} >
                            <CheckboxCard.HiddenInput />
                            <CheckboxCard.Control>
                                <CheckboxCard.Content>
                                    <CheckboxCard.Label>{criterio.titulo}</CheckboxCard.Label>
                                    <CheckboxCard.Description>
                                        {criterio.descripcion}
                                    </CheckboxCard.Description>
                                </CheckboxCard.Content>
                                <CheckboxCard.Indicator />
                            </CheckboxCard.Control>

                        {/* Desplegable para locales: criterio FIEL */}
                        {criterio.type === 'restaurantes' && (
                            <Collapsible.Root open={estaSeleccionado(criterio.value)}>
                                <Collapsible.Trigger display='none'></Collapsible.Trigger> {/* Necesario para el desplegable*/}
                                <Collapsible.Content>
                                    <CheckboxCard.Addon>
                                        {localesPreferidos.length > 0 ? (
                                            localesPreferidos.map((item) => (
                                                <RestaurenteItem id={item.id} nombre={item.nombre} puntuacion={item.puntuacion} tiempo={item.tiempo} precio={item.precio} />
                                            ))
                                        ) : (
                                            <Text> Aun no seleccionaste locales preferidos </Text>
                                        )}
                                    </CheckboxCard.Addon>
                                </Collapsible.Content>
                            </Collapsible.Root>
                        )}

                        {/* Desplegable para palabras: criterio MARKETING */}
                        {criterio.type === 'palabras' && (
                            <Collapsible.Root open={estaSeleccionado(criterio.value)}>
                                <Collapsible.Trigger display='none'></Collapsible.Trigger> 
                                <Collapsible.Content>
                                    <CheckboxCard.Addon>
                                        {palabrasClave.map((item) => (
                                            <ItemRow titulo={item.nombre} subtitulo={item.tiempo} id={item.id} icono={<MdClose/>} />    
                                        ))}
                                    </CheckboxCard.Addon>
                                </Collapsible.Content>
                            </Collapsible.Root>
                        )}

                        {/* Desplegable para distancia: criterio IMPACIENTE */}
                        {criterio.type === 'distancia' && (
                            <Collapsible.Root open={estaSeleccionado(criterio.value)}>
                                <Collapsible.Trigger display='none'></Collapsible.Trigger>
                                <Collapsible.Content>
                                    <CheckboxCard.Addon>
                                        <HStack justifyContent='space-between'>
                                            <Text>Distancia máxima (km)</Text>
                                            <Contador valor={usuario.distancia}/>
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