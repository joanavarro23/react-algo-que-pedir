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
        public fechaPedido: String = '',
        public platosDelPedido: Plato[] | null = null,
        public cantidadDePlatos: number = 0,
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
    fechaPedido: String
    platosDelPedidio: PlatoJSON[]
    cantidadDePlatos: number
    medioDePago: MedioDePago
    costoSubtotalPedido: number
    recargoMedioDePago: number
    tarifaEntrega: number
    costoTotalPedido: number
}