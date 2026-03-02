export const cartKeys = {
  list: (page: number, limit: number) => ['carts', 'list', page, limit] as const,
  detail: (id: number) => ['carts', 'detail', id] as const,
}
