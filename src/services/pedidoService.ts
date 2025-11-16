import axios from 'axios'
import { REST_SERVER_URL } from './constants'
import { getAxiosData } from './common'
import { Pedido, type PedidoJSON } from '@/domain/Pedido'

class PedidoService {

    async getPedidoById(idPedido: number) {
        const queryById = () => axios.get<PedidoJSON>(`${REST_SERVER_URL}/pedido-checkout/${idPedido}`)
        const pedidoJSON = await getAxiosData(queryById)
        return Pedido.fromJson(pedidoJSON)
    }
}

export const pedidoService = new PedidoService()