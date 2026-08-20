import React from 'react';

interface BadgeProps {
  variant?: 'inactive' | 'active' | 'sos' | 'neutral' | 'pro';
  children: React.ReactNode;
  id?: string;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'inactive',
  children,
  id,
  className = '',
}) => {
  const variantStyles = {
    inactive: 'bg-slate-100 text-slate-700 border border-slate-200/80',
    active: 'bg-blue-500/20 text-sky-400 border border-blue-400/30',
    sos: 'bg-red-500/20 text-red-400 border border-red-500/30',
    neutral: 'bg-slate-50 text-slate-600 border border-slate-200',
    pro: 'bg-amber-500/15 text-amber-600 border border-amber-500/30 font-bold',
  };

  return (
    <span
      id={id}
      className={`inline-flex items-center justify-center px-4 py-1.5 rounded-full text-xs font-medium ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
