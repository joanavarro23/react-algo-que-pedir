import { Stack, Heading, Text, Field, Input, Flex, Image, Link } from '@chakra-ui/react'
import { useForm, Controller } from 'react-hook-form'
import { Button } from '@/components/boton/boton'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { PasswordInput } from '@/components/ui/password-input'
import { login } from '@/services/authService'
import { LoadingSpinner } from '@/components/spinnerCargando/spinner'



//Tipamos los inputs que va a recibir el form para el Login
type LoginForm = {
  usuario: string
  password: string
}

export const LoginUsuario = () => {
  const navigate = useNavigate()

  /*El useForm recibe default values*/
  const { control, handleSubmit, formState: { isSubmitting } } = useForm<LoginForm>({
    defaultValues: { usuario: '', password: '' },
    mode: 'onTouched'
  })

  /*Simulamos una llamada para que no rompa el submit */
  const onSubmit = async (data: LoginForm) => {
    try {
      await login({
        usuario: data.usuario,
        password: data.password
      })

      navigate('/home')
    } catch (error) {
        console.error('ERROR - falta toast')
    }
  }

  if(isSubmitting) {return <LoadingSpinner/>} 

  return (
    <Stack p="3rem" gap="3" as="form" onSubmit={handleSubmit(onSubmit)}>
      <Flex justifyContent="center" alignItems="center" gap="2rem">
        <Image src="./logo.svg" alt="Logo app" p="1" w="45px" h="45px" borderRadius="full" bgColor="red" />
        <Heading as="h1" size="3xl">Algo que pedir</Heading>
      </Flex>

      <Stack gap="5">
        {/* Usuario */}
        <Controller
          name="usuario"
          control={control}
          rules={{ required: 'El usuario es obligatorio' }}
          render={({ field, fieldState }) => (
            <Field.Root invalid={!!fieldState.error} required>
              <Field.Label>Usuario*</Field.Label>
              <Input {...field} />
              <Field.ErrorText>{fieldState.error?.message}</Field.ErrorText>
            </Field.Root>
          )}
        />

        {/* Password */}
        <Controller
          name="password"
          control={control}
          rules={{
            required: 'La contraseña es obligatoria',
          }}
          render={({ field, fieldState }) => (
            <Field.Root invalid={!!fieldState.error} required>
              <Field.Label>Password*</Field.Label>
              <PasswordInput {...field} />
              <Field.ErrorText>{fieldState.error?.message}</Field.ErrorText>
            </Field.Root>
          )}
        />

        {/*El isSubmitting me deshabilita el boton cuando identifica que se ejecuto un onSubmit (evita envios duplicados) */}
        <Button type="submit" p="2" mt="1rem" borderRadius="full">
          Iniciar Sesión
        </Button>

        <Text textAlign="center">
          ¿No tenes una cuenta?
          <Link textDecoration="underline" mx="1"> <RouterLink to="/registroUsuario"> Registrate</RouterLink></Link>
        </Text>
      </Stack>
    </Stack>
  )
}