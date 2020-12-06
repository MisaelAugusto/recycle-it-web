import React from 'react';

import { AuthProvider } from './auth';
import { RecyclingsProvider } from './recyclings';

const AppProvider: React.FC = ({ children }) => {
  return (
    <AuthProvider>
      <RecyclingsProvider>{children}</RecyclingsProvider>
    </AuthProvider>
  );
};

export default AppProvider;
