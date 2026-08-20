import React from 'react';
import { Check } from 'lucide-react';

interface CheckboxProps {
  label: string;
  sublabel?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  id?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  sublabel,
  checked,
  onChange,
  disabled = false,
  id,
}) => {
  const checkboxId = id || `checkbox-${label.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div
      role="checkbox"
      aria-checked={checked}
      tabIndex={disabled ? -1 : 0}
      id={checkboxId}
      onClick={() => !disabled && onChange(!checked)}
      onKeyDown={(e) => {
        if (!disabled && (e.key === ' ' || e.key === 'Enter')) {
          e.preventDefault();
          onChange(!checked);
        }
      }}
      className={`
        flex items-start gap-3 py-2 select-none cursor-pointer transition-colors
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'}
      `}
    >
      <div
        className={`
          mt-0.5 w-5 h-5 rounded-md flex items-center justify-center transition-all duration-150 shrink-0
          ${checked ? 'bg-[#1565C0] text-white' : 'border-2 border-slate-300 bg-white'}
        `}
      >
        {checked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
      </div>

      <div className="flex flex-col text-left">
        <span className="text-sm font-medium text-slate-800 leading-tight">
          {label}
        </span>
        {sublabel && (
          <span className="text-xs text-slate-500 mt-0.5">{sublabel}</span>
        )}
      </div>
    </div>
  );
};
