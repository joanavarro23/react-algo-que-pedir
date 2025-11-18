import { Image, Heading, Text, Flex, Stack, Link, Field, Input } from '@chakra-ui/react'
import { Usuario } from '@/domain/Usuario'
import { useState } from 'react'
import { Button } from '@/components/boton/boton'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { PasswordInput } from '@/components/ui/password-input'
import React from 'react'

//Tipado para los inputs
type InputsRegistro = {
    username: string,
    password: string,
    rePassword: string
}

//Tipado para objeto de errores con Partial de TS que hace ? a todos los atributos idem InputsRegistro
type ErroresForm = Partial<InputsRegistro>

export const RegisterUsuario = () => {
    const navigate = useNavigate()

    //Estado para manejar las validaciones de los inputs
    const [values, setValues] = useState<InputsRegistro>({
        username: '',
        password: '',
        rePassword: ''
    })

    //El flag de enviado viene en false y el objeto de errores vacio x default 
    const [submitted, setSubmitted] = useState(false)
    const [errors, setErrors] = useState<ErroresForm>({})    

    //Maneja los cambios en cualquier input del form
    const manejoCambiosEnInput = (e : React.ChangeEvent<HTMLInputElement>, field: keyof InputsRegistro) => {
        const  { value } = e.target
        setValues( (datosPrevios) => ({
            ...datosPrevios,
            [field]: value
        }) )
    }

    //Funcion para validar desde el front los requeridos y coincidencia
    const validarFormulario = (data: InputsRegistro) : boolean => {
        const posiblesErrores : ErroresForm = {}

        if(!data.username) posiblesErrores.username = 'El usuario es obligatorio'
        if(!data.password) posiblesErrores.password = 'La contraseña es obligatoria'
        if(!data.rePassword) posiblesErrores.rePassword = 'Debe re-ingresar la contraseña'

        if(data.password && data.rePassword && data.password !== data.rePassword) {
            posiblesErrores.rePassword = 'Las contraseñas no coinciden'
        }

        setErrors(posiblesErrores)
        return Object.keys(posiblesErrores).length === 0 //si no hay ningun error, retorna true
    }

    const guardarUsuario = (nuevoUsuario : Usuario) => {
        
    }

    return (
        <Stack p="3rem" gap="3" as="form">

            <Flex justifyContent="center" alignItems="center" gap="2rem">
                <Image src="./logo.svg" alt="Logo app" p="1" w="45px" h="45px" borderRadius="full" bgColor="red" />
                <Heading as="h1" size="3xl">Crea tu cuenta</Heading>
            </Flex>

            <Stack gap="5">
                <Field.Root required>
                    <Field.Label>Usuario*</Field.Label>
                    <Input placeholder="Ingresa tu usuario" />
                    <Field.ErrorText>El usuario es obligatorio</Field.ErrorText>
                </Field.Root>

                <Field.Root required>
                    <Field.Label>Password*</Field.Label>
                    <PasswordInput/>
                    <Field.ErrorText>La contraseña es obligatoria</Field.ErrorText>
                </Field.Root>

                 <Field.Root required>
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