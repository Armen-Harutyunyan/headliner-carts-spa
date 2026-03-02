import type { z } from 'zod'
import type {
  ProductSchema,
  CartSchema,
  CartsResponseSchema,
  UpdateCartPayloadSchema,
} from '@/schema/carts'

export type Product = z.infer<typeof ProductSchema>
export type Cart = z.infer<typeof CartSchema>
export type CartsResponse = z.infer<typeof CartsResponseSchema>
export type UpdateCartPayload = z.infer<typeof UpdateCartPayloadSchema>
