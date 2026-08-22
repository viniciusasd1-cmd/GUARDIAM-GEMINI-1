import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import {
  ThemeState,
  ThemeMode,
  BaseSurfaceMode,
  ThemeTokens,
  DEFAULT_THEME_STATE,
  generateThemeTokens,
  applyThemeVariables,
  THEME_PRESETS,
  ThemePreset,
} from './themeEngine';

const STORAGE_KEY = 'guardiam_theme_state_v1';

interface ThemeContextValue {
  themeState: ThemeState;
  tokens: ThemeTokens;
  effectiveMode: 'light' | 'dark';
  setMode: (mode: ThemeMode) => void;
  setCustomColor: (hex: string) => void;
  setCustomBase: (base: BaseSurfaceMode) => void;
  applyPreset: (preset: ThemePreset) => void;
  resetToDefault: () => void;
  isCustomModalOpen: boolean;
  openCustomModal: () => void;
  closeCustomModal: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Initial State from localStorage with safe fallback
  const [themeState, setThemeState] = useState<ThemeState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          return {
            mode: parsed.mode || DEFAULT_THEME_STATE.mode,
            customColor: parsed.customColor || DEFAULT_THEME_STATE.customColor,
            customBase: parsed.customBase || DEFAULT_THEME_STATE.customBase,
          };
        }
      }
    } catch {
      // Ignore localStorage error (private mode / sandboxed)
    }
    return DEFAULT_THEME_STATE;
  });

  const [systemIsDark, setSystemIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);

  // 2. Listen to OS system color scheme changes
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => setSystemIsDark(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // 3. Determine effective surface mode (light or dark)
  const effectiveMode: 'light' | 'dark' = useMemo(() => {
    if (themeState.mode === 'system') {
      return systemIsDark ? 'dark' : 'light';
    }
    if (themeState.mode === 'custom') {
      return themeState.customBase;
    }
    return themeState.mode === 'dark' ? 'dark' : 'light';
  }, [themeState.mode, themeState.customBase, systemIsDark]);

  // 4. Generate computed design tokens in real-time
  const tokens = useMemo(() => {
    const brandColor =
      themeState.mode === 'custom'
        ? themeState.customColor
        : themeState.mode === 'dark'
        ? '#38BDF8'
        : '#1565C0';

    return generateThemeTokens(effectiveMode, brandColor);
  }, [effectiveMode, themeState.mode, themeState.customColor]);

  // 5. Apply CSS Custom Properties and Body Class for seamless transitions
  useEffect(() => {
    applyThemeVariables(tokens, document.documentElement);

    if (effectiveMode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Persist to localStorage
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(themeState));
    } catch {
      // Ignore storage error
    }
  }, [tokens, effectiveMode, themeState]);

  // Actions
  const setMode = useCallback((mode: ThemeMode) => {
    setThemeState((prev) => ({ ...prev, mode }));
  }, []);

  const setCustomColor = useCallback((customColor: string) => {
    setThemeState((prev) => ({ ...prev, mode: 'custom', customColor }));
  }, []);

  const setCustomBase = useCallback((customBase: BaseSurfaceMode) => {
    setThemeState((prev) => ({ ...prev, mode: 'custom', customBase }));
  }, []);

  const applyPreset = useCallback((preset: ThemePreset) => {
    setThemeState((prev) => ({
      ...prev,
      mode: 'custom',
      customColor: preset.hex,
    }));
  }, []);

  const resetToDefault = useCallback(() => {
    setThemeState(DEFAULT_THEME_STATE);
  }, []);

  const openCustomModal = useCallback(() => setIsCustomModalOpen(true), []);
  const closeCustomModal = useCallback(() => setIsCustomModalOpen(false), []);

  const value: ThemeContextValue = useMemo(
    () => ({
      themeState,
      tokens,
      effectiveMode,
      setMode,
      setCustomColor,
      setCustomBase,
      applyPreset,
      resetToDefault,
      isCustomModalOpen,
      openCustomModal,
      closeCustomModal,
    }),
    [
      themeState,
      tokens,
      effectiveMode,
      setMode,
      setCustomColor,
      setCustomBase,
      applyPreset,
      resetToDefault,
      isCustomModalOpen,
      openCustomModal,
      closeCustomModal,
    ]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
