import {View, Text} from 'react-native';
import React from 'react';

import AuthProvider from './src/context/AuthContext';
import AppRoutes from './src/routes/AppRoutes';

const App = () => {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
};

export default App;
