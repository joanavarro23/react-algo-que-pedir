// TEMAS GLOBALES, VARIABLES Y ESTILOS, se pasa a chakra
import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        primary: { value: '#0088CC' },
        secondary: { value: '#F6AD55' },
        text: { value: '#1A202C' },
        bg: { value: '#F9FAFB' },
      },
      fonts: {
        heading: { value: '\'Poppins\', sans-serif' },
        body: { value: '\'Poppins\', sans-serif' },
      },
    },

    // Alias semánticos (opcionales, pero recomendables)
    semanticTokens: {
      colors: {
        bg: {
          DEFAULT: { value: '{colors.bg}' },
          primary: { value: '{colors.primary}' },
        },
        text: {
          DEFAULT: { value: '{colors.text}' },
        },
        button: {
          primary: { value: '{colors.primary}' },
          secondary: { value: '{colors.secondary}' },
        },
      },
    },
  },
})

export default createSystem(defaultConfig, config)