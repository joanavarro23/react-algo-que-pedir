import axios from 'axios'
import { REST_SERVER_URL } from './constants'

interface DistanciaJSON {
    distancia: string
}

class DistanciaService {
    async obtenerDistancia(localId: number, userId: number): Promise<string> {
        const response = await axios.get<DistanciaJSON>(`${REST_SERVER_URL}/distancia`, {
            params: {
                fromLocalId: localId,
                toUserId: userId,
            },
        })
        return response.data.distancia
    }
}

export const distanciaService = new DistanciaService()