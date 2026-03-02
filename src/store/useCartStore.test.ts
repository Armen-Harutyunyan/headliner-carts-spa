import { describe, it, expect, beforeEach } from 'vitest'
import { useCartStore } from './useCartStore'

describe('useCartStore', () => {
  beforeEach(() => {
    useCartStore.setState({ page: 1, limit: 10 })
  })

  it('initializes with default values', () => {
    const state = useCartStore.getState()
    expect(state.page).toBe(1)
    expect(state.limit).toBe(10)
  })

  it('updates the page correctly', () => {
    useCartStore.getState().setPage(3)
    expect(useCartStore.getState().page).toBe(3)
  })

  it('updates the limit correctly and resets page to 1', () => {
    useCartStore.getState().setPage(5)
    expect(useCartStore.getState().page).toBe(5)
    useCartStore.getState().setLimit(20)
    const state = useCartStore.getState()
    expect(state.limit).toBe(20)
    expect(state.page).toBe(1)
  })
})
