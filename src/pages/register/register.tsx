import { Box, IconButton, Image, Heading, VStack, Text, Flex, Stack } from '@chakra-ui/react'
import { CampoTexto } from '@/components/label-input/CampoTexto'
import { useValidacion } from '@/customHooks/useValidacion'
import { Usuario } from '@/domain/Usuario'
import { useState } from 'react'
import { Button } from '@/components/boton/boton'
import { Link as RouterLink } from 'react-router-dom'
import { PasswordInput } from '@/components/ui/password-input'



export const RegisterUsuario = () => {
    const [usuario, setUsuario] = useState<Usuario>(new Usuario())


    return (
        <Stack className="register-container">
            <Heading as="h1" size="3xl">Algo que pedir - REGISTRO</Heading>
            <Stack className="inputs-register">
                <CampoTexto 
                invalid={useValidacion(usuario.username, 'textoRequerido')}
                nombreLabel='Usuario'
                nombreTest='Usuario'
                placeholder='Usuario'
                value={usuario.username}
                onChange={(e) => setUsuario((prev) => Object.assign(new Usuario(), prev, { username: e.target.value }))}

                msjError='El campo nombre es requerido'
                ></CampoTexto>

                <CampoTexto 
                invalid={useValidacion(usuario.password, 'textoRequerido')}
                nombreLabel='Password'
                nombreTest='Password'
                placeholder='Password'
                value={usuario.password}
                onChange={(e) => setUsuario((prev) => Object.assign(new Usuario(), prev, { password: e.target.value }))}
                msjError='El campo nombre es requerido'
                ></CampoTexto>

                <CampoTexto 
                invalid={useValidacion(usuario.password, 'textoRequerido')}
                nombreLabel='Re-ingrese el Password'
                nombreTest='Re-ingrese el Password'
                placeholder='Re-ingrese el Password'
                value={usuario.password}
                msjError='El campo nombre es requerido'
                ></CampoTexto>

                <PasswordInput></PasswordInput>

                <Button onClick={() => 'TODO()'}>Registrarse</Button>
                
                <Text>¿Ya tienes una cuenta? 
                    <RouterLink to="/login"> Inicia Sesión</RouterLink>
                </Text>
            </Stack>
        </Stack>

    )
}