import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import axios from 'axios';

interface User {
  id: number;
  username: string;
  email: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const api = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [auth, setAuth] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    loading: true,
  });

  useEffect(()=> {
    const checkAuth = () => {
        const response = localStorage.getItem('user');
        if (response) {
          const user = JSON.parse(response);
        setAuth({
          user: user,
          isAuthenticated: true,
          loading: false,
        });
      } else {
        setAuth({
          user: null,
          isAuthenticated: false,
          loading: false,
        });
      }
    };

    checkAuth();
  },[])

  
  const login = async (email: string, password: string): Promise<void> => {
    try {
      const response = await api.post('/api/auth/login', {
        email,
        password,
      });
      console.log("in the login route authcontext", response);
      
      setAuth({
        user: response.data.user,
        isAuthenticated: true,
        loading: false,
      });
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  
  const register = async (username: string, email: string, password: string): Promise<void> => {
    console.log("Auth context: signup attempt with", email);
    try {
      const response = await api.post('/api/auth/register', {
        username,
        email,
        password,
      });
      
      console.log("Signup response:", response.data);
      
      setAuth({
        user: response.data.user,
        isAuthenticated: true,
        loading: false,
      });
    } catch (error: any) {
      console.error("Signup error:", error.response?.data || error.message);
      throw error;
    }
  };
  
  const logout = async (): Promise<void> => {
    try {
      
      await api.post('/api/auth/logout');
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setAuth({
        user: null,
        isAuthenticated: false,
        loading: false,
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...auth,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { api };