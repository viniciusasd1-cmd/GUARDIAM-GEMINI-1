import { request } from './apiClient';
import { AuthResponse, AuthUser, LoginPayload, RegisterPayload } from '../domain/auth';

export const authApi = {
  async login(payload: LoginPayload): Promise<AuthResponse> {
    return request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: {
        email: payload.email.trim(),
        password: payload.password,
      },
      requiresAuth: false,
    });
  },

  async register(payload: RegisterPayload): Promise<AuthResponse> {
    const body: Record<string, string> = {
      name: payload.name.trim(),
      email: payload.email.trim(),
      password: payload.password,
    };
    if (payload.phone && payload.phone.trim()) {
      body.phone = payload.phone.trim();
    }

    return request<AuthResponse>('/auth/register', {
      method: 'POST',
      body,
      requiresAuth: false,
    });
  },

  async getMe(): Promise<{ status?: string; user: AuthUser }> {
    return request<{ status?: string; user: AuthUser }>('/auth/me', {
      method: 'GET',
      requiresAuth: true,
    });
  },
};
