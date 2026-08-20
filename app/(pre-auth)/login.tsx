import React, { useState } from 'react';
import { Logo } from '../../components/ui/Logo';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

interface LoginScreenProps {
  onNavigateToSignUp?: () => void;
  onNavigateToHome?: () => void;
  onForgotPassword?: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onNavigateToSignUp,
  onNavigateToHome,
  onForgotPassword,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onNavigateToHome?.();
    }, 600);
  };

  return (
    <div
      id="screen-login"
      className="w-full h-full flex flex-col justify-between px-6 py-8 bg-[#F8FAFC] text-slate-900"
    >
      {/* Top Section with Centered Shield Emblem */}
      <div className="flex flex-col items-center pt-4">
        <Logo size="lg" id="login-shield-logo" />
        <h1 className="mt-6 text-2xl font-bold text-slate-900 tracking-tight">
          Acesse sua conta.
        </h1>
      </div>

      {/* Form Fields */}
      <form onSubmit={handleSubmit} className="w-full space-y-4 my-auto max-w-sm mx-auto">
        <Input
          label="Email"
          type="email"
          id="login-email-input"
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Input
          label="Senha"
          type="password"
          id="login-password-input"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className="pt-2 space-y-3">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            id="login-submit-button"
            isLoading={isLoading}
          >
            Entrar
          </Button>

          <div className="text-center">
            <button
              type="button"
              id="login-forgot-password-link"
              onClick={onForgotPassword}
              className="text-xs font-semibold text-[#1565C0] hover:text-[#0D47A1] transition-colors cursor-pointer"
            >
              Esqueceu a senha?
            </button>
          </div>
        </div>
      </form>

      {/* Footer Navigation Link */}
      <div className="text-center pb-2">
        <button
          type="button"
          id="login-signup-link"
          onClick={onNavigateToSignUp}
          className="text-xs font-bold text-[#1565C0] hover:text-[#0D47A1] transition-colors cursor-pointer"
        >
          Criar conta.
        </button>
      </div>
    </div>
  );
};

export default LoginScreen;
