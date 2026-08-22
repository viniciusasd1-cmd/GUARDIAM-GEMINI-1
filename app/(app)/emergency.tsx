import React, { useState, useEffect } from 'react';
import { AlertTriangle, PhoneCall, ShieldAlert, Mic, Eye, FileText, CheckCircle2 } from 'lucide-react';
import { Header } from '../../components/layout/Header';
import { Button } from '../../components/ui/Button';

interface EmergencyScreenProps {
  onClose?: () => void;
  onCallEmergency?: () => void;
}

export const EmergencyScreen: React.FC<EmergencyScreenProps> = ({
  onClose,
  onCallEmergency,
}) => {
  const [recordingSeconds, setRecordingSeconds] = useState(12);
  const [accessLogsCount, setAccessLogsCount] = useState(2);

  useEffect(() => {
    const timer = setInterval(() => {
      setRecordingSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCall = () => {
    onCallEmergency?.();
  };

  return (
    <div
      id="screen-emergency-alert"
      className="w-full h-full flex flex-col justify-between bg-[#DC2626] text-white select-none relative overflow-y-auto"
    >
      {/* Header with Close Icon on top right */}
      <Header
        variant="emergency"
        showClose
        onClose={onClose}
        id="emergency-header"
      />

      {/* Center Alert Icon and Message */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-2 text-center max-w-sm mx-auto w-full">
        {/* Pulsing Emergency Icon */}
        <div className="relative mb-4">
          <div className="absolute inset-0 rounded-full bg-white/20 animate-ping" />
          <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center border-2 border-white/40 shadow-2xl relative z-10">
            <AlertTriangle className="w-10 h-10 text-white stroke-[2.5]" />
          </div>
        </div>

        {/* Headlines */}
        <h1 className="text-3xl font-extrabold tracking-wider text-white uppercase leading-tight">
          ALERTA<br />ENVIADO
        </h1>

        <p className="mt-2 text-xs font-medium text-white/90 max-w-xs leading-relaxed">
          Seus guardiões foram notificados com sua localização e link de emergência em tempo real.
        </p>

        {/* Live Dossier Card */}
        <div className="mt-4 w-full bg-black/25 backdrop-blur-md rounded-2xl p-3.5 border border-white/20 text-left space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-bold text-white">
              <FileText className="w-3.5 h-3.5 text-white/80" />
              <span>Dossiê Forense #EV-2026-9841</span>
            </div>
            <span className="text-[10px] font-mono bg-white/20 px-2 py-0.5 rounded-full text-white font-semibold">
              AES-256
            </span>
          </div>

          <div className="flex items-center justify-between text-xs text-white/90 pt-1 border-t border-white/10">
            <div className="flex items-center gap-1.5">
              <Mic className="w-3.5 h-3.5 text-red-200 animate-pulse" />
              <span>Gravando áudio ({formatTime(recordingSeconds)})</span>
            </div>
            <span className="text-[11px] font-semibold text-emerald-300 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> GPS Ativo
            </span>
          </div>

          {/* Guardian Access tracker */}
          <div className="pt-1 flex items-center justify-between text-[11px] text-white/80">
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" /> {accessLogsCount} guardiões visualizaram o link
            </span>
            <span className="text-white/60">Há 30s</span>
          </div>
        </div>
      </div>

      {/* Bottom Emergency Call Button */}
      <div className="px-6 pb-6 pt-2 max-w-sm mx-auto w-full space-y-2">
        <Button
          variant="emergency"
          size="lg"
          id="emergency-call-button"
          onClick={handleCall}
          className="!bg-white !text-red-700 hover:!bg-white/90 shadow-xl"
          leftIcon={<PhoneCall className="w-5 h-5 stroke-[2.5]" />}
        >
          Ligar 190 (Polícia Militar)
        </Button>
      </div>
    </div>
  );
};

export default EmergencyScreen;
