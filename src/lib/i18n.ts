// Shared i18n primitives — importable from both server and client modules.

export type Lang = 'en';

/** Default language for the primary site experience. */
export const DEFAULT_LANG: Lang = 'en';

/** All public routes use their English URL unchanged. */
export function localePath(_lang: Lang, path: string): string {
  return path;
}

/** Retained for callers that compare a pathname with a route path. */
export function stripLangPrefix(pathname: string): string {
  return pathname;
}

/* Month names for article dates. Explicit tables (not toLocaleDateString) so
   SSR and client always agree regardless of ICU data. */
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

/** Formats an ISO date as "May 12, 2026". */
export function formatArticleDate(dateStr: string, _lang: Lang): string {
  const [y, m, d] = dateStr.split('-').map(Number);
  return `${MONTHS[m - 1]} ${d}, ${y}`;
}
