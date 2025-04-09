import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginWithEmail, registerWithEmail, loginWithOAuth, getUser, updateUser as updateUserApi } from '../api';

interface AuthContextType {
  user: any;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  googleLogin: () => void;
  githubLogin: () => void;
  updateUser: (user: any) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const jwtToken = urlParams.get('token');
    if (jwtToken) {
      setToken(jwtToken);
      localStorage.setItem('token', jwtToken);
      window.history.replaceState({}, document.title, window.location.pathname);
      fetchUser(jwtToken);
    } else {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        setToken(storedToken);
        fetchUser(storedToken);
      }
    }
  }, []);

  const fetchUser = async (jwtToken: string) => {
    try {
      const response = await getUser('user-id', jwtToken); // Replace 'user-id' with actual logic
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const login = async (email: string, password: string) => {
    const response = await loginWithEmail(email, password);
    const jwtToken = response.data;
    setToken(jwtToken);
    localStorage.setItem('token', jwtToken);
    await fetchUser(jwtToken);
  };

  const register = async (name: string, email: string, password: string) => {
    const response = await registerWithEmail(name, email, password);
    const jwtToken = response.data;
    setToken(jwtToken);
    localStorage.setItem('token', jwtToken);
    await fetchUser(jwtToken);
  };

  const googleLogin = () => loginWithOAuth('google');
  const githubLogin = () => loginWithOAuth('github');

  const updateUser = async (updatedUser: any) => {
    if (token) {
      const response = await updateUserApi(user.id, updatedUser, token);
      setUser(response.data);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, googleLogin, githubLogin, updateUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};