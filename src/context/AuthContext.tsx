import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authApi } from '../api/apiClient';

// Types
interface User {
  id?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  roleTypes?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  register: (userData: any) => Promise<void>;
  validateAccount: (verificationCode: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

// Création du contexte
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook personnalisé pour utiliser le contexte
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Provider du contexte
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Vérifier si l'utilisateur est déjà connecté au chargement
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      // Ici, vous pourriez ajouter une requête pour récupérer les informations de l'utilisateur
      // en utilisant le token stocké
    }
  }, []);

  // Inscription d'un utilisateur
  const register = async (userData: any) => {
    setIsLoading(true);
    setError(null);
    try {
      await authApi.register(userData);
      setIsLoading(false);
    } catch (err: any) {
      setIsLoading(false);
      setError(err.response?.data?.message || 'Une erreur est survenue lors de l\'inscription');
      throw err;
    }
  };

  // Validation du compte
  const validateAccount = async (verificationCode: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await authApi.validateAccount(verificationCode);
      setIsLoading(false);
    } catch (err: any) {
      setIsLoading(false);
      setError(err.response?.data?.message || 'Une erreur est survenue lors de la validation du compte');
      throw err;
    }
  };

  // Connexion
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authApi.login({ email, password });
      const { token: newToken } = response.data;
      
      // Stocker le token dans localStorage
      localStorage.setItem('token', newToken);
      setToken(newToken);
      
      // Définir l'utilisateur (vous pourriez avoir besoin d'une requête supplémentaire pour obtenir les détails de l'utilisateur)
      setUser({ email });
      
      setIsLoading(false);
    } catch (err: any) {
      setIsLoading(false);
      setError(err.response?.data?.message || 'Identifiants incorrects');
      throw err;
    }
  };

  // Déconnexion
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    isAuthenticated: !!token,
    isLoading,
    error,
    register,
    validateAccount,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}; 