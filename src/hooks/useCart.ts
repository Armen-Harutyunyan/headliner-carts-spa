import { useQuery } from '@tanstack/react-query'
import { fetchCart } from '@/api/carts'
import { cartKeys } from '@/lib/queryKeys'

export function useCart(id: number) {
  return useQuery({
    queryKey: cartKeys.detail(id),
    queryFn: ({ signal }) => fetchCart(id, signal),
    staleTime: 60_000,
  })
}
