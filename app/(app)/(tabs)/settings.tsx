import React from 'react';
import {
  User,
  CreditCard,
  ShieldCheck,
  Bell,
  LogOut,
  FileText,
  Sparkles,
  CheckCircle2,
  Palette,
  Sun,
  Moon,
  Monitor,
} from 'lucide-react';
import { Header } from '../../../components/layout/Header';
import { SettingItem } from '../../../components/ui/SettingItem';
import { useTheme } from '../../../theme/themeContext';

interface SettingsScreenProps {
  onNavigateToPaywall?: () => void;
  onNavigateToEvidence?: () => void;
  onNavigateToQuiz?: () => void;
  onLogout?: () => void;
  onBack?: () => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  onNavigateToPaywall,
  onNavigateToEvidence,
  onNavigateToQuiz,
  onLogout,
  onBack,
}) => {
  const { themeState, tokens, effectiveMode, openCustomModal } = useTheme();

  const getThemeBadge = () => {
    if (themeState.mode === 'custom') return 'Personalizado 🎨';
    if (themeState.mode === 'light') return 'Claro ☀️';
    if (themeState.mode === 'dark') return 'Escuro 🌙';
    return 'Sistema 💻';
  };

  return (
    <div
      id="screen-settings"
      className="w-full h-full flex flex-col justify-between overflow-y-auto transition-colors duration-200"
      style={{
        backgroundColor: tokens.background,
        color: tokens.textPrimary,
      }}
    >
      {/* Header */}
      <Header
        showBack={Boolean(onBack)}
        onBack={onBack}
        variant={effectiveMode === 'dark' ? 'dark' : 'light'}
        id="settings-header"
      />

      <div className="flex-1 px-5 py-2 max-w-md mx-auto w-full space-y-4">
        {/* Title */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight text-left">
            Configurações
          </h1>
          <button
            type="button"
            onClick={openCustomModal}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold flex items-center gap-1.5 shadow-sm hover:scale-105 transition-all cursor-pointer"
            style={{ color: tokens.primary }}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>Tema</span>
          </button>
        </div>

        {/* Options List Card */}
        <div
          className="rounded-2xl p-2 border shadow-sm space-y-0.5 transition-colors"
          style={{
            backgroundColor: tokens.surface,
            borderColor: tokens.border,
          }}
        >
          {/* THEME CUSTOMIZER ITEM */}
          <SettingItem
            icon={<Palette className="w-5 h-5" />}
            label="Tema e Aparência"
            badge={getThemeBadge()}
            onClick={openCustomModal}
            id="setting-theme"
          />

          <SettingItem
            icon={<CreditCard className="w-5 h-5" />}
            label="Plano Guardiam Pro"
            badge="Ativo"
            onClick={onNavigateToPaywall}
            id="setting-pro-plan"
          />

          <SettingItem
            icon={<FileText className="w-5 h-5" />}
            label="Dossiês de Evidência"
            badge="2 relatórios"
            onClick={onNavigateToEvidence}
            id="setting-evidence"
          />

          <SettingItem
            icon={<Sparkles className="w-5 h-5 text-amber-500" />}
            label="Diagnóstico de Segurança"
            badge="Quiz"
            onClick={onNavigateToQuiz}
            id="setting-safety-quiz"
          />

          <SettingItem
            icon={<User className="w-5 h-5" />}
            label="Conta e Perfil"
            id="setting-account"
          />

          <SettingItem
            icon={<ShieldCheck className="w-5 h-5" />}
            label="Segurança e Biometria"
            id="setting-security"
          />

          <SettingItem
            icon={<Bell className="w-5 h-5" />}
            label="Notificações e Alertas"
            id="setting-notifications"
          />
        </div>

        {/* System Permissions Status Box (permission_statuses + privacy_consents) */}
        <div
          className="p-4 rounded-2xl border shadow-sm text-left space-y-2.5 transition-colors"
          style={{
            backgroundColor: tokens.surface,
            borderColor: tokens.border,
          }}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Permissões do Sistema
            </span>
            <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
              100% Operacional
            </span>
          </div>

          <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
            <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800">
              <span>Localização em 2º plano (GPS 24/7)</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Permitido Sempre
              </span>
            </div>

            <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800">
              <span>Microfone para Evidências Forenses</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Autorizado
              </span>
            </div>

            <div className="flex items-center justify-between py-1">
              <span>Termos LGPD & Custódia Digital</span>
              <span className="text-slate-400 font-medium">v2.4 (Aceito)</span>
            </div>
          </div>
        </div>

        {/* Logout Option */}
        <div>
          <button
            type="button"
            onClick={onLogout}
            id="setting-logout-button"
            className="w-full py-3.5 px-4 rounded-2xl border border-red-200/60 dark:border-red-900/40 text-red-600 dark:text-red-400 font-semibold text-sm flex items-center justify-center gap-2 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors shadow-sm cursor-pointer"
            style={{
              backgroundColor: tokens.surface,
            }}
          >
            <LogOut className="w-4 h-4" />
            <span>Sair da conta</span>
          </button>
        </div>
      </div>

      {/* App Version Info */}
      <div className="py-4 text-center text-xs text-slate-400 dark:text-slate-500">
        Guardiam Security v1.0.0 (Build 56) · Criptografia AES-256
      </div>
    </div>
  );
};

export default SettingsScreen;
