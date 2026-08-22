import React from 'react';
import { Shield, Users, MessageSquare, MapPin, Settings as SettingsIcon } from 'lucide-react';
import { useTheme } from '../../theme/themeContext';

export type TabKey = 'home' | 'contacts' | 'places' | 'history' | 'settings';

interface TabBarProps {
  currentTab: TabKey;
  onSelectTab: (tab: TabKey) => void;
  isDarkMode?: boolean;
  id?: string;
}

export const TabBar: React.FC<TabBarProps> = ({
  currentTab,
  onSelectTab,
  isDarkMode = false,
  id = 'guardiam-tabbar',
}) => {
  const { tokens, effectiveMode } = useTheme();
  const isDarkEffective = isDarkMode || effectiveMode === 'dark';

  const tabs: { key: TabKey; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { key: 'home', label: 'Início', icon: Shield },
    { key: 'contacts', label: 'Contatos', icon: Users },
    { key: 'places', label: 'Locais', icon: MapPin },
    { key: 'history', label: 'Histórico', icon: MessageSquare },
    { key: 'settings', label: 'Ajustes', icon: SettingsIcon },
  ];

  return (
    <nav
      id={id}
      className={`w-full border-t px-4 py-2 flex items-center justify-around select-none transition-colors duration-200 ${
        isDarkEffective
          ? 'bg-[#0A1128] border-blue-950/60 text-slate-400'
          : 'bg-white border-slate-100 text-slate-500 shadow-lg'
      }`}
    >
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = currentTab === tab.key;

        return (
          <button
            key={tab.key}
            type="button"
            id={`${id}-tab-${tab.key}`}
            onClick={() => onSelectTab(tab.key)}
            className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all cursor-pointer ${
              isActive
                ? 'font-bold scale-105'
                : 'text-slate-400 hover:text-slate-600'
            }`}
            style={
              isActive
                ? { color: tokens.primary }
                : {}
            }
            aria-label={tab.label}
          >
            <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
            <span className="text-[10px] mt-1 tracking-tight">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
