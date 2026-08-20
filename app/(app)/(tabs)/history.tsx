import React from 'react';
import { History as HistoryIcon, Filter } from 'lucide-react';
import { Header } from '../../../components/layout/Header';
import { HistoryItem, HistoryEntry } from '../../../components/ui/HistoryItem';

interface HistoryScreenProps {
  entries?: HistoryEntry[];
  onBack?: () => void;
}

const defaultHistory: HistoryEntry[] = [
  {
    id: '1',
    date: '26/05',
    type: 'sos',
    title: 'Alerta SOS enviado',
    time: '19:30',
    subtitle: 'Acionamento manual - 3 contatos notificados',
  },
  {
    id: '2',
    date: '20/05',
    type: 'protection_activated',
    title: 'Proteção ativada',
    subtitle: 'Duração total: 6h',
    time: '22:00',
  },
  {
    id: '3',
    date: '20/05',
    type: 'protection_activated',
    title: 'Proteção ativada',
    subtitle: 'Duração total: 10h',
    time: '08:00',
  },
  {
    id: '4',
    date: '18/05',
    type: 'protection_activated',
    title: 'Proteção ativada',
    subtitle: 'Duração total: 6h',
    time: '19:15',
  },
  {
    id: '5',
    date: '16/05',
    type: 'protection_activated',
    title: 'Proteção ativada',
    subtitle: 'Duração total: 6h',
    time: '20:00',
  },
];

export const HistoryScreen: React.FC<HistoryScreenProps> = ({
  entries = defaultHistory,
  onBack,
}) => {
  return (
    <div
      id="screen-history"
      className="w-full h-full flex flex-col justify-between bg-[#F8FAFC] text-slate-900 overflow-y-auto"
    >
      {/* Header with Shield Emblem */}
      <Header
        showBack={Boolean(onBack)}
        onBack={onBack}
        id="history-header"
      />

      <div className="flex-1 px-5 py-2 max-w-md mx-auto w-full">
        {/* Title */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight text-left">
            Histórico de<br />Segurança
          </h1>
          <div className="p-2 rounded-xl bg-white border border-slate-200 text-slate-500 shadow-sm">
            <Filter className="w-4 h-4" />
          </div>
        </div>

        {/* List of Events */}
        {entries.length === 0 ? (
          <div className="py-12 px-4 text-center rounded-2xl bg-white border border-slate-200/60 my-4 space-y-2">
            <HistoryIcon className="w-10 h-10 text-slate-400 mx-auto" />
            <p className="text-sm font-semibold text-slate-700">Nenhum evento registrado</p>
            <p className="text-xs text-slate-500">Seu histórico de proteções e alertas aparecerá aqui.</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-4 border border-slate-200/60 shadow-sm">
            {entries.map((entry) => (
              <HistoryItem key={entry.id} entry={entry} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryScreen;
