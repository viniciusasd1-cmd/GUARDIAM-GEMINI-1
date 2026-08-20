import React from 'react';
import { ChevronRight } from 'lucide-react';

interface SettingItemProps {
  icon: React.ReactNode;
  label: string;
  badge?: string;
  onClick?: () => void;
  id?: string;
}

export const SettingItem: React.FC<SettingItemProps> = ({
  icon,
  label,
  badge,
  onClick,
  id,
}) => {
  return (
    <button
      type="button"
      id={id}
      onClick={onClick}
      className="w-full flex items-center justify-between py-3.5 px-3 rounded-xl hover:bg-slate-50 border-b border-slate-100 last:border-0 transition-colors text-left group cursor-pointer"
    >
      <div className="flex items-center gap-3.5">
        <div className="text-slate-600 group-hover:text-[#1565C0] transition-colors">
          {icon}
        </div>
        <span className="text-sm font-semibold text-slate-800">
          {label}
        </span>
      </div>

      <div className="flex items-center gap-2 text-slate-400">
        {badge && (
          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-[#1565C0]">
            {badge}
          </span>
        )}
        <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
      </div>
    </button>
  );
};
