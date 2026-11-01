import React from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import { JetBrainsMono_500Medium, JetBrainsMono_700Bold } from '@expo-google-fonts/jetbrains-mono';

import { applyFonts } from './src/utils/applyFonts';
import { colors } from './src/theme';

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

const TAB_ACTIVE_TINT = colors.onSurface;
const TAB_INACTIVE_TINT = colors.onSurfaceVariant;

// [иконка активной вкладки, иконка неактивной]
const TAB_ICONS = {
  SearchTab: ['search', 'search-outline'],
  MyTripsTab: ['ticket', 'ticket-outline'],
  AlertsTab: ['notifications', 'notifications-outline'],
  ProfileTab: ['person-circle', 'person-circle-outline'],
};

// Кнопка вкладки: иконка и подпись вместе в зелёной «пилюле», когда вкладка активна
function TabButton({ children, onPress, onLongPress, accessibilityState, testID }) {
  const focused = accessibilityState?.selected;
  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      testID={testID}
      accessibilityRole="button"
      accessibilityState={accessibilityState}
      style={styles.tabWrap}
    >
      <View style={[styles.tabPill, focused && styles.tabPillActive]}>{children}</View>
    </Pressable>
  );
}

// Вложенный стек внутри вкладки «Іздеу»: на Home и SearchResults виден таб-бар
function SearchStack() {
  return (
    <SearchStackNav.Navigator screenOptions={{ headerShown: false }}>
      <SearchStackNav.Screen name="Home" component={HomeScreen} />
      <SearchStackNav.Screen name="SearchResults" component={SearchResultsScreen} />
    </SearchStackNav.Navigator>
  );
}

function MainTabs() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: TAB_ACTIVE_TINT,
        tabBarInactiveTintColor: TAB_INACTIVE_TINT,
        tabBarButton: (props) => <TabButton {...props} />,
        // Таб-бар прижат к низу экрана, верхние углы скруглены
        tabBarStyle: {
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: 68 + insets.bottom,
          borderTopLeftRadius: 26,
          borderTopRightRadius: 26,
          backgroundColor: colors.card,
          borderTopWidth: 0,
          paddingTop: 4,
          paddingBottom: insets.bottom,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.08,
          shadowRadius: 12,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 2,
        },
        tabBarIcon: ({ focused, color }) => {
          const [active, inactive] = TAB_ICONS[route.name];
          return <Ionicons name={focused ? active : inactive} size={22} color={color} />;
        },
      })}
    >
      <Tab.Screen name="SearchTab" component={SearchStack} options={{ tabBarLabel: 'Іздеу' }} />
      <Tab.Screen name="MyTripsTab" component={MyTripsScreen} options={{ tabBarLabel: 'Сапарлар' }} />
      <Tab.Screen name="AlertsTab" component={AlertsScreen} options={{ tabBarLabel: 'Ескертулер' }} />
      <Tab.Screen name="ProfileTab" component={ProfileScreen} options={{ tabBarLabel: 'Профиль' }} />
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

const styles = StyleSheet.create({
  tabWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabPill: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 22,
  },
  tabPillActive: {
    backgroundColor: colors.mint,
  },
});