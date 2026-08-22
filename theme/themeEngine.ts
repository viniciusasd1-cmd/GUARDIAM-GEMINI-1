/**
 * GUARDIAM THEME ENGINE & DESIGN TOKENS
 * Algoritmo de geração de paletas acessíveis WCAG, conversão de cores e tokens semânticos.
 */

export type ThemeMode = 'light' | 'dark' | 'system' | 'custom';
export type BaseSurfaceMode = 'light' | 'dark';

export interface ThemeTokens {
  // Brand / Primary
  primary: string;
  primaryHover: string;
  primaryLight: string;
  primarySoft: string;
  primaryDark: string;
  primaryContrast: string; // Texto sobre a cor primária (Branco ou Preto)
  accent: string;
  shadowPrimary: string;

  // Background & Surfaces
  background: string;
  surface: string;
  surfaceSecondary: string;
  surfaceElevated: string;

  // Borders
  border: string;
  borderSubtle: string;
  borderFocus: string;

  // Typography
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  textInverse: string;

  // Semantic Status
  success: string;
  successLight: string;
  successText: string;
  warning: string;
  warningLight: string;
  warningText: string;
  error: string;
  errorLight: string;
  errorText: string;

  // Visual Accents
  radarRingColor: string;
  radarBgColor: string;
  shieldGlow: string;
}

export interface ThemePreset {
  id: string;
  name: string;
  hex: string;
  description: string;
  emoji: string;
}

export const THEME_PRESETS: ThemePreset[] = [
  { id: 'guardiam-blue', name: 'Azul Guardiam', hex: '#1565C0', description: 'Azul oficial e clássico de segurança', emoji: '🛡️' },
  { id: 'amethyst-purple', name: 'Ametista Imperial', hex: '#7C3AED', description: 'Roxo sofisticado e tecnológico', emoji: '🔮' },
  { id: 'emerald-green', name: 'Verde Esmeralda', hex: '#059669', description: 'Verde vibrante de proteção e confiança', emoji: '🌲' },
  { id: 'sunset-orange', name: 'Sunset Âmbar', hex: '#EA580C', description: 'Laranja quente de alta visibilidade', emoji: '🌅' },
  { id: 'ruby-pink', name: 'Magenta Rubi', hex: '#DB2777', description: 'Rosa intenso e moderno', emoji: '🌸' },
  { id: 'cyan-ocean', name: 'Ciano Oceano', hex: '#0284C7', description: 'Azul turquesa translúcido', emoji: '💎' },
  { id: 'slate-tactical', name: 'Grafite Tático', hex: '#475569', description: 'Cinza neutro minimalista e discreto', emoji: '⚡' },
];

export interface ThemeState {
  mode: ThemeMode;
  customColor: string;
  customBase: BaseSurfaceMode;
}

export const DEFAULT_THEME_STATE: ThemeState = {
  mode: 'light',
  customColor: '#1565C0',
  customBase: 'light',
};

// ==========================================
// COLOR UTILITIES & MATHEMATICAL CONVERSIONS
// ==========================================

export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface HSL {
  h: number; // 0-360
  s: number; // 0-100
  l: number; // 0-100
}

