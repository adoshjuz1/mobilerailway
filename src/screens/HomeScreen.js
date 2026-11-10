import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Header from "../components/Header";

const pad = (n) => String(n).padStart(2, "0");

// Сегодняшняя дата в формате ГГГГ-ММ-ДД (его ждёт SearchResultsScreen)
const getTodayIso = () => {
  const d = new Date();
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};

// ГГГГ-ММ-ДД -> ДД.ММ.ГГГГ для отображения
const toDisplayDate = (iso) => {
  const [y, m, d] = iso.split("-");
  return `${d}.${m}.${y}`;
};

const POPULAR_ROUTES = [
  {
    id: "almaty",
    from: "Астана",
    to: "Алматы",
    fromTag: "АСТАНАДАН",
    price: "12 500",
    icon: "nutrition",
    color: "#1D4ED8",
  },
  {
    id: "astana",
    from: "Алматы",
    to: "Астана",
    fromTag: "АЛМАТЫДАН",
    price: "12 500",
    icon: "business",
    color: "#10B981",
  },
  {
    id: "shymkent",
    from: "Алматы",
    to: "Шымкент",
    fromTag: "АЛМАТЫДАН",
    price: "9 800",
    icon: "sunny",
    color: "#F59E0B",
  },
];

const INITIAL_RECENT = [
  { id: "r1", from: "Алматы", to: "Астана", sub: "Ертең, 1 Ересек" },
  { id: "r2", from: "Шымкент", to: "Алматы", sub: "24 Қаз, 2 Ересек" },
];

