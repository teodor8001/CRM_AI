import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ClientListScreen } from './src/screens/ClientListScreen';
import { ClientDetailScreen } from './src/screens/ClientDetailScreen';
import { Client } from './src/models/Client';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MainTabs } from './src/navigation/MainTabs';

export type RootStackParamList = {
  ClientList: undefined;
  ClientDetail: { client: Client };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
    return (
      <SafeAreaProvider>
        <NavigationContainer>
          <MainTabs />
        </NavigationContainer>
      </SafeAreaProvider>
    );
};

export default App;
