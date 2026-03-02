import type { Cart, CartsResponse, UpdateCartPayload } from '@/types/carts'
import { CartSchema, CartsResponseSchema } from '@/schema/carts'
import { parseJson } from '@/lib/http'

const BASE_URL = 'https://dummyjson.com'

type FetchCartsParams = {
  limit: number
  skip: number
}

export async function fetchCarts(
  { limit, skip }: FetchCartsParams,
  signal?: AbortSignal,
): Promise<CartsResponse> {
  const res = await fetch(`${BASE_URL}/carts?limit=${limit}&skip=${skip}`, { signal })
  if (!res.ok) throw new Error(`Failed to fetch carts: ${res.status}`)
  return parseJson(res, CartsResponseSchema)
}

export async function fetchCart(id: number, signal?: AbortSignal): Promise<Cart> {
  const res = await fetch(`${BASE_URL}/carts/${id}`, { signal })
  if (!res.ok) throw new Error(`Failed to fetch cart ${id}: ${res.status}`)
  return parseJson(res, CartSchema)
}

export async function updateCart(id: number, payload: UpdateCartPayload): Promise<Cart> {
  const res = await fetch(`${BASE_URL}/carts/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error(`Failed to update cart ${id}: ${res.status}`)
  return parseJson(res, CartSchema)
}
