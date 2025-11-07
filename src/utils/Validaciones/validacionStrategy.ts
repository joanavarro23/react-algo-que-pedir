interface ValidacionStrategy<T> {
    esValido(valor: T, rango?: { min: number, max: number }): boolean
}

class TextoRequerido implements ValidacionStrategy<string> {
    esValido(valor: string): boolean {
        return (!valor || valor.trim().length === 0)
    }
}

class ValorRequerido implements ValidacionStrategy<number> {
    esValido(valor: number): boolean {
        return isNaN(valor)
    }
}

class ValorPositivo implements ValidacionStrategy<number> {
    esValido(valor: number): boolean {
        return valor <= 0
    }
}

class RangoNumerico implements ValidacionStrategy<number> {
    esValido(valor: number, rango: { min: number, max: number }): boolean {
        return valor < rango.min || valor > rango.max
    }
}

export const validacionStrategy = {
    textoRequerido: new TextoRequerido(),
    valorRequerido: new ValorRequerido(),
    valorPositivo: new ValorPositivo(),
    rangoNumerido: new RangoNumerico()
}