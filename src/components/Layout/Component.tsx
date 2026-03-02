import type { ReactNode } from 'react'
import styled from '@emotion/styled'
import { Link, useLocation } from 'react-router-dom'
import { colors, transitions, radii } from '@/styles/tokens'

const Nav = styled.nav`
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 0 24px;
  height: 60px;
  background: ${colors.bgNav};
  backdrop-filter: blur(12px);
  border-bottom: 1px solid ${colors.surfaceBorder};
`

const Logo = styled(Link)`
  font-size: 1.1rem;
  font-weight: 700;
  color: ${colors.primary};
  text-decoration: none;
  letter-spacing: -0.5px;
  transition: color ${transitions.base};

  &:hover {
    color: ${colors.primaryLight};
  }
`

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.85rem;
  font-weight: 500;
  color: ${colors.textSubtle};
  text-decoration: none;
  padding: 6px 12px;
  border-radius: ${radii.md};
  transition:
    background ${transitions.base},
    color ${transitions.base};

  &:hover {
    background: rgba(255, 255, 255, 0.06);
    color: rgba(255, 255, 255, 0.9);
  }
`

const Main = styled.main`
  max-width: 1100px;
  margin: 0 auto;
  padding: 32px 24px 64px;
`

type LayoutProps = {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation()
  const isDetail = location.pathname !== '/'

  return (
    <>
      <Nav aria-label="Main navigation">
        <Logo to="/">Carts SPA</Logo>
        {isDetail ? (
          <BackButton to="/" aria-label="Back to carts list">
            Back
          </BackButton>
        ) : null}
      </Nav>
      <Main>{children}</Main>
    </>
  )
}
