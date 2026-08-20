import React from 'react';
import { User } from 'lucide-react';

interface AvatarProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  src?: string;
  name?: string;
  className?: string;
  id?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  size = 'md',
  src,
  name,
  className = '',
  id,
}) => {
  const sizeMap = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-11 h-11 text-sm',
    lg: 'w-16 h-16 text-base',
    xl: 'w-24 h-24 text-xl',
  };

  const iconSizeMap = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
  };

  return (
    <div
      id={id}
      className={`relative inline-flex items-center justify-center rounded-full bg-slate-300 text-slate-600 shrink-0 overflow-hidden select-none ${sizeMap[size]} ${className}`}
    >
      {src ? (
        <img
          src={src}
          alt={name || 'Avatar'}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      ) : name ? (
        <span className="font-semibold text-slate-700 uppercase">
          {name.slice(0, 2)}
        </span>
      ) : (
        <User className={`text-slate-400 ${iconSizeMap[size]}`} />
      )}
    </div>
  );
};
