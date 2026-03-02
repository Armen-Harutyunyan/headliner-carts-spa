import { Global, css } from '@emotion/react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from '@/components/Layout'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { CartsListPage } from '@/pages/CartsListPage'
import { CartDetailPage } from '@/pages/CartDetailPage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { colors } from '@/styles/tokens'

const globalStyles = css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html {
    font-family:
      'Inter',
      system-ui,
      -apple-system,
      sans-serif;
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
  }

  body {
    margin: 0;
    min-height: 100vh;
    background: ${colors.bgBase};
    color: ${colors.textSecondary};
  }

  #root {
    min-height: 100vh;
  }

  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
  }
`

export function App() {
  return (
    <BrowserRouter>
      <Global styles={globalStyles} />
      <ErrorBoundary>
        <Layout>
          <Routes>
            <Route path="/" element={<CartsListPage />} />
            <Route path="/carts/:id" element={<CartDetailPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </ErrorBoundary>
    </BrowserRouter>
  )
}
