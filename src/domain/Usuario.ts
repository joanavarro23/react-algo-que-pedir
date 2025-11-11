export class Usuario {
  id?: number

  constructor(
    public nombre = '',
    public apellido = '',
    public imagen = '',
    public email = '',
    public direccion = '',
    public ubicacion = '',
    public latitud = 0,
    public longitud = 0
  ) {}

  validarCambios() {
    throw new Error('Method not implemented.')
  }

  static fromJson(usuarioJSON: UsuarioJSON): Usuario {
      return Object.assign(new Usuario(), usuarioJSON)

  }

  // toJSON(): UsuarioJSON {
  //     return {...this}
  // }
}

export type UsuarioJSON = {
    id: number
    nombre: string,
    apellido: string,
    direccion: string,
    ubicacion: string,
    latitud: number,
    longitud: number
}