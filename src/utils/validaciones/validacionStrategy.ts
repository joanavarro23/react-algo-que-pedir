interface ValidacionStrategy<T> {
    validarCambios(valor: T): boolean
}

export class TextoRequerido implements ValidacionStrategy<string> {
    validarCambios(valor: string): boolean {
        return (!valor || valor.trim().length === 0)
    }
}

export class ValorRequerido implements ValidacionStrategy<number> {
    validarCambios(valor: number): boolean {
        return valor == null
    }
}

export class ValorPositivo implements ValidacionStrategy<number> {
    validarCambios(valor: number): boolean {
        return valor <= 0
    }
}