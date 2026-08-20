/**
 * GUARDIAM DESIGN SYSTEM - TYPOGRAPHY TOKENS
 * Hierarquia tipográfica correspondente aos mockups
 */

export const typography = {
  fontFamily: {
    sans: 'Plus Jakarta Sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  },
  
  // Font Sizes and Line Heights
  fontSize: {
    xs: {
      fontSize: '0.75rem',     // 12px
      lineHeight: '1rem',      // 16px
    },
    sm: {
      fontSize: '0.875rem',    // 14px
      lineHeight: '1.25rem',   // 20px
    },
    base: {
      fontSize: '1rem',        // 16px
      lineHeight: '1.5rem',    // 24px
    },
    lg: {
      fontSize: '1.125rem',    // 18px
      lineHeight: '1.75rem',   // 28px
    },
    xl: {
      fontSize: '1.25rem',     // 20px
      lineHeight: '1.75rem',   // 28px
    },
    '2xl': {
      fontSize: '1.5rem',      // 24px
      lineHeight: '2rem',      // 32px
    },
    '3xl': {
      fontSize: '1.875rem',    // 30px
      lineHeight: '2.25rem',   // 36px
    },
    '4xl': {
      fontSize: '2.25rem',     // 36px
      lineHeight: '2.5rem',    // 40px
    }
  },

  // Font Weights
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },

  // Semantic Typography Presets
  variants: {
    screenTitle: 'text-2xl font-bold text-slate-900 tracking-tight',
    screenSubtitle: 'text-base font-normal text-slate-500',
    sectionHeader: 'text-lg font-semibold text-slate-800',
    bodyText: 'text-base font-normal text-slate-700 leading-relaxed',
    bodyMuted: 'text-sm font-normal text-slate-500',
    caption: 'text-xs font-medium text-slate-400',
    buttonLabel: 'text-base font-semibold tracking-wide',
    emergencyTitle: 'text-3xl font-extrabold text-white tracking-wider uppercase',
  }
} as const;

export type TypographyType = typeof typography;
