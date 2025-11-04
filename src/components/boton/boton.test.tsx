import { render, screen } from '@testing-library/react'
import { test, describe, expect } from 'vitest'
import { Button } from './boton'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '@/styles/theme'

describe('boton tests', () => {
    test('deberia mostrar el boton primario', () => {
        render(
            <ChakraProvider value={theme}>
                <Button data-testid='boton'>Boton primario</Button>
            </ChakraProvider>
        )
        expect(screen.getByTestId('boton').innerHTML).toBe('Boton primario')
    })
})