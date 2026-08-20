/**
 * GUARDIAM DESIGN SYSTEM - SPACING & BORDER RADIUS TOKENS
 */

export const spacing = {
  // Spacing Scale
  0: '0px',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  8: '32px',
  10: '40px',
  12: '48px',
  16: '64px',

  // Layout Boundaries
  screenPaddingHorizontal: '20px',
  screenPaddingTop: '24px',
  screenPaddingBottom: '32px',
  cardPadding: '16px',
  buttonPaddingY: '14px',
  buttonPaddingX: '24px',
} as const;

export const borderRadius = {
  none: '0px',
  sm: '6px',
  md: '10px',
  lg: '14px',     // Padrão para inputs, botões e cards de ação
  xl: '18px',     // Cards de status e mapas
  '2xl': '24px',
  full: '9999px', // Pills, avatares e segmented controls
} as const;
