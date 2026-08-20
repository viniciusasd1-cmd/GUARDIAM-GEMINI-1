/**
 * GUARDIAM DESIGN SYSTEM - COLOR TOKENS
 * Extraído com precisão da imagem de referência (mockups.jpeg)
 */

export const colors = {
  // Brand Colors
  primary: {
    DEFAULT: '#1565C0', // Azul clássico e vibrante do Guardiam Shield e botões
    hover: '#0D47A1',
    light: '#E3F2FD',
    soft: '#BBDEFB',
    dark: '#0A3871',
  },
  
  // Backgrounds
  background: {
    DEFAULT: '#F8FAFC', // Fundo claro suave padrão
    surface: '#FFFFFF',    // Superfície de cartões, listas e inputs
    secondary: '#F1F5F9',  // Fundo de inputs inativos e pills
    dark: '#0A1128',       // Fundo noturno / Tela de Proteção Ativa
    darkSurface: '#101C42',// Superfície escura de cards no modo ativo
    overlay: 'rgba(0, 0, 0, 0.6)',
  },

  // Emergency & Status
  emergency: {
    DEFAULT: '#DC2626', // Vermelho do SOS e tela Alerta Enviado
    light: '#FEE2E2',
    border: '#B91C1C',
    text: '#991B1B',
  },
  warning: {
    DEFAULT: '#F59E0B',
    light: '#FEF3C7',
  },
  success: {
    DEFAULT: '#10B981',
    light: '#D1FAE5',
  },

  // Typography Colors
  text: {
    primary: '#0F172A',    // Preto/Slate escuro para títulos e textos principais
    secondary: '#64748B',  // Slate médio para subtítulos, telefones e timestamps
    muted: '#94A3B8',      // Slate claro para placeholders e ícones desativados
    inverse: '#FFFFFF',    // Branco puro para botões primários e modo escuro
    link: '#1565C0',       // Azul de links ("Esqueceu a senha?", "Editar")
    danger: '#DC2626',     // Vermelho de ações críticas ("Remover")
  },

  // Borders & Dividers
  border: {
    DEFAULT: '#E2E8F0',    // Linhas de separação e bordas de cards
    light: '#F1F5F9',
    dark: '#1E293B',
    focus: '#1565C0',
    emergency: '#EF4444',
  },

  // Shield Emblem Accents
  shield: {
    glow: '#38BDF8',
    deep: '#0F2B5C',
    bright: '#00D2FF',
    accent: '#2563EB',
  }
} as const;

export type ColorsType = typeof colors;
