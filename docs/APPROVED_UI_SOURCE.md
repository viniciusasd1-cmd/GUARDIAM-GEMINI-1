# Approved UI Source Reference — Guardiam

## 1. Repositório Visual Aprovado
- **Nome:** `GUARDIAM-GEMINI-1`
- **Caminho Local:** `C:\Users\lenovo\P R O J E T O S\GUARDIAM-GEMINI-1`
- **URL Remota:** `https://github.com/viniciusasd1-cmd/GUARDIAM-GEMINI-1`
- **Commit Base:** `1925472ee294157478b5533580f2db5af8d3ff50` (*feat: initialize Guardiam application scaffold*)

---

## 2. Stack Detectada na Fonte Visual
- React 19 (Web)
- Vite
- Tailwind CSS (Web Utilities via PostCSS / @import "tailwindcss")
- Lucide React (Ícones Web SVG)
- Supabase JS Client / RevenueCat Web SDK

---

## 3. Por que NÃO pode rodar diretamente no Expo / React Native
O ecossistema React Native / Expo não possui o DOM (Document Object Model) de navegadores web nem processador de classes CSS de runtime web tradicional.
- Elementos como `<div>`, `<span>`, `<h1>`, `<p>`, `<button>`, `<input>` **não existem** no React Native runtime e causam travamento imediato (`Invariant Violation: View config not found for name div`).
- O utilitário `className="..."` não é interpretado nativamente sem transpiladores especializados.
- Bibliotecas Web como `motion/react`, `lucide-react`, `@radix-ui` e manipulações de `window` ou `document` quebram o bundle nativo do Metro.

---

## 4. O que DEVE ser reaproveitado como Referência Visual
O repositório `GUARDIAM-GEMINI-1` é a especificação estética oficial do produto:

| Elemento | Especificação Canônica do GUARDIAM-GEMINI-1 |
| :--- | :--- |
| **Cores & Temas** | - Fundo Claro Canônico: `#F8FAFC`<br>- Superfície Cartões: `#FFFFFF`<br>- Azul Primário: `#1565C0`<br>- Azul Acento/Bordas: `#BFDBFE` / `#EFF6FF`<br>- Tema Proteção Ativa: Fundo `#0A1128`, Superfícies `#111C44` / `#1B254B`, Acentos `#7DD3FC` / `#38BDF8`<br>- Tema SOS / Emergência: Fundo `#1E1B2E`, Acentos `#DC2626` / `#FEF2F2` / `#FECACA` |
| **Hierarquia Tipográfica** | - Display/Títulos Maiores: 24px - 28px, Bold/Extrabold, Tracking -0.5px<br>- Títulos de Seção: 18px, Bold<br>- Corpo de Texto: 14px - 15px, Regular/Medium<br>- Badges/Legendas: 11px - 12px, Semibold |
| **Layouts & Telas** | - **Login / Signup:** Logo centralizada em escudo, campos com labels superiores e ícones de visibilidade, CTAs com cantos arredondados.<br>- **Home Inativa:** Saudação "Olá, [Nome]", Badge "Proteção desativada", Botão "Ativar Proteção" + Botão "SOS", Grid 2x2 (Modo Passageiro, Locais Seguros, Contatos, Dossiês), Mini Radar de satélite.<br>- **Home / Proteção Ativa:** Fundo escuro `#0A1128`, gravação de áudio forense ativa, card de link de compartilhamento em tempo real, Radar de Satélite escuro, botão "Modo Seguro (Desativar)".<br>- **SOS / Emergência:** Fundo `#1E1B2E`, contagem regressiva pulsante de 5s, card de transmissão forense, atalho direto "Ligar 190 (Polícia Militar)".<br>- **Contatos de Confiança:** Lista de guardiões com badge de status, botão inferior "Adicionar contato", formulário de cadastro.<br>- **Histórico:** Lista de logs e eventos com badges de alerta/segurança. |

---

## 5. O que é ESTRITAMENTE PROIBIDO Copiar
Nenhum código abaixo pode entrar na nova base Expo:
- `<div>`, `<button>`, `<input>`, `<span>`, `<h1>`, `<p>`, `<form>`
- `className="..."`
- `import ... from 'lucide-react'` (usar obrigatoriamente `lucide-react-native`)
- `import { motion } from 'motion/react'` (usar `Animated` nativo do React Native ou `react-native-reanimated`)
- `window.location`, `window.alert`, `document.getElementById`, `localStorage.getItem`
- Configurações do Vite (`vite.config.ts`, `index.html`)