export function hexToRgb(hex: string): RGB {
  let cleanHex = hex.replace('#', '').trim();
  if (cleanHex.length === 3) {
    cleanHex = cleanHex.split('').map(c => c + c).join('');
  }
  if (cleanHex.length !== 6) {
    return { r: 21, g: 101, b: 192 }; // fallback Guardiam blue
  }
  const num = parseInt(cleanHex, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

export function rgbToHex(rgb: RGB): string {
  const toHex = (n: number) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, '0');
  return `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`.toUpperCase();
}

export function rgbToHsl({ r, g, b }: RGB): HSL {
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;

  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case rNorm:
        h = (gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0);
        break;
      case gNorm:
        h = (bNorm - rNorm) / d + 2;
        break;
      case bNorm:
        h = (rNorm - gNorm) / d + 4;
        break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

export function hslToRgb({ h, s, l }: HSL): RGB {
  const hNorm = (h % 360) / 360;
  const sNorm = Math.max(0, Math.min(100, s)) / 100;
  const lNorm = Math.max(0, Math.min(100, l)) / 100;

  if (sNorm === 0) {
    const val = Math.round(lNorm * 255);
    return { r: val, g: val, b: val };
  }

  const hue2rgb = (p: number, q: number, t: number) => {
    let tNorm = t;
    if (tNorm < 0) tNorm += 1;
    if (tNorm > 1) tNorm -= 1;
    if (tNorm < 1 / 6) return p + (q - p) * 6 * tNorm;
    if (tNorm < 1 / 2) return q;
    if (tNorm < 2 / 3) return p + (q - p) * (2 / 3 - tNorm) * 6;
    return p;
  };

  const q = lNorm < 0.5 ? lNorm * (1 + sNorm) : lNorm + sNorm - lNorm * sNorm;
  const p = 2 * lNorm - q;

  return {
    r: Math.round(hue2rgb(p, q, hNorm + 1 / 3) * 255),
    g: Math.round(hue2rgb(p, q, hNorm) * 255),
    b: Math.round(hue2rgb(p, q, hNorm - 1 / 3) * 255),
  };
}

export function hexToHsl(hex: string): HSL {
  return rgbToHsl(hexToRgb(hex));
}

export function hslToHex(hsl: HSL): string {
  return rgbToHex(hslToRgb(hsl));
}

// ==========================================
// WCAG ACCESSIBILITY & CONTRAST CALCULATION
// ==========================================

export function getRelativeLuminance(rgb: RGB): number {
  const a = [rgb.r, rgb.g, rgb.b].map((v) => {
    const norm = v / 255;
    return norm <= 0.03928 ? norm / 12.92 : Math.pow((norm + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

export function getContrastRatio(hex1: string, hex2: string): number {
  const lum1 = getRelativeLuminance(hexToRgb(hex1));
  const lum2 = getRelativeLuminance(hexToRgb(hex2));
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}

export function getWCAGContrastText(bgHex: string): '#FFFFFF' | '#0F172A' {
  const whiteRatio = getContrastRatio(bgHex, '#FFFFFF');
  const darkRatio = getContrastRatio(bgHex, '#0F172A');
  return whiteRatio >= darkRatio ? '#FFFFFF' : '#0F172A';
}

// ==========================================
// PALETTE GENERATOR
// ==========================================

export function generateThemeTokens(
  effectiveMode: 'light' | 'dark',
  brandHex: string
): ThemeTokens {
  const hsl = hexToHsl(brandHex);
  const isDark = effectiveMode === 'dark';

  // Make sure the primary color is rich and readable on its respective background
  const primaryLightness = isDark
    ? Math.max(50, Math.min(70, hsl.l)) // brighter on dark backgrounds
    : Math.max(32, Math.min(52, hsl.l)); // deeper on light backgrounds

  const primaryHex = hslToHex({
    h: hsl.h,
    s: Math.max(45, hsl.s),
    l: primaryLightness,
  });

  const primaryHoverHex = hslToHex({
    h: hsl.h,
    s: Math.min(100, hsl.s + 10),
    l: isDark ? Math.min(80, primaryLightness + 10) : Math.max(20, primaryLightness - 10),
  });

  const primaryLightHex = hslToHex({
    h: hsl.h,
    s: isDark ? 40 : 85,
    l: isDark ? 16 : 95,
  });

  const primarySoftHex = hslToHex({
    h: hsl.h,
    s: isDark ? 45 : 75,
    l: isDark ? 22 : 88,
  });

  const primaryDarkHex = hslToHex({
    h: hsl.h,
    s: 80,
    l: 18,
  });

  const primaryContrast = getWCAGContrastText(primaryHex);
  const primaryRgb = hexToRgb(primaryHex);
  const shadowPrimary = `rgba(${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b}, 0.25)`;

  if (isDark) {
    return {
      primary: primaryHex,
      primaryHover: primaryHoverHex,
      primaryLight: primaryLightHex,
      primarySoft: primarySoftHex,
      primaryDark: primaryDarkHex,
      primaryContrast,
      accent: hslToHex({ h: (hsl.h + 20) % 360, s: 90, l: 65 }),
      shadowPrimary,

      // Dark Surfaces (Deep, eye-safe navy/slate with brand nuance)
      background: '#0A1128',
      surface: '#101C42',
      surfaceSecondary: '#182859',
      surfaceElevated: '#1E326F',

      border: '#1E2D5A',
      borderSubtle: '#152244',
      borderFocus: primaryHex,

      textPrimary: '#F8FAFC',
      textSecondary: '#94A3B8',
      textMuted: '#64748B',
      textInverse: '#0F172A',

      success: '#10B981',
      successLight: 'rgba(16, 185, 129, 0.15)',
      successText: '#34D399',
      warning: '#F59E0B',
      warningLight: 'rgba(245, 158, 11, 0.15)',
      warningText: '#FBBF24',
      error: '#DC2626',
      errorLight: 'rgba(220, 38, 38, 0.2)',
      errorText: '#F87171',

      radarRingColor: primaryHex,
      radarBgColor: '#0B1536',
      shieldGlow: hslToHex({ h: hsl.h, s: 90, l: 70 }),
    };
  }

  // Light Mode
  return {
    primary: primaryHex,
    primaryHover: primaryHoverHex,
    primaryLight: primaryLightHex,
    primarySoft: primarySoftHex,
    primaryDark: primaryDarkHex,
    primaryContrast,
    accent: hslToHex({ h: (hsl.h + 15) % 360, s: 90, l: 45 }),
    shadowPrimary,

    // Light Surfaces (High clarity, clean off-white with generous contrast)
    background: '#F8FAFC',
    surface: '#FFFFFF',
    surfaceSecondary: '#F1F5F9',
    surfaceElevated: '#FFFFFF',

    border: '#E2E8F0',
    borderSubtle: '#F1F5F9',
    borderFocus: primaryHex,

    textPrimary: '#0F172A',
    textSecondary: '#64748B',
    textMuted: '#94A3B8',
    textInverse: '#FFFFFF',

    success: '#10B981',
    successLight: '#D1FAE5',
    successText: '#065F46',
    warning: '#F59E0B',
    warningLight: '#FEF3C7',
    warningText: '#92400E',
    error: '#DC2626',
    errorLight: '#FEE2E2',
    errorText: '#991B1B',

    radarRingColor: primaryHex,
    radarBgColor: '#EBF3FA',
    shieldGlow: hslToHex({ h: hsl.h, s: 90, l: 50 }),
  };
}

/**
 * Injects CSS Custom Variables into document root or element
 */
export function applyThemeVariables(tokens: ThemeTokens, element: HTMLElement = document.documentElement) {
  const vars: Record<string, string> = {
    '--color-primary': tokens.primary,
    '--color-primary-hover': tokens.primaryHover,
    '--color-primary-light': tokens.primaryLight,
    '--color-primary-soft': tokens.primarySoft,
    '--color-primary-dark': tokens.primaryDark,
    '--color-primary-contrast': tokens.primaryContrast,
    '--color-accent': tokens.accent,
    '--color-shadow-primary': tokens.shadowPrimary,

    '--color-background': tokens.background,
    '--color-surface': tokens.surface,
    '--color-surface-secondary': tokens.surfaceSecondary,
    '--color-surface-elevated': tokens.surfaceElevated,

    '--color-border': tokens.border,
    '--color-border-subtle': tokens.borderSubtle,
    '--color-border-focus': tokens.borderFocus,

    '--color-text-primary': tokens.textPrimary,
    '--color-text-secondary': tokens.textSecondary,
    '--color-text-muted': tokens.textMuted,
    '--color-text-inverse': tokens.textInverse,

    '--color-success': tokens.success,
    '--color-success-light': tokens.successLight,
    '--color-success-text': tokens.successText,
    '--color-warning': tokens.warning,
    '--color-warning-light': tokens.warningLight,
    '--color-warning-text': tokens.warningText,
    '--color-error': tokens.error,
    '--color-error-light': tokens.errorLight,
    '--color-error-text': tokens.errorText,

    '--color-radar-ring': tokens.radarRingColor,
    '--color-radar-bg': tokens.radarBgColor,
    '--color-shield-glow': tokens.shieldGlow,
  };

  for (const [key, value] of Object.entries(vars)) {
    element.style.setProperty(key, value);
  }
}
