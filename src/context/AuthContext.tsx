import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { login as loginRequest } from '../api/api';
import type { AuthContextValue } from '../types';

const AuthContext = createContext<AuthContextValue | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('portfolio_token'));
  const [username, setUsername] = useState<string | null>(() => localStorage.getItem('portfolio_username'));

  const login = useCallback(async (username: string, password: string) => {
    const { data } = await loginRequest({ username, password });
    // data.token já vem como "Bearer eyJ..." pronto do backend
    localStorage.setItem('portfolio_token', data.token);
    localStorage.setItem('portfolio_username', data.username);
    setToken(data.token);
    setUsername(data.username);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('portfolio_token');
    localStorage.removeItem('portfolio_username');
    setToken(null);
    setUsername(null);
  }, []);

  const value: AuthContextValue = { token, username, isAuthenticated: Boolean(token), login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth precisa estar dentro de um AuthProvider');
  return ctx;
}
