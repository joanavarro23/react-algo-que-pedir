import { Image, Heading, Text, Flex, Stack, Link, Field, Input } from '@chakra-ui/react'
import { useValidacion } from '@/customHooks/useValidacion'
import { Usuario } from '@/domain/Usuario'
import { useState } from 'react'
import { Button } from '@/components/boton/boton'
import { Link as RouterLink } from 'react-router-dom'
import { PasswordInput } from '@/components/ui/password-input'



export const RegisterUsuario = () => {
    const [usuario, setUsuario] = useState<Usuario>(new Usuario())


    return (
        <Stack p="3rem" gap="3" as="form">

            <Flex justifyContent="center" alignItems="center" gap="2rem">
                <Image src="./logo.svg" alt="Logo app" p="1" w="45px" h="45px" borderRadius="full" bgColor="red" />
                <Heading as="h1" size="3xl">Algo que pedir</Heading>
            </Flex>

            <Stack gap="5">
                <Field.Root invalid>
                    <Field.Label>Usuario*</Field.Label>
                    <Input placeholder="Ingresa tu usuario" />
                    <Field.ErrorText>El usuario es obligatorio</Field.ErrorText>
                </Field.Root>

                <Field.Root invalid required>
                    <Field.Label>Password*</Field.Label>
                    <PasswordInput/>
                    <Field.ErrorText>La contraseña es obligatoria</Field.ErrorText>
                </Field.Root>

                 <Field.Root invalid required>
                    <Field.Label>Re-ingrese su Password*</Field.Label>
                    <PasswordInput/>
                    <Field.ErrorText>La contraseña es obligatoria</Field.ErrorText>
                </Field.Root>

                <Button p="2" mt="1rem" borderRadius="full" onClick={() => 'TODO()'}>Registrarse</Button>

                <Text textAlign="center">¿Ya tienes una cuenta?
                    <Link textDecoration="underline" mx="1"> <RouterLink to="/login"> Inicia Sesión</RouterLink></Link>
                </Text>
            </Stack>
        </Stack>

    )
}