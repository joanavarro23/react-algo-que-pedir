import type { DireccionJSON } from '@/types/direccionType'
import { Ingrediente, type IngredienteJSON } from './Ingrediente'
import { Criterio, type CriterioJSON } from './CriterioUsuario'

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
    public latitud = 0,
    public longitud = 0,
    public distancia = 0,
    public criterio: Criterio | null = null,
    public ingredientesPreferidos: Ingrediente[] = [],
    public ingredientesEvitar: Ingrediente[] = []
  ) {}

  

  static fromJSON(usuarioJSON: UsuarioJSON): Usuario {
      return Object.assign(new Usuario(), usuarioJSON, {
        criterio: Criterio.fromJSON(usuarioJSON.criterio),
        ingredientesPreferidos: usuarioJSON.ingredientesPreferidos.map(ing => Ingrediente.fromJSON(ing)),
        ingredientesEvitar: usuarioJSON.ingredientesEvitar.map(ing => Ingrediente.fromJSON(ing))
      })

  }

  toJSON(): UsuarioJSON {
    return {
      id: this.id!,
      nombre: this.nombre,
      apellido: this.apellido,
      mail: this.email,
      direccion: {
        calle: this.direccion,
        ubicacion: {
          x: this.latitud,
          y: this.longitud
        }
      },
      distanciaMaximaCercana: this.distancia,
      criterio: this.criterio?.toJSON() ?? { tipo: 'GENERAL' },
      ingredientesPreferidos: this.ingredientesPreferidos.map(ing => ing.toJSON()),
      ingredientesEvitar: this.ingredientesEvitar.map(ing => ing.toJSON())
    }
  }
}

export type UsuarioJSON = {
    id: number
    nombre: string,
    apellido: string,
    mail: string,
    direccion: DireccionJSON,
    distanciaMaximaCercana: number,
    criterio: CriterioJSON,
    ingredientesPreferidos: IngredienteJSON[],
    ingredientesEvitar: IngredienteJSON[]
}