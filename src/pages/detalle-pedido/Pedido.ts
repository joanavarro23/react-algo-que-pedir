export type EstadoPedido = "PENDIENTE" | "PREPARADO" | "ENTREGADO" | "CANCELADO"

export interface Local {
  id: number
  nombre: string
  urlImagenLocal: string
}


export interface Pedido {
  id: number
  local: Local
  estadoPedido: EstadoPedido
  hora: string
  platosDelPedido: any[] //Ups, juro cambiar este any
  items: number,
  precioTotal: number
}