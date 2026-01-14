/* eslint-disable react-hooks/set-state-in-effect */

"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface AuthContextType {
  token: string | null;
  userId: string | null;
  loading: boolean;
  login: (token: string, userId: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUserId = localStorage.getItem("userId");

    setToken(storedToken);
    setUserId(storedUserId);
    setLoading(false);
  }, []);

  const login = (token: string, userId: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);

    setToken(token);
    setUserId(userId);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");

    setToken(null);
    setUserId(null);
  };

  return (
    <AuthContext.Provider
      value={{ token, userId, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
