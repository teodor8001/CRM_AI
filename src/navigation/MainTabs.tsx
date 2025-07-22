import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ClientListScreen } from '../screens/ClientListScreen';
import { CustomFieldsScreen } from '../screens/CustomFieldsScreen';

const Tab = createBottomTabNavigator();

export const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false, // păstrăm header separat în stack dacă vrem
      }}
    >
      <Tab.Screen name="Clients" component={ClientListScreen} />
      <Tab.Screen name="Custom Fields" component={CustomFieldsScreen} />
    </Tab.Navigator>
  );
};
