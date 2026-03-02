import { useParams, useNavigate } from 'react-router-dom'
import styled from '@emotion/styled'
import { useEffect } from 'react'
import { useCart } from '@/hooks/useCart'
import { CartEditor } from '@/components/CartEditor'
import { Spinner } from '@/components/Spinner'
import { ErrorMessage } from '@/components/ErrorMessage'
import { colors } from '@/styles/tokens'

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 28px;
`

const TitleGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const Title = styled.h1`
  font-size: 1.6rem;
  font-weight: 700;
  color: ${colors.textPrimary};
  margin: 0;
`

const CartMeta = styled.p`
  font-size: 0.85rem;
  color: ${colors.textMuted};
  margin: 0;
`

export function CartDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const cartId = Number(id)

  const isInvalidId = !id || isNaN(cartId)

  useEffect(() => {
    if (isInvalidId) void navigate('/', { replace: true })
  }, [isInvalidId, navigate])

  const { data: cart, isLoading, isError, error } = useCart(cartId)

  if (isInvalidId) return null
  if (isLoading) return <Spinner label="Loading cart..." />
  if (isError)
    return <ErrorMessage message={error instanceof Error ? error.message : 'Unknown error'} />
  if (!cart) return null

  return (
    <>
      <Header>
        <TitleGroup>
          <Title>Cart #{cart.id}</Title>
          <CartMeta>
            User #{cart.userId} · {cart.totalProducts} product types
          </CartMeta>
        </TitleGroup>
      </Header>
      <CartEditor key={cart.id} cart={cart} />
    </>
  )
}
