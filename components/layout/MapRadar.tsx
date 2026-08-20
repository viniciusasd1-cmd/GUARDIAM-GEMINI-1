import React from 'react';

interface MapRadarProps {
  isDark?: boolean;
  pulseSpeed?: 'normal' | 'fast';
  height?: string;
  className?: string;
  id?: string;
}

export const MapRadar: React.FC<MapRadarProps> = ({
  isDark = false,
  pulseSpeed = 'normal',
  height = 'h-48',
  className = '',
  id = 'guardiam-map-radar',
}) => {
  return (
    <div
      id={id}
      className={`relative w-full ${height} rounded-2xl overflow-hidden select-none border transition-all duration-300 ${
        isDark
          ? 'bg-[#0B1536] border-blue-900/50 shadow-inner'
          : 'bg-[#EBF3FA] border-blue-100 shadow-sm'
      } ${className}`}
    >
      {/* Stylized Vector Map Grid Lines */}
      <svg
        className="absolute inset-0 w-full h-full opacity-60"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id={isDark ? 'grid-dark' : 'grid-light'}
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 60 0 L 0 0 0 60"
              fill="none"
              stroke={isDark ? '#1E2D5A' : '#CFE2FE'}
              strokeWidth="1.5"
            />
          </pattern>
        </defs>

        <rect
          width="100%"
          height="100%"
          fill={`url(#${isDark ? 'grid-dark' : 'grid-light'})`}
        />

        {/* Diagonal Arterial Roads */}
        <path
          d="M -20 40 L 400 180"
          stroke={isDark ? '#233876' : '#BFDBFE'}
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M 80 -20 L 220 300"
          stroke={isDark ? '#233876' : '#BFDBFE'}
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d="M 280 0 L 120 280"
          stroke={isDark ? '#1A2952' : '#DBEAFE'}
          strokeWidth="4"
        />
      </svg>

      {/* Pulsing Concentric Radar Rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Ring 3 (Outer) */}
        <div
          className={`absolute rounded-full animate-ping opacity-25 ${
            isDark ? 'bg-sky-400' : 'bg-[#1565C0]'
          } ${pulseSpeed === 'fast' ? 'duration-1000' : 'duration-1000'}`}
          style={{ width: '120px', height: '120px', animationDuration: '2.5s' }}
        />

        {/* Ring 2 (Middle) */}
        <div
          className={`absolute rounded-full border-2 ${
            isDark
              ? 'border-sky-400/40 bg-sky-500/10'
              : 'border-[#1565C0]/30 bg-[#1565C0]/5'
          }`}
          style={{ width: '80px', height: '80px' }}
        />

        {/* Ring 1 (Inner Glowing Radar Ring) */}
        <div
          className={`absolute rounded-full border-2 ${
            isDark ? 'border-sky-300' : 'border-[#1565C0]'
          }`}
          style={{ width: '38px', height: '38px' }}
        />

        {/* Center Target Dot */}
        <div
          className={`relative z-10 w-4 h-4 rounded-full ring-4 shadow-lg ${
            isDark
              ? 'bg-sky-400 ring-sky-900/80 shadow-sky-400/50'
              : 'bg-[#1565C0] ring-blue-200 shadow-blue-600/40'
          }`}
        />
      </div>

      {/* Live Badge in Map Corner */}
      <div className="absolute bottom-2.5 right-2.5">
        <span
          className={`px-2 py-0.5 text-[10px] font-semibold rounded-md backdrop-blur-sm ${
            isDark
              ? 'bg-blue-950/80 text-sky-300 border border-sky-500/30'
              : 'bg-white/90 text-[#1565C0] border border-blue-200'
          }`}
        >
          GPS Ativo
        </span>
      </div>
    </div>
  );
};
