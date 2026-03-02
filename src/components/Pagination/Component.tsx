import styled from '@emotion/styled'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  padding: 20px 0;
`

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const PageButton = styled.button<{ isActive?: boolean }>`
  padding: 7px 14px;
  font-size: 0.85rem;
  font-weight: 500;
  border-radius: 8px;
  border: 1px solid
    ${({ isActive }) => (isActive ? 'rgba(99, 102, 241, 0.6)' : 'rgba(255, 255, 255, 0.1)')};
  background: ${({ isActive }) =>
    isActive ? 'rgba(99, 102, 241, 0.2)' : 'rgba(255, 255, 255, 0.04)'};
  color: ${({ isActive }) => (isActive ? '#818cf8' : 'rgba(255, 255, 255, 0.6)')};
  cursor: pointer;
  transition: all 0.15s;

  &:hover:not(:disabled) {
    background: rgba(99, 102, 241, 0.15);
    border-color: rgba(99, 102, 241, 0.4);
    color: #818cf8;
  }
  &:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }
  &:focus-visible {
    outline: 2px solid #818cf8;
    outline-offset: 2px;
  }
`

const PageInfo = styled.span`
  font-size: 0.82rem;
  color: rgba(255, 255, 255, 0.4);
  white-space: nowrap;
`

const LimitSelect = styled.select`
  padding: 7px 10px;
  font-size: 0.82rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  transition: border-color 0.15s;

  &:hover {
    border-color: rgba(99, 102, 241, 0.4);
  }
  &:focus {
    outline: 2px solid #818cf8;
    outline-offset: 2px;
  }

  option {
    background: #1e1e2e;
  }
`

const LimitLabel = styled.label`
  font-size: 0.82rem;
  color: rgba(255, 255, 255, 0.4);
  display: flex;
  align-items: center;
  gap: 6px;
`

const LIMIT_OPTIONS = [5, 10, 20]

type PaginationProps = {
  page: number
  limit: number
  total: number
  onPageChange: (page: number) => void
  onLimitChange: (limit: number) => void
}

export function Pagination({ page, limit, total, onPageChange, onLimitChange }: PaginationProps) {
  const totalPages = Math.ceil(total / limit)
  const isFirst = page === 0
  const isLast = page >= totalPages - 1

  return (
    <Wrapper aria-label="Pagination">
      <LimitLabel>
        Per page:
        <LimitSelect
          value={limit}
          onChange={(e) => onLimitChange(Number(e.target.value))}
          aria-label="Items per page"
        >
          {LIMIT_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </LimitSelect>
      </LimitLabel>

      <Controls>
        <PageButton
          onClick={() => onPageChange(0)}
          disabled={isFirst}
          aria-label="First page"
          tabIndex={0}
        >
          «
        </PageButton>
        <PageButton
          onClick={() => onPageChange(page - 1)}
          disabled={isFirst}
          aria-label="Previous page"
          tabIndex={0}
        >
          ‹ Prev
        </PageButton>

        <PageInfo>
          Page {page + 1} of {totalPages}
        </PageInfo>

        <PageButton
          onClick={() => onPageChange(page + 1)}
          disabled={isLast}
          aria-label="Next page"
          tabIndex={0}
        >
          Next ›
        </PageButton>
        <PageButton
          onClick={() => onPageChange(totalPages - 1)}
          disabled={isLast}
          aria-label="Last page"
          tabIndex={0}
        >
          »
        </PageButton>
      </Controls>
    </Wrapper>
  )
}
