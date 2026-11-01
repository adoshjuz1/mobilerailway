import React from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

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

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Цвета таб-бара (точные значения можно уточнить в Figma → Dev Mode)
const TAB_ACTIVE_PILL = '#7CF0C4';
const TAB_ACTIVE_TINT = '#003d9b';
const TAB_INACTIVE_TINT = '#64748B';

// [иконка активной вкладки, иконка неактивной]
const TAB_ICONS = {
  SearchTab: ['search', 'search-outline'],
  MyTripsTab: ['ticket', 'ticket-outline'],
  AlertsTab: ['notifications', 'notifications-outline'],
  ProfileTab: ['person', 'person-outline'],
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
const SearchStackNav = createNativeStackNavigator();

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
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#E2E8F0',
          borderTopWidth: 1,
          height: 64 + insets.bottom,
          paddingTop: 8,
          paddingBottom: insets.bottom + 6,
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
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
  },
  tabPillActive: {
    backgroundColor: TAB_ACTIVE_PILL,
  },
});