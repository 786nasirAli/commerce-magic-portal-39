
import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthState {
  isAdmin: boolean;
  isLoggedIn: boolean;
}

interface AuthContextType extends AuthState {
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAdmin: false,
    isLoggedIn: false,
  });

  useEffect(() => {
    const savedAuth = localStorage.getItem('auth');
    if (savedAuth) {
      setAuthState(JSON.parse(savedAuth));
    }
  }, []);

  const login = (username: string, password: string): boolean => {
    // Simple admin credentials
    if (username === 'admin' && password === 'admin123') {
      const newState = { isAdmin: true, isLoggedIn: true };
      setAuthState(newState);
      localStorage.setItem('auth', JSON.stringify(newState));
      return true;
    }
    return false;
  };

  const logout = () => {
    const newState = { isAdmin: false, isLoggedIn: false };
    setAuthState(newState);
    localStorage.removeItem('auth');
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
