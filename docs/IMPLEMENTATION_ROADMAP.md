# Implementation Roadmap — Guardiam Mobile

Este roadmap detalha a sequência obrigatória de 15 fases para construir o aplicativo mobile do zero absoluto, garantindo validação visual no Expo e fidelidade funcional com o backend em cada etapa.

---

### FASE 1 — Criar Projeto Expo Limpo
- **Objetivo:** Inicializar o projeto Expo limpo (`guardiam-mobile`) com TypeScript estrito e estrutura básica de diretórios.
- **Arquivos Permitidos:** `package.json`, `tsconfig.json`, `app.json`, `app/_layout.tsx`, `app/index.tsx`.
- **Arquivos Proibidos:** Qualquer arquivo ou código do front anterior.
- **Comandos de Validação:** `npx expo-doctor`, `npx tsc --noEmit`, `npx expo start`.
- **Critério de Aprovação:** O app carrega uma tela de inicialização limpa no Expo Go / Emulador sem erros.

---

### FASE 2 — Tokens e Primitivas Visuais
- **Objetivo:** Criar os tokens de design (`src/theme/`) e as primitivas atômicas visuais (`Button`, `Input`, `Card`, `Badge`, `Logo`, `Header`, `TabBar`, `MapRadar`) sem dependências web.
- **Arquivos Permitidos:** `src/theme/*`, `src/components/ui/*`, `src/components/layout/*`.
- **Arquivos Proibidos:** Arquivos com dependências de DOM/CSS (`className`, `motion/react`, `lucide-react`).
- **Comandos de Validação:** `npx tsc --noEmit`, `npx expo-doctor`.
- **Critério de Aprovação:** Todas as primitivas renderizam com fidelidade à referência `GUARDIAM-GEMINI-1`.

---

### FASE 3 — Login / Register Visual Estático
- **Objetivo:** Implementar o layout visual das telas de autenticação (`(auth)/login.tsx` e `(auth)/register.tsx`).
- **Arquivos Permitidos:** `app/(auth)/*`.
- **Arquivos Proibidos:** Chamadas de rede falsas com `setTimeout` ou mocks de sucesso fictício.
- **Comandos de Validação:** `npx expo start`, `npx tsc --noEmit`.
- **Critério de Aprovação:** Telas idênticas à fonte visual com validação nativa de formulário e alternância de visibilidade de senha.

---

### FASE 4 — Autenticação Real
- **Objetivo:** Conectar as telas de Login e Cadastro à API real (`POST /api/auth/login` e `POST /api/auth/register`) utilizando `AuthContext` e `expo-secure-store`.
- **Arquivos Permitidos:** `src/api/authApi.ts`, `src/api/client.ts`, `src/auth/*`, `app/(auth)/*`.
- **Arquivos Proibidos:** Armazenamento de token em texto plano (`localStorage`).
- **Comandos de Validação:** Login com usuário de teste real no backend `xguardiam-ride-api`.
- **Critério de Aprovação:** Emissão e persistência do token JWT com redirecionamento automático para a Home.

---

