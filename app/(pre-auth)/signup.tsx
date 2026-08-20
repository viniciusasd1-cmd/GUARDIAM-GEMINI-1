import React, { useState } from 'react';
import { Logo } from '../../components/ui/Logo';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

interface SignUpScreenProps {
  onNavigateToLogin?: () => void;
  onNavigateToPaywall?: () => void;
}

export const SignUpScreen: React.FC<SignUpScreenProps> = ({
  onNavigateToLogin,
  onNavigateToPaywall,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // De acordo com o fluxo do GUARDIAM.MD: Onboarding -> Paywall -> Auth
      onNavigateToPaywall?.();
    }, 600);
  };

  return (
    <div
      id="screen-signup"
      className="w-full h-full flex flex-col justify-between px-6 py-8 bg-[#F8FAFC] text-slate-900"
    >
      {/* Top Section with Centered Shield Emblem */}
      <div className="flex flex-col items-center pt-2">
        <Logo size="lg" id="signup-shield-logo" />
        <h1 className="mt-5 text-2xl font-bold text-slate-900 tracking-tight">
          Crie sua proteção.
        </h1>
      </div>

      {/* Form Fields */}
      <form onSubmit={handleSubmit} className="w-full space-y-3.5 my-auto max-w-sm mx-auto">
        <Input
          label="Nome"
          type="text"
          id="signup-name-input"
          placeholder="Seu nome completo"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <Input
          label="Email"
          type="email"
          id="signup-email-input"
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Input
          label="Senha"
          type="password"
          id="signup-password-input"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className="pt-3">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            id="signup-submit-button"
            isLoading={isLoading}
          >
            Criar Conta
          </Button>
        </div>
      </form>

      {/* Footer Navigation Link */}
      <div className="text-center pb-2">
        <span className="text-xs text-slate-600">Já tem conta? </span>
        <button
          type="button"
          id="signup-login-link"
          onClick={onNavigateToLogin}
          className="text-xs font-bold text-[#1565C0] hover:text-[#0D47A1] transition-colors cursor-pointer"
        >
          Entrar.
        </button>
      </div>
    </div>
  );
};

export default SignUpScreen;
