import { useQuery } from '@tanstack/react-query'
import { fetchCarts } from '@/api/carts'
import { cartKeys } from '@/lib/queryKeys'

export function useCarts(page: number, limit: number) {
  return useQuery({
    queryKey: cartKeys.list(page, limit),
    queryFn: ({ signal }) => fetchCarts({ limit, skip: page * limit }, signal),
    staleTime: 30_000,
    placeholderData: (prev) => prev,
  })
}
