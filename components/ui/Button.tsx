import React from 'react';

export type ButtonVariant = 
  | 'primary'      // Azul vibrante #1565C0, texto branco
  | 'secondary'    // Fundo azul claro #E3F2FD, texto azul #1565C0
  | 'sos'          // Borda vermelha fina ou texto vermelho
  | 'emergency'    // Fundo branco sólido em tela vermelha
  | 'danger'       // Fundo vermelho de emergência #DC2626
  | 'outline'      // Borda cinza suave
  | 'ghost';       // Sem fundo, hover sutil

export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
  children: React.ReactNode;
  id?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = true,
  leftIcon,
  rightIcon,
  isLoading = false,
  children,
  className = '',
  disabled,
  id,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-150 active:scale-[0.98] select-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100';

  const sizeStyles = {
    sm: 'px-3 py-2 text-xs gap-1.5 min-h-[36px]',
    md: 'px-4 py-3 text-sm gap-2 min-h-[46px]',
    lg: 'px-6 py-3.5 text-base gap-2.5 min-h-[52px]',
  };

  const variantStyles = {
    primary: 'bg-[#1565C0] hover:bg-[#0D47A1] text-white shadow-sm border border-transparent',
    secondary: 'bg-[#E3F2FD] hover:bg-[#BBDEFB] text-[#1565C0] border border-transparent',
    sos: 'bg-white hover:bg-red-50 text-[#DC2626] border border-[#DC2626]/40 shadow-sm font-bold',
    emergency: 'bg-white hover:bg-slate-100 text-[#DC2626] font-bold text-base shadow-lg border border-transparent',
    danger: 'bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold shadow-sm border border-transparent',
    outline: 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-sm',
    ghost: 'bg-transparent hover:bg-slate-100 text-slate-600',
  };

  return (
    <button
      id={id}
      disabled={disabled || isLoading}
      className={`
        ${baseStyles}
        ${sizeStyles[size]}
        ${variantStyles[variant]}
        ${fullWidth ? 'w-full' : 'w-auto'}
        ${className}
      `}
      {...props}
    >
      {isLoading ? (
        <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        <>
          {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
          <span>{children}</span>
          {rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
        </>
      )}
    </button>
  );
};
