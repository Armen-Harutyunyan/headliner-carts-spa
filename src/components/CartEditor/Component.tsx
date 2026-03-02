import { useState, useMemo } from 'react'
import styled from '@emotion/styled'
import { useUpdateCart } from '@/hooks/useUpdateCart'
import { ProductItem } from '@/components/ProductItem'
import { formatCurrency } from '@/utils/formatCurrency'
import { colors, radii, transitions } from '@/styles/tokens'
import type { Cart, Product } from '@/types/carts'

const ProductList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 28px;
`

const EmptyState = styled.div`
  padding: 48px;
  text-align: center;
  color: ${colors.textMuted};
  font-size: 0.92rem;
`

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  flex-wrap: wrap;
  padding: 20px 0;
  border-top: 1px solid ${colors.surfaceBorder};
`

const TotalLabel = styled.span`
  font-size: 0.9rem;
  color: ${colors.textSubtle};
  margin-right: auto;
`

const TotalValue = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${colors.primary};
`

const SaveButton = styled.button`
  padding: 10px 24px;
  font-size: 0.9rem;
  font-weight: 600;
  color: #fff;
  background: ${colors.primary};
  border: none;
  border-radius: ${radii.lg};
  cursor: pointer;
  transition:
    background ${transitions.base},
    transform ${transitions.fast},
    opacity ${transitions.base};

  &:hover:not(:disabled) {
    background: ${colors.primaryHover};
    transform: translateY(-1px);
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  &:focus-visible {
    outline: 2px solid ${colors.primaryLight};
    outline-offset: 2px;
  }
`

const ResetButton = styled.button`
  padding: 10px 18px;
  font-size: 0.9rem;
  font-weight: 500;
  color: ${colors.textDim};
  background: ${colors.surfaceMid};
  border: 1px solid ${colors.surfaceBorderMid};
  border-radius: ${radii.lg};
  cursor: pointer;
  transition: all ${transitions.fast};

  &:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.09);
    color: ${colors.textPrimary};
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  &:focus-visible {
    outline: 2px solid ${colors.primaryLight};
    outline-offset: 2px;
  }
`

const MutationError = styled.p`
  margin: 0;
  font-size: 0.82rem;
  color: ${colors.danger};
`

const SavedBadge = styled.span`
  font-size: 0.82rem;
  color: ${colors.success};
`

type CartEditorProps = {
  cart: Cart
}

export function CartEditor({ cart }: CartEditorProps) {
  const { mutate, isPending, isError, isSuccess, error } = useUpdateCart(cart.id)

  const [initialProducts] = useState<Product[]>(cart.products)
  const [localProducts, setLocalProducts] = useState<Product[]>(cart.products)

  const isDirty = useMemo(() => {
    if (localProducts.length !== cart.products.length) return true
    const originalMap = new Map(cart.products.map((p) => [p.id, p.quantity]))
    return localProducts.some((p) => originalMap.get(p.id) !== p.quantity)
  }, [localProducts, cart.products])

  const localTotal = useMemo(
    () => localProducts.reduce((sum, p) => sum + p.price * p.quantity, 0),
    [localProducts],
  )

  const handleQuantityChange = (productId: number, quantity: number) => {
    setLocalProducts((prev) => prev.map((p) => (p.id === productId ? { ...p, quantity } : p)))
  }

  const handleDelete = (productId: number) => {
    setLocalProducts((prev) => prev.filter((p) => p.id !== productId))
  }

  const isPristine = useMemo(() => {
    if (localProducts.length !== initialProducts.length) return false
    const initialMap = new Map(initialProducts.map((p) => [p.id, p.quantity]))
    return localProducts.every((p) => initialMap.get(p.id) === p.quantity)
  }, [localProducts, initialProducts])

  const handleReset = () => {
    setLocalProducts(initialProducts)
  }

  const handleSave = () => {
    mutate(
      {
        merge: false,
        products: localProducts.map((p) => ({ id: p.id, quantity: p.quantity })),
      },
      {
        onSuccess: (updatedCart) => {
          setLocalProducts(updatedCart.products)
        },
      },
    )
  }

  return (
    <>
      {localProducts.length === 0 ? (
        <EmptyState>Cart is empty. All products were removed.</EmptyState>
      ) : (
        <ProductList>
          {localProducts.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              onQuantityChange={handleQuantityChange}
              onDelete={handleDelete}
            />
          ))}
        </ProductList>
      )}

      <Footer>
        <TotalLabel>
          Total: <TotalValue>{formatCurrency(localTotal)}</TotalValue>
        </TotalLabel>

        {isError ? (
          <MutationError role="alert">
            {error instanceof Error ? error.message : 'Request failed'}
          </MutationError>
        ) : null}
        {isSuccess && !isDirty ? <SavedBadge aria-live="polite">Saved</SavedBadge> : null}

        <ResetButton
          onClick={handleReset}
          disabled={isPristine || isPending}
          aria-label="Reset to original state"
        >
          Reset
        </ResetButton>
        <SaveButton
          onClick={handleSave}
          disabled={!isDirty || isPending}
          aria-label="Save cart changes"
        >
          {isPending ? 'Saving...' : 'Save changes'}
        </SaveButton>
      </Footer>
    </>
  )
}
