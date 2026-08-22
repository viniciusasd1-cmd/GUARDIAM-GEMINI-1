import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useTheme } from '../../theme/themeContext';

interface SettingItemProps {
  icon: React.ReactNode;
  label: string;
  badge?: string;
  badgeColor?: string;
  onClick?: () => void;
  id?: string;
}

export const SettingItem: React.FC<SettingItemProps> = ({
  icon,
  label,
  badge,
  badgeColor,
  onClick,
  id,
}) => {
  const { tokens } = useTheme();

  return (
    <button
      type="button"
      id={id}
      onClick={onClick}
      className="w-full flex items-center justify-between py-3.5 px-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 border-b border-slate-100 dark:border-slate-800/80 last:border-0 transition-colors text-left group cursor-pointer"
    >
      <div className="flex items-center gap-3.5">
        <div
          className="text-slate-600 dark:text-slate-400 group-hover:opacity-90 transition-colors"
          style={{ color: tokens.primary }}
        >
          {icon}
        </div>
        <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
          {label}
        </span>
      </div>

      <div className="flex items-center gap-2 text-slate-400">
        {badge && (
          <span
            className="text-[11px] font-bold px-2 py-0.5 rounded-full transition-colors"
            style={{
              backgroundColor: badgeColor || tokens.primaryLight,
              color: badgeColor ? '#FFFFFF' : tokens.primary,
            }}
          >
            {badge}
          </span>
        )}
        <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform text-slate-400 dark:text-slate-500" />
      </div>
    </button>
  );
};
