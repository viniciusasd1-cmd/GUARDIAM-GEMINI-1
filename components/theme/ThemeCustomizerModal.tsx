import React from 'react';
import { useTheme } from '../../theme/themeContext';
import { THEME_PRESETS, ThemeMode } from '../../theme/themeEngine';
import { ColorPicker } from './ColorPicker';
import {
  Sun,
  Moon,
  Monitor,
  Palette,
  RotateCcw,
  X,
  Check,
  Shield,
  Sparkles,
  Zap,
} from 'lucide-react';

interface ThemeCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  id?: string;
}

export const ThemeCustomizerModal: React.FC<ThemeCustomizerModalProps> = ({
  isOpen,
  onClose,
  id = 'guardiam-theme-modal',
}) => {
  const {
    themeState,
    tokens,
    effectiveMode,
    setMode,
    setCustomColor,
    setCustomBase,
    applyPreset,
    resetToDefault,
  } = useTheme();

  if (!isOpen) return null;

  const modeOptions: { key: ThemeMode; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { key: 'light', label: 'Claro', icon: Sun },
    { key: 'dark', label: 'Escuro', icon: Moon },
    { key: 'system', label: 'Sistema', icon: Monitor },
    { key: 'custom', label: 'Personalizado', icon: Palette },
  ];

  return (
    <div
      id={id}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="w-full max-w-lg max-h-[90vh] bg-white dark:bg-[#0F172A] rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden text-slate-900 dark:text-slate-100 transition-all duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center text-white shadow-md transition-colors"
              style={{ backgroundColor: tokens.primary }}
            >
              <Palette className="w-4 h-4" />
            </div>
            <div className="text-left">
              <h2 className="text-base font-bold tracking-tight">
                Personalização de Tema
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Design tokens adaptativos com contraste seguro WCAG
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-left">
          {/* 1. Mode Selector Buttons */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Modo de Exibição
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {modeOptions.map((opt) => {
                const Icon = opt.icon;
                const isSelected = themeState.mode === opt.key;
                return (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => setMode(opt.key)}
                    className={`p-3 rounded-2xl border flex flex-col items-center justify-center gap-1.5 transition-all text-xs font-semibold cursor-pointer ${
                      isSelected
                        ? 'border-transparent shadow-md text-white scale-[1.02]'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                    style={
                      isSelected
                        ? {
                            backgroundColor: tokens.primary,
                            color: tokens.primaryContrast,
                          }
                        : {}
                    }
                  >
                    <Icon className="w-4 h-4" />
                    <span>{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Custom Base Surface (Only when Custom is active) */}
          {themeState.mode === 'custom' && (
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Superfície Base
                </span>
                <span className="text-[10px] font-semibold text-slate-400">
                  {themeState.customBase === 'light' ? 'Fundo Claro' : 'Fundo Escuro'}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setCustomBase('light')}
                  className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                    themeState.customBase === 'light'
                      ? 'bg-white border-sky-500 text-slate-900 shadow-sm ring-2 ring-sky-500/20'
                      : 'bg-slate-100 dark:bg-slate-800 border-transparent text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <Sun className="w-3.5 h-3.5 text-amber-500" />
                  <span>Base Clara</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCustomBase('dark')}
                  className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                    themeState.customBase === 'dark'
                      ? 'bg-slate-900 border-sky-500 text-white shadow-sm ring-2 ring-sky-500/20'
                      : 'bg-slate-100 dark:bg-slate-800 border-transparent text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <Moon className="w-3.5 h-3.5 text-sky-400" />
                  <span>Base Escura</span>
                </button>
              </div>
            </div>
          )}

          {/* 3. Fast Presets Grid */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Paletas Rápidas (Presets)
              </label>
              <span className="text-[11px] text-slate-400 font-medium">
                7 temas certificados
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {THEME_PRESETS.map((preset) => {
                const isCurrent =
                  themeState.customColor.toUpperCase() === preset.hex.toUpperCase();
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => applyPreset(preset)}
                    className={`p-2.5 rounded-2xl border flex items-center gap-2.5 transition-all text-left cursor-pointer ${
                      isCurrent
                        ? 'border-sky-500 bg-sky-500/10 ring-2 ring-sky-500/20 shadow-sm'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900'
                    }`}
                  >
                    <span
                      className="w-5 h-5 rounded-full shrink-0 shadow-sm flex items-center justify-center text-white text-[10px]"
                      style={{ backgroundColor: preset.hex }}
                    >
                      {isCurrent && <Check className="w-3 h-3 stroke-[3]" />}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold truncate text-slate-800 dark:text-slate-200">
                        {preset.name}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Advanced Interactive Color Picker */}
          <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800/80">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Seletor Livre & Degradê 2D</span>
              </label>
              <span className="text-[10px] font-semibold text-slate-400">
                Arraste para ajustar matiz e brilho
              </span>
            </div>

            <ColorPicker
              color={themeState.customColor}
              onChange={(newHex) => setCustomColor(newHex)}
            />
          </div>

          {/* 5. Real-Time UI Component Preview */}
          <div className="p-4 rounded-2xl bg-slate-100/70 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/60 space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
              Prévia dos Componentes em Tempo Real
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {/* Primary Button Sample */}
              <button
                type="button"
                className="py-2.5 px-4 rounded-xl font-bold text-xs shadow-md transition-transform flex items-center justify-center gap-2 select-none"
                style={{
                  backgroundColor: tokens.primary,
                  color: tokens.primaryContrast,
                }}
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Botão Primário</span>
              </button>

              {/* Secondary Soft Button Sample */}
              <button
                type="button"
                className="py-2.5 px-4 rounded-xl font-bold text-xs border border-transparent transition-all flex items-center justify-center gap-2 select-none"
                style={{
                  backgroundColor: tokens.primaryLight,
                  color: tokens.primary,
                }}
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Botão Secundário</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={resetToDefault}
            className="py-2.5 px-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restaurar padrão</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="py-2.5 px-6 rounded-xl font-bold text-xs shadow-md hover:opacity-95 active:scale-98 transition-all cursor-pointer"
            style={{
              backgroundColor: tokens.primary,
              color: tokens.primaryContrast,
            }}
          >
            Concluir & Aplicar
          </button>
        </div>
      </div>
    </div>
  );
};
