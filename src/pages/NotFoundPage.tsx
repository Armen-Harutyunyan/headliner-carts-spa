import { Link } from 'react-router-dom'
import styled from '@emotion/styled'
import { colors, radii, transitions } from '@/styles/tokens'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 80px 24px;
  text-align: center;
`

const Code = styled.p`
  font-size: 6rem;
  font-weight: 800;
  color: ${colors.primary};
  margin: 0;
  line-height: 1;
  letter-spacing: -4px;
  opacity: 0.25;
`

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${colors.textPrimary};
  margin: 0;
`

const Description = styled.p`
  font-size: 0.9rem;
  color: ${colors.textMuted};
  margin: 0;
`

const HomeLink = styled(Link)`
  display: inline-block;
  margin-top: 8px;
  padding: 10px 24px;
  font-size: 0.9rem;
  font-weight: 600;
  color: #fff;
  background: ${colors.primary};
  border-radius: ${radii.lg};
  text-decoration: none;
  transition:
    background ${transitions.base},
    transform ${transitions.fast};

  &:hover {
    background: ${colors.primaryHover};
    transform: translateY(-1px);
  }
  &:focus-visible {
    outline: 2px solid ${colors.primaryLight};
    outline-offset: 2px;
  }
`

export function NotFoundPage() {
  return (
    <Wrapper>
      <Code aria-hidden="true">404</Code>
      <Title>Page not found</Title>
      <Description>The URL you entered doesn't match any page.</Description>
      <HomeLink to="/">Back to carts</HomeLink>
    </Wrapper>
  )
}
