import { Box } from '@chakra-ui/react'
import { AlgoQuePedirRouter } from './routes/routes'
import { Toaster } from './components/chakra-toaster/toaster'

const App = () => {
  return (
    <Box maxW="400px" mx="auto" w="100%" border='1px solid'>
      <AlgoQuePedirRouter />
      <Toaster />
    </Box>
  )
}

export default App