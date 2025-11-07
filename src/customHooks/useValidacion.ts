import { validacionStrategy } from '@/utils/validacionStrategy'

export const useValidacion = (
    valor: string | number,
    estrategia: keyof typeof validacionStrategy,
    rango?: { min:number, max: number }
): boolean => {
    return validacionStrategy[estrategia].esValido(valor, rango)
}