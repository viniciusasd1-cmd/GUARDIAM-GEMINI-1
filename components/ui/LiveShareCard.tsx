import React, { useState } from 'react';
import { Share2, Copy, Check, Eye, ExternalLink } from 'lucide-react';

interface LiveShareCardProps {
  trackingUrl?: string;
  accessCount?: number;
  lastAccessTime?: string;
  isDark?: boolean;
  onShare?: () => void;
  className?: string;
  id?: string;
}

export const LiveShareCard: React.FC<LiveShareCardProps> = ({
  trackingUrl = 'https://guardiam.app/track/tk_78x9a2',
  accessCount = 2,
  lastAccessTime = 'Há 2 min',
  isDark = true,
  onShare,
  className = '',
  id = 'live-share-card',
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(trackingUrl);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    onShare?.();
  };

  return (
    <div
      id={id}
      className={`rounded-2xl p-3.5 border transition-all select-none ${
        isDark
          ? 'bg-[#101C42] border-blue-900/60 text-white'
          : 'bg-white border-slate-200/80 text-slate-900 shadow-sm'
      } ${className}`}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-left">
          <div className="p-2 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
            <Share2 className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold">Link de Rastreamento ao Vivo</div>
            <div className="text-[11px] text-slate-400 truncate max-w-[190px]">
              {trackingUrl}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#1565C0] hover:bg-[#0D47A1] text-white text-xs font-semibold shadow-sm transition-all cursor-pointer shrink-0"
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copiado' : 'Copiar'}</span>
        </button>
      </div>

      {/* Access Log Audit */}
      <div className="mt-2 pt-2 border-t border-slate-700/40 flex items-center justify-between text-[11px] text-slate-400">
        <span className="flex items-center gap-1">
          <Eye className="w-3.5 h-3.5 text-sky-400" />
          {accessCount} visualizações registradas
        </span>
        <span>Último: {lastAccessTime}</span>
      </div>
    </div>
  );
};
