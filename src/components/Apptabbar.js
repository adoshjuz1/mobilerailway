import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../theme";

// [иконка активной,неактивной вкладки]
const TABS = [
  { name: "SearchTab", label: "Іздеу", icon: ["search", "search-outline"] },
  { name: "MyTripsTab", label: "Сапарлар", icon: ["ticket", "ticket-outline"] },
  {
    name: "AlertsTab",
    label: "Ескертулер",
    icon: ["notifications", "notifications-outline"],
  },
  {
    name: "ProfileTab",
    label: "Профиль",
    icon: ["person-circle", "person-circle-outline"],
  },
];

// Общий таббар
export default function AppTabBar({ activeTab, onTabPress }) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.bar,
        { height: 68 + insets.bottom, paddingBottom: insets.bottom },
      ]}
    >
      {TABS.map((tab) => {
        const focused = tab.name === activeTab;
        const color = focused ? colors.onSurface : colors.onSurfaceVariant;

        return (
          <Pressable
            key={tab.name}
            onPress={() => onTabPress(tab.name)}
            accessibilityRole="button"
            accessibilityState={{ selected: focused }}
            style={styles.item}
          >
            <View style={[styles.pill, focused && styles.pillActive]}>
              <Ionicons
                name={focused ? tab.icon[0] : tab.icon[1]}
                size={22}
                color={color}
              />
              <Text style={[styles.label, { color }]}>{tab.label}</Text>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: "row",
    paddingTop: 4,
    backgroundColor: colors.card,
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
  },
  item: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  pill: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 22,
  },
  pillActive: {
    backgroundColor: colors.mint,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    marginTop: 2,
  },
});
