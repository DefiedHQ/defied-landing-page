# Next.js & React

## ALWAYS Read Docs Before Coding
Before any Next.js work, find and read the relevant doc in `node_modules/next/dist/docs/`. Your training data is outdated — the docs are the source of truth.

## Performance — Critical
- **Eliminate waterfalls**: Use `Promise.all()` for parallel data fetching. Place cheap conditions before awaits. Use Suspense boundaries to defer non-critical content.
- **Bundle size**: Avoid barrel file imports (`import { X } from './components'`), use direct imports. Use `next/dynamic` for heavy components. Defer third-party scripts. Conditionally import code only when needed.
- **Server-side**: Hoist static I/O outside request paths. Use React `cache()` for request deduplication. Avoid shared mutable module state. Run parallel fetches in server components.

## Performance — High/Medium
- **Client-side**: Use SWR/React Query for client data fetching with dedup. Use passive event listeners for scroll/touch. Clean up event listeners in effects.
- **Re-renders**: Derive state from props instead of syncing with effects. Use `useMemo`/`useCallback` only when there's a measurable benefit. Split large combined hooks. Use `useTransition` for non-urgent updates. Never define components inline inside other components.
- **Rendering**: Use `content-visibility: auto` for off-screen content. Hoist static JSX outside render functions. Use `loading="lazy"` on below-fold images. Prefer CSS animations over JS.

## Performance — General
- Batch DOM reads/writes together. Use `Set`/`Map` for lookups instead of array `.find()`. Exit loops early when result is found. Cache expensive computations.

## React Composition Patterns
- **Avoid boolean prop proliferation**: Use composition and explicit variant components instead of adding boolean flags.
- **Compound components**: Structure complex UIs with shared context (e.g., `<Tabs>`, `<Tab>`, `<TabPanel>`).
- **Lift state to providers**: When siblings need shared state, use context providers.
- **Children over render props**: Prefer `children` for composition instead of `renderX` callback props.
- **React 19**: No need for `forwardRef` — pass `ref` as a regular prop. Use `use()` instead of `useContext()`.
