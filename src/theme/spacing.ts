/**
 * Guardiam Design System — Spacing & Radius Tokens
 * Fonte canônica: GUARDIAM-GEMINI-1
 */

export const spacing = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  '2xl': 32,
  '3xl': 40,
  '4xl': 48,
} as const;

export const borderRadius = {
  none: 0,
  sm: 6,
  md: 10,
  base: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  full: 9999,
} as const;

export type Spacing = typeof spacing;
export type BorderRadius = typeof borderRadius;
