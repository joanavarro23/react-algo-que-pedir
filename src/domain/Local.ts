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
    reviews: String,
    tarifaEntrega: number,
    recargosMedioDePago: Record<MedioDePago, number>
}