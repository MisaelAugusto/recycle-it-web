import React, { createContext, useCallback, useContext, useState } from 'react';
import api from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
  // avatar: string; or avatar_url
}

interface Recycler extends User {
  state: string;
  city: string;
}

interface CollectPoint extends User {
  // phone: string; or whatsapp
  latitude: number;
  longitude: number;
}

interface AuthState {
  token: string;
  user: Recycler | CollectPoint;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: Recycler | CollectPoint;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  updateUser(user: Recycler | CollectPoint): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@RecycleIt:token');
    const user = localStorage.getItem('@RecycleIt:user');

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', {
      email,
      password
    });

    const { token, user } = response.data;

    localStorage.setItem('@RecycleIt:token', token);
    localStorage.setItem('@RecycleIt:user', JSON.stringify(user));

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@RecycleIt:token');
    localStorage.removeItem('@RecycleIt:user');

    setData({} as AuthState);
  }, []);

  const updateUser = useCallback(
    (user: Recycler | CollectPoint) => {
      localStorage.setItem('@RecycleIt:user', JSON.stringify(user));

      setData({
        token: data.token,
        user
      });
    },
    [setData, data.token]
  );

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
