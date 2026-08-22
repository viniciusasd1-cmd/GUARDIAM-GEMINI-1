/**
 * Guardiam Design System — Color Tokens
 * Fonte canônica: GUARDIAM-GEMINI-1
 */

export const colors = {
  // Brand / Primárias
  primary: {
    DEFAULT: '#1565C0',
    50: '#EFF6FF',
    100: '#DBEAFE',
    200: '#BFDBFE',
    300: '#93C5FD',
    400: '#60A5FA',
    500: '#3B82F6',
    600: '#1565C0',
    700: '#1D4ED8',
    800: '#1E40AF',
    900: '#1E3A8A',
  },

  // Modo Claro (Inativo / Padrão)
  light: {
    background: '#F8FAFC',
    surface: '#FFFFFF',
    surfaceSubtle: '#F1F5F9',
    surfaceBorder: '#E2E8F0',
    textPrimary: '#0F172A',
    textSecondary: '#64748B',
    textMuted: '#94A3B8',
    card: '#FFFFFF',
    cardBorder: '#E2E8F0',
  },

  // Modo Escuro (Proteção Ativa)
  dark: {
    background: '#0A1128',
    surface: '#111C44',
    surfaceSubtle: '#1B254B',
    surfaceBorder: '#1E293B',
    textPrimary: '#FFFFFF',
    textSecondary: '#94A3B8',
    textMuted: '#64748B',
    card: '#111C44',
    cardBorder: '#1E293B',
    accent: '#38BDF8',
    accentLight: '#7DD3FC',
  },

  // Alerta / Emergência (SOS)
  emergency: {
    background: '#1E1B2E',
    surface: '#2D1F3D',
    surfaceBorder: '#451A3D',
    accent: '#DC2626',
    accentLight: '#FEF2F2',
    accentBorder: '#FECACA',
    textPrimary: '#FFFFFF',
    textSecondary: '#FDA4AF',
  },

  // Semânticas / Status
  status: {
    success: '#16A34A',
    successBg: '#F0FDF4',
    successBorder: '#BBF7D0',
    warning: '#D97706',
    warningBg: '#FFFBEB',
    warningBorder: '#FDE68A',
    error: '#DC2626',
    errorBg: '#FEF2F2',
    errorBorder: '#FECACA',
    info: '#0284C7',
    infoBg: '#F0F9FF',
    infoBorder: '#BAE6FD',
  },
} as const;

export type Colors = typeof colors;
