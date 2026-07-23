'use client';

import { MotionConfig } from 'framer-motion';
import { ThemeProvider, MediaQueryProvider } from '@coinbase/cds-web/system';
import { defaultTheme } from '@coinbase/cds-web/themes/defaultTheme';
import type { ThemeConfig } from '@coinbase/cds-web/core/theme';

/**
 * Warm neutral overrides (design review, Phase 2):
 * softer ink for text, warmer grays for surfaces. The brand blue is untouched.
 * lightColor values are static in defaultTheme, so every key derived from an
 * overridden gray step must be re-declared here.
 */
const lightSpectrum = {
  ...defaultTheme.lightSpectrum,
  gray100: '20,22,26', // ink #14161A (was near-pure black)
  gray60: '93,97,103', // muted #5D6167 (less blue in it)
  gray20: '237,235,230', // warm tertiary
  gray10: '246,245,241', // stone surface #F6F5F1 (was cool #F7F8F9)
  gray5: '250,249,246', // warm wash
};

const theme = {
  ...defaultTheme,
  lightSpectrum,
  lightColor: {
    ...defaultTheme.lightColor,
    fg: `rgb(${lightSpectrum.gray100})`,
    fgMuted: `rgb(${lightSpectrum.gray60})`,
    bgAlternate: `rgb(${lightSpectrum.gray10})`,
    bgSecondary: `rgb(${lightSpectrum.gray10})`,
    bgTertiary: `rgb(${lightSpectrum.gray20})`,
    bgSecondaryWash: `rgb(${lightSpectrum.gray5})`,
    bgInverse: `rgb(${lightSpectrum.gray100})`,
    bgLine: `rgba(${lightSpectrum.gray60},0.2)`,
    bgLineHeavy: `rgba(${lightSpectrum.gray60},0.66)`,
    accentSubtleGray: `rgb(${lightSpectrum.gray10})`,
  },
} as const satisfies ThemeConfig;

export function CdsProvider({ children }: { children: React.ReactNode }) {
  return (
    <MediaQueryProvider>
      <ThemeProvider theme={theme} activeColorScheme="light">
        {/* Disables transform animations for prefers-reduced-motion users
            across every framer-motion element (design review, Phase 3) */}
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </ThemeProvider>
    </MediaQueryProvider>
  );
}
