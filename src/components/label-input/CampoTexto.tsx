import React from 'react'
import { Field, Input, type InputProps } from '@chakra-ui/react'

interface CampoTextoProps extends InputProps {
    invalid: boolean
    required?: boolean
    nombreLabel: string
    nombreTest: string
    msjError: string
}

export const CampoTexto = ({ invalid, required=true, nombreLabel, nombreTest, msjError, ...rest }: CampoTextoProps) => {
    return (
        <Field.Root invalid={invalid} required={required}>
            <Field.Label>{nombreLabel}</Field.Label>
            <Input data-testid={`input-${nombreTest}`} {...rest}/>
            <Field.ErrorText>{msjError}</Field.ErrorText>
        </Field.Root>
    )
}