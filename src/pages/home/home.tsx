import './home.css'
import { Box, Input, Heading, SimpleGrid, Card, Image, Stack, Text, IconButton, HStack } from '@chakra-ui/react'
import { useState, type MouseEvent, type ReactNode, type ChangeEvent } from 'react'
import { FiShoppingCart, FiSearch, FiHome, FiPackage, FiStar, FiUser } from 'react-icons/fi'

interface Local {
  id: number
  nombre: string
  direccion: string
  urlImagenLocal: string
  isFavorite: boolean
}

// Mock data para locales
const mockLocales: Local[] = [
  {
    id: 1,
    nombre: 'La Cocina de Mama',
    direccion: 'Calle Principal, 123',
    urlImagenLocal: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop',
    isFavorite: true
  },
  {
    id: 2,
    nombre: 'El Sabor Autentico',
    direccion: 'Avenida Central, 456',
    urlImagenLocal: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&h=300&fit=crop',
    isFavorite: false
  },
  {
    id: 3,
    nombre: 'Delicias del Mundo',
    direccion: 'Plaza Mayor, 789',
    urlImagenLocal: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop',
    isFavorite: false
  }
]

export const LocalesView = () => {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [locales, setLocales] = useState<Local[]>(mockLocales)
  const [showNearby, setShowNearby] = useState<boolean>(false)

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
        </HStack>

        {/* Buscador */}
        <Box className="search-container">
          <Input
            className="search-input"
            placeholder="Buscá tu local para pedir..."
            value={searchQuery}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
            pr="40px"
            bg="gray.50"
            border="1px solid"
            borderColor="gray.300"
            _focus={{ borderColor: 'blue.500', bg: 'white', border: '1px solid' }}
          />
          <Box className="search-icon">
            <FiSearch size={20} />
          </Box>
        </Box>

        {/* Checkbox de cercania */}
        <HStack
          className="nearby-toggle"
          cursor="pointer"
          onClick={() => setShowNearby(!showNearby)}
        >
          <Box className={`checkbox ${showNearby ? 'checked' : ''}`}>
            {showNearby && (
              <Box className="checkbox-inner" />
            )}
          </Box>
          <Text fontSize="sm" color="gray.700">
            Buscar locales cercanos
          </Text>
        </HStack>
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