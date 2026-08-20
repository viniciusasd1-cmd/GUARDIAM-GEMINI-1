import React from 'react';
import { User, CreditCard, ShieldCheck, Bell, Info, LogOut } from 'lucide-react';
import { Header } from '../../../components/layout/Header';
import { SettingItem } from '../../../components/ui/SettingItem';

interface SettingsScreenProps {
  onNavigateToPaywall?: () => void;
  onLogout?: () => void;
  onBack?: () => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  onNavigateToPaywall,
  onLogout,
  onBack,
}) => {
  return (
    <div
      id="screen-settings"
      className="w-full h-full flex flex-col justify-between bg-[#F8FAFC] text-slate-900 overflow-y-auto"
    >
      {/* Header */}
      <Header
        showBack={Boolean(onBack)}
        onBack={onBack}
        id="settings-header"
      />

      <div className="flex-1 px-5 py-2 max-w-md mx-auto w-full">
        {/* Title */}
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight text-left mb-5">
          Configurações
        </h1>

        {/* Options List Card */}
        <div className="bg-white rounded-2xl p-2 border border-slate-200/60 shadow-sm space-y-0.5">
          <SettingItem
            icon={<User className="w-5 h-5" />}
            label="Conta"
            id="setting-account"
          />

          <SettingItem
            icon={<CreditCard className="w-5 h-5 text-[#1565C0]" />}
            label="Plano Guardiam Pro"
            badge="Upgrade"
            onClick={onNavigateToPaywall}
            id="setting-pro-plan"
          />

          <SettingItem
            icon={<ShieldCheck className="w-5 h-5" />}
            label="Segurança e Biometria"
            id="setting-security"
          />

          <SettingItem
            icon={<Bell className="w-5 h-5" />}
            label="Notificações"
            id="setting-notifications"
          />

          <SettingItem
            icon={<Info className="w-5 h-5" />}
            label="Sobre"
            id="setting-about"
          />
        </div>

        {/* Logout Option */}
        <div className="mt-6">
          <button
            type="button"
            onClick={onLogout}
            id="setting-logout-button"
            className="w-full py-3.5 px-4 rounded-2xl bg-white border border-red-200/60 text-red-600 font-semibold text-sm flex items-center justify-center gap-2 hover:bg-red-50 transition-colors shadow-sm cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sair da conta</span>
          </button>
        </div>
      </div>

      {/* App Version Info */}
      <div className="py-4 text-center text-xs text-slate-400">
        Guardiam Security v1.0.0 (Build 56)
      </div>
    </div>
  );
};

export default SettingsScreen;