export default function HomeScreen({ navigation }) {
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [departDate] = useState(getTodayIso());
  const [travelers] = useState("1 Ересек");
  const [recent, setRecent] = useState(INITIAL_RECENT);

  const goToResults = (from, to) => {
    navigation.navigate("SearchResults", {
      fromCity: from.trim() || undefined,
      toCity: to.trim() || undefined,
      date: departDate,
    });
  };

  const fillRoute = (from, to) => {
    setFromCity(from);
    setToCity(to);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9F9FF" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Header onAvatarPress={() => navigation.navigate("ProfileTab")} />

        <View style={styles.titleSection}>
          <Text style={styles.mainHeading}>Қайда барамыз?</Text>
          <Text style={styles.subHeading}>
            Желі бойынша келесі сапарыңызды брондаңыз.
          </Text>
        </View>

        {/* Карточка поиска */}
        <View style={styles.searchCard}>
          <View style={styles.routeInputContainer}>
            <View style={styles.routeLineColumn}>
              <View style={styles.startDot}>
                <Ionicons name="location" size={12} color="#FFFFFF" />
              </View>
              <View style={styles.verticalLine} />
              <View style={styles.endDot}>
                <Ionicons name="map-outline" size={12} color="#003d9b" />
              </View>
            </View>

            <View style={styles.inputsColumn}>
              <View style={styles.inputGroup}>
                <Text style={styles.fieldLabel}>Шығатын орын</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.fieldInput}
                    placeholder="Қайдан?"
                    placeholderTextColor="#6b7280"
                    value={fromCity}
                    onChangeText={setFromCity}
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.fieldLabel}>Баратын орын</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.fieldInput}
                    placeholder="Қайда?"
                    placeholderTextColor="#6b7280"
                    value={toCity}
                    onChangeText={setToCity}
                  />
                </View>
              </View>
            </View>
          </View>

          <View style={styles.rowFields}>
            <View style={[styles.inputGroup, { flex: 1, marginRight: 6 }]}>
              <Text style={styles.fieldLabel}>Кету күні</Text>
              <View style={styles.pickerBox}>
                <Text style={styles.pickerText}>
                  {toDisplayDate(departDate)}
                </Text>
                <Ionicons name="calendar-outline" size={20} color="#003d9b" />
              </View>
            </View>

            <View style={[styles.inputGroup, { flex: 1, marginLeft: 6 }]}>
              <Text style={styles.fieldLabel}>Жолаушылар</Text>
              <View style={styles.pickerBox}>
                <Text style={styles.pickerText}>{travelers}</Text>
                <Ionicons name="people-outline" size={20} color="#003d9b" />
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={styles.findButton}
            onPress={() => goToResults(fromCity, toCity)}
          >
            <Ionicons
              name="search"
              size={18}
              color="#FFFFFF"
              style={{ marginRight: 8 }}
            />
            <Text style={styles.findButtonText}>Поездарды табу</Text>
          </TouchableOpacity>
        </View>

        {/* Соңғы іздеулер */}
        {recent.length > 0 && (
          <>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Соңғы іздеулер</Text>
              <TouchableOpacity onPress={() => setRecent([])}>
                <Text style={styles.clearLink}>Барлығын тазарту</Text>
              </TouchableOpacity>
            </View>

            {recent.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.recentItem}
                onPress={() => fillRoute(item.from, item.to)}
              >
                <View style={styles.recentIconBox}>
                  <Ionicons name="time-outline" size={18} color="#003d9b" />
                </View>
                <View style={styles.recentInfo}>
                  <Text style={styles.recentRoute}>
                    {item.from} ➔ {item.to}
                  </Text>
                  <Text style={styles.recentSub}>{item.sub}</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
              </TouchableOpacity>
            ))}
          </>
        )}

        {/* Танымал бағыттар */}
        <Text
          style={[styles.sectionTitle, { marginTop: 24, marginBottom: 12 }]}
        >
          Танымал бағыттар
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.popularScroll}
        >
          {POPULAR_ROUTES.map((route) => (
            <TouchableOpacity
              key={route.id}
              style={styles.popularCard}
              activeOpacity={0.85}
              onPress={() => fillRoute(route.from, route.to)}
            >
              <View
                style={[
                  styles.cardImgPlaceholder,
                  { backgroundColor: route.color },
                ]}
              >
                <Ionicons
                  name={route.icon}
                  size={44}
                  color="rgba(255,255,255,0.45)"
                />
                <View style={styles.cardOverlay}>
                  <Text style={styles.fromTag}>{route.fromTag}</Text>
                  <Text style={styles.cardCity}>{route.to}</Text>
                </View>
              </View>
              <Text style={styles.cardPrice}>{route.price} ₸ бастап</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Статус сети */}
        <View style={styles.statusBanner}>
          <Ionicons name="checkmark-circle-outline" size={22} color="#065F46" />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={styles.bannerTitle}>
              Барлық желілерде қалыпты қызмет
            </Text>
            <Text style={styles.bannerSub}>
              Қазіргі уақытта ірі кешігулер тіркелген жоқ. Қауіпсіз сапар!
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9FF",
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 120,
  },
  titleSection: {
    marginBottom: 20,
  },
  mainHeading: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#0F2C59",
    marginBottom: 4,
  },
  subHeading: {
    fontSize: 14,
    color: "#64748B",
  },
  searchCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
    marginBottom: 24,
  },
  routeInputContainer: {
    flexDirection: "row",
    marginBottom: 12,
  },
  routeLineColumn: {
    alignItems: "center",
    justifyContent: "space-around",
    marginRight: 10,
    paddingVertical: 12,
  },
  startDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#003d9b",
    justifyContent: "center",
    alignItems: "center",
  },
  verticalLine: {
    width: 2,
    flex: 1,
    backgroundColor: "#003d9b",
    marginVertical: 4,
  },
  endDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#003d9b",
  },
  inputsColumn: {
    flex: 1,
    gap: 10,
  },
  fieldLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#4f515e",
    marginBottom: 4,
  },
  fieldInput: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1E293B",
    padding: 0,
  },
  inputGroup: {
    marginBottom: 10,
  },
  inputContainer: {
    backgroundColor: "#f1f3ff",
    borderWidth: 1,
    borderColor: "#c3c6d6",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  rowFields: {
    flexDirection: "row",
    marginBottom: 16,
  },
  pickerBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f1f3ff",
    borderWidth: 1,
    borderColor: "#c3c6d6",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  pickerText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#1E293B",
  },
  findButton: {
    backgroundColor: "#003d9b",
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  findButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0F2C59",
  },
  clearLink: {
    fontSize: 13,
    color: "#1048a1",
    fontWeight: "600",
  },
  recentItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F3FF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 16,
    padding: 12,
    marginBottom: 10,
  },
  recentIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#a9c3f0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  recentInfo: {
    flex: 1,
  },
  recentRoute: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1E293B",
  },
  recentSub: {
    fontSize: 12,
    color: "#64748B",
  },
  popularScroll: {
    flexDirection: "row",
    marginBottom: 20,
  },
  popularCard: {
    width: 160,
    marginRight: 12,
  },
  cardImgPlaceholder: {
    height: 110,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    marginBottom: 6,
  },
  cardOverlay: {
    position: "absolute",
    bottom: 8,
    left: 8,
  },
  fromTag: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#FFFFFF",
    opacity: 0.8,
  },
  cardCity: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  cardPrice: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#60a38c",
  },
  statusBanner: {
    flexDirection: "row",
    backgroundColor: "#e1f9f2",
    borderWidth: 1,
    borderColor: "#A7F3D0",
    borderRadius: 16,
    padding: 12,
    alignItems: "center",
  },
  bannerTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#065F46",
    marginBottom: 2,
  },
  bannerSub: {
    fontSize: 11,
    color: "#047857",
  },
});
