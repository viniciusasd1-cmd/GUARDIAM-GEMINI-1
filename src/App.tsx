import React, { useState } from 'react';
import { 
  Shield, 
  Smartphone, 
  Layers, 
  Palette, 
  Eye, 
  Sparkles, 
  CheckCircle,
  Bell,
  Car,
  MapPin,
  FileText,
  Sun,
  Moon,
  Monitor,
  RotateCcw
} from 'lucide-react';
import { TabBar, TabKey } from '../components/layout/TabBar';
import { LoginScreen } from '../app/(pre-auth)/login';
import { SignUpScreen } from '../app/(pre-auth)/signup';
import { PaywallScreen } from '../app/(pre-auth)/paywall';
import { HomeScreen } from '../app/(app)/(tabs)/index';
import { ContactsScreen } from '../app/(app)/(tabs)/contacts/index';
import { ContactDetailScreen } from '../app/(app)/(tabs)/contacts/[id]';
import { HistoryScreen } from '../app/(app)/(tabs)/history';
import { SettingsScreen } from '../app/(app)/(tabs)/settings';
import { EmergencyScreen } from '../app/(app)/emergency';
import { PlacesScreen } from '../app/(app)/(tabs)/places';
import { PassengerModeScreen } from '../app/(app)/passenger-mode';
import { EvidenceDossierScreen } from '../app/(app)/evidence-dossier';
import { SafetyQuizScreen } from '../app/(app)/safety-quiz';
import { Contact } from '../components/ui/ContactItem';
import { ThemeProvider, useTheme } from '../theme/themeContext';
import { ThemeCustomizerModal } from '../components/theme/ThemeCustomizerModal';
import { THEME_PRESETS } from '../theme/themeEngine';

type ScreenKey = 
  | 'login'               // Tela 1
  | 'signup'              // Tela 2
  | 'home-inactive'       // Tela 3
  | 'contacts'            // Tela 4
  | 'contact-detail'      // Tela 5
  | 'home-active'         // Tela 6
  | 'emergency'           // Tela 7
  | 'history'             // Tela 8
  | 'settings'            // Tela 9
  | 'paywall'             // Tela 10
  | 'places'              // Tela 11 (places, city_facts, hotel_reservations)
  | 'passenger-mode'      // Tela 12 (passenger_mode_sessions, safe_trips)
  | 'evidence-dossier'    // Tela 13 (evidence_reports, recording_sessions)
  | 'safety-quiz';        // Tela 14 (quiz_questions, quiz_answers)

const initialContacts: Contact[] = [
  { id: '1', name: 'Maria Silva', phone: '(11) 98339-5678', status: 'active', allowEvidenceAccess: true, notifyOnActivate: true, notifyOnSos: true },
  { id: '2', name: 'Carlos Eduardo (Irmão)', phone: '(11) 97358-5678', status: 'active', allowEvidenceAccess: true, notifyOnActivate: true, notifyOnSos: true },
  { id: '3', name: 'Camila Santos', phone: '(11) 99358-1234', status: 'pending', allowEvidenceAccess: false, notifyOnActivate: false, notifyOnSos: true },
  { id: '4', name: 'Lucas Ferreira', phone: '(11) 99123-8899', status: 'active', allowEvidenceAccess: true, notifyOnActivate: true, notifyOnSos: true },
];

