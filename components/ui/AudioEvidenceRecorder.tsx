import React, { useState, useEffect } from 'react';
import { Mic, Radio, Shield, CheckCircle2 } from 'lucide-react';

interface AudioEvidenceRecorderProps {
  isRecording?: boolean;
  dossierId?: string;
  onToggleRecording?: () => void;
  isDark?: boolean;
  className?: string;
  id?: string;
}

export const AudioEvidenceRecorder: React.FC<AudioEvidenceRecorderProps> = ({
  isRecording = true,
  dossierId = 'EV-2026-9841',
  onToggleRecording,
  isDark = true,
  className = '',
  id = 'audio-evidence-recorder',
}) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval: any;
    if (isRecording) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
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
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div
            className={`relative p-2 rounded-xl flex items-center justify-center ${
              isRecording
                ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                : 'bg-slate-700/40 text-slate-400'
            }`}
          >
            {isRecording ? (
              <>
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-ping" />
                <Mic className="w-4 h-4" />
              </>
            ) : (
              <Radio className="w-4 h-4" />
            )}
          </div>

          <div className="text-left">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider">
                Custódia de Evidências
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-500/10 text-sky-400 border border-blue-400/20">
                #{dossierId}
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              {isRecording
                ? `Gravação contínua criptografada (${formatTime(seconds)})`
                : 'Gravação em espera'}
            </p>
          </div>
        </div>

        {/* Action Toggle */}
        <button
          type="button"
          onClick={onToggleRecording}
          className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
            isRecording
              ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/30'
              : 'bg-blue-500/10 text-sky-400 hover:bg-blue-500/20 border border-blue-500/30'
          }`}
        >
          {isRecording ? 'Pausar' : 'Gravar'}
        </button>
      </div>

      {/* Audio Waveform Simulation */}
      {isRecording && (
        <div className="mt-2.5 pt-2 border-t border-slate-700/40 flex items-center justify-between px-1">
          <div className="flex items-center gap-1 h-3">
            {[40, 75, 100, 45, 90, 60, 30, 85, 95, 50, 70, 40].map((h, i) => (
              <span
                key={i}
                className="w-1 bg-red-400 rounded-full animate-pulse"
                style={{
                  height: `${h}%`,
                  animationDuration: `${0.4 + (i % 4) * 0.2}s`,
                }}
              />
            ))}
          </div>
          <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Criptografia AES-256
          </span>
        </div>
      )}
    </div>
  );
};
