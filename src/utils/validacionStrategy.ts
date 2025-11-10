export type ValidacionResultado = {
    esValido: boolean,
    mensajeError?: string
}
interface ValidacionStrategy<T> {
    esValido(valor: T, campo?: string, rango?: { min?: number, max?: number }): ValidacionResultado
}

// Validacion compuesta
// export class CompositeValidacion implements ValidacionStrategy<string | number> {
//     esValido(valor: string | number, rango?: { min: number; max: number }): ValidacionResultado {
//         return {
//             esValido: true,
//             mensajeError: ''
//         }
//     }
// }

class TextoRequerido implements ValidacionStrategy<string> {
    esValido(valor: string, campo: string): ValidacionResultado {
        const estaVacio = !valor || valor.trim().length === 0
        return {
            esValido: !estaVacio,
            mensajeError: estaVacio ? `El campo: ${campo} es requerido` : undefined
        }
    }
}

class ValorRequerido implements ValidacionStrategy<number> {
    esValido(valor: number, campo: string): ValidacionResultado {
        const esInvalido = !valor
        return {
            esValido: !esInvalido,
            mensajeError: esInvalido ? `El campo: ${campo} es requerido` : undefined
        }
    }
}

class ValorPositivo implements ValidacionStrategy<number> {
    esValido(valor: number): ValidacionResultado {
        const esPositivo = valor > 0
        return {
            esValido: esPositivo,
            mensajeError: !esPositivo ? 'Debe ser un número positivo' : undefined
        }
    }
}

class RangoNumerico implements ValidacionStrategy<number> {
    esValido(valor: number, campo: string, rango: { min: number, max: number }): ValidacionResultado {
        const dentroDelRango = valor >= rango.min && valor <= rango.max
        return {
            esValido: dentroDelRango,
            mensajeError: !dentroDelRango 
                ? `El campo: ${campo} debe estar entre ${rango.min} y ${rango.max}` 
                : undefined
        }
    }
}

export const validacionStrategy = {
    textoRequerido: new TextoRequerido(),
    valorRequerido: new ValorRequerido(),
    valorPositivo: new ValorPositivo(),
    rangoNumerido: new RangoNumerico()
}