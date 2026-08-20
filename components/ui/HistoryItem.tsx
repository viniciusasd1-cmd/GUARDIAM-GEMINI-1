import React from 'react';
import { AlertTriangle, ShieldCheck, Clock } from 'lucide-react';

export interface HistoryEntry {
  id: string;
  date: string;
  type: 'sos' | 'protection_activated' | 'protection_deactivated';
  title: string;
  subtitle?: string;
  time?: string;
}

interface HistoryItemProps {
  entry: HistoryEntry;
  id?: string;
}

export const HistoryItem: React.FC<HistoryItemProps> = ({ entry, id }) => {
  const isSos = entry.type === 'sos';

  return (
    <div
      id={id || `history-item-${entry.id}`}
      className="py-3.5 border-b border-slate-200/70 last:border-0 flex items-start justify-between gap-3 text-left"
    >
      <div className="flex items-start gap-2.5">
        <div
          className={`mt-0.5 p-1.5 rounded-lg shrink-0 ${
            isSos ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-[#1565C0]'
          }`}
        >
          {isSos ? (
            <AlertTriangle className="w-4 h-4" />
          ) : (
            <ShieldCheck className="w-4 h-4" />
          )}
        </div>

        <div>
          <div className="text-sm font-semibold text-slate-800 leading-snug">
            <span className="font-bold mr-1">{entry.date}:</span>
            <span className={isSos ? 'text-red-600 font-semibold' : 'text-slate-800'}>
              {entry.title}
            </span>
          </div>
          {entry.subtitle && (
            <div className="text-xs text-slate-500 mt-0.5">
              {entry.subtitle}
            </div>
          )}
        </div>
      </div>

      {entry.time && (
        <span className="text-xs text-slate-400 font-medium shrink-0 flex items-center gap-1 mt-0.5">
          <Clock className="w-3 h-3" />
          {entry.time}
        </span>
      )}
    </div>
  );
};
