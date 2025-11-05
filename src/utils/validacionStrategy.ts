interface ValidacionStrategy<T> {
    validarCambios(valor: T): boolean
}

class TextoRequerido implements ValidacionStrategy<string> {
    validarCambios(valor: string): boolean {
        return (!valor || valor.trim().length === 0)
    }
}

class ValorRequerido implements ValidacionStrategy<number> {
    validarCambios(valor: number): boolean {
        return valor == null
    }
}

class ValorPositivo implements ValidacionStrategy<number> {
    validarCambios(valor: number): boolean {
        return valor <= 0
    }
}

class RangoNumerico implements ValidacionStrategy<number> {
    constructor(private min: number, private max: number){}
    validarCambios(valor: number): boolean {
        return valor < this.min || valor > this.max
    }
}

export const validacionStrategy = {
    textoRequerido: new TextoRequerido(),
    valorRequerido: new ValorRequerido(),
    valorPositivo: new ValorPositivo(),
    rangoNumerico(min: number, max:number) { return new RangoNumerico(min, max) },
}