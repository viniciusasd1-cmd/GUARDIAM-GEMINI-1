import React from 'react';
import { ArrowLeft, Menu, Bell, X } from 'lucide-react';
import { Logo } from '../ui/Logo';

interface HeaderProps {
  variant?: 'light' | 'dark' | 'emergency';
  showBack?: boolean;
  onBack?: () => void;
  showMenu?: boolean;
  onMenu?: () => void;
  showNotification?: boolean;
  hasNotificationBadge?: boolean;
  onNotification?: () => void;
  showClose?: boolean;
  onClose?: () => void;
  title?: string;
  id?: string;
}

export const Header: React.FC<HeaderProps> = ({
  variant = 'light',
  showBack = false,
  onBack,
  showMenu = false,
  onMenu,
  showNotification = false,
  hasNotificationBadge = false,
  onNotification,
  showClose = false,
  onClose,
  title,
  id = 'guardiam-header',
}) => {
  const isDark = variant === 'dark';
  const isEmergency = variant === 'emergency';

  const textColor = isEmergency
    ? 'text-white'
    : isDark
    ? 'text-white'
    : 'text-slate-800';

  const iconBtnClass = isEmergency
    ? 'text-white hover:bg-white/10'
    : isDark
    ? 'text-slate-200 hover:bg-white/10'
    : 'text-slate-700 hover:bg-slate-100';

  return (
    <header
      id={id}
      className={`relative w-full flex items-center justify-between px-4 py-3 min-h-[56px] select-none ${
        isEmergency
          ? 'bg-[#DC2626]'
          : isDark
          ? 'bg-[#0A1128]'
          : 'bg-transparent'
      }`}
    >
      {/* Left Slot: Back or Hamburger or Blank */}
      <div className="w-10 flex items-center justify-start">
        {showBack && (
          <button
            type="button"
            id={`${id}-back-button`}
            onClick={onBack}
            className={`p-2 rounded-full transition-colors cursor-pointer ${iconBtnClass}`}
            aria-label="Voltar"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
          </button>
        )}

        {showMenu && !showBack && (
          <button
            type="button"
            id={`${id}-menu-button`}
            onClick={onMenu}
            className={`p-2 rounded-full transition-colors cursor-pointer ${iconBtnClass}`}
            aria-label="Menu"
          >
            <Menu className="w-5 h-5 stroke-[2.5]" />
          </button>
        )}
      </div>

      {/* Center Slot: Shield Logo or Title */}
      <div className="flex-1 flex items-center justify-center">
        {title ? (
          <h1 className={`text-base font-bold truncate max-w-[200px] ${textColor}`}>
            {title}
          </h1>
        ) : (
          <Logo size="sm" id={`${id}-logo`} />
        )}
      </div>

      {/* Right Slot: Notifications or Close or Blank */}
      <div className="w-10 flex items-center justify-end">
        {showClose && (
          <button
            type="button"
            id={`${id}-close-button`}
            onClick={onClose}
            className={`p-2 rounded-full transition-colors cursor-pointer ${iconBtnClass}`}
            aria-label="Fechar"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        )}

        {showNotification && !showClose && (
          <button
            type="button"
            id={`${id}-notification-button`}
            onClick={onNotification}
            className={`relative p-2 rounded-full transition-colors cursor-pointer ${iconBtnClass}`}
            aria-label="Notificações"
          >
            <Bell className="w-5 h-5" />
            {hasNotificationBadge && (
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white" />
            )}
          </button>
        )}
      </div>
    </header>
  );
};
