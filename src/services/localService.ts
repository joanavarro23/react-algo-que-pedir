//archivo momentaneo para poder laburar la vista 
// del detalle-local
import axios from 'axios'
import { REST_SERVER_URL } from './constants'
import { getAxiosData } from './common'
import type { LocalJSON } from '@/domain/Local'
class LocalService {
    async obtenerLocalPorId(idLocal : number) {
        const url = `${REST_SERVER_URL}/local/${idLocal}`
        const queryLocal = () => axios.get<LocalJSON>(url)

        return getAxiosData(queryLocal)
    }

    async obtenerTodos() {
        const queryLocal = () => axios.get<LocalJSON>(`${REST_SERVER_URL}/locales`)
        return getAxiosData(queryLocal)
    }
}

export const localService = new LocalService()