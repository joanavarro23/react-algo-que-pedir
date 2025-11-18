import './calificar.css'
import { Box, Input, Heading, SimpleGrid, Card, Image, Stack, Text, IconButton, HStack } from '@chakra-ui/react'
import { useState } from 'react'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { REST_SERVER_URL } from '@/services/constants'
import axios from 'axios'
import { useOnInit } from '@/customHooks/useOnInit'

interface LocalAPuntuar {
  local: {
    idLocal: number
    nombre: string
    direccion: string
    altura: number
    urlImagenLocal: string
  }
  fechaLimite: string
}

interface LocalConPuntuacion {
  idLocal: number
  nombre: string
  direccion: string
  urlImagenLocal: string
  puntuacion?: number
  fechaLimite: string
}

export const CalificacionesView = () => {
  const [locales, setLocales] = useState<LocalConPuntuacion[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const idUser = 1

  useOnInit(() => {
    const fetchLocalesAPuntuar = async () => {
      try {
        setLoading(true)
        const response = await axios.get<LocalAPuntuar[]>(`${REST_SERVER_URL}/usuario/${idUser}/locales-a-puntuar`)
        
        const localesTransformados: LocalConPuntuacion[] = response.data.map((item: LocalAPuntuar) => ({
          idLocal: item.local.idLocal,
          nombre: item.local.nombre,
          direccion: `${item.local.direccion} ${item.local.altura}`,
          urlImagenLocal: item.local.urlImagenLocal,
          puntuacion: undefined,
          fechaLimite: item.fechaLimite
        }))
        
        setLocales(localesTransformados)
      } catch (error) {
        console.error('Error fetching locales a puntuar:', error)
      } finally {
        setLoading(false)
      }
    }

    if (idUser) {
      fetchLocalesAPuntuar()
    }
  })

  const handleRate = async (localId: number, puntuacion: number) => {
    try {
      await axios.post(`${REST_SERVER_URL}/usuario/${idUser}/puntuar-local/${localId}`, { puntuacion })
      
      // Update estado de local para mostrar puntuacion
      setLocales((prev: LocalConPuntuacion[]) => 
        prev.map((local: LocalConPuntuacion) => 
          local.idLocal === localId 
            ? { ...local, puntuacion }
            : local
        )
      )
      
      // Luego de 2 segundos, remover el local de la lista
      setTimeout(() => {
        setLocales((prev: LocalConPuntuacion[]) => 
          prev.filter((local: LocalConPuntuacion) => local.idLocal !== localId)
        )
      }, 2000)
    } catch (error) {
      console.error('Error al puntuar local:', error)
    }
  }

  const renderStars = (localId: number, currentRating?: number) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <IconButton
          key={i}
          aria-label={`${i} estrellas`}
          size="md"
          variant="ghost"
          color={i <= (currentRating || 0) ? 'yellow.400' : 'gray.300'}
          onClick={(e) => {
            e.stopPropagation()
            handleRate(localId, i)
          }}
        >
            {i <= (currentRating || 0) ? <AiFillStar size={50} /> : <AiOutlineStar size={50} />}
        </IconButton>
      )
    }
    return stars
  }

  return (
    <Box className="calificaciones-container">
      <Box className="calificaciones-header">
        <HStack justify="space-between" mb={4}>
          <Heading size="md">Calificar</Heading>
        </HStack>
      </Box>

      <Box className="calificaciones-content">
        <Heading size="md" mb={4}>
          Locales para calificar
        </Heading>

        {!idUser ? (
          <Box textAlign="center" py={10}>
            <Text color="red.500">
              Debes iniciar sesión para calificar locales
            </Text>
          </Box>
        ) : loading ? (
          <Box textAlign="center" py={10}>
            <Text color="gray.500">Cargando locales...</Text>
          </Box>
        ) : (
          <>
            <SimpleGrid columns={2} gap={4}>
              {locales.map((local: LocalConPuntuacion) => (
                <Card.Root
                  key={local.idLocal}
                  className="local-card"
                  cursor="pointer"
                >
                  <Card.Body gap="2" p="0">
                    <Box position="relative">
                      <Image
                        src={local.urlImagenLocal}
                        alt={local.nombre}
                        className="local-image"
                      />
                    </Box>
                    <Stack p={3} gap={2}>
                      <Card.Title fontSize="sm">
                        {local.nombre}
                      </Card.Title>
                      <Card.Description fontSize="xs" color="gray.600">
                        {local.direccion}
                      </Card.Description>
                      
                      {/* Estrellas */}
                      <HStack gap={0.5} justify="center" mt={1}>
                        {renderStars(local.idLocal, local.puntuacion)}
                      </HStack>
                      
                      {local.puntuacion && (
                        <Text fontSize="xs" textAlign="center" color="green.600" fontWeight="medium">
                          ¡Calificado con {local.puntuacion} estrella{local.puntuacion !== 1 ? 's' : ''}!
                        </Text>
                      )}
                    </Stack>
                  </Card.Body>
                </Card.Root>
              ))}
            </SimpleGrid>

            {!loading && locales.length === 0 && (
              <Box className="no-results">
              </Box>
            )}
          </>
        )}
      </Box>
    </Box>
  )
}