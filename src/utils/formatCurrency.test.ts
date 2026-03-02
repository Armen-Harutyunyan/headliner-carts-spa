import { describe, it, expect } from 'vitest'
import { formatCurrency } from './formatCurrency'

describe('formatCurrency', () => {
  it('formats a standard number correctly', () => {
    expect(formatCurrency(1234.56)).toBe('$1,234.56')
  })

  it('formats zero correctly', () => {
    expect(formatCurrency(0)).toBe('$0.00')
  })

  it('formats large numbers correctly', () => {
    expect(formatCurrency(1000000)).toBe('$1,000,000.00')
  })

  it('rounds decimal places to two digits', () => {
    expect(formatCurrency(12.345)).toBe('$12.35')
  })
})
