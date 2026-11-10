import React from "react";
import { Text, TextInput, StyleSheet } from "react-native";

const FAMILY_BY_WEIGHT = {
  normal: "Inter_400Regular",
  400: "Inter_400Regular",
  500: "Inter_500Medium",
  600: "Inter_600SemiBold",
  700: "Inter_700Bold",
  bold: "Inter_700Bold",
  800: "Inter_700Bold",
  900: "Inter_700Bold",
};

let applied = false;

function patchFont(Component) {
  if (!Component || typeof Component.render !== "function") return;
  const originalRender = Component.render;

  Component.render = function render(...args) {
    const element = originalRender.apply(this, args);
    const flat = StyleSheet.flatten(element.props.style) || {};
    // Если шрифт задан явно (например, JetBrains Mono), не трогаем
    if (flat.fontFamily) return element;

    const family =
      FAMILY_BY_WEIGHT[String(flat.fontWeight || "normal")] ||
      FAMILY_BY_WEIGHT.normal;
    return React.cloneElement(element, {
      style: [
        element.props.style,
        { fontFamily: family, fontWeight: "normal" },
      ],
    });
  };
}

export function applyFonts() {
  if (applied) return;
  applied = true;
  patchFont(Text);
  patchFont(TextInput);
}
