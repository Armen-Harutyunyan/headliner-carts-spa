import { z } from 'zod'

export const ProductSchema = z.object({
  id: z.number(),
  title: z.string(),
  price: z.number(),
  quantity: z.number(),
  total: z.number().optional(),
  discountPercentage: z.number().optional(),
  discountedTotal: z.number().optional(),
  discountedPrice: z.number().optional(),
  thumbnail: z.string(),
})

export const CartSchema = z.object({
  id: z.number(),
  products: z.array(ProductSchema),
  total: z.number(),
  discountedTotal: z.number(),
  userId: z.number(),
  totalProducts: z.number(),
  totalQuantity: z.number(),
})

export const CartsResponseSchema = z.object({
  carts: z.array(CartSchema),
  total: z.number(),
  skip: z.number(),
  limit: z.number(),
})

export const UpdateCartPayloadSchema = z.object({
  merge: z.boolean(),
  products: z.array(
    z.object({
      id: z.number(),
      quantity: z.number(),
    }),
  ),
})
