import { getAuthToken } from '../auth/authStorage';

export const API_BASE_URL = 'http://192.168.18.10:3002/api';

export interface RequestOptions extends Omit<RequestInit, 'body'> {
  body?: unknown;
  requiresAuth?: boolean;
}

export class ApiError extends Error {
  status: number;
  data?: unknown;

  constructor(message: string, status: number, data?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

export async function request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { body, requiresAuth = true, headers: customHeaders, ...customConfig } = options;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  if (requiresAuth) {
    const token = await getAuthToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  const config: RequestInit = {
    ...customConfig,
    headers: {
      ...headers,
      ...(customHeaders as Record<string, string>),
    },
  };

  if (body !== undefined) {
    config.body = JSON.stringify(body);
  }

  let response: Response;
  try {
    response = await fetch(url, config);
  } catch (err) {
    throw new ApiError(
      'Não foi possível conectar ao servidor. Verifique sua conexão com a rede.',
      0
    );
  }

  let data: unknown;
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    try {
      data = await response.json();
    } catch {
      data = null;
    }
  }

  if (!response.ok) {
    let errorMessage = 'Erro ao processar requisição';
    if (data && typeof data === 'object' && 'message' in data && typeof (data as { message: unknown }).message === 'string') {
      errorMessage = (data as { message: string }).message;
    } else if (data && typeof data === 'object' && 'error' in data && typeof (data as { error: unknown }).error === 'string') {
      errorMessage = (data as { error: string }).error;
    } else if (response.status === 401) {
      errorMessage = 'Sessão expirada ou credenciais inválidas.';
    } else if (response.status === 403) {
      errorMessage = 'Acesso não autorizado.';
    } else if (response.status === 404) {
      errorMessage = 'Recurso não encontrado.';
    } else if (response.status >= 500) {
      errorMessage = 'Erro interno do servidor. Tente novamente mais tarde.';
    }

    throw new ApiError(errorMessage, response.status, data);
  }

  return data as T;
}
