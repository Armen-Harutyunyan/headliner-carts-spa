import styled from '@emotion/styled'
import { useCarts } from '@/hooks/useCarts'
import { useCartStore } from '@/store/useCartStore'
import { CartListItem } from '@/components/CartListItem'
import { Pagination } from '@/components/Pagination'
import { Spinner } from '@/components/Spinner'
import { ErrorMessage } from '@/components/ErrorMessage'

const Header = styled.div`
  margin-bottom: 28px;
`

const Title = styled.h1`
  font-size: 1.75rem;
  font-weight: 700;
  color: #f1f5f9;
  margin: 0 0 6px;
`

const Subtitle = styled.p`
  font-size: 0.88rem;
  color: rgba(255, 255, 255, 0.4);
  margin: 0;
`

const Grid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const FadedOverlay = styled.div<{ isFetching: boolean }>`
  opacity: ${({ isFetching }) => (isFetching ? 0.6 : 1)};
  transition: opacity 0.2s;
`

export function CartsListPage() {
  const { page, limit, setPage, setLimit } = useCartStore()
  const { data, isLoading, isError, error, isFetching } = useCarts(page, limit)

  if (isLoading) return <Spinner label="Loading carts…" />
  if (isError)
    return <ErrorMessage message={error instanceof Error ? error.message : 'Unknown error'} />
  if (!data) return null

  return (
    <>
      <Header>
        <Title>Shopping Carts</Title>
        <Subtitle>{data.total} carts total</Subtitle>
      </Header>

      <FadedOverlay isFetching={isFetching} aria-busy={isFetching}>
        <Grid>
          {data.carts.map((cart) => (
            <CartListItem key={cart.id} cart={cart} />
          ))}
        </Grid>
      </FadedOverlay>

      <Pagination
        page={page}
        limit={limit}
        total={data.total}
        onPageChange={setPage}
        onLimitChange={setLimit}
      />
    </>
  )
}
