import React from 'react';
import { useTheme } from '../../theme/themeContext';

interface BadgeProps {
  variant?: 'inactive' | 'active' | 'sos' | 'neutral' | 'pro' | 'primary';
  children: React.ReactNode;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'inactive',
  children,
  id,
  className = '',
  style,
}) => {
  const { tokens } = useTheme();

  const variantStyles = {
    inactive: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700',
    active: 'bg-emerald-500/20 text-emerald-400 border border-emerald-400/30',
    sos: 'bg-red-500/20 text-red-400 border border-red-500/30',
    neutral: 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700',
    pro: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 font-bold',
    primary: 'border font-bold',
  };

  const dynamicStyles: React.CSSProperties = { ...style };
  if (variant === 'primary') {
    dynamicStyles.backgroundColor = tokens.primaryLight;
    dynamicStyles.color = tokens.primary;
    dynamicStyles.borderColor = `${tokens.primary}40`;
  }

  return (
    <span
      id={id}
      style={dynamicStyles}
      className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-medium ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
