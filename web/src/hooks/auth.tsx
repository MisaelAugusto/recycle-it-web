import React, { createContext, useCallback, useContext, useState } from 'react';
import api from '../services/api';

interface User {
  id: string;
  name: string;
  city: string;
  state: string;
  email: string;
}

export interface Recycler extends User {
  name_id: string;
  avatar_url: string;
}

export interface CollectPoint extends User {
  items: string;
  whatsapp: string;
  latitude: number;
  longitude: number;
  image_url: string;
}

interface AuthState {
  token: string;
  user: Recycler | CollectPoint;
  userType: string;
}

interface SignInCredentials {
  email: string;
  password: string;
  userType: 'recycler' | 'collect-point';
}

interface AuthContextData {
  user: Recycler | CollectPoint;
  userType: string;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  updateUser(user: Recycler | CollectPoint): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const user = localStorage.getItem('@RecycleIt:user');
    const token = localStorage.getItem('@RecycleIt:token');
    const userType = localStorage.getItem('@RecycleIt:userType');

    if (token && user && userType) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      return {
        token,
        user: JSON.parse(user),
        userType
      };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password, userType }) => {
    const sessionResponse = await api.post('sessions', {
      email,
      password,
      userType
    });

    const { token, user } = sessionResponse.data;

    localStorage.setItem('@RecycleIt:token', token);
    localStorage.setItem('@RecycleIt:userType', userType);
    localStorage.setItem('@RecycleIt:user', JSON.stringify(user));

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user, userType });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@RecycleIt:user');
    localStorage.removeItem('@RecycleIt:token');
    localStorage.removeItem('@RecycleIt:userType');

    setData({} as AuthState);
  }, []);

  const updateUser = useCallback(
    (user: Recycler | CollectPoint) => {
      localStorage.setItem('@RecycleIt:user', JSON.stringify(user));

      setData({
        token: data.token,
        user,
        userType: data.userType
      });
    },
    [setData, data]
  );

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        userType: data.userType,
        signIn,
        signOut,
        updateUser
      }}
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
