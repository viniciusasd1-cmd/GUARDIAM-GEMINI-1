import * as SecureStore from 'expo-secure-store';
import { AuthUser } from '../domain/auth';

const TOKEN_KEY = 'guardiam_auth_token';
const USER_KEY = 'guardiam_auth_user';

export async function saveAuthToken(token: string): Promise<void> {
  try {
    await SecureStore.setItemAsync(TOKEN_KEY, token);
  } catch (error) {
    console.error('Erro ao salvar token de autenticação');
  }
}

export async function getAuthToken(): Promise<string | null> {
  try {
    return await SecureStore.getItemAsync(TOKEN_KEY);
  } catch (error) {
    console.error('Erro ao recuperar token de autenticação');
    return null;
  }
}

export async function removeAuthToken(): Promise<void> {
  try {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
  } catch (error) {
    console.error('Erro ao remover token de autenticação');
  }
}

export async function saveAuthUser(user: AuthUser): Promise<void> {
  try {
    await SecureStore.setItemAsync(USER_KEY, JSON.stringify(user));
  } catch (error) {
    console.error('Erro ao salvar usuário em storage');
  }
}

export async function getAuthUser(): Promise<AuthUser | null> {
  try {
    const raw = await SecureStore.getItemAsync(USER_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AuthUser;
  } catch (error) {
    console.error('Erro ao recuperar usuário de storage');
    return null;
  }
}

export async function removeAuthUser(): Promise<void> {
  try {
    await SecureStore.deleteItemAsync(USER_KEY);
  } catch (error) {
    console.error('Erro ao remover usuário de storage');
  }
}

export async function clearAuthSession(): Promise<void> {
  await Promise.all([removeAuthToken(), removeAuthUser()]);
}
