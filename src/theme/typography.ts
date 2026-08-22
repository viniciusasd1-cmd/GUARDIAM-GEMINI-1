/**
 * Guardiam Design System — Typography Tokens
 * Fonte canônica: GUARDIAM-GEMINI-1
 */

export const typography = {
  fontFamily: {
    regular: 'System',
    medium: 'System',
    semibold: 'System',
    bold: 'System',
    extrabold: 'System',
  },
  fontSize: {
    xs: 11,
    sm: 13,
    base: 15,
    md: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 28,
    '4xl': 32,
  },
  lineHeight: {
    xs: 14,
    sm: 18,
    base: 22,
    md: 24,
    lg: 26,
    xl: 28,
    '2xl': 32,
    '3xl': 36,
    '4xl': 40,
  },
  fontWeight: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    extrabold: '800' as const,
  },
  letterSpacing: {
    tight: -0.5,
    normal: 0,
    wide: 0.5,
    wider: 1.0,
    widest: 1.5,
  },
} as const;

export type Typography = typeof typography;