### FASE 5 — Home Visual Estática
- **Objetivo:** Criar a estrutura visual completa da tela Home no modo claro (#F8FAFC) com saudação, badge, botões Ativar/SOS, Grid 2x2 e Mini Radar.
- **Arquivos Permitidos:** `app/(app)/home.tsx`.
- **Arquivos Proibidos:** Dados mockados fixos em arrays locais para mascarar ausência de backend.
- **Comandos de Validação:** `npx tsc --noEmit`, validação visual no emulador.
- **Critério de Aprovação:** Correspondência visual 1:1 com a Home inativa do `GUARDIAM-GEMINI-1`.

---

### FASE 6 — Home com `getActiveTrip`
- **Objetivo:** Conectar a Home ao endpoint real `GET /api/safe-trips/active` para refletir o status de proteção real do usuário.
- **Arquivos Permitidos:** `src/api/safeTripsApi.ts`, `app/(app)/home.tsx`.
- **Arquivos Proibidos:** Simulação local de viagem ativa sem consulta ao backend.
- **Comandos de Validação:** `npx tsc --noEmit`, teste com backend ligado/desligado.
- **Critério de Aprovação:** A Home transita automaticamente para o modo escuro (#0A1128) se houver viagem ativa no backend.

---

### FASE 7 — Criação / Início de Proteção
- **Objetivo:** Conectar os botões "Ativar Proteção" e "Modo Passageiro" aos endpoints `POST /api/safe-trips` e `POST /api/safe-trips/:id/complete`.
- **Arquivos Permitidos:** `src/api/safeTripsApi.ts`, `app/(app)/home.tsx`, `app/(app)/active-protection.tsx`.
- **Arquivos Proibidos:** Qualquer fallback fictício simulando sucesso na ausência de resposta da API.
- **Comandos de Validação:** Criação e finalização de viagem com persistência no banco do backend.
- **Critério de Aprovação:** Ciclo completo de criação e finalização com feedback de carregamento nativo.

---

### FASE 8 — Contatos Confiáveis
- **Objetivo:** Implementar a tela de gestão de contatos (`app/(app)/contacts.tsx`) integrada à API (`GET`, `POST`, `DELETE /api/trusted-contacts`).
- **Arquivos Permitidos:** `src/api/trustedContactsApi.ts`, `app/(app)/contacts.tsx`.
- **Arquivos Proibidos:** Array fixo `INITIAL_CONTACTS` no estado local.
- **Comandos de Validação:** Listagem, inclusão e remoção de guardião real.
- **Critério de Aprovação:** Empty state, loading state e lista de contatos fiéis ao visual aprovado.

---

### FASE 9 — Active Protection Visual
- **Objetivo:** Implementar o layout completo do modo escuro (#0A1128) na tela de proteção ativa com gravador de evidência forense e link de compartilhamento ao vivo.
- **Arquivos Permitidos:** `app/(app)/active-protection.tsx`, `src/components/ui/AudioEvidenceRecorder.tsx`, `src/components/ui/LiveShareCard.tsx`.
- **Comandos de Validação:** `npx tsc --noEmit`, `npx expo start`.
- **Critério de Aprovação:** Renderização impecável do tema escuro com radar de satélite ativo.

---

### FASE 10 — Tracking Foreground
- **Objetivo:** Integrar captura contínua de GPS em primeiro plano usando `expo-location` e envio via `POST /api/safe-trips/:safeTripId/locations`.
- **Arquivos Permitidos:** `src/services/location/useTripLocationTracking.ts`, `src/api/locationApi.ts`.
- **Critério de Aprovação:** Coordenadas reais enviadas e exibidas no mini radar.

---

### FASE 11 — SOS Real
- **Objetivo:** Implementar o fluxo completo de emergência: contagem regressiva de 5s, pulsação crítica (#1E1B2E), disparo real via `POST /api/safe-trips/:safeTripId/alerts` e ligação direta para o 190.
- **Arquivos Permitidos:** `app/(app)/emergency.tsx`, `src/api/sosApi.ts`.
- **Critério de Aprovação:** Disparo confirmado na API e transição para o estado de emergência ativa.

---

### FASE 12 — Fila Offline (Offline-First)
- **Objetivo:** Implementar filas locais persistentes (`LocationQueue` e `SosQueue`) com SQLite/AsyncStorage para retenção de telemetria sem sinal de internet.
- **Arquivos Permitidos:** `src/services/offline/*`.
- **Critério de Aprovação:** Alertas e coordenadas gerados em modo avião são drenados automaticamente ao reconectar.

---

### FASE 13 — Background Tracking com Dev Build
- **Objetivo:** Configurar tarefas em segundo plano (`expo-task-manager` / `expo-location`) para manter o rastreamento ativo com o aplicativo em background ou tela bloqueada.
- **Arquivos Permitidos:** `src/services/location/backgroundLocationTask.ts`, `app.json`.
- **Critério de Aprovação:** Envio contínuo de coordenadas em background validado em build nativa.

---

### FASE 14 — Validação Runtime Completa
- **Objetivo:** Execução de suíte de testes de integração ponta a ponta (E2E), verificação de vazamento de memória e auditoria de contraste de acessibilidade (WCAG AA).
- **Critério de Aprovação:** 0 erros de runtime, 0 advertências de performance.

---

### FASE 15 — Build Android / iOS
- **Objetivo:** Geração de binários finais (APK / AAB para Android e IPA para iOS) via EAS Build.
- **Critério de Aprovação:** Compilação com sucesso nas duas plataformas com todas as permissões nativas declaradas.
