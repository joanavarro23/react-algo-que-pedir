import { Box, IconButton, Image, Heading, VStack, Text, Flex, Stack } from '@chakra-ui/react'
import { CampoTexto } from '@/components/label-input/CampoTexto'
import { useValidacion } from '@/customHooks/useValidacion'
import { Usuario } from '@/domain/Usuario'
import { useState } from 'react'
import { Button } from '@/components/boton/boton'
import { Link as RouterLink } from 'react-router-dom'


export const LoginUsuario = () => {
    const [usuario, setUsuario] = useState<Usuario>(new Usuario())


    return (
        <Stack className="login-container">
            <Heading as="h1" size="3xl">Algo que pedir - LOGIN</Heading>
            <Stack className="inputs-login">
                <CampoTexto 
                invalid={useValidacion(usuario.username, 'valorRequerido')}
                nombreLabel='Usuario'
                nombreTest='Usuario'
                placeholder='Usuario'
                value={usuario.username}
                onChange={(e) => setUsuario((prev) => Object.assign(new Usuario(), prev, { username: e.target.value }))}
                msjError='El campo nombre es requerido'
                ></CampoTexto>

                <CampoTexto 
                invalid={useValidacion(usuario.password, 'valorRequerido')}
                nombreLabel='Password'
                nombreTest='Password'
                placeholder='Password'
                value={usuario.password}
                onChange={(e) => setUsuario((prev) => Object.assign(new Usuario(), prev, { password: e.target.value }))}
                msjError='El campo nombre es requerido'
                ></CampoTexto>

                <Button onClick={() => 'TODO()'}>Iniciar Sesión</Button>
                
                <Text>¿No tienes una cuenta? 
                    <RouterLink to="/register"> Registrate</RouterLink>
                </Text>
            </Stack>
        </Stack>

    )
}