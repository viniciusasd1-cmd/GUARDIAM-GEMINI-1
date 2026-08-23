import React, { useState } from 'react';
import { 
  FileCheck2, 
  Lock, 
  Download, 
  Play, 
  Pause, 
  MapPin, 
  Clock, 
  ShieldAlert, 
  Eye, 
  Share2,
  FileText
} from 'lucide-react';
import { Header } from '../../components/layout/Header';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

interface EvidenceReport {
  id: string;
  code: string;
  createdAt: string;
  location: string;
  durationSeconds: number;
  audioFileSize: string;
  accessCount: number;
  status: 'locked' | 'accessible';
}

const mockReports: EvidenceReport[] = [
  {
    id: '1',
    code: 'EV-2026-9841',
    createdAt: '20/08/2026 às 04:15',
    location: 'Av. Paulista, 1000 - Bela Vista, SP',
    durationSeconds: 145,
    audioFileSize: '2.4 MB (Áudio Criptografado)',
    accessCount: 3,
    status: 'locked',
  },
  {
    id: '2',
    code: 'EV-2026-7712',
    createdAt: '15/08/2026 às 23:40',
    location: 'Rua Augusta, 1508 - Consolação, SP',
    durationSeconds: 320,
    audioFileSize: '5.1 MB (Áudio Criptografado)',
    accessCount: 1,
    status: 'accessible',
  },
];

export const EvidenceDossierScreen: React.FC<{ onBack?: () => void }> = ({ onBack }) => {
  const [playingId, setPlayingId] = useState<string | null>(null);

  const togglePlay = (id: string) => {
    setPlayingId(prev => (prev === id ? null : id));
  };

  return (
    <div
      id="screen-evidence-dossier"
      className="w-full h-full flex flex-col justify-between bg-[#F8FAFC] text-slate-900 overflow-y-auto"
    >
      <Header showBack={Boolean(onBack)} onBack={onBack} id="evidence-header" />

      <div className="flex-1 px-5 py-2 space-y-4 max-w-md mx-auto w-full">
        {/* Title */}
        <div className="text-left">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Dossiês de Evidência
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Gravações, logs de GPS e dados de custódia protegidos por lei
          </p>
        </div>

        {/* Info Box */}
        <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-100 flex items-start gap-3 text-left">
          <Lock className="w-5 h-5 text-[#1565C0] shrink-0 mt-0.5" />
          <div className="text-xs text-[#0D47A1] leading-relaxed">
            <span className="font-bold">Custódia Forense Digital:</span> Todos os arquivos possuem hash criptográfico e registro de auditoria imutável para uso jurídico e policial.
          </div>
        </div>

        {/* List of Dossiers */}
        <div className="space-y-3 text-left pb-6">
          {mockReports.map((report) => (
            <Card key={report.id} className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#1565C0]" />
                  <span className="text-xs font-mono font-bold text-slate-800">
                    {report.code}
                  </span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Custódia Ativa
                </span>
              </div>

              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{report.createdAt}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{report.location}</span>
                </div>
              </div>

              {/* Audio Playback Simulator */}
              <div className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => togglePlay(report.id)}
                  className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 hover:text-[#1565C0] cursor-pointer flex-1 min-w-0 text-left"
                >
                  <div className="w-7 h-7 rounded-lg bg-blue-100 text-[#1565C0] flex items-center justify-center shrink-0">
                    {playingId === report.id ? (
                      <Pause className="w-3.5 h-3.5" />
                    ) : (
                      <Play className="w-3.5 h-3.5 fill-current" />
                    )}
                  </div>
                  <span className="truncate">
                    {playingId === report.id ? 'Reproduzindo áudio...' : 'Ouvir Gravação (2:25)'}
                  </span>
                </button>

                <button
                  type="button"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors shrink-0 cursor-pointer flex items-center justify-center"
                  title="Baixar Relatório"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>

              {/* Access Audit */}
              <div className="pt-1 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <Eye className="w-3 h-3 text-[#1565C0]" /> {report.accessCount} acessos auditados
                </span>
                <span>{report.audioFileSize}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EvidenceDossierScreen;
