import type { ReactNode } from 'react'

const restaurantes = [
    { id: 1, nombre: 'La Pizzería', detalles: '4 ★ • 25 - 35 min • $' },
    { id: 2, nombre: 'El Gran Sabor', detalles: '4 ★ • 20 - 40 min • $$' },
]
const palabras = [
    { id: 1, value: 'ajillo', nombre: 'Ajillo' },
    { id: 2, value: 'oleo', nombre: 'Óleo' }
]

export const criterios: {
    value: string
    titulo: string
    descripcion: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    items?: any[]
}[] = [
    { value: 'vegano', titulo: 'Veganos', descripcion: 'Sólo los platos veganos' },
    { value: 'exquisito', titulo: 'Exquisitos', descripcion: 'Sólo platos de autor' },
    { value: 'conservador', titulo: 'Conservadores', descripcion: 'Sólo platos con ingredientes preferidos' },
    { value: 'fiel', titulo: 'Fieles', descripcion: 'Sólo los restaurantes preferidos', items: restaurantes},
    { value: 'marketing', titulo: 'Marketing', descripcion: 'Filtran platos por palabras buscadas', items: palabras} ,
    { value: 'impaciente', titulo: 'Impacientes', descripcion: 'Dentro de una distancia máxima' },
]