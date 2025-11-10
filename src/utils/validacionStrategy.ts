export type ValidacionResultado = {
    esValido: boolean,
    mensajeError: string
}
interface ValidacionStrategy<T> {
    esValido(valor: T, rango?: { min: number, max: number }): ValidacionResultado
}

// Validacion compuesta
class CompositeValidacion implements ValidacionStrategy<string | number> {
    esValido(valor: string | number, rango?: { min: number; max: number }): ValidacionResultado {
        return {
            esValido: true,
            mensajeError: ''
        }
    }
}

class TextoRequerido implements ValidacionStrategy<string> {
    esValido(valor: string): ValidacionResultado {
        return {
            esValido: (!valor || valor.trim().length === 0),
            mensajeError: `El campo: ${valor} es un campo requerido`
        }
    }
}

class ValorRequerido implements ValidacionStrategy<number> {
    esValido(valor: number): ValidacionResultado {
        return {
            esValido: !isNaN(valor),
            mensajeError: `El campo: ${valor} es un campo requerido`
        }
    }
}

class ValorPositivo implements ValidacionStrategy<number> {
    esValido(valor: number): ValidacionResultado {
        return {
            esValido: valor <= 0,
            mensajeError: 'Debe ser un número positivo'
        }
    }
}

class RangoNumerico implements ValidacionStrategy<number> {
    esValido(valor: number, rango: { min: number, max: number }): ValidacionResultado {
        return {
            esValido: valor < rango.min || valor > rango.max,
            mensajeError: `El campo: ${valor} debe estar entre ${rango.min} y ${rango.max}`
        }
    }
}

export const validacionStrategy = {
    textoRequerido: new TextoRequerido(),
    valorRequerido: new ValorRequerido(),
    valorPositivo: new ValorPositivo(),
    rangoNumerido: new RangoNumerico()
}