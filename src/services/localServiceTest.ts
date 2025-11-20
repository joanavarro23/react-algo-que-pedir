//archivo momentaneo para poder laburar la vista 
// del detalle-local
import axios from 'axios'
import { REST_SERVER_URL } from './constants'
import { getAxiosData } from './common'

export type MedioDePago = 'EFECTIVO' | 'QR' | 'TARJETA'

export const medioDePagoLabels: Record<MedioDePago, string> = {
  EFECTIVO: 'Efectivo',
  TARJETA: 'Tarjeta',
  QR: 'QR',
}

export type LocalJSON = {
    idLocal: number,
    nombre: string,
    urlImagenLocal: string,
    mediosDePago: MedioDePago[],
    rating: number,
    reviews: String
}

class LocalService {
    async obtenerLocalPorId(idLocal : number) {
        const url = `${REST_SERVER_URL}/local/${idLocal}`
        const queryLocal = () => axios.get<LocalJSON>(url)

        return getAxiosData(queryLocal)
    }
}

export const localService = new LocalService()