import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';

import HomeScreen from './src/screens/HomeScreen';
import SearchResultsScreen from './src/screens/SearchResultsScreen';
import SeatSelectionScreen from './src/screens/SeatSelectionScreen';
import KtzNewsScreen from './src/screens/KtzNewsScreen';
import UniNewsScreen from './src/screens/UniNewsScreen';
import PostDetailScreen from './src/screens/PostDetailScreen';
import ProfileScreen from './src/screens/ProfileScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#0dcaf0',
        tabBarInactiveTintColor: '#b0c4de',
        tabBarStyle: { 
          backgroundColor: '#0F2C59', 
          borderTopColor: '#071428', 
          borderTopWidth: 2,
          height: 70, 
          paddingBottom: 10, 
          paddingTop: 8,
          marginBottom: 10,
          marginHorizontal: 10,
          borderRadius: 20,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.3,
          shadowRadius: 10,
          elevation: 10,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: 'bold',
        },
        tabBarIcon: ({ focused }) => {
          let icon = '🔍';
          if (route.name === 'KtzTab') icon = '🚆';
          if (route.name === 'UniTab') icon = '🎓';
          if (route.name === 'ProfileTab') icon = '🐶';
          return <Text style={{ fontSize: 20 }}>{icon}</Text>;
        },
      })}
    >
      <Tab.Screen 
        name="SearchTab" 
        component={HomeScreen} 
        options={{ tabBarLabel: 'Поиск' }} 
      />
      <Tab.Screen 
        name="KtzTab" 
        component={KtzNewsScreen} 
        options={{ tabBarLabel: 'КТЖ' }} 
      />
      <Tab.Screen 
        name="UniTab" 
        component={UniNewsScreen} 
        options={{ tabBarLabel: 'ALT' }} 
      />
      <Tab.Screen 
        name="ProfileTab" 
        component={ProfileScreen} 
        options={{ tabBarLabel: 'Профиль' }} 
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#0F2C59' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen 
          name="Main" 
          component={MainTabs} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="SearchResults" 
          component={SearchResultsScreen} 
          options={{ title: 'Результаты поиска' }} 
        />
        <Stack.Screen 
          name="SeatSelection" 
          component={SeatSelectionScreen} 
          options={{ title: 'Выбор мест' }} 
        />
        <Stack.Screen 
          name="PostDetail" 
          component={PostDetailScreen} 
          options={{ title: 'Публикация' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}