import type { Offer } from '@/types/offer'

export async function getOffers(): Promise<Offer[]> {
  const response = await fetch('/api/offers')

  if (!response.ok) {
    throw new Error('Não foi possível carregar as ofertas')
  }

  return response.json()
}