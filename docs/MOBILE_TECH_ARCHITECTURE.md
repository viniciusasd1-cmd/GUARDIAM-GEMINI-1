# Mobile Technical Architecture — Guardiam

## 1. Stack Tecnológica Recomendada
- **Framework:** React Native + Expo (SDK 52+ / Node 20 LTS)
- **Roteamento:** Expo Router (File-based routing com suporte nativo a `Stack`, `Tabs` e `SafeAreaView`)
- **Linguagem:** TypeScript (Strict mode: `"strict": true`, sem `any` em contratos)
- **Estilização:** `StyleSheet.create` do React Native puro integrado com tokens centrais de design
- **Ícones Nativos:** `lucide-react-native`
- **Renderização Gráfica / Radar:** `react-native-svg`
- **Armazenamento Seguro:** `expo-secure-store` para JWT / Refresh Tokens; `@react-native-async-storage/async-storage` para cache não-sensível e filas offline.
- **Geolocalização & Sensores:** `expo-location` (Foreground) e `expo-task-manager` / `expo-background-fetch` (Background via Dev Build / Prebuild).

---

## 2. Estrutura de Diretórios Sugerida
```text
guardiam-mobile/
├── app/                           # Rotas do Expo Router
│   ├── _layout.tsx                # Provedor raiz (Auth, Theme, SafeArea)
│   ├── index.tsx                  # Splash / Router redirect inicial
│   ├── (auth)/                    # Fluxo não autenticado
│   │   ├── _layout.tsx
│   │   ├── login.tsx              # Tela de Login
│   │   └── register.tsx           # Tela de Cadastro
│   └── (app)/                     # Fluxo autenticado
│       ├── _layout.tsx
│       ├── home.tsx               # Dashboard (Inativo claro / Ativo escuro)
│       ├── active-protection.tsx  # Tela dedicada de monitoramento ativo
│       ├── emergency.tsx          # Tela de pânico / SOS disparado
│       ├── contacts.tsx           # Gestão de contatos de confiança
│       ├── history.tsx            # Histórico de eventos e dossiês
│       └── settings.tsx           # Configurações e permissões
├── src/
│   ├── api/                       # Clientes HTTP (Axios / Fetch tipados)
│   │   ├── client.ts              # Interceptor com injeção automática de Bearer Token
│   │   ├── authApi.ts             # Login, registro e renovação de token
│   │   ├── safeTripsApi.ts        # Início, término e status da viagem protegida
│   │   ├── trustedContactsApi.ts  # CRUD de guardiões
│   │   ├── locationApi.ts         # Envio de coordenadas
│   │   └── sosApi.ts              # Disparo e confirmação de alertas SOS
│   ├── auth/                      # Contexto de autenticação e sessão
│   │   ├── AuthContext.tsx        # Provedor de estado de login
│   │   └── tokenStorage.ts        # Armazenamento em Keychain/Keystore via SecureStore
│   ├── theme/                     # Tokens de design (espelho exato do visual aprovado)
│   │   ├── colors.ts
│   │   ├── typography.ts
│   │   ├── spacing.ts
│   │   ├── shadows.ts
│   │   └── index.ts
│   ├── components/
│   │   ├── ui/                    # Componentes atômicos reutilizáveis
│   │   │   ├── Logo.tsx
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Badge.tsx
│   │   │   └── Avatar.tsx
│   │   └── layout/                # Componentes estruturais
│   │       ├── Header.tsx
│   │       ├── TabBar.tsx
│   │       └── MapRadar.tsx
│   ├── domain/                    # Entidades e interfaces TypeScript
│   │   ├── User.ts
│   │   ├── SafeTrip.ts
│   │   ├── TrustedContact.ts
│   │   └── LocationPoint.ts
│   ├── services/
│   │   ├── location/              # Gerenciador de GPS foreground/background
│   │   ├── offline/               # Fila de persistência offline (LocationQueue & SosQueue)
│   │   └── guardian/              # Máquina de estados de proteção ativa e detecção
│   └── utils/
│       └── errorHandler.ts
└── app.json                       # Manifesto de permissões nativas e plugins Expo
```

---

## 3. Boas Práticas Mobile & Ciclo de Vida de Permissões
1. **Permissões Progressivas:**
   - Nunca solicitar permissão de localização "Sempre" logo na inicialização do app.
   - Solicitar localização em primeiro plano (*Foreground*) apenas no momento em que o usuário aciona a proteção ou abre o radar.
   - Solicitar permissão de segundo plano (*Background*) com explicação contextual clara no momento da ativação da viagem segura.
2. **Resiliência de Rede (Offline-First Sync):**
   - Coordenadas de geolocalização e disparos de SOS são armazenados localmente em fila persistente (`AsyncStorage`).
   - Um worker de sincronização drena a fila assim que a conexão de rede é restabelecida.
3. **Segurança e Revisão de Dados:**
   - Tokens de acesso JWT e credenciais sensíveis devem residir estritamente no `expo-secure-store`.
   - Nenhum log de console em produção (`console.log`) contendo credenciais ou dados pessoais de localização.
