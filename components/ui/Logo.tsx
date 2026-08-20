import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  id?: string;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', className = '', id = 'guardiam-logo' }) => {
  const sizeMap = {
    sm: 'w-7 h-7',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  };

  return (
    <div
      id={id}
      className={`relative inline-flex items-center justify-center select-none ${sizeMap[size]} ${className}`}
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md transition-transform duration-200"
      >
        <defs>
          <linearGradient id="shieldOuterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="50%" stopColor="#0284C7" />
            <stop offset="100%" stopColor="#0369A1" />
          </linearGradient>

          <linearGradient id="shieldInnerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0284C7" />
            <stop offset="40%" stopColor="#075985" />
            <stop offset="100%" stopColor="#082F49" />
          </linearGradient>

          <linearGradient id="shieldSpecular" x1="20%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
            <stop offset="40%" stopColor="#BAE6FD" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#0369A1" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Outer Shield Frame with Highlights */}
        <path
          d="M50 8L82 20C82 48 68 76 50 92C32 76 18 48 18 20L50 8Z"
          fill="url(#shieldOuterGrad)"
          stroke="#7DD3FC"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* Inner Shield Bevel */}
        <path
          d="M50 14L76 24C76 48 64 71 50 84C36 71 24 48 24 24L50 14Z"
          fill="url(#shieldInnerGrad)"
          stroke="#0369A1"
          strokeWidth="1.5"
        />

        {/* Left Side Shadow / Right Side Highlight Divider */}
        <path
          d="M50 14L50 84C64 71 76 48 76 24L50 14Z"
          fill="#38BDF8"
          fillOpacity="0.12"
        />

        {/* Shield Specular Crest */}
        <path
          d="M50 14L74 23.5C72 38 65 52 50 62L50 14Z"
          fill="url(#shieldSpecular)"
        />

        {/* Crisp Bold Letter 'G' */}
        <path
          d="M58 35C55.5 33.2 52.5 32 48.5 32C40 32 34 38 34 49C34 60 40 66 49 66C56 66 61 62 62.5 56H49V48H70V70C64.5 73.5 57.5 75 49 75C34 75 24 64 24 49C24 34 34 23 49 23C55 23 60.5 25.5 64.5 29.5L58 35Z"
          fill="#FFFFFF"
          className="drop-shadow-sm"
        />
      </svg>
    </div>
  );
};
