# No Old Front Policy — Guardiam Mobile

## 1. Diretriz Fundamental
Para garantir que a nova base de código mobile seja limpa, sustentável e livre de bugs acumulados, fica estabelecida a **Política de Tolerância Zero contra o Front Antigo**.

---

## 2. Proibições Específicas
1. **É terminantemente proibido:**
   - Copiar arquivos das pastas de projetos anteriores (`guardiam-mobile-approved-ui`, `guardiam-3b10-homologation`).
   - Importar qualquer componente ou arquivo com prefixos transitórios do passado (ex: `ApprovedHeader`, `ApprovedButton`, `ApprovedCard`).
   - Usar código gerado em branches anteriores (`gai-ui-approved-replacement`) como base ou atalho.
   - Adaptar telas antigas colando trechos mistos de código.
   - Utilizar dados mockados locais (`INITIAL_CONTACTS`, `mockTrip`, etc.) como substitutos de endpoints do backend.

---

## 3. Fontes Únicas Autorizadas para Consulta
Durante todo o ciclo de vida do desenvolvimento do novo front mobile, apenas duas fontes são autorizadas:

1. **Referência Visual:**
   - `C:\Users\lenovo\P R O J E T O S\GUARDIAM-GEMINI-1` (apenas para extração de layout, cores, espaçamentos e hierarquia tipográfica).
2. **Referência Funcional e Contratos:**
   - `C:\Users\lenovo\P R O J E T O S\xguardiam-ride-api` (para contratos REST, payloads e lifecycle de viagens/segurança).

---

## 4. Consequência de Violação
Qualquer detecção de código legado, dependência web ou mock não autorizado:
- **Bloqueia imediatamente a fase atual.**
- Exige o descarte das alterações (`git reset --hard`) e o reinício da fase correspondente.
