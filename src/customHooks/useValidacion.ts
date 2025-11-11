import { validacionStrategy, CompositeValidacion } from '@/utils/validacionStrategy'

export const useValidacion = (
    valor: string | number,
    estrategia: keyof typeof validacionStrategy | CompositeValidacion,
    campo?: string,
    rango?: { min:number, max: number },
) => {
    return (
        (estrategia instanceof CompositeValidacion)
        ? estrategia.esValido(valor, campo, rango)
        : validacionStrategy[estrategia].esValido(valor, campo, rango)
    )
}