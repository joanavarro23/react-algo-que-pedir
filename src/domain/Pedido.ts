import { type Local } from '@/pages/detalle-pedido/Pedido'
import { Plato } from './Plato'
import { type PlatoJSON } from './Plato'
import type { LocalJSON } from '@/services/localServiceTest'

export enum MedioDePago {
    EFECTIVO = 'Efectivo',
    QR = 'QR',
    TARJETA = 'Tarjeta'
}

export class Pedido {
    id?: number

    constructor(
        public local: Local | null = null,
        public platosDelPedido: Plato[] | null = null,
        public medioDePago: MedioDePago | null = null,
        public costoSubtotalPedido = 0,
        public recargoMedioDePago = 0,
        public tarifaEntrega = 0,
        public costoTotalPedido = 0
    ) {}

    static fromJson(pedidoJSON: PedidoJSON): Pedido {
       const pedido = Object.assign(new Pedido(), pedidoJSON, {
            platosDelPedido: pedidoJSON.platosDelPedidio.map(platoJSON => Plato.fromJSON(platoJSON))
       })
       return pedido
    }
}

export type PedidoJSON = {
    id: number
    local: LocalJSON
    platosDelPedidio: PlatoJSON[]
    medioDePago: MedioDePago
    costoSubtotalPedido: number
    recargoMedioDePago: number
    tarifaEntrega: number
    costoTotalPedido: number
}