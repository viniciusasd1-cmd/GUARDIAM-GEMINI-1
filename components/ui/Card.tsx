import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'flat' | 'dark' | 'interactive';
  children: React.ReactNode;
  id?: string;
}

export const Card: React.FC<CardProps> = ({
  variant = 'default',
  children,
  className = '',
  id,
  ...props
}) => {
  const variantStyles = {
    default: 'bg-white border border-slate-100 shadow-[0_2px_8px_-2px_rgba(15,23,42,0.06)] text-slate-900',
    flat: 'bg-slate-50 border border-slate-200 text-slate-900',
    dark: 'bg-[#101C42] border border-blue-900/40 text-white shadow-lg',
    interactive: 'bg-white border border-slate-100 shadow-[0_2px_8px_-2px_rgba(15,23,42,0.06)] hover:border-blue-200 hover:shadow-md active:scale-[0.99] cursor-pointer transition-all duration-150',
  };

  return (
    <div
      id={id}
      className={`rounded-2xl p-4 ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
