import { useState, useEffect, useCallback } from 'react';

const SESSION_KEY = 'jigish_admin_session';
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'jigish2024';

export function useAdmin() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem(SESSION_KEY) === 'true';
  });

  useEffect(() => {
    const handleStorage = () => {
      setIsAuthenticated(sessionStorage.getItem(SESSION_KEY) === 'true');
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const login = useCallback((password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, 'true');
      setIsAuthenticated(true);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(SESSION_KEY);
    setIsAuthenticated(false);
  }, []);

  return { isAuthenticated, login, logout };
}
