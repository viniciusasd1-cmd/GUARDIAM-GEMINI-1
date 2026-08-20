import React from 'react';
import { AlertTriangle, PhoneCall } from 'lucide-react';
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
  const handleCall = () => {
    onCallEmergency?.();
  };

  return (
    <div
      id="screen-emergency-alert"
      className="w-full h-full flex flex-col justify-between bg-[#DC2626] text-white select-none relative overflow-hidden"
    >
      {/* Header with Close Icon on top right */}
      <Header
        variant="emergency"
        showClose
        onClose={onClose}
        id="emergency-header"
      />

      {/* Center Alert Icon and Message */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center max-w-sm mx-auto w-full">
        {/* Pulsing Emergency Icon */}
        <div className="relative mb-8">
          <div className="absolute inset-0 rounded-full bg-white/20 animate-ping" />
          <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center border-2 border-white/40 shadow-2xl relative z-10">
            <AlertTriangle className="w-12 h-12 text-white stroke-[2.5]" />
          </div>
        </div>

        {/* Headlines */}
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-wider text-white uppercase leading-tight">
          ALERTA<br />ENVIADO
        </h1>

        <p className="mt-4 text-base font-medium text-white/90 max-w-xs">
          Seus contatos foram notificados com sua localização em tempo real.
        </p>

        {/* Live Audio / Beacon status indicator */}
        <div className="mt-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/20 text-xs font-semibold backdrop-blur-sm border border-white/20">
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          Transmitindo áudio e GPS
        </div>
      </div>

      {/* Bottom Emergency Call Button */}
      <div className="px-6 pb-8 pt-4 max-w-sm mx-auto w-full">
        <Button
          variant="emergency"
          size="lg"
          id="emergency-call-button"
          onClick={handleCall}
          leftIcon={<PhoneCall className="w-5 h-5 stroke-[2.5]" />}
        >
          Ligar para Emergência
        </Button>
      </div>
    </div>
  );
};

export default EmergencyScreen;
