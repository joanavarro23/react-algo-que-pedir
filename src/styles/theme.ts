// TEMAS GLOBALES, VARIABLES Y ESTILOS, se pasa a chakra
import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'
import { buttonRecipe } from '@chakra-ui/react/theme'

// Aca se define el "tema" base para todo el proyecto
const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        principal: { value: '#FF0000' },
        secundario: { value: '#FFFFFF' },
        textoPrimario: { value: '#000000' },
        textoSecundario: { value: '#3b3b3b' },
        bordes: { value: '#dddddd' },
        fondo: { value: 'rgb(233, 233, 233)' },
        parrafos: { value: '#97749d' },
      },
      fonts: {
        body: { value: '"Nata Sans", sans-serif' },
      },
      breakpoints: {
        mobile: { value: '400px'},
      }
    },

    // Se aplica la "receta" de cada componente de manera reutilizable
    recipes: {
      button: buttonRecipe,
    }
  },
  
  // Estilos globales en general
  globalCss: {
    'html, body': {
        maxWidth: '400px',
        margin: '0 auto',
        backgroundColor: 'var(--chakra-colors-fondo)',
        fontFamily: 'body',
      },
      a: {
        textDecoration: 'none',
        color: 'var(--chakra-colors-textoPrimario)',
      },
  },
})

export default createSystem(defaultConfig, config)