# Coinbase Design System (CDS)

This project uses the [Coinbase Design System](https://cds.coinbase.com) (`@coinbase/cds-web`) as its primary component library.

## CDS-First Rule (MANDATORY)
- **ALWAYS consult CDS MCP docs** (`list-cds-routes` → `get-cds-doc`) before implementing any UI element.
- **NEVER write custom CSS or components** if a CDS component or prop can achieve the same result.
- **Only override with custom CSS as a last resort** — when CDS genuinely lacks the feature (e.g., hover states on Tag).
- Check component props thoroughly: CDS components often support `style`, `background`, `borderRadius`, `padding`, layout props, etc. that eliminate the need for custom styling.
- When custom CSS is unavoidable, keep it minimal and document why CDS couldn't handle it.

## Component Research Order
1. FIRST check if there's a CDS component that satisfies the requirement — this is MANDATORY.
2. ONLY if no suitable CDS component exists, then consider native HTML elements.
3. ONLY if neither CDS nor native elements work, suggest custom implementations.

## Documentation Lookup
- ALWAYS use the CDS MCP server's `list-cds-routes` tool to list all CDS routes before trying to use a component.
- ALWAYS inspect the documentation for a component with the `get-cds-doc` tool before using it.
- ALWAYS check examples in the documentation before implementing.
- THOROUGHLY read all relevant documentation before making component suggestions.

## Setup
- **Packages**: `@coinbase/cds-web`, `@coinbase/cds-icons`, `framer-motion@^10`
- **Provider**: `CdsProvider` wraps the app with `ThemeProvider` (defaultTheme, light mode) and `MediaQueryProvider`
- **CSS imports** in `layout.tsx`: `@coinbase/cds-icons/fonts/web/icon-font.css`, `@coinbase/cds-web/defaultFontStyles`, `@coinbase/cds-web/globalStyles`

## Component Usage Patterns
- **Layout**: Use `Box`, `VStack`, `HStack` from `@coinbase/cds-web/layout/*`. For responsive grids, use Tailwind CSS grid classes (CDS Grid doesn't support responsive `columns` prop).
- **Typography**: Use `Text` from `@coinbase/cds-web/typography/Text` with `font` prop variants: `display1-3`, `title1-4`, `headline`, `body`, `label1-2`, `caption`, `legal`. Always set semantic `as` prop (`h1-h6`, `p`, `span`).
- **Buttons**: Use `Button` from `@coinbase/cds-web/buttons/Button` with variants: `primary`, `secondary`, `tertiary`, `negative`. Supports `compact`, `block`, `loading`, `disabled`.
- **Accordion**: Use `Accordion` + `AccordionItem` from `@coinbase/cds-web/accordion/*` for collapsible content.
- **Illustrations**: Use `HeroSquare` from `@coinbase/cds-web/illustrations/HeroSquare` with `name` prop for 700+ illustrations. Use `scaleMultiplier` for sizing.
- **Tags**: Use `Tag` from `@coinbase/cds-web/tag/Tag` for category badges.
- **Icons**: Use `LogoMark` from `@coinbase/cds-web/icons/LogoMark` for Coinbase branding.

## Key Conventions
- Import components directly (e.g., `@coinbase/cds-web/layout/Box`), never from barrel exports.
- Use CDS `Text` component for all typography — avoid raw HTML heading/paragraph styles.
- Use CDS `Button` for all interactive buttons — avoid custom button styling.
- Use the `as` prop on CDS components for semantic HTML (e.g., `<Text as="h1">`, `<Box as="nav">`).
- CDS components support `color` prop with semantic tokens like `fgPrimary`, `fgMuted`, `fgSecondary`.
- For responsive layouts, combine CDS layout components with Tailwind responsive classes.
- MAINTAIN consistent styling and behavior with existing CDS implementations in the codebase.
- DO NOT mix CDS and non-CDS component styling approaches unless absolutely necessary.

## Design Tokens
- **Primary blue**: `#0052FF` (Coinbase brand blue)
- **Success green**: `#05B169`
- **Error red**: `#DF2935`
- **Text primary**: `#0A0B0D`
- **Text muted**: `#5B616E`
- **Surface**: `rgb(247, 248, 249)`
- **Spacing**: Based on 8px grid (space 1=8px, 2=16px, 3=24px, 4=32px)
- **Border radius**: Cards use `56px`, buttons use `56px` or `28px`, small elements `16px`
