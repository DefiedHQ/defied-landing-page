# Development Guidelines

## Responsiveness
- Always ensure changes look good on mobile and tablet breakpoints, not just desktop.
- Test responsive behavior when adding or modifying UI components.

## Translations / i18n
- Always update translations in both `src/locales/bg.json` and `src/locales/en.json` when adding or changing user-facing text.
- Articles are stored in `src/data/articles.json` (BG) and `src/data/articles-en.json` (EN) — keep both in sync.
- Use the `t('key')` function from `useLanguage()` for all user-facing strings. Never hardcode Bulgarian or English text in components.

## React & Next.js Best Practices (Vercel Engineering)

### Performance — Critical
- **Eliminate waterfalls**: Use `Promise.all()` for parallel data fetching. Place cheap conditions before awaits. Use Suspense boundaries to defer non-critical content.
- **Bundle size**: Avoid barrel file imports (`import { X } from './components'`), use direct imports. Use `next/dynamic` for heavy components. Defer third-party scripts. Conditionally import code only when needed.
- **Server-side**: Hoist static I/O outside request paths. Use React `cache()` for request deduplication. Avoid shared mutable module state. Run parallel fetches in server components.

### Performance — High/Medium
- **Client-side**: Use SWR/React Query for client data fetching with dedup. Use passive event listeners for scroll/touch. Clean up event listeners in effects.
- **Re-renders**: Derive state from props instead of syncing with effects. Use `useMemo`/`useCallback` only when there's a measurable benefit. Split large combined hooks. Use `useTransition` for non-urgent updates. Never define components inline inside other components.
- **Rendering**: Use `content-visibility: auto` for off-screen content. Hoist static JSX outside render functions. Use `loading="lazy"` on below-fold images. Prefer CSS animations over JS.

### Performance — General
- Batch DOM reads/writes together. Use `Set`/`Map` for lookups instead of array `.find()`. Exit loops early when result is found. Cache expensive computations.

## Web Design Guidelines
- Use semantic HTML (`nav`, `main`, `section`, `article`, `button`) — not divs for everything.
- Ensure focus states are visible for keyboard navigation.
- Forms: associate labels with inputs, show validation inline, support keyboard submission.
- Animations: respect `prefers-reduced-motion`. Keep transitions under 300ms for UI feedback.
- Images: always include `alt` text, use `width`/`height` to prevent layout shift.
- Touch targets: minimum 44x44px on mobile.
- Color contrast: meet WCAG AA (4.5:1 for text, 3:1 for large text).

## React Composition Patterns
- **Avoid boolean prop proliferation**: Use composition and explicit variant components instead of adding boolean flags.
- **Compound components**: Structure complex UIs with shared context (e.g., `<Tabs>`, `<Tab>`, `<TabPanel>`).
- **Lift state to providers**: When siblings need shared state, use context providers.
- **Children over render props**: Prefer `children` for composition instead of `renderX` callback props.
- **React 19**: No need for `forwardRef` — pass `ref` as a regular prop. Use `use()` instead of `useContext()`.

## Coinbase Design System (CDS)

This project uses the [Coinbase Design System](https://cds.coinbase.com) (`@coinbase/cds-web`) as its primary component library.

### Setup
- **Packages**: `@coinbase/cds-web`, `@coinbase/cds-icons`, `framer-motion@^10`
- **Provider**: `CdsProvider` wraps the app with `ThemeProvider` (defaultTheme, light mode) and `MediaQueryProvider`
- **CSS imports** in `layout.tsx`: `@coinbase/cds-icons/fonts/web/icon-font.css`, `@coinbase/cds-web/defaultFontStyles`, `@coinbase/cds-web/globalStyles`

### Component Usage Patterns
- **Layout**: Use `Box`, `VStack`, `HStack` from `@coinbase/cds-web/layout/*`. For responsive grids, use Tailwind CSS grid classes (CDS Grid doesn't support responsive `columns` prop).
- **Typography**: Use `Text` from `@coinbase/cds-web/typography/Text` with `font` prop variants: `display1-3`, `title1-4`, `headline`, `body`, `label1-2`, `caption`, `legal`. Always set semantic `as` prop (`h1-h6`, `p`, `span`).
- **Buttons**: Use `Button` from `@coinbase/cds-web/buttons/Button` with variants: `primary`, `secondary`, `tertiary`, `negative`. Supports `compact`, `block`, `loading`, `disabled`.
- **Accordion**: Use `Accordion` + `AccordionItem` from `@coinbase/cds-web/accordion/*` for collapsible content.
- **Illustrations**: Use `HeroSquare` from `@coinbase/cds-web/illustrations/HeroSquare` with `name` prop for 700+ illustrations. Use `scaleMultiplier` for sizing.
- **Tags**: Use `Tag` from `@coinbase/cds-web/tag/Tag` for category badges.
- **Icons**: Use `LogoMark` from `@coinbase/cds-web/icons/LogoMark` for Coinbase branding.

### Design Tokens
- **Primary blue**: `#0052FF` (Coinbase brand blue)
- **Success green**: `#05B169`
- **Error red**: `#DF2935`
- **Text primary**: `#0A0B0D`
- **Text muted**: `#5B616E`
- **Surface**: `rgb(247, 248, 249)`
- **Spacing**: Based on 8px grid (space 1=8px, 2=16px, 3=24px, 4=32px)
- **Border radius**: Cards use `56px`, buttons use `56px` or `28px`, small elements `16px`

### Key Conventions
- Import components directly (e.g., `@coinbase/cds-web/layout/Box`), never from barrel exports.
- Use CDS `Text` component for all typography — avoid raw HTML heading/paragraph styles.
- Use CDS `Button` for all interactive buttons — avoid custom button styling.
- Use the `as` prop on CDS components for semantic HTML (e.g., `<Text as="h1">`, `<Box as="nav">`).
- CDS components support `color` prop with semantic tokens like `fgPrimary`, `fgMuted`, `fgSecondary`.
- For responsive layouts, combine CDS layout components with Tailwind responsive classes.
