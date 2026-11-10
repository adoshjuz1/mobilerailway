import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme";

// шапка
export default function Header({
  title,
  onBack,
  onAvatarPress,
  centered = false,
}) {
  const isBrand = !title;

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconBtn} onPress={onBack}>
        <Ionicons
          name={onBack ? "arrow-back" : "menu"}
          size={24}
          color={colors.primary}
        />
      </TouchableOpacity>

      <Text
        style={[
          styles.title,
          isBrand ? styles.brandTitle : styles.screenTitle,
          centered && styles.titleCentered,
        ]}
        numberOfLines={1}
      >
        {isBrand ? "Railway Connect" : title}
      </Text>

      <TouchableOpacity
        onPress={onAvatarPress}
        activeOpacity={onAvatarPress ? 0.7 : 1}
      >
        <View style={styles.avatar}>
          <Ionicons name="person" size={18} color={colors.primary} />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  iconBtn: {
    width: 36,
    height: 36,
    justifyContent: "center",
  },
  title: {
    flex: 1,
    color: colors.primary,
    marginLeft: 4,
  },
  brandTitle: {
    fontSize: 24,
    fontWeight: "700",
  },
  screenTitle: {
    fontSize: 20,
    fontWeight: "600",
  },
  titleCentered: {
    textAlign: "center",
    marginLeft: 0,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#E2E8F0",
    justifyContent: "center",
    alignItems: "center",
  },
});
