// Shared i18n primitives — importable from both server and client modules.

export type Lang = 'bg' | 'en';

/** Supported languages, in display order, with their native names. */
export const LANGUAGES: ReadonlyArray<{ code: Lang; label: string; region: string }> = [
  { code: 'bg', label: 'Български', region: 'България' },
  { code: 'en', label: 'English', region: 'Global' },
];

/** Default language — used for SSR, first paint, and when geo is unknown. */
export const DEFAULT_LANG: Lang = 'en';

/**
 * Maps an ISO 3166-1 alpha-2 country code (from the Vercel edge geo header
 * `x-vercel-ip-country`) to a language: Bulgaria gets Bulgarian, everyone
 * else (including unknown/local dev) gets the default (English).
 */
export function geoLangFromCountry(country: string | null | undefined): Lang {
  return country?.toUpperCase() === 'BG' ? 'bg' : DEFAULT_LANG;
}
