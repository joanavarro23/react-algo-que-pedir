import { Image, Heading, Text, Flex, Stack, Link, Field, Input } from '@chakra-ui/react'
import { toaster } from '@/components/chakra-toaster/toaster'
import { useState } from 'react'
import { Button } from '@/components/boton/boton'
import { LoadingSpinner } from '@/components/spinnerCargando/spinner'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { PasswordInput } from '@/components/ui/password-input'
import { registro } from '@/services/authService'
import React from 'react'

//Tipado para los inputs
type InputsRegistro = {
    usuario: string,
    password: string,
    confirmarPassword: string
}

//Tipado para objeto de errores con Partial de TS que hace ? a todos los atributos idem InputsRegistro
type ErroresForm = Partial<InputsRegistro>

export const RegisterUsuario = () => {
    const navigate = useNavigate()

    //Estado para manejar las validaciones de los inputs
    const [values, setValues] = useState<InputsRegistro>({
        usuario: '',
        password: '',
        confirmarPassword: ''
    })

    //El flag de enviado viene en false y el objeto de errores vacio x default 
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState<ErroresForm>({})

    //Maneja los cambios en cualquier input del form
    const manejoCambiosEnInput = (e: React.ChangeEvent<HTMLInputElement>, field: keyof InputsRegistro) => {
        const { value } = e.target
        setValues((datosPrevios) => ({
            ...datosPrevios,
            [field]: value
        }))
    }

    //Funcion para validar desde el front los requeridos y coincidencia
    const validarFormulario = (data: InputsRegistro): boolean => {
        const posiblesErrores: ErroresForm = {}

        if (!data.usuario) posiblesErrores.usuario = 'El usuario es obligatorio'
        if (!data.password) posiblesErrores.password = 'La contraseña es obligatoria'
        if (!data.confirmarPassword) posiblesErrores.confirmarPassword = 'Debe re-ingresar la contraseña'

        if (data.password && data.confirmarPassword && data.password !== data.confirmarPassword) {
            posiblesErrores.confirmarPassword = 'Las contraseñas no coinciden'
        }

        setErrors(posiblesErrores)
        return Object.keys(posiblesErrores).length === 0 //si no hay ningun error, retorna true
    }

    const guardarUsuario = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        if (validarFormulario(values)) {
            try {
                await registro({
                    usuario: values.usuario,
                    password: values.password,
                    confirmarPassword: values.confirmarPassword
                })

                navigate('/loginUsuario')       //Redirige a login si todo salio OK
            } catch (error) {
                const mensajeError = 'El usuario que tratas de ingresar ya existe'
                console.error(error)
                toaster.create({
                    title: 'Ocurrio un error en tu registro!',
                    description: mensajeError,
                    type: 'error',
                    duration: 2500
                })
            }
        }
    }

    if(isLoading) {
        return <LoadingSpinner/>
    }


    return (
        <Stack p="3rem" gap="3" as="form">
            {/*Header titulo + logo*/}
            <Flex justifyContent="center" alignItems="center" gap="2rem">
                <Image src="./logo.svg" alt="Logo app" p="1" w="45px" h="45px" borderRadius="full" bgColor="red" />
                <Heading as="h1" size="3xl">Crea tu cuenta</Heading>
            </Flex>

            {/*Contenedor de todos los inputs y boton*/}
            <Stack gap="5">
                <Field.Root required invalid={!!errors.usuario}>        {/*Usuario*/}
                    <Field.Label>Usuario*</Field.Label>
                    <Input placeholder="Ingresa tu usuario" value={values.usuario} onChange={ (e) => manejoCambiosEnInput(e, 'usuario')}/>
                    <Field.ErrorText>{errors.usuario}</Field.ErrorText>
                </Field.Root>

                <Field.Root required invalid={!!errors.password}>       {/*Password*/}
                    <Field.Label>Password*</Field.Label>
                    <PasswordInput value={values.password} onChange={ (e) => manejoCambiosEnInput(e, 'password')}/>
                    <Field.ErrorText>{errors.password}</Field.ErrorText>
                </Field.Root>

                <Field.Root required invalid={!!errors.confirmarPassword}>      {/*Reingreso de password*/}
                    <Field.Label>Re-ingrese su Password*</Field.Label>
                    <PasswordInput value={values.confirmarPassword} onChange={ (e) => manejoCambiosEnInput(e, 'confirmarPassword')}/>
                    <Field.ErrorText>{errors.confirmarPassword}</Field.ErrorText>
                </Field.Root>

                {/*Boton + link para ir a loginUsuario*/}
                <Button p="2" mt="1rem" borderRadius="full" onClick={guardarUsuario} type="submit">Registrarse</Button>

                <Text textAlign="center">¿Ya tienes una cuenta?
                    <Link textDecoration="underline" mx="1"> <RouterLink to="/loginUsuario"> Inicia Sesión</RouterLink></Link>
                </Text>
            </Stack>
        </Stack>

    )
}