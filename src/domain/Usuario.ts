export class Usuario {
  id?: number

  constructor(
    public nombre = '',
    public apellido = '',
    public imagen = '',
    public username = '',
    public password = '',
    public email = '',
    public direccion = '',
    public ubicacion = '',
    public latitud = 0,
    public longitud = 0,
    public distancia= 0
  ) {}

  validarCambios() {
    throw new Error('Method not implemented.')
  }

  static fromJson(usuarioJSON: UsuarioJSON): Usuario {
      return Object.assign(new Usuario(), usuarioJSON)

  }

  toJSON(): UsuarioJSON {
    return {
      id: this.id!,
      nombre: this.nombre,
      apellido: this.apellido,
      username: this.username,
      password: this.password,
      direccion: this.direccion,
      ubicacion: this.ubicacion,
      latitud: this.latitud,
      longitud: this.longitud
    }
  }

  // toJSON(): UsuarioJSON {
  //     return {...this}
  // }
}

export type UsuarioJSON = {
    id: number
    nombre: string,
    apellido: string,
    username: string,
    password: string,
    direccion: string,
    ubicacion: string,
    latitud: number,
    longitud: number
}