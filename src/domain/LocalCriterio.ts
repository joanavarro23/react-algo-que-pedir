export type LocalJSON = {
    id: number,
    nombre: string,
    imagen: string,
    puntuacion: number
}

export class Local {
    id?: number

    constructor(
        public nombre: string = '',
        public imagen: string = '/restaurante.png',
        public puntuacion: number = 0
    ){}

    static fromJSON(localJSON: LocalJSON): Local {
        return Object.assign(new Local(), localJSON)
    }

    toJSON(): LocalJSON {
        return {
            id: this.id!,
            nombre: this.nombre,
            imagen: this.imagen,
            puntuacion: this.puntuacion
        }
    }
}