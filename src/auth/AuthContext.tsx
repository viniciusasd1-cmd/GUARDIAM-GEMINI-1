import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthUser, LoginPayload, RegisterPayload } from '../domain/auth';
import { authApi } from '../api/authApi';
import {
  clearAuthSession,
  getAuthToken,
  getAuthUser,
  saveAuthToken,
  saveAuthUser,
} from './authStorage';

export interface AuthContextData {
  user: AuthUser | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => Promise<void>;
  restoreSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const restoreSession = async () => {
    try {
      setIsLoading(true);
      const storedToken = await getAuthToken();
      if (!storedToken) {
        setUser(null);
        setToken(null);
        return;
      }

      setToken(storedToken);

      // Validate with backend GET /auth/me
      const meResponse = await authApi.getMe();
      if (meResponse && meResponse.user) {
        setUser(meResponse.user);
        await saveAuthUser(meResponse.user);
      } else {
        // Fallback to stored user or clear if invalid
        const storedUser = await getAuthUser();
        if (storedUser) {
          setUser(storedUser);
        } else {
          await clearAuthSession();
          setUser(null);
          setToken(null);
        }
      }
    } catch {
      // In case /auth/me returns 401 or fails, clear local session
      await clearAuthSession();
      setUser(null);
      setToken(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    restoreSession();
  }, []);

  const login = async (payload: LoginPayload) => {
    const response = await authApi.login(payload);
    if (!response.accessToken || !response.user) {
      throw new Error('Resposta de autenticação inválida do servidor.');
    }

    await saveAuthToken(response.accessToken);
    await saveAuthUser(response.user);

    setToken(response.accessToken);
    setUser(response.user);
  };

  const register = async (payload: RegisterPayload) => {
    const response = await authApi.register(payload);
    if (!response.accessToken || !response.user) {
      throw new Error('Resposta de cadastro inválida do servidor.');
    }

    await saveAuthToken(response.accessToken);
    await saveAuthUser(response.user);

    setToken(response.accessToken);
    setUser(response.user);
  };

  const logout = async () => {
    await clearAuthSession();
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isAuthenticated: !!token && !!user,
        login,
        register,
        logout,
        restoreSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}
