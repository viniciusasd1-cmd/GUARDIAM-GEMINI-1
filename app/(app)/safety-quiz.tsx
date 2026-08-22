import React, { useState } from 'react';
import { Shield, CheckCircle2, ArrowRight, Sparkles, AlertCircle } from 'lucide-react';
import { Header } from '../../components/layout/Header';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';

interface QuizQuestion {
  id: string;
  question: string;
  options: { label: string; riskScore: number }[];
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'Com que frequência você volta para casa sozinho(a) à noite ou usa transporte por aplicativo?',
    options: [
      { label: 'Quase todos os dias / Fins de semana', riskScore: 30 },
      { label: 'Ocasionalmente (1 a 2x por mês)', riskScore: 15 },
      { label: 'Raramente ou nunca', riskScore: 5 },
    ],
  },
  {
    id: 'q2',
    question: 'Alguém da sua família ou amigo de confiança tem acesso à sua localização em tempo real quando você precisa?',
    options: [
      { label: 'Não, ninguém tem acesso configurado', riskScore: 35 },
      { label: 'Às vezes envio print ou link no WhatsApp', riskScore: 20 },
      { label: 'Sim, tenho contatos de emergência sincronizados', riskScore: 5 },
    ],
  },
  {
    id: 'q3',
    question: 'Em caso de perigo imediato, você tem um meio discreto de acionar socorro e gravar evidências?',
    options: [
      { label: 'Não, teria que desbloquear e fazer ligação', riskScore: 35 },
      { label: 'Tenho apenas botão de emergência padrão do celular', riskScore: 20 },
      { label: 'Sim, possuo aplicativo de proteção com acionamento rápido', riskScore: 5 },
    ],
  },
];

export const SafetyQuizScreen: React.FC<{
  onComplete?: (score: number) => void;
  onBack?: () => void;
}> = ({ onComplete, onBack }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  const handleSelect = (riskScore: number) => {
    const nextAnswers = [...selectedAnswers, riskScore];
    setSelectedAnswers(nextAnswers);

    if (currentStep < quizQuestions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const totalRiskScore = selectedAnswers.reduce((a, b) => a + b, 0);
  const safetyIndex = Math.max(15, 100 - totalRiskScore);

  return (
    <div
      id="screen-safety-quiz"
      className="w-full h-full flex flex-col justify-between bg-[#F8FAFC] text-slate-900 overflow-y-auto"
    >
      <Header showBack={Boolean(onBack)} onBack={onBack} id="quiz-header" />

      <div className="flex-1 px-5 py-4 max-w-md mx-auto w-full flex flex-col justify-center">
        {!isFinished ? (
          <div className="space-y-6">
            {/* Progress */}
            <div className="space-y-2 text-left">
              <div className="flex items-center justify-between text-xs font-bold text-slate-400">
                <span>DIAGNÓSTICO DE SEGURANÇA</span>
                <span>{currentStep + 1} de {quizQuestions.length}</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#1565C0] h-full transition-all duration-300 rounded-full"
                  style={{ width: `${((currentStep + 1) / quizQuestions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question Card */}
            <div className="text-left space-y-3">
              <h2 className="text-xl font-bold text-slate-900 leading-snug">
                {quizQuestions[currentStep].question}
              </h2>
            </div>

            {/* Options */}
            <div className="space-y-3 text-left">
              {quizQuestions[currentStep].options.map((opt, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSelect(opt.riskScore)}
                  className="w-full p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-[#1565C0] hover:bg-blue-50/50 transition-all text-left text-sm font-semibold text-slate-800 flex items-center justify-between group cursor-pointer"
                >
                  <span>{opt.label}</span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#1565C0] group-hover:translate-x-0.5 transition-all" />
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Result Summary */
          <div className="space-y-6 text-center animate-fade-in">
            <div className="w-20 h-20 rounded-3xl bg-blue-50 border border-blue-100 flex items-center justify-center mx-auto text-[#1565C0] shadow-sm">
              <Shield className="w-10 h-10 stroke-[2]" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-slate-900">
                Seu Índice de Vulnerabilidade
              </h2>
              <p className="text-xs text-slate-500">
                Calculado com base nos seus hábitos e rotinas diárias
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase">Nível de Cobertura Atual</span>
                <span className={`text-sm font-bold ${safetyIndex > 70 ? 'text-emerald-600' : 'text-amber-600'}`}>
                  {safetyIndex}% Seguro
                </span>
              </div>
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${safetyIndex > 70 ? 'bg-emerald-500' : 'bg-amber-500'}`}
                  style={{ width: `${safetyIndex}%` }}
                />
              </div>

              <div className="text-left text-xs text-slate-600 pt-2 border-t border-slate-100 space-y-1.5">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1565C0] shrink-0" />
                  <span>Ativar Guardião com gravação de áudio contínua</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1565C0] shrink-0" />
                  <span>Monitorar viagens de aplicativo (Modo Passageiro)</span>
                </div>
              </div>
            </div>

            <Button
              variant="primary"
              size="lg"
              id="quiz-continue-button"
              onClick={() => onComplete?.(safetyIndex)}
              leftIcon={<Sparkles className="w-5 h-5" />}
            >
              Ativar Proteção Completa
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SafetyQuizScreen;
