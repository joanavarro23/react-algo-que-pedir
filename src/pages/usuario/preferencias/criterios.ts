import type { RestaurenteItemProps } from '@/components/perfil-usuario/restauranteItem'

type ContenidoExtra = {
    id: number
    nombre: string
    puntuacion?: number
    tiempo?: string
    precio?: string
}

const restaurantes: RestaurenteItemProps[] = [
    { id: 1, nombre: 'La Pizzería', puntuacion: 4.5, tiempo: '25-35 min', precio: '$' },
    { id: 2, nombre: 'El Gran Sab', puntuacion: 3.8, tiempo: '20-40 min', precio: '$$' },
]
const palabras: ContenidoExtra[] = [
    { id: 1, nombre: 'Ajillo' },
    { id: 2, nombre: 'Óleo' }
]

export const CRITERIOS_MOCK: {
    value: string
    titulo: string
    descripcion: string
    type: string
    items?: RestaurenteItemProps[] | ContenidoExtra[]
    checked: boolean
}[] = [
    { value: 'vegano', titulo: 'Veganos', descripcion: 'Sólo los platos veganos', type: 'simple', checked: true },
    { value: 'exquisito', titulo: 'Exquisitos', descripcion: 'Sólo platos de autor', type: 'simple', checked: true },
    { value: 'conservador', titulo: 'Conservadores', descripcion: 'Sólo platos con ingredientes preferidos', type: 'simple', checked: false },
    { value: 'fiel', titulo: 'Fieles', descripcion: 'Sólo los restaurantes preferidos', type: 'restaurantes', items: restaurantes, checked: false },
    { value: 'marketing', titulo: 'Marketing', descripcion: 'Filtran platos por palabras buscadas', type: 'palabras', items: palabras, checked: false },
    { value: 'impaciente', titulo: 'Impacientes', descripcion: 'Dentro de una distancia máxima', type: 'distancia', checked: false },
]