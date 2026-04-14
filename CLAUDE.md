# Defied Money App Landing Page

Next.js 16 landing page for Defied Money App — a stablecoin wallet with DeFi superpowers. Uses the Coinbase Design System (`@coinbase/cds-web`) as the primary component library.

## Responsiveness
- Always ensure changes look good on mobile and tablet breakpoints, not just desktop.
- Test responsive behavior when adding or modifying UI components.

## Translations / i18n
- Always update translations in both `src/locales/bg.json` and `src/locales/en.json` when adding or changing user-facing text.
- Articles are stored in `src/data/articles.json` (BG) and `src/data/articles-en.json` (EN) — keep both in sync.
- Use the `t('key')` function from `useLanguage()` for all user-facing strings. Never hardcode Bulgarian or English text in components.
