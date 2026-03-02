import type { z } from 'zod'

export async function parseJson<T>(res: Response, schema: z.ZodType<T>): Promise<T> {
  const data = (await res.json()) as unknown
  return schema.parse(data)
}
