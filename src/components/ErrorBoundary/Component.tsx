import { Component, type ReactNode } from 'react'
import styled from '@emotion/styled'
import { colors, radii } from '@/styles/tokens'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 64px 24px;
  text-align: center;
`

const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${colors.textPrimary};
  margin: 0;
`

const Message = styled.p`
  font-size: 0.9rem;
  color: ${colors.textMuted};
  max-width: 400px;
  line-height: 1.6;
  margin: 0;
`

const RetryButton = styled.button`
  padding: 10px 24px;
  font-size: 0.9rem;
  font-weight: 600;
  color: #fff;
  background: ${colors.primary};
  border: none;
  border-radius: ${radii.lg};
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: ${colors.primaryHover};
  }
  &:focus-visible {
    outline: 2px solid ${colors.primaryLight};
    outline-offset: 2px;
  }
`

type ErrorBoundaryProps = {
  children: ReactNode
  fallback?: ReactNode
}

type ErrorBoundaryState = {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: { componentStack: string }) {
    console.error('[ErrorBoundary] Uncaught error:', error, info.componentStack)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback

      return (
        <Container role="alert">
          <Title>Something went wrong</Title>
          <Message>{this.state.error?.message ?? 'An unexpected error occurred.'}</Message>
          <RetryButton onClick={this.handleReset} aria-label="Retry">
            Try again
          </RetryButton>
        </Container>
      )
    }

    return this.props.children
  }
}