function GuardiamAppInner() {
  const {
    themeState,
    tokens,
    effectiveMode,
    openCustomModal,
    isCustomModalOpen,
    closeCustomModal,
    setMode,
    resetToDefault,
  } = useTheme();

  // Navigation State
  const [currentScreen, setCurrentScreen] = useState<ScreenKey>('home-inactive');
  const [currentTab, setCurrentTab] = useState<TabKey>('home');
  const [isProtectionActive, setIsProtectionActive] = useState(false);
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);
  const [selectedContact, setSelectedContact] = useState<Contact>(initialContacts[0]);
  const [showNotificationToast, setShowNotificationToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [viewMode, setViewMode] = useState<'device' | 'all-screens' | 'tokens'>('device');

  // Trigger brief system feedback
  const showFeedback = (msg: string) => {
    setToastMessage(msg);
    setShowNotificationToast(true);
    setTimeout(() => setShowNotificationToast(false), 3000);
  };

  const handleTabChange = (tab: TabKey) => {
    setCurrentTab(tab);
    if (tab === 'home') {
      setCurrentScreen(isProtectionActive ? 'home-active' : 'home-inactive');
    } else if (tab === 'contacts') {
      setCurrentScreen('contacts');
    } else if (tab === 'places') {
      setCurrentScreen('places');
    } else if (tab === 'history') {
      setCurrentScreen('history');
    } else if (tab === 'settings') {
      setCurrentScreen('settings');
    }
  };

  const handleToggleProtection = () => {
    const nextState = !isProtectionActive;
    setIsProtectionActive(nextState);
    if (nextState) {
      setCurrentScreen('home-active');
      showFeedback('Proteção ativada! Custódia de áudio e GPS iniciados.');
    } else {
      setCurrentScreen('home-inactive');
      showFeedback('Modo Seguro ativado. Proteção finalizada.');
    }
  };

  const handleEditContact = (contact: Contact) => {
    setSelectedContact(contact);
    setCurrentScreen('contact-detail');
  };

  const handleAddContact = () => {
    const newContact: Contact = {
      id: String(Date.now()),
      name: 'Novo Guardião',
      phone: '(11) 99999-9999',
      status: 'pending',
      allowEvidenceAccess: true,
      notifyOnActivate: true,
      notifyOnSos: true,
    };
    setSelectedContact(newContact);
    setCurrentScreen('contact-detail');
  };

  const handleSaveContact = (updated: Contact) => {
    setContacts((prev) => {
      const exists = prev.some((c) => c.id === updated.id);
      if (exists) {
        return prev.map((c) => (c.id === updated.id ? updated : c));
      }
      return [...prev, updated];
    });
    showFeedback(`Contato "${updated.name}" salvo com sucesso.`);
    setCurrentScreen('contacts');
  };

  const handleRemoveContact = (contactToRemove: Contact) => {
    setContacts((prev) => prev.filter((c) => c.id !== contactToRemove.id));
    showFeedback(`Contato "${contactToRemove.name}" removido.`);
  };

  // Determine if active screen has the bottom TabBar
  const isTabScreen = ['home-inactive', 'home-active', 'contacts', 'places', 'history', 'settings'].includes(currentScreen);

  // Render specific screen component
  const renderScreenContent = (screen: ScreenKey) => {
    switch (screen) {
      case 'login':
        return (
          <LoginScreen
            onNavigateToSignUp={() => setCurrentScreen('signup')}
            onNavigateToHome={() => {
              setCurrentScreen('home-inactive');
              setCurrentTab('home');
              showFeedback('Bem-vindo de volta ao Guardiam!');
            }}
            onForgotPassword={() => showFeedback('Instruções enviadas para seu e-mail.')}
          />
        );

      case 'signup':
        return (
          <SignUpScreen
            onNavigateToLogin={() => setCurrentScreen('login')}
            onNavigateToPaywall={() => setCurrentScreen('safety-quiz')}
          />
        );

      case 'safety-quiz':
        return (
          <SafetyQuizScreen
            onBack={() => setCurrentScreen('home-inactive')}
            onComplete={(score) => {
              showFeedback(`Diagnóstico finalizado! Score de proteção: ${score}%`);
              setCurrentScreen('paywall');
            }}
          />
        );

      case 'paywall':
        return (
          <PaywallScreen
            onBack={() => setCurrentScreen('home-inactive')}
            onSubscribe={() => {
              showFeedback('Plano Guardiam Pro ativado com sucesso!');
              setCurrentScreen('home-inactive');
            }}
          />
        );

      case 'home-inactive':
        return (
          <HomeScreen
            isProtectionActive={false}
            onToggleProtection={handleToggleProtection}
            onOpenSos={() => setCurrentScreen('emergency')}
            onNavigateToContacts={() => {
              setCurrentTab('contacts');
              setCurrentScreen('contacts');
            }}
            onNavigateToHistory={() => {
              setCurrentTab('history');
              setCurrentScreen('history');
            }}
            onNavigateToPlaces={() => {
              setCurrentTab('places');
              setCurrentScreen('places');
            }}
            onNavigateToPassengerMode={() => setCurrentScreen('passenger-mode')}
            onNavigateToQuiz={() => setCurrentScreen('safety-quiz')}
            onOpenMenu={() => {
              setCurrentTab('settings');
              setCurrentScreen('settings');
            }}
            onOpenNotifications={() => showFeedback('Sistema 100% operacional. Sem pendências.')}
          />
        );

      case 'home-active':
        return (
          <HomeScreen
            isProtectionActive={true}
            onToggleProtection={handleToggleProtection}
            onOpenSos={() => setCurrentScreen('emergency')}
            onNavigateToPlaces={() => {
              setCurrentTab('places');
              setCurrentScreen('places');
            }}
            onNavigateToPassengerMode={() => setCurrentScreen('passenger-mode')}
            onOpenMenu={() => {
              setCurrentTab('settings');
              setCurrentScreen('settings');
            }}
            onOpenNotifications={() => showFeedback('Status: Transmissão de GPS e áudio criptografados.')}
          />
        );

      case 'passenger-mode':
        return (
          <PassengerModeScreen
            onBack={() => setCurrentScreen(isProtectionActive ? 'home-active' : 'home-inactive')}
            onEmergency={() => setCurrentScreen('emergency')}
          />
        );

      case 'places':
        return (
          <PlacesScreen
            onBack={() => {
              setCurrentTab('home');
              setCurrentScreen(isProtectionActive ? 'home-active' : 'home-inactive');
            }}
          />
        );

      case 'evidence-dossier':
        return (
          <EvidenceDossierScreen
            onBack={() => setCurrentScreen('settings')}
          />
        );

      case 'contacts':
        return (
          <ContactsScreen
            contacts={contacts}
            onBack={() => {
              setCurrentTab('home');
              setCurrentScreen(isProtectionActive ? 'home-active' : 'home-inactive');
            }}
            onEditContact={handleEditContact}
            onRemoveContact={handleRemoveContact}
            onAddContact={handleAddContact}
          />
        );

      case 'contact-detail':
        return (
          <ContactDetailScreen
            contact={selectedContact}
            onBack={() => setCurrentScreen('contacts')}
            onSave={handleSaveContact}
          />
        );

      case 'history':
        return (
          <HistoryScreen
            onBack={() => {
              setCurrentTab('home');
              setCurrentScreen(isProtectionActive ? 'home-active' : 'home-inactive');
            }}
          />
        );

      case 'settings':
        return (
          <SettingsScreen
            onNavigateToPaywall={() => setCurrentScreen('paywall')}
            onNavigateToEvidence={() => setCurrentScreen('evidence-dossier')}
            onNavigateToQuiz={() => setCurrentScreen('safety-quiz')}
            onLogout={() => {
              showFeedback('Desconectado com sucesso.');
              setCurrentScreen('login');
            }}
            onBack={() => {
              setCurrentTab('home');
              setCurrentScreen(isProtectionActive ? 'home-active' : 'home-inactive');
            }}
          />
        );

      case 'emergency':
        return (
          <EmergencyScreen
            onClose={() => setCurrentScreen(isProtectionActive ? 'home-active' : 'home-inactive')}
            onCallEmergency={() => showFeedback('Discando para o serviço de emergência local (190)...')}
          />
        );

      default:
        return null;
    }
  };

  const allScreensList: { key: ScreenKey; title: string; subtitle: string; tag: string }[] = [
    { key: 'login', title: '1. Acesse sua conta', subtitle: 'Login com email, senha e shield logo', tag: 'Pre-auth' },
    { key: 'signup', title: '2. Crie sua proteção', subtitle: 'Cadastro com nome, email e senha', tag: 'Pre-auth' },
    { key: 'safety-quiz', title: '3. Diagnóstico de Risco', subtitle: 'Quiz de 3 perguntas para score de segurança', tag: 'Onboarding' },
    { key: 'home-inactive', title: '4. Home (Inativa)', subtitle: 'Dashboard com 4 atalhos, mini mapa e checkup', tag: 'App / Tab' },
    { key: 'passenger-mode', title: '5. Modo Passageiro', subtitle: 'Viagem Segura para Uber / 99 / Táxi com placa', tag: 'Mobilidade' },
    { key: 'places', title: '6. Guia Urbano & Locais', subtitle: 'Delegacias 24h, Hospitais e Pontos Seguros', tag: 'App / Tab' },
    { key: 'contacts', title: '7. Contatos de Confiança', subtitle: 'Lista com status de convite e permissões', tag: 'App / Tab' },
    { key: 'contact-detail', title: '8. Detalhes do Guardião', subtitle: 'Foto, telefone e acesso a evidências', tag: 'App / Modal' },
    { key: 'home-active', title: '9. Proteção Ativa', subtitle: 'Modo Escuro com gravador e link ao vivo', tag: 'App / Active' },
    { key: 'emergency', title: '10. Alerta SOS Enviado', subtitle: 'Alerta com Dossiê Forense #EV e logs de acesso', tag: 'Emergência' },
    { key: 'evidence-dossier', title: '11. Dossiês Forenses', subtitle: 'Gravações criptografadas e cadeia de custódia', tag: 'Evidências' },
    { key: 'history', title: '12. Histórico de Segurança', subtitle: 'Logs de SOS e períodos de proteção', tag: 'App / Tab' },
    { key: 'settings', title: '13. Configurações & LGPD', subtitle: 'Permissões do OS, biometria e versão termos', tag: 'App / Tab' },
    { key: 'paywall', title: '14. Plano Guardiam Pro', subtitle: 'Assinatura com benefícios e valor', tag: 'Paywall' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Application Control Toolbar */}
      <header className="bg-slate-900/95 backdrop-blur-md border-b border-slate-800 px-4 py-3 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-extrabold shadow-md transition-colors"
              style={{ backgroundColor: tokens.primary }}
            >
              G
            </div>
            <div className="text-left">
              <span className="font-bold text-white text-base tracking-tight flex items-center gap-2">
                Guardiam Security & Safety App
                <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Custom Theme System
                </span>
              </span>
              <p className="text-xs text-slate-400">
                14 Telas Interativas · Paleta Adaptativa WCAG · Color Picker em Tempo Real
              </p>
            </div>
          </div>

          {/* Quick Theme Trigger & View Mode Switcher */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Quick Theme Button with active color indicator */}
            <button
              type="button"
              id="header-theme-picker-button"
              onClick={openCustomModal}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-700 bg-slate-800/90 hover:bg-slate-700 text-xs font-semibold text-white transition-all shadow-sm cursor-pointer hover:scale-105 active:scale-95"
            >
              <span
                className="w-3.5 h-3.5 rounded-full ring-2 ring-white/30 shrink-0"
                style={{ backgroundColor: tokens.primary }}
              />
              <span className="flex items-center gap-1">
                <Palette className="w-3.5 h-3.5 text-amber-400" />
                <span>
                  {themeState.mode === 'custom'
                    ? 'Personalizado 🎨'
                    : themeState.mode === 'dark'
                    ? 'Escuro 🌙'
                    : themeState.mode === 'light'
                    ? 'Claro ☀️'
                    : 'Sistema 💻'}
                </span>
              </span>
            </button>

            {/* Fast Mode Toggle Pills */}
            <div className="flex items-center gap-0.5 bg-slate-800/80 p-0.5 rounded-xl border border-slate-700">
              <button
                type="button"
                onClick={() => setMode('light')}
                title="Modo Claro"
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  themeState.mode === 'light'
                    ? 'bg-amber-500/20 text-amber-300 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Sun className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setMode('dark')}
                title="Modo Escuro"
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  themeState.mode === 'dark'
                    ? 'bg-sky-500/20 text-sky-300 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Moon className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setMode('system')}
                title="Modo Sistema"
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  themeState.mode === 'system'
                    ? 'bg-blue-500/20 text-blue-300 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* View Mode Switcher */}
            <div className="flex items-center gap-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700">
              <button
                type="button"
                id="view-mode-device"
                onClick={() => setViewMode('device')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  viewMode === 'device'
                    ? 'text-white shadow-sm font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
                style={viewMode === 'device' ? { backgroundColor: tokens.primary } : {}}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Simulador</span>
              </button>

              <button
                type="button"
                id="view-mode-all-screens"
                onClick={() => setViewMode('all-screens')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  viewMode === 'all-screens'
                    ? 'text-white shadow-sm font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
                style={viewMode === 'all-screens' ? { backgroundColor: tokens.primary } : {}}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Todas as 14 Telas</span>
              </button>

              <button
                type="button"
                id="view-mode-tokens"
                onClick={() => setViewMode('tokens')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  viewMode === 'tokens'
                    ? 'text-white shadow-sm font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
                style={viewMode === 'tokens' ? { backgroundColor: tokens.primary } : {}}
              >
                <Palette className="w-3.5 h-3.5" />
                <span>Design Tokens</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Screen Selection Fast Pills Bar (in Device Mode) */}
      {viewMode === 'device' && (
        <div className="bg-slate-900/60 border-b border-slate-800/70 px-4 py-2 overflow-x-auto scrollbar-none">
          <div className="max-w-7xl mx-auto flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-400 shrink-0 mr-1 flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" /> Telas:
            </span>
            {allScreensList.map((screen) => {
              const isActive = currentScreen === screen.key;
              return (
                <button
                  key={screen.key}
                  type="button"
                  id={`select-screen-${screen.key}`}
                  onClick={() => {
                    setCurrentScreen(screen.key);
                    if (['home-inactive', 'home-active'].includes(screen.key)) {
                      setCurrentTab('home');
                      setIsProtectionActive(screen.key === 'home-active');
                    } else if (screen.key === 'contacts') {
                      setCurrentTab('contacts');
                    } else if (screen.key === 'places') {
                      setCurrentTab('places');
                    } else if (screen.key === 'history') {
                      setCurrentTab('history');
                    } else if (screen.key === 'settings') {
                      setCurrentTab('settings');
                    }
                  }}
                  className={`px-3 py-1 rounded-full text-xs font-medium shrink-0 transition-all cursor-pointer ${
                    isActive
                      ? 'text-white font-bold ring-2 ring-white/30 shadow-sm'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/60'
                  }`}
                  style={
                    isActive
                      ? {
                          backgroundColor: tokens.primary,
                          color: tokens.primaryContrast,
                        }
                      : {}
                  }
                >
                  {screen.title}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Toast Feedback Notification */}
      {showNotificationToast && (
        <div className="fixed top-18 right-6 z-50 flex items-center gap-2 bg-slate-900 border border-blue-500/50 text-white px-4 py-2.5 rounded-xl shadow-2xl animate-fade-in text-sm font-medium">
          <Bell className="w-4 h-4 text-sky-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Viewport Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 flex flex-col items-center justify-center">
        {/* VIEW 1: Interactive Device Simulator */}
        {viewMode === 'device' && (
          <div className="w-full flex flex-col lg:flex-row items-center lg:items-start justify-center gap-8 py-4">
            {/* Mobile Device Frame */}
            <div className="relative w-[360px] sm:w-[390px] h-[780px] bg-black rounded-[48px] p-3 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] border-4 border-slate-700/60 flex flex-col overflow-hidden shrink-0">
              {/* Dynamic Island / Speaker Notch */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-40 flex items-center justify-end px-3">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-900 ring-1 ring-slate-800" />
              </div>

              {/* Status Bar */}
              <div
                className={`w-full h-8 flex items-center justify-between px-6 text-[11px] font-bold z-30 select-none transition-colors ${
                  effectiveMode === 'dark' || currentScreen === 'home-active' || currentScreen === 'emergency'
                    ? 'text-white bg-transparent'
                    : 'text-slate-800 bg-transparent'
                }`}
              >
                <span>9:41</span>
                <div className="flex items-center gap-1.5">
                  <div className="w-3.5 h-2 border border-current rounded-xs" />
                </div>
              </div>

              {/* Active Screen View with Theme Variables Applied */}
              <div
                className="flex-1 overflow-hidden flex flex-col relative transition-colors duration-200"
                style={{
                  backgroundColor:
                    currentScreen === 'emergency'
                      ? '#DC2626'
                      : currentScreen === 'home-active'
                      ? '#0A1128'
                      : tokens.background,
                }}
              >
                <div className="flex-1 overflow-hidden flex flex-col">
                  {renderScreenContent(currentScreen)}
                </div>

                {/* Bottom Navigation TabBar */}
                {isTabScreen && (
                  <TabBar
                    currentTab={currentTab}
                    onSelectTab={handleTabChange}
                    isDarkMode={currentScreen === 'home-active'}
                  />
                )}
              </div>

              {/* Home Indicator Bar */}
              <div
                className="w-full py-2 flex items-center justify-center z-30 select-none"
                style={{
                  backgroundColor:
                    currentScreen === 'emergency'
                      ? '#DC2626'
                      : currentScreen === 'home-active'
                      ? '#0A1128'
                      : tokens.background,
                }}
              >
                <div
                  className={`w-32 h-1 rounded-full ${
                    effectiveMode === 'dark' || currentScreen === 'home-active' || currentScreen === 'emergency'
                      ? 'bg-white/40'
                      : 'bg-slate-400/40'
                  }`}
                />
              </div>
            </div>

            {/* Inspector Panel */}
            <div className="w-full max-w-md space-y-4 text-left">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                    Inspeção da Tela Ativa
                  </h3>
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: tokens.primaryLight,
                      color: tokens.primary,
                    }}
                  >
                    Tema Ativo
                  </span>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-white tracking-tight">
                    {allScreensList.find((s) => s.key === currentScreen)?.title}
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    {allScreensList.find((s) => s.key === currentScreen)?.subtitle}
                  </p>
                </div>

                {/* Theme Quick Switcher Inside Panel */}
                <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-300 flex items-center gap-1.5">
                      <Palette className="w-3.5 h-3.5 text-amber-400" />
                      Personalização Rápida
                    </span>
                    <button
                      type="button"
                      onClick={openCustomModal}
                      className="text-[11px] font-bold underline hover:opacity-80"
                      style={{ color: tokens.primary }}
                    >
                      Abrir Seletor 2D
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    {THEME_PRESETS.slice(0, 5).map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => {
                          useTheme; // trigger
                          // Apply directly
                        }}
                        className="w-7 h-7 rounded-full transition-transform hover:scale-110 flex items-center justify-center text-[10px] border border-white/20 shadow-sm"
                        style={{ backgroundColor: p.hex }}
                        title={p.name}
                      >
                        {tokens.primary.toUpperCase() === p.hex.toUpperCase() && (
                          <CheckCircle className="w-3.5 h-3.5 text-white" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800/80 text-xs text-slate-400 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Brand Color Primária:</span>
                    <span className="font-mono font-bold text-white flex items-center gap-1.5">
                      <span
                        className="w-2.5 h-2.5 rounded-full inline-block"
                        style={{ backgroundColor: tokens.primary }}
                      />
                      {tokens.primary}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Superfície:</span>
                    <span className="font-mono text-slate-300">
                      {effectiveMode === 'dark' ? 'Dark (#0A1128)' : 'Light (#F8FAFC)'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Persistência:</span>
                    <span className="text-emerald-400 font-semibold">localStorage (Sincronizado)</span>
                  </div>
                </div>
              </div>

              {/* Fast Jump Shortcuts */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                  Atalhos de Simulação
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={handleToggleProtection}
                    className={`p-2.5 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                      isProtectionActive
                        ? 'bg-blue-600/20 text-sky-400 border border-blue-500/40'
                        : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                    }`}
                  >
                    <Shield className="w-3.5 h-3.5" />
                    <span>{isProtectionActive ? 'Desativar Proteção' : 'Ativar Proteção'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCurrentScreen('emergency')}
                    className="p-2.5 rounded-xl bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-500/40 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Simular SOS</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCurrentScreen('passenger-mode')}
                    className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white border border-slate-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Car className="w-3.5 h-3.5 text-sky-400" />
                    <span>Modo Passageiro</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setCurrentTab('places');
                      setCurrentScreen('places');
                    }}
                    className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white border border-slate-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <MapPin className="w-3.5 h-3.5 text-sky-400" />
                    <span>Locais Seguros</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCurrentScreen('evidence-dossier')}
                    className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white border border-slate-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5 text-sky-400" />
                    <span>Dossiês Forenses</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCurrentScreen('safety-quiz')}
                    className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white border border-slate-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Diagnóstico (Quiz)</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: All 14 Screens Side-by-Side Gallery */}
        {viewMode === 'all-screens' && (
          <div className="w-full space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="text-left">
                <h2 className="text-xl font-bold text-white">Todas as 14 Telas com Tema Aplicado em Tempo Real</h2>
                <p className="text-xs text-slate-400">Visualização simultânea de todas as telas construídas fielmente à referência e às 35 tabelas</p>
              </div>
              <button
                type="button"
                onClick={openCustomModal}
                className="px-4 py-2 rounded-xl text-xs font-bold shadow-md flex items-center gap-2 hover:opacity-95 cursor-pointer"
                style={{
                  backgroundColor: tokens.primary,
                  color: tokens.primaryContrast,
                }}
              >
                <Palette className="w-3.5 h-3.5" />
                <span>Mudar Cor de Marca</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {allScreensList.map((screen) => (
                <div
                  key={screen.key}
                  className="bg-slate-900 border border-slate-800 rounded-3xl p-3 flex flex-col shadow-xl"
                >
                  <div className="px-2 py-1.5 mb-2 flex items-center justify-between">
                    <span className="text-xs font-bold text-white truncate">{screen.title}</span>
                    <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-slate-800 text-sky-400">
                      {screen.tag}
                    </span>
                  </div>

                  {/* Phone Mock Frame */}
                  <div
                    className="w-full h-[520px] rounded-2xl overflow-hidden border border-slate-700 flex flex-col shadow-inner relative transition-colors duration-200"
                    style={{
                      backgroundColor:
                        screen.key === 'emergency'
                          ? '#DC2626'
                          : screen.key === 'home-active'
                          ? '#0A1128'
                          : tokens.background,
                    }}
                  >
                    <div className="flex-1 overflow-hidden flex flex-col">
                      {renderScreenContent(screen.key)}
                    </div>
                    {['home-inactive', 'home-active', 'contacts', 'places', 'history', 'settings'].includes(screen.key) && (
                      <TabBar
                        currentTab={
                          screen.key === 'contacts' ? 'contacts' :
                          screen.key === 'places' ? 'places' :
                          screen.key === 'history' ? 'history' :
                          screen.key === 'settings' ? 'settings' : 'home'
                        }
                        onSelectTab={() => {}}
                        isDarkMode={screen.key === 'home-active'}
                      />
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setCurrentScreen(screen.key);
                      setViewMode('device');
                    }}
                    className="mt-3 w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Interagir nesta tela
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 3: Design Tokens & System Overview */}
        {viewMode === 'tokens' && (
          <div className="w-full max-w-4xl space-y-6 text-left">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white">Design Tokens Dinâmicos & Acessibilidade WCAG</h2>
                  <p className="text-xs text-slate-400 mt-1">Calculados em tempo real pela fórmula matemática de luminância e contraste</p>
                </div>
                <button
                  type="button"
                  onClick={openCustomModal}
                  className="px-4 py-2 rounded-xl text-xs font-bold shadow-md flex items-center gap-2 cursor-pointer"
                  style={{
                    backgroundColor: tokens.primary,
                    color: tokens.primaryContrast,
                  }}
                >
                  <Palette className="w-3.5 h-3.5" />
                  <span>Personalizar Tema</span>
                </button>
              </div>

              {/* Active Computed Tokens Table */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    primary
                  </span>
                  <div className="flex items-center gap-2">
                    <span
                      className="w-5 h-5 rounded-lg border border-white/20 shadow-sm shrink-0"
                      style={{ backgroundColor: tokens.primary }}
                    />
                    <span className="font-mono font-bold text-white">{tokens.primary}</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    primaryHover
                  </span>
                  <div className="flex items-center gap-2">
                    <span
                      className="w-5 h-5 rounded-lg border border-white/20 shadow-sm shrink-0"
                      style={{ backgroundColor: tokens.primaryHover }}
                    />
                    <span className="font-mono text-slate-300">{tokens.primaryHover}</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    primaryLight
                  </span>
                  <div className="flex items-center gap-2">
                    <span
                      className="w-5 h-5 rounded-lg border border-white/20 shadow-sm shrink-0"
                      style={{ backgroundColor: tokens.primaryLight }}
                    />
                    <span className="font-mono text-slate-300">{tokens.primaryLight}</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    primaryContrast
                  </span>
                  <div className="flex items-center gap-2">
                    <span
                      className="w-5 h-5 rounded-lg border border-white/20 shadow-sm shrink-0"
                      style={{ backgroundColor: tokens.primaryContrast }}
                    />
                    <span className="font-mono font-bold text-emerald-400">
                      {tokens.primaryContrast} (WCAG Safe)
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    background
                  </span>
                  <div className="flex items-center gap-2">
                    <span
                      className="w-5 h-5 rounded-lg border border-white/20 shadow-sm shrink-0"
                      style={{ backgroundColor: tokens.background }}
                    />
                    <span className="font-mono text-slate-300">{tokens.background}</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    surface
                  </span>
                  <div className="flex items-center gap-2">
                    <span
                      className="w-5 h-5 rounded-lg border border-white/20 shadow-sm shrink-0"
                      style={{ backgroundColor: tokens.surface }}
                    />
                    <span className="font-mono text-slate-300">{tokens.surface}</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    surfaceSecondary
                  </span>
                  <div className="flex items-center gap-2">
                    <span
                      className="w-5 h-5 rounded-lg border border-white/20 shadow-sm shrink-0"
                      style={{ backgroundColor: tokens.surfaceSecondary }}
                    />
                    <span className="font-mono text-slate-300">{tokens.surfaceSecondary}</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    accent (Glow)
                  </span>
                  <div className="flex items-center gap-2">
                    <span
                      className="w-5 h-5 rounded-lg border border-white/20 shadow-sm shrink-0"
                      style={{ backgroundColor: tokens.accent }}
                    />
                    <span className="font-mono text-slate-300">{tokens.accent}</span>
                  </div>
                </div>
              </div>

              {/* Presets Gallery */}
              <div className="space-y-3 pt-2 border-t border-slate-800">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Presets Disponíveis no Sistema
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {THEME_PRESETS.map((p) => (
                    <div
                      key={p.id}
                      className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60 space-y-2"
                    >
                      <div
                        className="w-full h-10 rounded-lg shadow-sm flex items-center justify-center text-white text-sm"
                        style={{ backgroundColor: p.hex }}
                      >
                        {p.emoji}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">{p.name}</div>
                        <div className="text-[11px] text-slate-400 font-mono">{p.hex}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Modern Advanced Theme Customizer Modal */}
      <ThemeCustomizerModal
        isOpen={isCustomModalOpen}
        onClose={closeCustomModal}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <GuardiamAppInner />
    </ThemeProvider>
  );
}
