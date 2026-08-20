import React, { useState } from 'react';
import { History, Check, Wifi, Users, Sparkles } from 'lucide-react';
import { Header } from '../../components/layout/Header';
import { Button } from '../../components/ui/Button';

interface PaywallScreenProps {
  onBack?: () => void;
  onSubscribe?: () => void;
}

export const PaywallScreen: React.FC<PaywallScreenProps> = ({
  onBack,
  onSubscribe,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onSubscribe?.();
    }, 700);
  };

  const features = [
    { icon: History, text: 'Histórico completo' },
    { icon: Check, text: 'Suporte 24/7' },
    { icon: Wifi, text: 'Offline mode' },
    { icon: Users, text: 'Vários contatos' },
  ];

  return (
    <div
      id="screen-paywall"
      className="w-full h-full flex flex-col justify-between bg-[#F8FAFC] text-slate-900"
    >
      {/* Header with Back Arrow and Centered Logo */}
      <Header
        showBack={Boolean(onBack)}
        onBack={onBack}
        id="paywall-header"
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center max-w-sm mx-auto w-full">
        {/* Diamond Icon Placeholder / Badge */}
        <div className="w-16 h-16 rounded-2xl bg-sky-100 flex items-center justify-center text-[#1565C0] shadow-sm mb-4">
          <Sparkles className="w-9 h-9 stroke-[2]" />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Plano Guardiam Pro
        </h1>

        {/* Features List */}
        <div className="w-full mt-8 space-y-4 text-left">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-3.5 text-slate-800"
              >
                <div className="text-[#1565C0] p-1 rounded-lg bg-blue-50">
                  <Icon className="w-5 h-5 stroke-[2.2]" />
                </div>
                <span className="text-sm font-semibold">{feature.text}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pricing & CTA Section */}
      <div className="px-6 pb-8 pt-4 flex flex-col items-center text-center max-w-sm mx-auto w-full">
        <div className="mb-4">
          <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
            R$ 29,90
          </div>
          <div className="text-xs text-slate-500 font-medium mt-0.5">
            Plano Guardiam Pro · R$ 5,00/mês promocional
          </div>
        </div>

        <Button
          type="button"
          variant="primary"
          size="lg"
          id="paywall-subscribe-button"
          isLoading={isLoading}
          onClick={handleSubscribe}
        >
          Assinar agora
        </Button>
      </div>
    </div>
  );
};

export default PaywallScreen;
