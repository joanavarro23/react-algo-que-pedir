import { type Restaurante } from "./restaurante"
import { Articulo } from "@/components/articulo-checkout/Articulo"

export interface PedidoDetalleProps {
  restaurante: Restaurante
  articulos: Articulo[]
  subtotal: number
  recargo: number
  tarifaEntrega: number
  distancia:string
  total: number
  mostrarFormaDePago?: boolean
  medioDePago?: string
  isCheckout: boolean
}