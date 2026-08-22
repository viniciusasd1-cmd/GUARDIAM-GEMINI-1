import React from 'react';
import { Users, History, AlertTriangle, Car, MapPin, Sparkles, ShieldCheck } from 'lucide-react';
import { Header } from '../../../components/layout/Header';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { MapRadar } from '../../../components/layout/MapRadar';
import { AudioEvidenceRecorder } from '../../../components/ui/AudioEvidenceRecorder';
import { LiveShareCard } from '../../../components/ui/LiveShareCard';

interface HomeScreenProps {
  userName?: string;
  isProtectionActive: boolean;
  onToggleProtection: () => void;
  onOpenSos: () => void;
  onNavigateToContacts?: () => void;
  onNavigateToHistory?: () => void;
  onNavigateToPlaces?: () => void;
  onNavigateToPassengerMode?: () => void;
  onNavigateToQuiz?: () => void;
  onOpenMenu?: () => void;
  onOpenNotifications?: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  userName = 'Vinicius',
  isProtectionActive,
  onToggleProtection,
  onOpenSos,
  onNavigateToContacts,
  onNavigateToHistory,
  onNavigateToPlaces,
  onNavigateToPassengerMode,
  onNavigateToQuiz,
  onOpenMenu,
  onOpenNotifications,
}) => {
  // STATE B: Tela 6 — Proteção Ativa (Modo Escuro)
  if (isProtectionActive) {
    return (
      <div
        id="screen-home-active"
        className="w-full h-full flex flex-col justify-between bg-[#0A1128] text-white select-none overflow-y-auto"
      >
        {/* Dark Mode Header */}
        <Header
          variant="dark"
          showNotification
          hasNotificationBadge
          onNotification={onOpenNotifications}
          showMenu
          onMenu={onOpenMenu}
          id="home-header-active"
        />

        {/* Status Header */}
        <div className="px-6 pt-2 pb-2 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Proteção Ativa
          </h1>
          <p className="text-xs font-medium text-sky-300 mt-1">
            Status e monitoramento em tempo real
          </p>

          {/* SOS Quick Button */}
          <div className="mt-3 max-w-xs mx-auto">
            <Button
              variant="sos"
              size="md"
              id="home-sos-active-button"
              onClick={onOpenSos}
              className="!border-red-500/60 !bg-red-950/40 !text-red-400 hover:!bg-red-900/60"
              leftIcon={<AlertTriangle className="w-4 h-4 stroke-[2.5]" />}
            >
              SOS
            </Button>
          </div>
        </div>

        {/* Live Audio Evidence Recorder + Live Tracking URL */}
        <div className="px-5 space-y-2.5 max-w-md mx-auto w-full">
          <AudioEvidenceRecorder isDark isRecording dossierId="EV-2026-9841" />
          <LiveShareCard isDark trackingUrl="https://guardiam.app/track/tk_78x9a2" accessCount={2} />
        </div>

        {/* Radar Map */}
        <div className="px-5 py-2 max-w-md mx-auto w-full">
          <MapRadar isDark height="h-44 sm:h-48" id="home-map-active" />
        </div>

        {/* Bottom Deactivate / Safe Mode Action */}
        <div className="px-6 pb-6 pt-2 max-w-md mx-auto w-full">
          <Button
            variant="primary"
            size="lg"
            id="home-safe-mode-button"
            onClick={onToggleProtection}
          >
            Modo Seguro (Desativar)
          </Button>
        </div>
      </div>
    );
  }

  // STATE A: Tela 3 — Proteção Desativada (Modo Claro)
  return (
    <div
      id="screen-home-inactive"
      className="w-full h-full flex flex-col justify-between bg-[#F8FAFC] text-slate-900 overflow-y-auto"
    >
      {/* Top Header */}
      <Header
        variant="light"
        showMenu
        onMenu={onOpenMenu}
        showNotification
        hasNotificationBadge
        onNotification={onOpenNotifications}
        id="home-header-inactive"
      />

      <div className="flex-1 px-5 py-2 space-y-3.5 max-w-md mx-auto w-full">
        {/* User Greeting & Status Badge */}
        <div className="flex items-center justify-between">
          <div className="text-left space-y-1">
            <div className="text-xl font-bold text-slate-900 tracking-tight">
              Olá, <span className="font-extrabold">{userName}</span>
            </div>
            <div>
              <Badge variant="inactive" id="home-status-badge">
                Proteção desativada
              </Badge>
            </div>
          </div>

          {/* Quick Quiz / Checkup button */}
          {onNavigateToQuiz && (
            <button
              type="button"
              onClick={onNavigateToQuiz}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 hover:bg-blue-100 text-[#1565C0] text-xs font-semibold border border-blue-200 transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Checkup</span>
            </button>
          )}
        </div>

        {/* Main Actions: Ativar Proteção + SOS */}
        <div className="space-y-2 pt-1">
          <Button
            variant="primary"
            size="lg"
            id="home-activate-protection-button"
            onClick={onToggleProtection}
          >
            Ativar Proteção
          </Button>

          <Button
            variant="sos"
            size="md"
            id="home-sos-button"
            onClick={onOpenSos}
            leftIcon={<AlertTriangle className="w-4 h-4 stroke-[2.5]" />}
          >
            SOS
          </Button>
        </div>

        {/* 4-Item Grid: Contatos, Histórico, Modo Passageiro, Locais Seguros */}
        <div className="grid grid-cols-2 gap-2.5 pt-1">
          <Card
            variant="interactive"
            id="home-card-passenger"
            onClick={onNavigateToPassengerMode}
            className="flex items-center gap-2.5 p-3"
          >
            <div className="p-2 rounded-xl bg-blue-50 text-[#1565C0]">
              <Car className="w-4 h-4 stroke-[2.2]" />
            </div>
            <div className="text-left">
              <span className="text-xs font-bold text-slate-800 block">Modo Passageiro</span>
              <span className="text-[10px] text-slate-400">Uber / Táxi</span>
            </div>
          </Card>

          <Card
            variant="interactive"
            id="home-card-places"
            onClick={onNavigateToPlaces}
            className="flex items-center gap-2.5 p-3"
          >
            <div className="p-2 rounded-xl bg-blue-50 text-[#1565C0]">
              <MapPin className="w-4 h-4 stroke-[2.2]" />
            </div>
            <div className="text-left">
              <span className="text-xs font-bold text-slate-800 block">Locais Seguros</span>
              <span className="text-[10px] text-slate-400">Delegacias 24h</span>
            </div>
          </Card>

          <Card
            variant="interactive"
            id="home-card-contacts"
            onClick={onNavigateToContacts}
            className="flex items-center gap-2.5 p-3"
          >
            <div className="p-2 rounded-xl bg-blue-50 text-[#1565C0]">
              <Users className="w-4 h-4 stroke-[2.2]" />
            </div>
            <div className="text-left">
              <span className="text-xs font-bold text-slate-800 block">Contatos</span>
              <span className="text-[10px] text-slate-400">3 guardiões</span>
            </div>
          </Card>

          <Card
            variant="interactive"
            id="home-card-history"
            onClick={onNavigateToHistory}
            className="flex items-center gap-2.5 p-3"
          >
            <div className="p-2 rounded-xl bg-blue-50 text-[#1565C0]">
              <History className="w-4 h-4 stroke-[2.2]" />
            </div>
            <div className="text-left">
              <span className="text-xs font-bold text-slate-800 block">Dossiês / Logs</span>
              <span className="text-[10px] text-slate-400">Evidências</span>
            </div>
          </Card>
        </div>

        {/* Live Vector Mini Map */}
        <div className="pt-1 pb-2">
          <MapRadar isDark={false} height="h-36" id="home-map-inactive" />
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
