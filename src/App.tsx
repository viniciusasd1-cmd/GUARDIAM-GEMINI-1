import React, { useState } from 'react';
import { 
  Shield, 
  Smartphone, 
  Layers, 
  Palette, 
  Eye, 
  Sparkles,
  CheckCircle,
  Bell
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
import { Contact } from '../components/ui/ContactItem';
import { colors } from '../theme/colors';

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
  | 'paywall';            // Tela 10

const initialContacts: Contact[] = [
  { id: '1', name: 'Maria Silva', phone: '(412) 339-5678', notifyOnActivate: true, notifyOnSos: true },
  { id: '2', name: 'Maria Silva', phone: '(412) 358-5678', notifyOnActivate: true, notifyOnSos: true },
  { id: '3', name: 'Maria Silva', phone: '(412) 358-5678', notifyOnActivate: true, notifyOnSos: true },
  { id: '4', name: 'Serandr Silva', phone: '(412) 358-5678', notifyOnActivate: true, notifyOnSos: true },
  { id: '5', name: 'Maria Silva', phone: '(412) 354-5678', notifyOnActivate: true, notifyOnSos: true },
];

export default function App() {
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
      showFeedback('Proteção ativada! Monitoramento em tempo real iniciado.');
    } else {
      setCurrentScreen('home-inactive');
      showFeedback('Modo Seguro ativado. Proteção desativada.');
    }
  };

  const handleEditContact = (contact: Contact) => {
    setSelectedContact(contact);
    setCurrentScreen('contact-detail');
  };

  const handleAddContact = () => {
    const newContact: Contact = {
      id: String(Date.now()),
      name: 'Novo Contato',
      phone: '(11) 99999-9999',
      notifyOnActivate: true,
      notifyOnSos: true,
    };
    setSelectedContact(newContact);
    setCurrentScreen('contact-detail');
  };

  const handleSaveContact = (updated: Contact) => {
    setContacts(prev => {
      const exists = prev.some(c => c.id === updated.id);
      if (exists) {
        return prev.map(c => c.id === updated.id ? updated : c);
      }
      return [...prev, updated];
    });
    showFeedback(`Contato "${updated.name}" salvo.`);
    setCurrentScreen('contacts');
  };

  const handleRemoveContact = (contactToRemove: Contact) => {
    setContacts(prev => prev.filter(c => c.id !== contactToRemove.id));
    showFeedback(`Contato "${contactToRemove.name}" removido.`);
  };

  // Determine if active screen has the bottom TabBar
  const isTabScreen = ['home-inactive', 'home-active', 'contacts', 'history', 'settings'].includes(currentScreen);

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
              showFeedback('Bem-vindo de volta!');
            }}
            onForgotPassword={() => showFeedback('Instruções enviadas para seu e-mail.')}
          />
        );

      case 'signup':
        return (
          <SignUpScreen
            onNavigateToLogin={() => setCurrentScreen('login')}
            onNavigateToPaywall={() => setCurrentScreen('paywall')}
          />
        );

      case 'paywall':
        return (
          <PaywallScreen
            onBack={() => setCurrentScreen('home-inactive')}
            onSubscribe={() => {
              showFeedback('Assinatura ativada com sucesso!');
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
            onOpenMenu={() => {
              setCurrentTab('settings');
              setCurrentScreen('settings');
            }}
            onOpenNotifications={() => showFeedback('Nenhuma nova notificação pendente.')}
          />
        );

      case 'home-active':
        return (
          <HomeScreen
            isProtectionActive={true}
            onToggleProtection={handleToggleProtection}
            onOpenSos={() => setCurrentScreen('emergency')}
            onOpenMenu={() => {
              setCurrentTab('settings');
              setCurrentScreen('settings');
            }}
            onOpenNotifications={() => showFeedback('Status: Transmissão de GPS criptografada.')}
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
    { key: 'home-inactive', title: '3. Home (Inativa)', subtitle: 'Dashboard com atalhos e mini mapa', tag: 'App / Tab' },
    { key: 'contacts', title: '4. Contatos de Confiança', subtitle: 'Lista de contatos, editar e remover', tag: 'App / Tab' },
    { key: 'contact-detail', title: '5. Detalhes do Contato', subtitle: 'Foto, nome e permissões de alerta', tag: 'App / Modal' },
    { key: 'home-active', title: '6. Proteção Ativa', subtitle: 'Modo Escuro com radar pulsante em tempo real', tag: 'App / Active' },
    { key: 'emergency', title: '7. Alerta SOS Enviado', subtitle: 'Tela vermelha de alerta prioritário', tag: 'Emergência' },
    { key: 'history', title: '8. Histórico de Segurança', subtitle: 'Logs de SOS e períodos de proteção', tag: 'App / Tab' },
    { key: 'settings', title: '9. Configurações', subtitle: 'Menu de conta, biometria e plano', tag: 'App / Tab' },
    { key: 'paywall', title: '10. Plano Guardiam Pro', subtitle: 'Assinatura com benefícios e valor', tag: 'Paywall' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Application Control Toolbar */}
      <header className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 py-3 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-extrabold shadow-md shadow-blue-500/20">
              G
            </div>
            <div>
              <span className="font-bold text-white text-base tracking-tight flex items-center gap-2">
                Guardiam Scaffold & Design System
                <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  Expo SDK 56
                </span>
              </span>
              <p className="text-xs text-slate-400">
                10 telas fiéis aos mockups · Design tokens em <code className="text-sky-300">theme/</code>
              </p>
            </div>
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center gap-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700">
            <button
              type="button"
              id="view-mode-device"
              onClick={() => setViewMode('device')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                viewMode === 'device'
                  ? 'bg-[#1565C0] text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
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
                  ? 'bg-[#1565C0] text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Todas as 10 Telas</span>
            </button>

            <button
              type="button"
              id="view-mode-tokens"
              onClick={() => setViewMode('tokens')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                viewMode === 'tokens'
                  ? 'bg-[#1565C0] text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              <span>Tokens & Design System</span>
            </button>
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
                    } else if (screen.key === 'history') {
                      setCurrentTab('history');
                    } else if (screen.key === 'settings') {
                      setCurrentTab('settings');
                    }
                  }}
                  className={`px-3 py-1 rounded-full text-xs font-medium shrink-0 transition-all cursor-pointer ${
                    isActive
                      ? 'bg-sky-500 text-white font-bold ring-2 ring-sky-400/40 shadow-sm'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/60'
                  }`}
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
              <div className="w-full h-8 flex items-center justify-between px-6 text-[11px] font-bold text-slate-800 bg-transparent z-30 select-none">
                <span>9:41</span>
                <div className="flex items-center gap-1.5">
                  <div className="w-3.5 h-2 border border-current rounded-xs" />
                </div>
              </div>

              {/* Screen Inner Viewport */}
              <div className="flex-1 w-full rounded-[38px] overflow-hidden flex flex-col relative bg-[#F8FAFC]">
                <div className="flex-1 w-full overflow-hidden flex flex-col">
                  {renderScreenContent(currentScreen)}
                </div>

                {/* Optional Bottom Tab Bar */}
                {isTabScreen && (
                  <TabBar
                    currentTab={currentTab}
                    onSelectTab={handleTabChange}
                    isDarkMode={currentScreen === 'home-active'}
                  />
                )}
              </div>

              {/* iOS Home Indicator Bar */}
              <div className="w-full h-4 flex items-center justify-center bg-transparent">
                <div className="w-32 h-1 bg-slate-500/40 rounded-full" />
              </div>
            </div>

            {/* Side Context & Screen Inspector Panel */}
            <div className="w-full max-w-md space-y-4">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
                    Tela Atual em Foco
                  </span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-800 text-slate-300">
                    {allScreensList.find(s => s.key === currentScreen)?.tag}
                  </span>
                </div>

                <h2 className="text-lg font-bold text-white">
                  {allScreensList.find(s => s.key === currentScreen)?.title}
                </h2>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {allScreensList.find(s => s.key === currentScreen)?.subtitle}
                </p>

                <div className="pt-2 border-t border-slate-800/80 text-xs text-slate-400 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Rota Expo Router:</span>
                    <code className="text-sky-300 font-mono text-[11px]">
                      {currentScreen === 'login' && 'app/(pre-auth)/login.tsx'}
                      {currentScreen === 'signup' && 'app/(pre-auth)/signup.tsx'}
                      {currentScreen === 'paywall' && 'app/(pre-auth)/paywall.tsx'}
                      {currentScreen === 'home-inactive' && 'app/(app)/(tabs)/index.tsx'}
                      {currentScreen === 'home-active' && 'app/(app)/(tabs)/index.tsx (Active)'}
                      {currentScreen === 'contacts' && 'app/(app)/(tabs)/contacts/index.tsx'}
                      {currentScreen === 'contact-detail' && 'app/(app)/(tabs)/contacts/[id].tsx'}
                      {currentScreen === 'emergency' && 'app/(app)/emergency.tsx'}
                      {currentScreen === 'history' && 'app/(app)/(tabs)/history.tsx'}
                      {currentScreen === 'settings' && 'app/(app)/(tabs)/settings.tsx'}
                    </code>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Persistência Local:</span>
                    <span className="text-slate-300">AsyncStorage (State Engine)</span>
                  </div>
                </div>
              </div>

              {/* Quick Interactive Actions */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Ações Rápidas de Teste
                </span>
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    type="button"
                    onClick={handleToggleProtection}
                    className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white border border-slate-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Shield className="w-3.5 h-3.5 text-sky-400" />
                    <span>{isProtectionActive ? 'Desativar Proteção' : 'Ativar Proteção'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCurrentScreen('emergency')}
                    className="p-2.5 rounded-xl bg-red-950/60 hover:bg-red-900/80 text-xs font-semibold text-red-300 border border-red-800/50 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Disparar SOS</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCurrentScreen('paywall')}
                    className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white border border-slate-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Ver Paywall Pro</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCurrentScreen('signup')}
                    className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white border border-slate-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Fluxo Cadastro</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: All 10 Screens Side-by-Side Gallery */}
        {viewMode === 'all-screens' && (
          <div className="w-full space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h2 className="text-xl font-bold text-white">Todas as 10 Telas do Mockup</h2>
                <p className="text-xs text-slate-400">Visualização simultânea de todas as telas construídas fielmente à referência</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">
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
                  <div className="w-full h-[540px] rounded-2xl overflow-hidden bg-[#F8FAFC] border border-slate-700 flex flex-col shadow-inner relative">
                    <div className="flex-1 overflow-hidden flex flex-col">
                      {renderScreenContent(screen.key)}
                    </div>
                    {['home-inactive', 'home-active', 'contacts', 'history', 'settings'].includes(screen.key) && (
                      <TabBar
                        currentTab={
                          screen.key === 'contacts' ? 'contacts' :
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
                    className="mt-3 w-full py-2 rounded-xl bg-slate-800 hover:bg-[#1565C0] text-white text-xs font-semibold transition-colors cursor-pointer"
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
          <div className="w-full max-w-4xl space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white">Design Tokens Extraídos do Mockup</h2>
                <p className="text-xs text-slate-400 mt-1">Configurados em <code className="text-sky-300">theme/colors.ts</code>, <code className="text-sky-300">theme/typography.ts</code>, e <code className="text-sky-300">theme/spacing.ts</code></p>
              </div>

              {/* Color Swatches Grid */}
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Paleta de Cores
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60 space-y-2">
                    <div className="w-full h-12 rounded-lg bg-[#1565C0] shadow-sm" />
                    <div>
                      <div className="text-xs font-bold text-white">Brand Primary</div>
                      <div className="text-[11px] text-slate-400 font-mono">#1565C0</div>
                    </div>
                  </div>

                  <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60 space-y-2">
                    <div className="w-full h-12 rounded-lg bg-[#0A1128] border border-slate-700 shadow-sm" />
                    <div>
                      <div className="text-xs font-bold text-white">Dark Mode (Ativa)</div>
                      <div className="text-[11px] text-slate-400 font-mono">#0A1128</div>
                    </div>
                  </div>

                  <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60 space-y-2">
                    <div className="w-full h-12 rounded-lg bg-[#DC2626] shadow-sm" />
                    <div>
                      <div className="text-xs font-bold text-white">Alerta SOS</div>
                      <div className="text-[11px] text-slate-400 font-mono">#DC2626</div>
                    </div>
                  </div>

                  <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60 space-y-2">
                    <div className="w-full h-12 rounded-lg bg-[#F8FAFC] border border-slate-300 shadow-sm" />
                    <div>
                      <div className="text-xs font-bold text-white">Light Background</div>
                      <div className="text-[11px] text-slate-400 font-mono">#F8FAFC</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Component Specs */}
              <div className="space-y-3 pt-2 border-t border-slate-800">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Componentes Reutilizáveis Construídos
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 space-y-1">
                    <div className="font-bold text-white flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                      Button (7 Variantes)
                    </div>
                    <p className="text-slate-400 text-[11px]">Primary, Secondary, SOS, Emergency, Danger, Outline, Ghost</p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 space-y-1">
                    <div className="font-bold text-white flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                      Input com Toggle de Senha
                    </div>
                    <p className="text-slate-400 text-[11px]">Bordas arredondadas, labels, ícone de olho para visibilidade</p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 space-y-1">
                    <div className="font-bold text-white flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                      Logo Guardiam Shield SVG
                    </div>
                    <p className="text-slate-400 text-[11px]">Escudo metálico com reflexo, gradiente azul e letra G em alta definição</p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 space-y-1">
                    <div className="font-bold text-white flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                      MapRadar (Modo Claro & Escuro)
                    </div>
                    <p className="text-slate-400 text-[11px]">Grid vetorial com pulsos concêntricos e indicador de GPS</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
