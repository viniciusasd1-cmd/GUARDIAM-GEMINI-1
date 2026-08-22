# Phase Gate Checklist — Guardiam Mobile

Este checklist é de execução **obrigatória** antes de concluir ou aprovar qualquer uma das 15 fases do desenvolvimento. Nenhuma fase pode ser considerada finalizada sem atender a 100% dos critérios abaixo.

---

## Checklist Obrigatório por Fase

### 1. Higiene de Git e Escopo
- [ ] `git status` estava limpo antes do início da fase.
- [ ] As alterações no diff estão **estritamente restritas** aos arquivos autorizados da fase.
- [ ] Nenhum arquivo antigo foi resgatado ou importado de branches anteriores.
- [ ] O commit é realizado **somente após** aprovação explícita de todos os itens técnicos.

### 2. Validação Estática e Compilação
- [ ] **Typecheck Estrito:** `npx tsc --noEmit` executa com **0 erros**.
- [ ] **Expo Doctor:** `npx expo-doctor` executa com **0 advertências críticas**.
- [ ] **Sem `as any`:** Nenhuma chamada de API, contrato de tipo ou componente utiliza casting permissivo (`as any`).

### 3. Validação de Runtime e Execução
- [ ] **Expo Start:** `npx expo start` inicia sem advertências de pacotes ausentes ou erros de bundling Metro.
- [ ] **Validação Visual:** O componente/tela renderiza no Expo com fidelidade visual 1:1 ao design canônico em `GUARDIAM-GEMINI-1`.
- [ ] **Responsividade:** Layout testado e aprovado em telas de diferentes densidades (iOS e Android).

### 4. Integridade de Contratos e Segurança
- [ ] **Sem Dependências Web:** Nenhuma biblioteca dependente de DOM (`lucide-react`, `motion/react`, `@radix-ui`, `tailwindcss` web) está presente no `package.json`.
- [ ] **Sem Mocks Falsos:** Nenhum dado fictício, `setTimeout` ou flag local substitui chamadas de rede onde há contrato de backend definido.
- [ ] **Sem Fallbacks Falsos de Sucesso:** Em caso de erro de API, a aplicação exibe tratamento real de erro e opção de retry para o usuário.
- [ ] **Armazenamento Seguro:** Dados confidenciais (tokens JWT) utilizam estritamente `expo-secure-store`.

---

## Modelo de Relatório de Aprovação da Fase

```text
STATUS: [SUCESSO | BLOQUEADO]
FASE_VALIDADA: FASE X — [NOME DA FASE]
GIT_STATUS_CLEAN: SIM
SCOPE_STRICTLY_RESPECTED: SIM
TYPECHECK: OK (0 erros)
EXPO_DOCTOR: OK
EXPO_START_VALIDATED: SIM
NO_WEB_DEPENDENCIES: SIM
NO_MOCK_DATA_USED: SIM
APPROVED_UI_MATCH: SIM
COMMIT_PERMITIDO: [SIM | NÃO]
```
