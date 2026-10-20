import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Подключаем сверстанные экраны
import OnboardingScreen from './src/screens/OnboardingScreen';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import SearchResultsScreen from './src/screens/SearchResultsScreen';
import SeatSelectionScreen from './src/screens/SeatSelectionScreen';
import PassengerInfoScreen from './src/screens/PassengerInfoScreen';
import BookingSummaryScreen from './src/screens/BookingSummaryScreen';
import TicketConfirmationScreen from './src/screens/TicketConfirmationScreen';
import MyTripsScreen from './src/screens/MyTripsScreen';
import AlertsScreen from './src/screens/AlertsScreen';
import ProfileScreen from "./src/screens/ProfileScreen";
import TrainDetailsScreen from './src/screens/TrainDetailsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

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
        tabBarIcon: ({ focused }) => {
          let icon = '🔍';
          if (route.name === "MyTripsTab") icon = "🎫";
          if (route.name === "AlertsTab") icon = "🔔";
          if (route.name === "ProfileTab") icon = "👤";
          return <Text style={{ fontSize: 20 }}>{icon}</Text>;
        },
      })}
    >
      <Tab.Screen 
        name="SearchTab" 
        component={HomeScreen} 
        options={{ tabBarLabel: 'Іздеу' }} 
      />
      <Tab.Screen   
        name="MyTripsTab" 
        component={MyTripsScreen} 
        options={{ tabBarLabel: 'Сапарлар' }} 
      />
      <Tab.Screen 
        name="AlertsTab" 
        component={AlertsScreen} 
        options={{tabBarLabel: 'Ескертулер'}}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{tabBarLabel: "Профиль"}}
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
        <Stack.Screen 
          name="SeatSelection" 
          component={SeatSelectionScreen} 
        />
        <Stack.Screen 
          name="PassengerInfo" 
          component={PassengerInfoScreen} 
        />
        <Stack.Screen 
          name="BookingSummary" 
          component={BookingSummaryScreen} 
        />
        <Stack.Screen 
          name="TicketConfirmation"
          component={TicketConfirmationScreen}
        />
        <Stack.Screen
          name='TrainDetails'
          component={TrainDetailsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}