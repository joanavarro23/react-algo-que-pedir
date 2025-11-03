import { Box, Link, Text } from '@chakra-ui/react'
import './App.css'

import { AlgoQuePedirRouter } from './routes/routes' 
import { Button } from './components/boton/boton'

const App = () => {
  return (
      // <div className="App">
      //   <AlgoQuePedirRouter />
      // </div>
    <div>
   
      <h3>Chakra hola hola</h3>
      <Button variant='secundario'>Boton</Button>
      
      <Text color="textoPrimario">Hola a todos 💙</Text>
      <Link href="#">Ver más</Link>
      <Button variant='primario'>
        Guardar
      </Button>

    </div>

  )
}

export default App