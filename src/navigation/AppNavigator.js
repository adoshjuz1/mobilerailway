import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import SearchResultsScreen from '../screens/SearchResultsScreen';
import SeatSelectionScreen from '../screens/SeatSelectionScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ title: 'Поиск билетов' }} 
      />
      <Stack.Screen 
        name="SearchResults" 
        component={SearchResultsScreen} 
        options={{ title: 'Доступные рейсы' }} 
      />
      <Stack.Screen 
        name="SeatSelection" 
        component={SeatSelectionScreen} 
        options={{ title: 'Выбор места' }} 
      />
    </Stack.Navigator>
  );
}