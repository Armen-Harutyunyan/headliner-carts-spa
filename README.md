# Carts SPA

Shopping cart management SPA built with React + Vite + TypeScript.

## Tech Stack

| Layer         | Library                   |
| ------------- | ------------------------- |
| Bundler       | Vite 7                    |
| UI            | React 19 + TypeScript 5.9 |
| Data fetching | @tanstack/react-query v5  |
| Styling       | @emotion/styled           |
| Global state  | Zustand v5                |
| Routing       | react-router-dom v7       |
| API           | DummyJSON                 |

## Running Locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Scripts

```bash
npm run dev          # Dev server
npm run build        # Production build
npm run preview      # Preview build
npm run typecheck    # TypeScript check
npm run lint         # ESLint (0 warnings policy)
npm run lint:fix     # ESLint with auto-fix
npm run format       # Prettier
```

## Architecture

````
src/
├── api/           # Headliner: DummyJSON Carts SPA

A React single-page application built as a technical assignment to manage and edit shopping carts using the [DummyJSON API](https://dummyjson.com/).

## Features

- **Cart List:** View a paginated list of all shopping carts.
- **Cart Details:** Inspect individual carts, view products, quantities, prices, and total calculations.
- **Cart Editing:** Edit product quantities or remove products entirely.
- **Optimistic UI:** Changes are reflected instantly and synced intelligently with the backend mock.
- **Runtime Validation:** All API responses are rigorously validated using Zod schemas to ensure type safety.

##  Tech Stack

| Layer         | Library                   |
| ------------- | ------------------------- |
| Bundler       | Vite 7                    |
| UI            | React 19 + TypeScript 5.9 |
| Data fetching | @tanstack/react-query v5  |
| Global state  | Zustand v5                |
| Routing       | react-router-dom v7       |
| Validation    | Zod v4                    |
| Styling       | @emotion/styled           |
| Testing       | Vitest v4                 |
| API           | DummyJSON                 |

## Setup & Installation

### 1. Install Dependencies
```bash
npm install
````

### 2. Run the Development Server

```bash
npm run dev
```

### 3. Build & Typecheck (Production)

```bash
npm run check
npm run build
```

_(Note: If testing the build process in JetBrains IDEs via the `package.json` run UI, you may encounter a Rollup crash if your folder path resolves to a URI containing an encoded `#` symbol. Running `npm run build` directly in your standard terminal bypasses this IDE environment bug)._

## Architecture Decisions

- **Strict Data boundaries:** Replaced standard (and unsafe) `res.json() as Promise<T>` type assertions with a custom Zod-based parser. If DummyJSON changes their payload structure (e.g., omitting `discountedTotal`), the app falls back gracefully rather than causing runtime errors.
- **Query Key Factory:** All TanStack Query keys are centralized in `src/lib/queryKeys.ts` to prevent typo-induced cache bugs.
- **Performance:** `React.memo` is used judiciously on high-instantiation components (like `ProductRow` and `CartCard`) to prevent unnecessary re-renders in large lists.
- **Error Handling:** Built with an `<ErrorBoundary>` wrapper to catch and elegantly display UI crashes without white-screening the app.

## Important Note Regarding DummyJSON API

This application uses the free DummyJSON API, which is **stateless**.
When the app sends a `PUT` request to update a cart (`merge: false`), the API returns a successful response showing the changes. Our UI reacts to this success by updating the screen to reflect the "Saved" state.

However, DummyJSON **does not actually persist** these changes to their database.
If you hard-refresh the page (or if the React Query cache expires and refetches forcefully from the API), the cart data will revert back to its original state. _This is an intentional limitation of the free API, not a bug in the application._
