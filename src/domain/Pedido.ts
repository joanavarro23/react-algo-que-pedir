import { Plato } from './Plato'
import { type PlatoJSON } from './Plato'
import type { LocalJSON, MedioDePago } from '@/services/localServiceTest'

export class Pedido {
    id?: number

    constructor(
        public local: LocalJSON | null = null,
        public fechaPedido: String = '',
        public distancia: String = '',
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
            platosDelPedido: pedidoJSON.platosDelPedido.map(platoJSON => Plato.fromJSON(platoJSON)),
       })
       return pedido
    }

    toJSON(): PedidoJSON {
        return {
            id: this.id!,
            local: this.local!,
            fechaPedido: this.fechaPedido,
            distancia: this.distancia,
            platosDelPedido: this.platosDelPedido?.map(plato => plato.toJSON()) ?? [],
            cantidadDePlatos: this.cantidadDePlatos,
            medioDePago: this.medioDePago ?? 'EFECTIVO',
            costoSubtotalPedido: this.costoSubtotalPedido,
            recargoMedioDePago: this.recargoMedioDePago,
            tarifaEntrega: this.tarifaEntrega,
            costoTotalPedido: this.costoTotalPedido
        }
    }
}

export type PedidoJSON = {
    id: number
    local: LocalJSON
    fechaPedido: String
    distancia: String
    platosDelPedido: PlatoJSON[]
    cantidadDePlatos: number
    medioDePago: MedioDePago
    costoSubtotalPedido: number
    recargoMedioDePago: number
    tarifaEntrega: number
    costoTotalPedido: number
}