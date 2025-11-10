import type { useValidacion } from '@/customHooks/useValidacion'
import { Field, Input, type InputProps } from '@chakra-ui/react'

interface CampoTextoProps extends InputProps {
    nombreLabel: string
    nombreTest: string
    validacion: ReturnType<typeof useValidacion>
    required?: boolean
}

export const CampoTexto = ({ required=true, nombreLabel, nombreTest, validacion, ...rest }: CampoTextoProps) => {
    return (
        
        <Field.Root invalid={!validacion.esValido} required={required} >
            <Field.Label>{nombreLabel}</Field.Label>
            <Input data-testid={`input-${nombreTest}`} {...rest}/>
            <Field.ErrorText>{validacion.mensajeError}</Field.ErrorText>
        </Field.Root>
    )
}