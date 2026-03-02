import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'

const spin = keyframes`
  to { transform: rotate(360deg); }
`

const Ring = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid rgba(99, 102, 241, 0.2);
  border-top-color: #6366f1;
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 48px;
`

type SpinnerProps = {
  label?: string
}

export function Spinner({ label = 'Loading…' }: SpinnerProps) {
  return (
    <Wrapper role="status" aria-label={label}>
      <Ring />
    </Wrapper>
  )
}
