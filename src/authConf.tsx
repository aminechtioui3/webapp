import React, { createContext, useState, useEffect, ReactNode } from 'react';

// Define the AuthContextType
type AuthContextType = {
  user: { token: string } | null;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
};

// Create the AuthContext with a default value
const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<{ token: string } | null>(() => {
    const storedToken = localStorage.getItem('token');
    return storedToken ? { token: storedToken } : null;
  });

  const login = (token: string) => {
    setUser({ token });
    localStorage.setItem('token', token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  const isAuthenticated = Boolean(user?.token);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
