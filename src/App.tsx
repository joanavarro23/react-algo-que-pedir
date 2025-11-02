import { Box, Button, Text } from '@chakra-ui/react'
import './App.css'

import { AlgoQuePedirRouter } from './routes/routes' 

const App = () => {
  return (
      // <div className="App">
      //   <AlgoQuePedirRouter />
      // </div>
    <div>
    <Box bg="bg" color="text" p={20}>
      <h3>Chakra hola hola</h3>
      <Button>Boton</Button>
      
      <Text>Hola a todos 💙</Text>

      <Button bg="button.primary" color="white" _hover={{ bg: 'button.secondary' }}>
        Guardar
      </Button>
    </Box>
    </div>

  )
}

export default App