import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createStackNavigator } from '@react-navigation/stack';
import TopTabNavigator from '../../components/ProfileMenuBarTest'

export default function App() {
  return (
    <SafeAreaProvider>
        <TopTabNavigator/>
    </SafeAreaProvider>
  );
}
