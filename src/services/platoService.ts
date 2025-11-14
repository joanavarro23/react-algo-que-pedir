import type { PlatoJSON } from '@/domain/Plato'
import { REST_SERVER_URL } from './constants'
import axios from 'axios'
import { PLATOS_MOCK } from '@/mocks/platosMock'
 import type { AxiosResponse } from 'axios'

//Momentaneo
export const getAxiosData = async <T>(query: () => Promise<AxiosResponse<T>>): Promise<T> => {
  const response = await query()
  return response.data
}

class PlatoService {
    async obtenerPlatosPorLocal(idLocal : number) {
        const url = `${REST_SERVER_URL}/local/${idLocal}/platos`

        const queryPlatos = () => axios.get<PlatoJSON[]>(url)

        return getAxiosData(queryPlatos)
    }
}