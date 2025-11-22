export class Criterio {
  constructor(
    public tipo: TipoCriterio = 'GENERAL',
    public localesPreferidos: number[] = [], // para fieles
    public palabrasClave: string[] = [],  // para marketing
    public subCriterios: Criterio[] = []  // para combinados
  ) {}

  static fromJSON(criterioJSON: CriterioJSON): Criterio {
    return new Criterio(
      criterioJSON.tipo,
      criterioJSON.localesPreferidos ?? [],
      criterioJSON.palabrasClave ?? [],
      criterioJSON.subCriterios?.map(criterio => Criterio.fromJSON(criterio)) ?? [],
    )
  }

  toJSON(): CriterioJSON {
    const json: CriterioJSON = { tipo: this.tipo }

    if (this.tipo === 'COMBINADO' && this.subCriterios.length > 0) {
      json.subCriterios = this.subCriterios.map(subCriterio => subCriterio.toJSON())
    }
    if (this.tipo === 'FIEL' && this.localesPreferidos.length > 0) {
      json.localesPreferidos = this.localesPreferidos
    }
    if (this.tipo === 'MARKETING') {
      json.palabrasClave = this.palabrasClave
    }

    return json
  }
}

export type TipoCriterio =
  | 'GENERAL' | 'VEGANO' | 'EXQUISITO' | 'CONSERVADOR'
  | 'FIEL' | 'MARKETING' | 'IMPACIENTE' | 'COMBINADO'

export type CriterioJSON = {
  tipo: TipoCriterio
  localesPreferidos?: number[]
  palabrasClave?: string[]
  subCriterios?: CriterioJSON[]
}