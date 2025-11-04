import { expect, test } from 'vitest'
import { render, screen, } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PerfilUsuario } from './Perfil'

test('aparece habilitado el formulario', () => {
    render(<PerfilUsuario />)
    expect(screen.getAllByTestId('input-nombre')).toBeTruthy()
})

test('se puede cambiar el valor de una referencia', async () => {
    render(<PerfilUsuario />)
    const inputNombre = getInput('nombre')
    expect(inputNombre.value).toBe('Pepita')
    await userEvent.type(inputNombre, '{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}restaurant')
    expect(getInput('nombre').value).toBe('restaurant')
})

const getInput = (id: string) => screen.getByTestId(`input-${id}`) as HTMLInputElement