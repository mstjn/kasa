/* eslint-disable react-hooks/set-state-in-effect */

"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

/**
 * Structure du contexte d'authentification.
 */
interface AuthContextType {
  token: string | null;
  userId: string | null;
  loading: boolean;
  login: (token: string, userId: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Fournisseur du contexte d'authentification.
 *
 * - Stocke le token et l'identifiant utilisateur
 * - Initialise l'état depuis le localStorage
 * - Expose les méthodes de connexion et de déconnexion
 *
 * @component
 * @param {{ children: ReactNode }} props - Composants enfants enveloppés par le provider
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  /**
   * Initialise l'état d'authentification à partir du localStorage
   * au chargement de l'application.
   */
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUserId = localStorage.getItem("userId");

    setToken(storedToken);
    setUserId(storedUserId);
    setLoading(false);
  }, []);

  
  /**
   * Connecte l'utilisateur.
   *
   * @param {string} token - Token d'authentification
   * @param {string} userId - Identifiant de l'utilisateur
   */
  const login = (token: string, userId: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);

    setToken(token);
    setUserId(userId);
  };

  
  /**
   * Déconnecte l'utilisateur et nettoie le localStorage.
   */
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

/**
 * Hook personnalisé permettant d'accéder au contexte d'authentification.
 *
 * @returns {AuthContextType} Données et méthodes d'authentification
 * @throws {Error} Si utilisé en dehors de AuthProvider
 */
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
