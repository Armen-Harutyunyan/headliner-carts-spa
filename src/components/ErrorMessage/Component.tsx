import styled from '@emotion/styled'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 48px;
  color: #ef4444;
  text-align: center;
`

const Icon = styled.div`
  font-size: 2.5rem;
`

const Message = styled.p`
  font-size: 0.95rem;
  font-weight: 500;
  color: #ef4444;
  max-width: 360px;
  line-height: 1.5;
`

type ErrorMessageProps = {
  message?: string
}

export function ErrorMessage({
  message = 'Something went wrong. Please try again.',
}: ErrorMessageProps) {
  return (
    <Wrapper role="alert" aria-live="polite">
      <Icon>!</Icon>
      <Message>{message}</Message>
    </Wrapper>
  )
}
