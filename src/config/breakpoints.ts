/**
 * CDS-aligned responsive breakpoints.
 *
 * Values represent the lower bound (min-width) of each range.
 * These match the Coinbase Design System device breakpoints.
 */
export const breakpoints = {
  phone: 0,
  phoneLandscape: 560,
  tablet: 768,
  tabletLandscape: 1024,
  desktop: 1280,
  desktopLarge: 1440,
  extraWide: 1600,
} as const;

/**
 * Pre-built media query strings for use in JS (e.g. `window.matchMedia`).
 *
 * CSS should use the raw pixel values directly in `@media` rules — see globals.css.
 */
export const media = {
  phone: `(max-width: ${breakpoints.tablet - 1}px)`,
  phonePortrait: `(max-width: ${breakpoints.phoneLandscape - 1}px)`,
  phoneLandscape: `(min-width: ${breakpoints.phoneLandscape}px) and (max-width: ${breakpoints.tablet - 1}px)`,
  tablet: `(min-width: ${breakpoints.tablet}px) and (max-width: ${breakpoints.desktop - 1}px)`,
  tabletPortrait: `(min-width: ${breakpoints.tablet}px) and (max-width: ${breakpoints.tabletLandscape - 1}px)`,
  tabletLandscape: `(min-width: ${breakpoints.tabletLandscape}px) and (max-width: ${breakpoints.desktop - 1}px)`,
  desktop: `(min-width: ${breakpoints.desktop}px)`,
  desktopSmall: `(min-width: ${breakpoints.desktop}px) and (max-width: ${breakpoints.desktopLarge - 1}px)`,
  desktopLarge: `(min-width: ${breakpoints.desktopLarge}px) and (max-width: ${breakpoints.extraWide - 1}px)`,
  extraWide: `(min-width: ${breakpoints.extraWide}px)`,
} as const;

export type DeviceBreakpoint =
  | 'phone'
  | 'phonePortrait'
  | 'phoneLandscape'
  | 'tablet'
  | 'tabletPortrait'
  | 'tabletLandscape'
  | 'desktop'
  | 'desktopSmall'
  | 'desktopLarge'
  | 'extraWide';
