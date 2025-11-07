// 1. Importamos VStack (Stack Vertical)
import { LuX } from "react-icons/lu" 
import { Button, Card, Image, Grid, GridItem, VStack } from "@chakra-ui/react"

export const PedidoCard = () => {
  return (
    <Card.Root
      w="100%"
      variant="falopa" // Si le paso un valor que no existe, queda como yo quiero. "Undefined" no funciona.
      overflow="hidden"

    >
      <Card.Body p={0}>
        
        <Grid
          templateColumns="100px 1fr auto"
          templateRows="auto auto auto"
          w="100%"
        >
          <GridItem gridRow="1 / 4" gridColumn="1 / 2">
            <Image
              src="https://static.wikia.nocookie.net/simpsons/images/c/c6/Moe%27s_Tavern.png"
              alt="Imagen del pedido"
              width="100px"
              height="100%"
              objectFit="fill" //No me gusta cómo queda esto, porque hay que hacer que la imagen encaje perfecto con el tamaño del grid. Después lo vemos.
            />
          </GridItem>

          <GridItem 
            gridRow="1 / 4"
            gridColumn="2 / 3"
            p={2}
            

            display="flex"
            alignItems="center"
          >
            <VStack align="start" gap={0}>

              <Card.Title fontSize="sm">Nombre del Local</Card.Title>

              <Card.Description fontWeight="bold">
                Total: $1250.00
              </Card.Description>
             
              <Card.Description fontSize="xs" color="gray.600">
                Hoy, 20:30 - 3 artículos
              </Card.Description>

            </VStack>
          </GridItem>

          <GridItem 
            gridRow="1 / 4" 
            gridColumn="3 / 4"
            display="flex"
            alignItems="center"
            justifyContent="center"
            p={3}
          >
            <Button
              size="sm"
              variant="ghost"
              colorScheme="red"
              aria-label="Cancelar pedido"
            >
              <LuX size={20} />
            </Button>
          </GridItem>
        </Grid>
      </Card.Body>
    </Card.Root>
  )
}

export default PedidoCard