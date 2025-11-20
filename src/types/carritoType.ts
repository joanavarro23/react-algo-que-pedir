import { Plato } from '@/domain/Plato'

export type ItemCarrito = {
    plato: Plato,
    cantidad: number
}

export type EstadoCarrito = Record<number, ItemCarrito>