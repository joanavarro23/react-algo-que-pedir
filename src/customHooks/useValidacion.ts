import { validacionStrategy } from '@/utils/validacionStrategy'

export const useValidacion = (
    valor: string | number,
    estrategia: keyof typeof validacionStrategy,
    campo?: string,
    rango?: { min:number, max: number },
) => {
    return validacionStrategy[estrategia].esValido(valor, campo, rango)
}