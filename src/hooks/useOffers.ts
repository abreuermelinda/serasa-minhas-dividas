import { useQuery } from '@tanstack/react-query'

import { getOffers } from '@/services/offers'

export function useOffers() {
  return useQuery({
    queryKey: ['offers'],
    queryFn: getOffers,
  })
}