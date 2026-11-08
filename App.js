import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import { JetBrainsMono_500Medium, JetBrainsMono_700Bold } from '@expo-google-fonts/jetbrains-mono';

import { applyFonts } from './src/utils/applyFonts';
import AppTabBar from './src/components/AppTabBar';

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
import ProfileScreen from './src/screens/ProfileScreen';
import TrainDetailsScreen from './src/screens/TrainDetailsScreen';

// Шрифт Inter подставляется во все Text и TextInput по fontWeight
applyFonts();

const Stack = createNativeStackNavigator();
const SearchStackNav = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Вложенный стек внутри вкладки «Іздеу»: на Home и SearchResults виден таб-бар
function SearchStack() {
  return (
    <SearchStackNav.Navigator screenOptions={{ headerShown: false }}>
      <SearchStackNav.Screen name="Home" component={HomeScreen} />
      <SearchStackNav.Screen name="SearchResults" component={SearchResultsScreen} />
    </SearchStackNav.Navigator>
  );
}

// Таб-бар навигатора: берём общий AppTabBar и подключаем к нему переключение вкладок
function MainTabBar({ state, navigation }) {
  const activeTab = state.routes[state.index].name;

  const handleTabPress = (name) => {
    const route = state.routes.find((r) => r.name === name);
    const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
    if (name !== activeTab && !event.defaultPrevented) {
      navigation.navigate(name);
    }
  };

  return <AppTabBar activeTab={activeTab} onTabPress={handleTabPress} />;
}

function MainTabs() {
  return (
    <Tab.Navigator
      tabBar={(props) => <MainTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="SearchTab" component={SearchStack} />
      <Tab.Screen name="MyTripsTab" component={MyTripsScreen} />
      <Tab.Screen name="AlertsTab" component={AlertsScreen} />
      <Tab.Screen name="ProfileTab" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    JetBrainsMono_500Medium,
    JetBrainsMono_700Bold,
  });

  // Пока шрифты грузятся, ничего не рисуем (при ошибке всё равно запускаем приложение)
  if (!fontsLoaded && !fontError) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Onboarding" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Main" component={MainTabs} />
        <Stack.Screen name="TrainDetails" component={TrainDetailsScreen} />
        <Stack.Screen name="SeatSelection" component={SeatSelectionScreen} />
        <Stack.Screen name="PassengerInfo" component={PassengerInfoScreen} />
        <Stack.Screen name="BookingSummary" component={BookingSummaryScreen} />
        <Stack.Screen name="TicketConfirmation" component={TicketConfirmationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}