import React, { createContext, useCallback, useContext, useState } from 'react';
import api from '../services/api';

export interface Recycling {
  id: string;
  items: string;
  finished: 0 | 1;
  quantities: string;
  recycler_id: string;
}

interface RecyclingsState {
  recyclings: Recycling[];
}

interface RecyclingsContextData {
  recyclings: Recycling[];
  updateRecyclings(userType: string): void;
}

const RecyclingsContext = createContext<RecyclingsContextData>(
  {} as RecyclingsContextData
);

const RecyclingsProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<RecyclingsState>({ recyclings: [] });

  const updateRecyclings = useCallback(async (userType: string) => {
    const response = await api.get(`recyclings?userType=${userType}`);

    const recyclings = response.data;

    setData({ recyclings });
  }, []);

  return (
    <RecyclingsContext.Provider
      value={{
        recyclings: data.recyclings,
        updateRecyclings
      }}
    >
      {children}
    </RecyclingsContext.Provider>
  );
};

function useRecyclings(): RecyclingsContextData {
  const context = useContext(RecyclingsContext);

  if (!context) {
    throw new Error('useRecyclings must be used within a AuthProvider');
  }

  return context;
}

export { RecyclingsProvider, useRecyclings };
