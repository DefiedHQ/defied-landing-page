---
name: code-review
description: Review the working diff (or a named PR/branch) for correctness bugs and reuse/simplification/efficiency cleanups, tuned to the DeFied monorepo. Use when asked to "review", "code review", "check this change", or before committing a nontrivial diff.
---

# Code Review (DeFied)

Review the change under review for **correctness bugs first**, then reuse /
simplification / efficiency / altitude cleanups. Surface real bugs over
avoiding false positives, but never invent findings to hit a count.

## Phase 0 — Gather the diff

Run `git diff @{upstream}...HEAD` (or `git diff main...HEAD` / `git diff HEAD~1`
if there is no upstream). If there are uncommitted changes or the range diff is
empty, also run `git diff HEAD` and include the working tree — reviews usually
run before the commit. If a PR number, branch, or path was passed, review that
target instead.

## Phase 1 — Finder angles

Run these angles yourself in this context (do NOT spawn subagents). Up to ~6
candidates each: `file`, `line`, one-line `summary`, concrete `failure_scenario`.

**Correctness**
- **Line-by-line:** read every hunk AND the enclosing function (bugs in
  unchanged lines of a touched function are in scope). Look for inverted/wrong
  conditions, off-by-one, null/undefined deref, missing `await`, falsy-zero
  checks, wrong-variable copy-paste, swallowed catches, unescaped regex.
- **Removed-behavior:** for each deleted/replaced line, name the invariant it
  enforced and find where it's re-established. If missing → candidate.
- **Cross-file:** for each changed function, grep callers/callees and check the
  change doesn't break a call site (new precondition, changed return/throw,
  timing).

**Cleanup:** reuse (name the existing helper), simplification (redundant/
derivable state, dead code), efficiency (repeated I/O, sequential independent
awaits, closures holding large scopes), altitude (special-case bandaid where the
underlying mechanism should generalize).

## Phase 2 — DeFied-specific checks (this repo)

Load `.claude/rules/*.md` and the relevant CLAUDE.md, then check the diff for:

- **CDS-first** (`cds.md`): raw `<button>/<input>/<label>` or hand-rolled modals
  where a CDS component or the shared `AppModal`/`CopyField`/`AssetPills`/
  `AmountInput` exists; deprecated CDS components/imports.
- **i18n** (`i18n.md`): any user-facing string not routed through `t()`; run a
  key-sync check between `apps/web/src/locales/en.json` and `bg.json` (compare
  leaf-key sets recursively — flag keys present in one but not the other).
  Interpolations must use the `{{var}}` form.
- **Design tokens**: raw status/brand hexes (`#0052FF`, `#16a34a`, `#ef4444`,
  `#DF2935`, `#05B169`) instead of `var(--accent|positive|negative|warning*)` —
  raw `#0052FF` is only allowed on filled surfaces with white content on top.
  SVG presentation attributes (`fill=`) can't use `var()` — must go through `style`.
- **SSR/hydration**: components on an SSR path using `Date.now()`/`Math.random()`
  or CDS `Fallback` without `disableRandomRectWidth` (random width mismatches
  between server and client).
- **Fixed positioning**: `position: fixed` overlays must not sit inside a
  transformed ancestor (e.g. `PullToRefresh`) — portal to `document.body` (see
  `AppModal`).
- **React/Next** (`react-nextjs.md`): components defined inside render bodies,
  `setInterval`/cleanup returned from an async IIFE (never runs), un-guarded
  stale-response races on debounced fetches, barrel imports.

## Phase 3 — Dedup and rank

Pool candidates, dedup (same defect + location + reason → keep one), sort most-
severe first. Correctness always outranks cleanup. Report each finding with its
file:line, a one-sentence defect statement, and the concrete failure scenario.
Emit only what genuinely survives — an empty result is a valid outcome.

> Note: Claude Code also ships a built-in `/code-review` command (with cloud
> `ultra` mode via `/code-review ultra`). This skill documents the same flow
> plus the DeFied-specific checks so a plain "review this" applies them too.
