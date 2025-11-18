import './home.css'
import { Box, Input, Heading, SimpleGrid, Card, Image, Stack, Text, IconButton, HStack, Checkbox } from '@chakra-ui/react'
import { useState } from 'react'
import { FiShoppingCart, FiSearch} from 'react-icons/fi'
import { IoIosLogOut } from 'react-icons/io'
import React from 'react'
import axios from 'axios'
import { useOnInit } from '@/customHooks/useOnInit'
import { REST_SERVER_URL } from '@/services/constants'
import { logout } from '@/services/authService'
import { useNavigate } from 'react-router-dom'

interface Local {
  id: number
  nombre: string
  direccion: string
  urlImagenLocal: string
}


export const LocalesView = () => {
  const navigate = useNavigate()

  const [searchQuery, setSearchQuery] = useState<string>('')
  const [locales, setLocales] = useState<Local[]>([])
  const [showNearby, setShowNearby] = useState<boolean>(false)

  useOnInit(() => {
    const fetchLocales = async (): Promise<void> => {
      try {
        const response = await axios.get<Local[]>(`${REST_SERVER_URL}/locales`)
        setLocales(response.data)
      }catch {
        throw new Error('Error al obtener los locales')
      }
    }

    fetchLocales()
  })

  //Agrego fx que llama al logout del service para asociar la accion con el icono del /home
  const handleLogOut = () => {
    logout()
    navigate('/loginUsuario', { replace: true })
  }


  const filteredLocales: Local[] = locales.filter((local: Local) =>
    local.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
    local.direccion.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <Box className="delivery-container">
      {/* Header */}
      <Box className="delivery-header">
        <HStack justify="space-between" mb={4}>
          <Heading size="md">Delivery</Heading>
          <IconButton variant="ghost" size="lg">
            <FiShoppingCart />
          </IconButton>
          <IconButton variant="ghost" size="lg" onClick={handleLogOut}>
            <IoIosLogOut />
          </IconButton>
        </HStack>

        {/* Buscador */}
        <Box className="search-container">
          <Input
            className="search-input"
            placeholder="Buscá tu local para pedir..."
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
            pr="40px"
            bg="gray.50"
            border="1px solid"
            borderColor="gray.300"
            _focus={{ bg: 'white', border: '1px solid' }}
          />
          <Box className="search-icon">
            <FiSearch size={20} />
          </Box>
        </Box>

        {/* Checkbox de cercania */}
        <Checkbox.Root pt="3" variant="solid" colorPalette="red" onCheckedChange={() => setShowNearby(!showNearby)}>
          <Checkbox.HiddenInput />
          <Checkbox.Control />
          <Checkbox.Label>Buscar locales cercanos</Checkbox.Label>
        </Checkbox.Root>
      </Box>

      {/* Content */}
      <Box className="delivery-content">
        <Heading size="lg" mb={4}>
          Locales de comidas
        </Heading>

        <SimpleGrid columns={2} gap="1">
          {filteredLocales.map((local) => (
            <Card.Root
              variant={'outline'}
              key={local.id}
              className="local-card"
              cursor="pointer"
              borderRadius="20px" overflow="hidden"
              transition ="transform 0.2s"
              _hover={{ transform: 'scale(1.02)' }}
            >
                <Card.Body gap="0" p="0" >
                    <Box position="relative">
                        <Image            
                        src={local.urlImagenLocal}
                        alt={local.nombre}
                        className="local-image"
                        />
                    </Box>
                    <Stack p={2}>
                        <Card.Title fontSize="sm">
                        {local.nombre}
                        </Card.Title>
                        <Card.Description fontSize="xs" color="gray.600">
                        {local.direccion}
                        </Card.Description>
                    </Stack>
                </Card.Body>
            </Card.Root>
          ))}
        </SimpleGrid>

        {filteredLocales.length === 0 && (
          <Box className="no-results">
            <Text color="gray.500">
              No se encontraron locales que coincidan con tu búsqueda
            </Text>
          </Box>
        )}
      </Box>
    </Box>
  )
}