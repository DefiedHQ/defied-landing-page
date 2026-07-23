# Defied Landing Page

Next.js 16 landing page for Defied — a stablecoin wallet with DeFi superpowers. Uses the Coinbase Design System (`@coinbase/cds-web`) as the primary component library.

## Responsiveness
- Always ensure changes look good on mobile and tablet breakpoints, not just desktop.
- Test responsive behavior when adding or modifying UI components.

## Translations / i18n
- Always update translations in both `src/locales/bg.json` and `src/locales/en.json` when adding or changing user-facing text.
- Articles are stored in `src/data/articles-bg.json` (BG) and `src/data/articles-en.json` (EN) — keep both in sync.
- Use the `t('key')` function from `useLanguage()` for all user-facing strings. Never hardcode Bulgarian or English text in components.

## AI Rules

All development rules live in `.claude/rules/` and are loaded automatically:

| File | Scope |
| ---- | ----- |
| `cds.md` | Coinbase Design System — component hierarchy, CDS-first rule, tokens, patterns |
| `nextjs.md` | React & Next.js best practices, performance, composition patterns |
| `web-design.md` | Semantic HTML, accessibility, WCAG compliance |

## MCP Servers

Configured in `.mcp.json`:

| Server | Purpose |
| ------ | ------- |
| `cds` | Coinbase Design System component docs (`list-cds-routes`, `get-cds-doc`) |
| `next-devtools` | Next.js development tools |
| `aidesigner` | AIDesigner UI generation/refinement |

## Installed Skills

Skills live at `.claude/skills/` (symlinks into `.agents/skills/`).

### Design & frontend quality (consult on ANY UI work)

- **frontend-design** — Distinctive, intentional visual design; avoid templated defaults (anthropics/skills)
- **design-taste-frontend** — Anti-generic design heuristics; audit-first on redesigns (leonxlnx/taste-skill)
- **web-design-guidelines** — UI/accessibility/UX audits against Web Interface Guidelines (vercel-labs/agent-skills)
- **ui-animation** — Motion design: transitions, springs, gestures, easing, framer-motion (mblode/agent-skills)
- **mobile-responsiveness** — Responsive layouts, breakpoints, touch interactions (hoodini/ai-agents-skills)
- **core-web-vitals** — LCP/INP/CLS loading-performance optimization (addyosmani/web-quality-skills)
- **ux-copy** — Microcopy, error messages, empty states, CTAs (anthropics/knowledge-work-plugins)
- **vercel-react-best-practices** — React/Next.js performance rules from Vercel Engineering (vercel-labs/agent-skills)
- **vercel-composition-patterns** — React component architecture: compound components, context, React 19 APIs (vercel-labs/agent-skills)
- **ui-ux-pro-max** — Design intelligence database: styles, palettes, font pairings, UX guidelines (nextlevelbuilder/ui-ux-pro-max-skill)
- **bencium-controlled-ux-designer / bencium-innovative-ux-designer / bencium-impact-designer** — UX design personas: accessible, distinctive, production-grade interfaces (bencium/bencium-claude-code-design-skill)
- **design-audit** — Systematic visual audit of existing UI with phased refinement plan (bencium/bencium-claude-code-design-skill)
- **ui-typography** — Typography correctness rules for UI text: quotes, dashes, hierarchy (bencium/bencium-claude-code-design-skill)
- **audit / scan / diff** — AccessLint WCAG 2.2 accessibility auditing: codebase/page sweeps, live-DOM scans via CDP, violation diffs against a baseline (AccessLint/skills)
- **aidesigner-frontend** — AIDesigner-assisted frontend generation/redesign workflow

### Next.js

- **next-best-practices** — File conventions, RSC boundaries, data patterns (vercel-labs/next-skills)
- **next-cache-components** — PPR, `use cache`, cacheLife/cacheTag (vercel-labs/next-skills)
- **next-upgrade** — Migration guides and codemods (vercel-labs/next-skills)
- **nextjs-seo** — Metadata, sitemaps, robots.txt, JSON-LD, indexing audits

### Backend security & integrations (consult on API routes and external-service calls)

- **owasp-security** — OWASP Top 10 secure-coding: authz, injection, XSS, CSRF, auth (hoodini/ai-agents-skills)
- **api-security-best-practices** — Secure API design: authn/authz, input validation, rate limiting (sickn33/antigravity-awesome-skills)
- **resend** — Resend email API: transactional send, webhooks, idempotency, templates (resend/resend-skills) — used by the waitlist route
- **privy** — Auth, embedded wallets, transaction management (docs.privy.io) — `@privy-io/*` is in dependencies

### Quality gates

- **code-review** — Review the working diff/PR for correctness bugs + cleanups, tuned to DeFied (CDS-first, i18n key-sync, design tokens, SSR/hydration). Complements the built-in `/code-review` command.

> **Rule (MANDATORY, not advisory)**: Before writing code, load the installed skills that map to the touched paths — this is a required step of every coding task, not an optional consultation. When working on UI, always consult the design & frontend quality skills relevant to the change (visual work → frontend-design/design-taste; new/changed components → web-design-guidelines + mobile-responsiveness; motion → ui-animation; user-facing text → ux-copy; data loading → core-web-vitals; SEO-affecting pages → nextjs-seo). When working on `src/app/api/**` server code, consult the backend-security & integration skills (owasp-security + api-security-best-practices for any validation change; resend for the waitlist email flow).
>
> **Definition of done for any nontrivial change**: (1) relevant skills were loaded and their checklists applied, (2) `npx tsc --noEmit` passes, (3) the `code-review` skill was run on the working diff and its findings addressed or explicitly deferred, (4) a security check was performed for any API-route/server change (see below), (5) the summary names which skills were consulted. Never commit before steps 3–4.
>
> **Security check (MANDATORY for API-route/server changes)**: review the diff through a security lens before the work is considered done. In priority order: (1) **input validation** — new/changed request fields are format-validated server-side, including anything that reaches email or external calls; (2) **abuse resistance** — public endpoints (e.g. waitlist) are protected against spam/enumeration and don't act as unauthenticated oracles (existence checks); (3) **information leaks** — no PII in logs, no secrets in client bundles (server-only env vars for the Resend key). Use the owasp-security + api-security-best-practices skills as the checklist.
