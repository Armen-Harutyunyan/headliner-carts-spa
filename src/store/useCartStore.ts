import { create } from 'zustand'

type CartStore = {
  page: number
  limit: number
  setPage: (page: number) => void
  setLimit: (limit: number) => void
}

export const useCartStore = create<CartStore>()((set) => ({
  page: 1,
  limit: 10,
  setPage: (page) => set({ page }),
  setLimit: (limit) => set({ limit, page: 1 }),
}))
