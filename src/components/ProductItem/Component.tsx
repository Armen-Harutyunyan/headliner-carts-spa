import { memo } from 'react'
import styled from '@emotion/styled'
import type { Product } from '@/types/carts'
import { formatCurrency } from '@/utils/formatCurrency'
import { colors, radii, transitions } from '@/styles/tokens'

const Row = styled.div`
  display: grid;
  grid-template-columns: 52px 1fr auto auto;
  align-items: center;
  gap: 16px;
  padding: 14px 20px;
  border-radius: ${radii.lg};
  background: ${colors.surfaceMid};
  border: 1px solid rgba(255, 255, 255, 0.06);
  transition: background ${transitions.base};

  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }

  @media (max-width: 600px) {
    grid-template-columns: 40px 1fr;
    grid-template-rows: auto auto;
  }
`

const Thumbnail = styled.img`
  width: 48px;
  height: 48px;
  object-fit: cover;
  border-radius: ${radii.md};
  background: ${colors.surfaceMid};
`

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 0;
`

const ProductTitle = styled.span`
  font-size: 0.9rem;
  font-weight: 500;
  color: ${colors.textSecondary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const Price = styled.span`
  font-size: 0.78rem;
  color: ${colors.textMuted};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const QtyControls = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: fit-content;
  position: relative;
  z-index: 10;
`

const QtyButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: ${radii.md};
  border: 1px solid ${colors.surfaceBorderMid};
  background: rgba(255, 255, 255, 0.06);
  color: ${colors.textSecondary};
  font-size: 1rem;
  cursor: pointer;
  transition:
    background ${transitions.fast},
    border-color ${transitions.fast};

  &:hover:not(:disabled) {
    background: ${colors.primarySubtle};
    border-color: ${colors.primaryBorder};
  }
  &:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }
  &:focus-visible {
    outline: 2px solid ${colors.primaryLight};
    outline-offset: 2px;
  }
`

const QtyValue = styled.span`
  min-width: 24px;
  text-align: center;
  font-size: 0.9rem;
  font-weight: 600;
  color: ${colors.textPrimary};
`

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 6px;
`

const RowTotal = styled.span`
  font-size: 0.95rem;
  font-weight: 700;
  color: ${colors.primary};
  white-space: nowrap;
`

const DeleteButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  font-size: 0.75rem;
  color: rgba(239, 68, 68, 0.7);
  background: transparent;
  border: 1px solid ${colors.dangerBorder};
  border-radius: ${radii.sm};
  cursor: pointer;
  transition:
    background ${transitions.fast},
    color ${transitions.fast},
    border-color ${transitions.fast};

  &:hover {
    background: ${colors.dangerSubtle};
    color: ${colors.danger};
    border-color: rgba(239, 68, 68, 0.5);
  }
  &:focus-visible {
    outline: 2px solid ${colors.danger};
    outline-offset: 2px;
  }
`

type ProductItemProps = {
  product: Product
  onQuantityChange: (id: number, quantity: number) => void
  onDelete: (id: number) => void
}

export const ProductItem = memo(function ProductItem({
  product,
  onQuantityChange,
  onDelete,
}: ProductItemProps) {
  const handleDecrease = () => onQuantityChange(product.id, product.quantity - 1)
  const handleIncrease = () => onQuantityChange(product.id, product.quantity + 1)
  const handleDelete = () => onDelete(product.id)

  return (
    <Row>
      <Thumbnail src={product.thumbnail} alt={product.title} loading="lazy" />
      <Info>
        <ProductTitle title={product.title}>{product.title}</ProductTitle>
        <Price>{formatCurrency(product.price)} each</Price>
      </Info>
      <QtyControls aria-label={`Quantity for ${product.title}`}>
        <QtyButton
          onClick={handleDecrease}
          disabled={product.quantity <= 1}
          aria-label="Decrease quantity"
        >
          −
        </QtyButton>
        <QtyValue aria-live="polite">{product.quantity}</QtyValue>
        <QtyButton onClick={handleIncrease} aria-label="Increase quantity">
          +
        </QtyButton>
      </QtyControls>
      <Actions>
        <RowTotal>{formatCurrency(product.price * product.quantity)}</RowTotal>
        <DeleteButton onClick={handleDelete} aria-label={`Remove ${product.title} from cart`}>
          Remove
        </DeleteButton>
      </Actions>
    </Row>
  )
})
