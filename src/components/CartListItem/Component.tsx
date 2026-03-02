import { memo } from 'react'
import { Link } from 'react-router-dom'
import styled from '@emotion/styled'
import type { Cart } from '@/types/carts'
import { formatCurrency } from '@/utils/formatCurrency'
import { colors, radii, transitions } from '@/styles/tokens'

const Card = styled.article`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 16px;
  padding: 20px 24px;
  background: ${colors.surface};
  border: 1px solid ${colors.surfaceBorder};
  border-radius: ${radii.xl};
  transition:
    border-color ${transitions.base},
    background ${transitions.base},
    transform ${transitions.fast};

  &:hover {
    background: ${colors.surfaceHover};
    border-color: ${colors.primaryBorder};
    transform: translateY(-1px);
  }
`

const Meta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const Title = styled.h2`
  font-size: 1rem;
  font-weight: 600;
  color: ${colors.textPrimary};
  margin: 0;
`

const Stats = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px 20px;
`

const Stat = styled.span`
  font-size: 0.82rem;
  color: ${colors.textFaint};

  strong {
    color: rgba(255, 255, 255, 0.8);
    font-weight: 500;
  }
`

const Total = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${colors.primary};
  white-space: nowrap;
`

const DetailsLink = styled(Link)`
  display: inline-block;
  margin-top: 12px;
  padding: 7px 18px;
  font-size: 0.82rem;
  font-weight: 600;
  color: #fff;
  background: ${colors.primary};
  border-radius: ${radii.md};
  text-decoration: none;
  transition:
    background ${transitions.base},
    transform ${transitions.fast};

  &:hover {
    background: ${colors.primaryHover};
    transform: translateY(-1px);
  }
  &:active {
    transform: translateY(0);
  }
  &:focus-visible {
    outline: 2px solid ${colors.primaryLight};
    outline-offset: 2px;
  }
`

type CartListItemProps = {
  cart: Cart
}

export const CartListItem = memo(function CartListItem({ cart }: CartListItemProps) {
  return (
    <Card>
      <Meta>
        <Title>Cart #{cart.id}</Title>
        <Stats>
          <Stat>
            User: <strong>{cart.userId}</strong>
          </Stat>
          <Stat>
            Items: <strong>{cart.totalProducts}</strong>
          </Stat>
          <Stat>
            Qty: <strong>{cart.totalQuantity}</strong>
          </Stat>
        </Stats>
        <DetailsLink to={`/carts/${cart.id}`} aria-label={`View details for cart ${cart.id}`}>
          Details
        </DetailsLink>
      </Meta>
      <Total>{formatCurrency(cart.total)}</Total>
    </Card>
  )
})
