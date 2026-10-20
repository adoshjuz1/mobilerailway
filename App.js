import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Подключаем только реально созданные экраны
import OnboardingScreen from './src/screens/OnboardingScreen';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import SearchResultsScreen from './src/screens/SearchResultsScreen';
import SeatSelectionScreen from './src/screens/SeatSelectionScreen';
import PassengerInfoScreen from './src/screens/PassengerInfoScreen';
import BookingSummaryScreen from './src/screens/BookingSummaryScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Нижние табы (только с реальным HomeScreen)
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#00D18F',
        tabBarInactiveTintColor: '#94A3B8',
        tabBarStyle: { 
          backgroundColor: '#FFFFFF', 
          borderTopColor: '#E2E8F0', 
          borderTopWidth: 1,
          height: 70, 
          paddingBottom: 10, 
          paddingTop: 8,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.05,
          shadowRadius: 10,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
        tabBarIcon: () => <Text style={{ fontSize: 20 }}>🔍</Text>,
      })}
    >
      <Tab.Screen 
        name="SearchTab" 
        component={HomeScreen} 
        options={{ tabBarLabel: 'Іздеу' }} 
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Onboarding"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen 
          name="Onboarding" 
          component={OnboardingScreen} 
        />
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
        />
        <Stack.Screen 
          name="Main" 
          component={MainTabs} 
        />
        <Stack.Screen 
          name="SearchResults" 
          component={SearchResultsScreen} 
        />
        <Stack.Screen name="SeatSelection" 
        component={SeatSelectionScreen} 
        />
        <Stack.Screen name="PassengerInfo" 
        component={PassengerInfoScreen} 
        />
        <Stack.Screen name="BookingSummary" 
        component={BookingSummaryScreen} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}