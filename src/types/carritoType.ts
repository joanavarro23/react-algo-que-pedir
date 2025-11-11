import type { Plato } from '@/mocks/platosMock'

export type ItemCarrito = {
    plato: Plato,
    cantidad: number
}

export type EstadoCarrito = Record<number, ItemCarrito>