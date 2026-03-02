import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateCart } from '@/api/carts'
import { cartKeys } from '@/lib/queryKeys'
import type { Cart, UpdateCartPayload, CartsResponse } from '@/types/carts'

export function useUpdateCart(cartId: number) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: UpdateCartPayload) => updateCart(cartId, payload),
    onSuccess: (updatedCart: Cart) => {
      queryClient.setQueryData(cartKeys.detail(cartId), updatedCart)
      queryClient.setQueriesData(
        { queryKey: ['carts', 'list'] },
        (oldData: CartsResponse | undefined) => {
          if (!oldData) return oldData
          return {
            ...oldData,
            carts: oldData.carts.map((c) => (c.id === cartId ? updatedCart : c)),
          }
        },
      )
    },
  })
}
