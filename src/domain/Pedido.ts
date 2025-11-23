import type { Carrito } from './Carrito'
import { Plato } from './Plato'
import { type PlatoJSON } from './Plato'
import type { LocalJSON, MedioDePago } from '@/services/localServiceTest'
import { Usuario, type UsuarioJSON } from './Usuario'

export type PedidoJSON = {
    id: number
    local: LocalJSON
    platosDelPedido: PlatoJSON[]
    medioDePago: MedioDePago
    costoTotalPedido: number,
    fechaPedido: String
    usuario: UsuarioJSON
}
export class Pedido {
    id?: number

    constructor(
        public local: LocalJSON | null = null,
        public platosDelPedido: Plato[] | null = null,
        public medioDePago: MedioDePago | null = null,
        public fechaPedido: Date | null = null,
        public costoTotalPedido = 0,
        public usuario: Usuario | null = null
    ) {}

    static fromJson(pedidoJSON: PedidoJSON): Pedido {
       const pedido = Object.assign(new Pedido(), pedidoJSON, {
            platosDelPedido: pedidoJSON.platosDelPedido.map(platoJSON => Plato.fromJSON(platoJSON)),
            usuario: Usuario.fromJson(pedidoJSON.usuario),
       })
       return pedido
    }

    static fromCarrito(
        carrito: Carrito,
        local: LocalJSON,
        medioDePago: MedioDePago,
        costoTotalPedido: number, //Tengo que enviar esto para validar el pedido en el back que todavía no lo hice
        fechaPedido: Date,
        usuario: Usuario
    ): Pedido {
            const platosDelPedido = carrito.items.flatMap(item => Array(item.cantidad).fill(item.plato))
            return new Pedido(local, platosDelPedido, medioDePago, fechaPedido, costoTotalPedido, usuario)
        }
        
        toJSON(): PedidoJSON {
            if (!this.local || !this.medioDePago || !this.fechaPedido) {
                throw new Error('Faltan datos para convertir el Pedido a JSON')
            }
            return {
                id: this.id!,
                local: this.local!,
                platosDelPedido: this.platosDelPedido?.map(plato => plato.toJSON()) ?? [],
                medioDePago: this.medioDePago ?? 'EFECTIVO',
                costoTotalPedido: this.costoTotalPedido,
                fechaPedido: this.fechaPedido.toISOString(),
                usuario: this.usuario!.toJSON()
            }
        }
    }
    