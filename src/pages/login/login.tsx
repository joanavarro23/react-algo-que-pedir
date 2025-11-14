import { Stack, Heading, Text, Field } from '@chakra-ui/react'
import { useForm, Controller } from 'react-hook-form'
import { CampoTexto } from '@/components/label-input/CampoTexto'
import { Button } from '@/components/boton/boton'
import { Link as RouterLink } from 'react-router-dom'
import { PasswordInput } from '@/components/ui/password-input'

//Tipamos los inputs que va a recibir el form para el Login
type LoginForm = {
  username: string
  password: string
}

export const LoginUsuario = () => {

    /*El useForm recibe default values*/
    const { control, handleSubmit, formState: { isSubmitting } } = useForm<LoginForm>({
        defaultValues: { username: '', password: '' },
        mode: 'onTouched'
    })

    /*Simulamos una llamada para que no rompa el submit */
    const onSubmit = async (data: LoginForm) => {
        await new Promise((r) => setTimeout(r, 800))
        console.log('login:', data)
        // await authService.login(data.username, data.password)
    }

  return (
    <Stack className="login-container" as="form" onSubmit={handleSubmit(onSubmit)}>
      <Heading as="h1" size="3xl">Algo que pedir - LOGIN</Heading>

      <Stack className="inputs-login">
        {/* Usuario */}
        <Controller
          name="username"
          control={control}
          rules={{ required: 'El usuario es obligatorio' }}
          render={({ field, fieldState }) => (
            <CampoTexto
              {...field}
              validacion={{esValido: !!fieldState.error, mensajeError: fieldState.error?.message ?? ''}}
              nombreLabel="Usuario"
              nombreTest="Usuario"
              placeholder="Usuario"
            />
          )}
        />

        {/* Password */}
        <Controller
          name="password"
          control={control}
          rules={{
            required: 'La contraseña es obligatoria',
            minLength: { value: 6, message: 'Debe tener un mínimo de 6 caracteres' }
          }}
          render={({ field, fieldState }) => (
            <Field.Root invalid={!!fieldState.error} required>
              <Field.Label>Password</Field.Label>
              <PasswordInput {...field} />
              <Field.ErrorText>{fieldState.error?.message}</Field.ErrorText>
            </Field.Root>
          )}
        />

        {/*El isSubmitting me deshabilita el boton cuando identifica que se ejecuto un onSubmit (evita envios duplicados) */}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Ingresando…' : 'Iniciar Sesión'}
        </Button>

        <Text>
          ¿No tenes una cuenta?
          <RouterLink to="/register"> Registrate</RouterLink>
        </Text>
      </Stack>
    </Stack>
  )
}