import React, { useState } from 'react';
import { 
  Car, 
  Navigation, 
  MapPin, 
  Clock, 
  AlertTriangle, 
  ShieldCheck, 
  Share2, 
  CheckCircle,
  Sparkles,
  PhoneCall
} from 'lucide-react';
import { Header } from '../../components/layout/Header';
import { Button } from '../../components/ui/Button';
import { MapRadar } from '../../components/layout/MapRadar';
import { Card } from '../../components/ui/Card';

interface PassengerModeScreenProps {
  onBack?: () => void;
  onEmergency?: () => void;
}

export const PassengerModeScreen: React.FC<PassengerModeScreenProps> = ({
  onBack,
  onEmergency,
}) => {
  const [appType, setAppType] = useState<'Uber' | '99' | 'Táxi' | 'Carona'>('Uber');
  const [driverName, setDriverName] = useState('Carlos Eduardo');
  const [licensePlate, setLicensePlate] = useState('BRA-2E19');
  const [carModel, setCarModel] = useState('Onix Prata');
  const [selectedDestination, setSelectedDestination] = useState('Casa (Av. Paulista, 1000)');
  const [isTripActive, setIsTripActive] = useState(false);
  const [etaMinutes, setEtaMinutes] = useState(14);
  const [shareLinkActive, setShareLinkActive] = useState(true);

  const savedDestinations = [
    { label: 'Casa', address: 'Av. Paulista, 1000' },
    { label: 'Trabalho', address: 'Av. Brigadeiro Faria Lima, 2200' },
    { label: 'Faculdade', address: 'Rua Vergueiro, 1500' },
    { label: 'Hotel', address: 'Rua Bela Cintra, 450' },
  ];

  return (
    <div
      id="screen-passenger-mode"
      className="w-full h-full flex flex-col justify-between bg-[#0A1128] text-white select-none overflow-y-auto"
    >
      {/* Header */}
      <Header
        variant="dark"
        showBack={Boolean(onBack)}
        onBack={onBack}
        title="Modo Passageiro"
        id="passenger-header"
      />

      <div className="flex-1 px-5 py-2 space-y-4 max-w-md mx-auto w-full">
        {/* Status Card */}
        <div className="p-4 rounded-2xl bg-[#101C42] border border-blue-900/60 shadow-lg flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-500/20 text-sky-400 border border-blue-400/30">
              <Car className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div className="text-left">
              <div className="text-sm font-bold text-white">
                {isTripActive ? 'Viagem em Monitoramento' : 'Configurar Viagem'}
              </div>
              <div className="text-xs text-sky-300">
                {isTripActive ? `Previsão de chegada: ${etaMinutes} min` : 'Proteção para Uber / 99 / Táxi'}
              </div>
            </div>
          </div>

          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
            isTripActive 
              ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40 animate-pulse'
              : 'bg-slate-800 text-slate-400 border-slate-700'
          }`}>
            {isTripActive ? 'Ao Vivo' : 'Em Espera'}
          </span>
        </div>

        {/* Live Radar or Map */}
        <div className="relative">
          <MapRadar isDark height="h-44" id="passenger-map-radar" />
          {isTripActive && (
            <div className="absolute top-2 left-2 bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-blue-500/40 text-[11px] text-sky-300 font-semibold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Rota rastreada · Sem desvios
            </div>
          )}
        </div>

        {/* Form / Trip Info */}
        {!isTripActive ? (
          <div className="space-y-3 bg-[#101C42] p-4 rounded-2xl border border-blue-900/60">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 text-left">
              Detalhes da Corrida
            </div>

            {/* App selector */}
            <div className="flex gap-2">
              {(['Uber', '99', 'Táxi', 'Carona'] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setAppType(type)}
                  className={`flex-1 py-1.5 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
                    appType === type
                      ? 'bg-[#1565C0] text-white border-blue-400'
                      : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-2 text-left">
              <div>
                <label className="text-[11px] font-semibold text-slate-400 block mb-1">Motorista</label>
                <input
                  type="text"
                  value={driverName}
                  onChange={(e) => setDriverName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-400 block mb-1">Placa / Modelo</label>
                <input
                  type="text"
                  value={`${licensePlate} - ${carModel}`}
                  onChange={(e) => setLicensePlate(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Destination quick selector */}
            <div className="text-left space-y-1 pt-1">
              <label className="text-[11px] font-semibold text-slate-400 block">Destino Seguro</label>
              <select
                value={selectedDestination}
                onChange={(e) => setSelectedDestination(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-blue-500"
              >
                {savedDestinations.map((d, i) => (
                  <option key={i} value={`${d.label} (${d.address})`}>
                    {d.label} - {d.address}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ) : (
          <div className="space-y-3 bg-[#101C42] p-4 rounded-2xl border border-blue-900/60 text-left">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>{appType} · {licensePlate}</span>
              <span>{carModel}</span>
            </div>
            <div className="text-sm font-bold text-white">
              Motorista: {driverName}
            </div>
            <div className="text-xs text-sky-300 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-blue-400" />
              <span>Destino: {selectedDestination}</span>
            </div>

            <div className="pt-2 border-t border-slate-700/50 flex items-center justify-between text-xs text-slate-300">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <ShieldCheck className="w-4 h-4" /> Alerta de Desvio Ativo
              </span>
              <span>Gravador de Áudio Ligado</span>
            </div>
          </div>
        )}
      </div>

      {/* Footer Controls */}
      <div className="px-5 pb-6 pt-3 space-y-2 max-w-md mx-auto w-full">
        {!isTripActive ? (
          <Button
            variant="primary"
            size="lg"
            id="start-passenger-trip-button"
            onClick={() => setIsTripActive(true)}
            leftIcon={<Navigation className="w-5 h-5 stroke-[2.2]" />}
          >
            Iniciar Viagem Segura
          </Button>
        ) : (
          <div className="space-y-2">
            <Button
              variant="emergency"
              size="md"
              id="passenger-sos-button"
              onClick={onEmergency}
              leftIcon={<AlertTriangle className="w-5 h-5 stroke-[2.5]" />}
            >
              SOS Emergência no Carro
            </Button>

            <Button
              variant="outline"
              size="md"
              id="end-passenger-trip-button"
              onClick={() => setIsTripActive(false)}
              className="!bg-slate-800 !text-white !border-slate-700 hover:!bg-slate-700"
            >
              Cheguei com Segurança (Finalizar)
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PassengerModeScreen;
