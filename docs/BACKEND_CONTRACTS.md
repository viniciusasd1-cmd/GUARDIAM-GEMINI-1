# Backend API Contracts — Guardiam

Este documento formaliza todos os contratos de rede fornecidos pelo backend `xguardiam-ride-api`. Todas as chamadas de API devem ser estritamente tipadas e respeitar os cabeçalhos de autenticação (`Authorization: Bearer <accessToken>`).

---

## 1. Módulo de Autenticação (`/api/auth`)

### `POST /api/auth/login`
- **Descrição:** Autentica o usuário com credenciais e emite o token JWT.
- **Headers:** `Content-Type: application/json`
- **Request Body:**
```json
{
  "email": "user@guardiam.app",
  "password": "SecurePassword123!"
}
```
- **Resposta de Sucesso (`200 OK`):**
```json
{
  "accessToken": "eyJhbGciOi...",
  "refreshToken": "eyJhbGciOi...",
  "user": {
    "id": "usr_99812",
    "name": "Maria Silva",
    "email": "user@guardiam.app",
    "phone": "+5511999998888"
  }
}
```
- **Erros:** `400 Bad Request` (payload inválido), `401 Unauthorized` (credenciais incorretas).

---

### `POST /api/auth/register`
- **Descrição:** Cria uma nova conta de usuário.
- **Headers:** `Content-Type: application/json`
- **Request Body:**
```json
{
  "name": "Carlos Oliveira",
  "email": "carlos@guardiam.app",
  "password": "SecurePassword123!",
  "phone": "+5511988887777"
}
```
- **Resposta de Sucesso (`201 Created`):**
```json
{
  "accessToken": "eyJhbGciOi...",
  "user": {
    "id": "usr_99813",
    "name": "Carlos Oliveira",
    "email": "carlos@guardiam.app",
    "phone": "+5511988887777"
  }
}
```
- **Erros:** `409 Conflict` (e-mail já cadastrado), `422 Unprocessable Entity` (senha fraca ou dados inválidos).

---

### `GET /api/auth/me`
- **Descrição:** Valida o token e retorna o perfil atual.
- **Headers:** `Authorization: Bearer <accessToken>`
- **Resposta de Sucesso (`200 OK`):** Retorna o objeto `user`.
- **Erros:** `401 Unauthorized` (token expirado ou inválido).

---

## 2. Módulo de Viagens e Proteção Segura (`/api/safe-trips`)

### `GET /api/safe-trips/active`
- **Descrição:** Retorna a viagem de proteção atualmente ativa para o usuário.
- **Headers:** `Authorization: Bearer <accessToken>`
- **Resposta de Sucesso com Viagem Ativa (`200 OK`):**
```json
{
  "id": "trip_882910",
  "userId": "usr_99812",
  "status": "active",
  "title": "Proteção Ativa",
  "type": "standard",
  "trackingUrl": "https://guardiam.app/track/tk_78x9a2",
  "startedAt": "2026-08-22T15:30:00.000Z",
  "endedAt": null
}
```
- **Resposta de Sucesso sem Viagem Ativa (`200 OK` ou `204 No Content`):** `null` ou `{ "active": false }`.

---

### `POST /api/safe-trips`
- **Descrição:** Inicializa uma nova sessão de proteção / viagem segura.
- **Headers:** `Authorization: Bearer <accessToken>`, `Content-Type: application/json`
- **Request Body:**
```json
{
  "title": "Modo Passageiro Uber",
  "type": "passenger",
  "destination": "Av. Paulista, 1000",
  "expectedDurationMinutes": 30
}
```
- **Resposta de Sucesso (`201 Created`):** Retorna a entidade `SafeTrip` com status `active`.

---

### `POST /api/safe-trips/:id/complete`
- **Descrição:** Finaliza com segurança a viagem de proteção.
- **Headers:** `Authorization: Bearer <accessToken>`
- **Resposta de Sucesso (`200 OK`):**
```json
{
  "id": "trip_882910",
  "status": "completed",
  "endedAt": "2026-08-22T16:00:00.000Z"
}
```

---

## 3. Módulo de Contatos de Confiança (`/api/trusted-contacts`)

### `GET /api/trusted-contacts`
- **Descrição:** Lista todos os guardiões cadastrados pelo usuário.
- **Headers:** `Authorization: Bearer <accessToken>`
- **Resposta de Sucesso (`200 OK`):**
```json
[
  {
    "id": "tc_1",
    "name": "Maria Silva",
    "phone": "(11) 98877-6655",
    "status": "active",
    "allowEvidenceAccess": true,
    "notifyOnActivate": true,
    "notifyOnSos": true
  },
  {
    "id": "tc_2",
    "name": "Carlos Oliveira",
    "phone": "(11) 97766-5544",
    "status": "pending",
    "allowEvidenceAccess": false,
    "notifyOnActivate": true,
    "notifyOnSos": true
  }
]
```

---

### `POST /api/trusted-contacts`
- **Descrição:** Adiciona um novo contato de confiança e envia convite SMS.
- **Headers:** `Authorization: Bearer <accessToken>`, `Content-Type: application/json`
- **Request Body:**
```json
{
  "name": "Ana Souza",
  "phone": "(11) 96655-4433",
  "allowEvidenceAccess": true,
  "notifyOnActivate": true,
  "notifyOnSos": true
}
```
- **Resposta de Sucesso (`201 Created`):** Retorna o objeto criado com status `pending`.

---

### `DELETE /api/trusted-contacts/:id`
- **Descrição:** Remove um guardião dos contatos de confiança.
- **Headers:** `Authorization: Bearer <accessToken>`
- **Resposta de Sucesso (`200 OK` ou `204 No Content`).**

---

## 4. Módulo de Localização (`/api/safe-trips/:safeTripId/locations`)

### `POST /api/safe-trips/:safeTripId/locations`
- **Descrição:** Envia pacote de telemetria GPS (ponto individual ou lote para fila offline).
- **Headers:** `Authorization: Bearer <accessToken>`, `Content-Type: application/json`
- **Request Body:**
```json
{
  "latitude": -23.561684,
  "longitude": -46.655981,
  "accuracy": 5.2,
  "speed": 12.4,
  "heading": 180.5,
  "timestamp": "2026-08-22T15:35:10.120Z",
  "batteryLevel": 88
}
```
- **Resposta de Sucesso (`200 OK` ou `201 Created`):** `{ "recorded": true }`.

---

## 5. Módulo de Alertas e Pânico SOS (`/api/safe-trips/:safeTripId/alerts`)

### `POST /api/safe-trips/:safeTripId/alerts`
- **Descrição:** Dispara o alerta de pânico crítico para a central e dispara notificações push/SMS aos contatos de confiança.
- **Headers:** `Authorization: Bearer <accessToken>`, `Content-Type: application/json`
- **Request Body:**
```json
{
  "reason": "Acionamento de Pânico / SOS",
  "latitude": -23.561684,
  "longitude": -46.655981,
  "accuracy": 4.8,
  "audioDossierId": "EV-2026-9841",
  "triggeredAt": "2026-08-22T15:40:00.000Z"
}
```
- **Resposta de Sucesso (`201 Created`):**
```json
{
  "alertId": "alt_sos_9941",
  "status": "dispatched",
  "notifiedContactsCount": 3,
  "dispatchedAt": "2026-08-22T15:40:01.100Z"
}
```
- **Tratamento de Falha:** Caso a requisição retorne erro de rede (`Network Error`), o app **deve enfileirar o alerta localmente** (`SosQueue`) e retentar imediatamente em segundo plano.
