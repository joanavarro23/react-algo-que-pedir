import { REST_SERVER_URL } from '@/services/constants'

//El back va a devolver esto
export type PlatoJSON = {
    id: number,
    nombre: string,
    descripcion: string,
    imagenUrl: string,
    precioUnitario: number,
    popular: boolean
}

export class Plato {
    id: number
    nombre: string
    descripcion: string
    imagenUrl: string
    precioUnitario: number
    popular: boolean

    constructor(data : PlatoJSON) {
        this.id = data.id
        this.nombre = data.nombre
        this.descripcion = data.descripcion
        this.imagenUrl = data.imagenUrl ? `${REST_SERVER_URL}/${data.imagenUrl}` : './pizza-margherita.png'
        this.precioUnitario = data.precioUnitario
        this.popular = data.popular
    }

    static fromJSON(platoJSON : PlatoJSON) : Plato {
        return new Plato(platoJSON)
    }
}