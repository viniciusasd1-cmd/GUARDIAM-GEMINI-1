# Front Restart Decision — Guardiam Mobile

## 1. Motivo do Reset Total do Front
O desenvolvimento do frontend mobile do Guardiam passou por sucessivas camadas de adaptações, correções parciais, tentativas de portabilidade automática de código Web (React 19 + Tailwind + Vite) para React Native/Expo, e introdução de dados mockados / stubs funcionais que mascararam o comportamento real do backend.

Essa sobreposição de contextos gerou:
- Contaminação de código entre branches antigas (`guardiam-3b10-homologation`, `gai-ui-approved-replacement`, `guardiam-mobile-approved-ui`).
- Uso de componentes híbridos com prefixos transitórios (`Approved*`) misturados a implementações antigas do Codex.
- Mock de fluxos críticos de segurança (SOS, tracking de localização, contatos e ciclo de vida de viagens).

A única forma de garantir integridade visual absoluta, alinhamento técnico nativo com Expo/React Native e robustez nos contratos de segurança é **recomeçar o frontend do zero absoluto**, dividindo o processo em fases estritas e auditáveis.

---

## 2. O que será Descartado
- **Repositórios e Pastas Anteriores:**
  - `guardiam-mobile-approved-ui`
  - `guardiam-3b10-homologation`
  - Branches `gai-ui-approved-replacement` e equivalentes.
- **Códigos e Primitivas:**
  - Qualquer componente com prefixo transitório (`Approved*`).
  - Telas antigas com lógica misturada de mock e API.
  - Scripts de setup anteriores e hacks de compilação.
- **Dependências e Camadas Web:**
  - Tailwind web runtime, Vite middlewares, Radix, Motion/React, HTML tags e APIs de browser (`localStorage`, `window`, `document`).

---

## 3. O que será Preservado
- **Backend Existente:**
  - O repositório `xguardiam-ride-api` permanece como a **única fonte da verdade** para contratos de rede, regras de negócio, autenticação JWT, persistência de safe trips, auditoria forense e alertas SOS.
- **Design System Aprovado:**
  - Identidade visual canônica, hierarquia tipográfica, paleta de cores (#F8FAFC claro, #0A1128 proteção ativa, #1E1B2E emergência SOS) e fluxos visuais do `GUARDIAM-GEMINI-1`.

---

## 4. Fontes Oficiais
| Tipo | Fonte Oficial | Descrição |
| :--- | :--- | :--- |
| **Visual Canônica** | `C:\Users\lenovo\P R O J E T O S\GUARDIAM-GEMINI-1` | Referência visual estrita (telas, cores, layouts e componentes). |
| **Funcional & Backend** | `C:\Users\lenovo\P R O J E T O S\xguardiam-ride-api` | Contratos de API, endpoints REST, payloads e lifecycle de proteção. |

---

## 5. Riscos da Decisão e Mitigações
| Risco | Impacto | Mitigação Obrigatória |
| :--- | :--- | :--- |
| **Reintrodução de Mocks** | Alto | Proibição de dados estáticos ou timeouts simulando chamadas de rede. Falhas de rede devem produzir estados reais de erro e retry. |
| **Contaminação Cruzada** | Alto | Aplicação da política `NO_OLD_FRONT_POLICY.md` com validação de diff e auditoria de commits. |
| **Incompatibilidade Web x Mobile** | Médio | Não copiar código JSX/TSX diretamente do repositório Web; reescrever componente por componente utilizando componentes nativos do React Native (`View`, `Text`, `Pressable`, `StyleSheet`). |

---

## 6. Critérios para Não Repetir a Contaminação Anterior
1. **Nenhum arquivo do front antigo pode ser aberto ou copiado.**
2. **Nenhuma dependência Web pode ser adicionada ao `package.json` do Expo.**
3. **Nenhum casting (`as any`) em chamadas de API.**
4. **Validação rígida em cada fase (`PHASE_GATE_CHECKLIST.md`) antes de avançar para a seguinte.**
