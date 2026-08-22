/**
 * Guardiam Design System — Unified Theme
 * Fonte canônica: GUARDIAM-GEMINI-1
 */

import { colors } from './colors';
import { typography } from './typography';
import { spacing, borderRadius } from './spacing';
import { shadows } from './shadows';

export const theme = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
} as const;

export type Theme = typeof theme;

export { colors } from './colors';
export { typography } from './typography';
export { spacing, borderRadius } from './spacing';
export { shadows } from './shadows';
