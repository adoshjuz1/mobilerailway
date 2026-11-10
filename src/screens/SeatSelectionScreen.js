import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "../components/Header";
import { colors, fonts } from "../theme";

const ROWS = [1, 2, 3, 4, 5, 6, 7, 8];
const WINDOW_LETTERS = ["A", "B"];
const AISLE_LETTERS = ["C", "D"];
const MAX_SEATS = 4;
const CARRIAGE = "04";

// Занятые места пока заглушка, потом будут приходить с бэкенда
const OCCUPIED_SEATS = [
  "2A",
  "4A",
  "4B",
  "3C",
  "2D",
  "3D",
  "7A",
  "6B",
  "8C",
  "6D",
];

// Порядок для списка выбранных мест: по номеру ряда, затем по букве
const sortSeats = (seats) =>
  [...seats].sort(
    (a, b) => parseInt(a, 10) - parseInt(b, 10) || a.localeCompare(b),
  );

export default function SeatSelectionScreen({ route, navigation }) {
  const {
    train = {},
    date,
    selectedClass = "standard",
    price,
  } = route.params || {};
  const insets = useSafeAreaInsets();
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatPress = (seatId) => {
    if (OCCUPIED_SEATS.includes(seatId)) return;

    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seatId));
    } else if (selectedSeats.length < MAX_SEATS) {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const renderSeat = (seatId) => {
    const isOccupied = OCCUPIED_SEATS.includes(seatId);
    const isSelected = selectedSeats.includes(seatId);

    return (
      <TouchableOpacity
        key={seatId}
        disabled={isOccupied}
        activeOpacity={0.7}
        style={[
          styles.seat,
          isOccupied && styles.seatOccupied,
          isSelected && styles.seatSelected,
        ]}
        onPress={() => handleSeatPress(seatId)}
      >
        <Text
          style={[
            styles.seatText,
            isOccupied && styles.seatTextOccupied,
            isSelected && styles.seatTextSelected,
          ]}
        >
          {seatId}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderRow = (letter) => (
    <View key={letter} style={styles.seatsRow}>
      {ROWS.map((row) => renderSeat(`${row}${letter}`))}
    </View>
  );

  const hasSelection = selectedSeats.length > 0;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Header
          title="Орын таңдау"
          onBack={() => navigation.goBack()}
          onAvatarPress={() =>
            navigation.navigate("Main", { screen: "ProfileTab" })
          }
        />

        {/* Карточка поезда */}
        <View style={styles.trainCard}>
          <View style={styles.trainCardTop}>
            <View style={{ flex: 1, marginRight: 8 }}>
              <Text style={styles.trainSubTitle}>ПОЕЗД {train.number}</Text>
              <Text style={styles.trainTitle} numberOfLines={1}>
                {train.name}
              </Text>
            </View>
            <View style={styles.classBadge}>
              <Text style={styles.classBadgeText}>
                {selectedClass === "first" ? "Бірінші класс" : "Стандарт"}
              </Text>
            </View>
          </View>

          <View style={styles.routeTimes}>
            <View>
              <Text style={styles.timeText}>
                {train.departure_time || "--:--"}
              </Text>
              <Text style={styles.stationSub}>{train.from_city}</Text>
            </View>
            <View style={styles.routeMiddle}>
              <View style={styles.routeLine} />
              <Ionicons
                name="train"
                size={20}
                color={colors.primary}
                style={{ marginHorizontal: 10 }}
              />
              <View style={styles.routeLine} />
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <Text style={styles.timeText}>
                {train.arrival_time || "--:--"}
              </Text>
              <Text style={styles.stationSub}>{train.to_city}</Text>
            </View>
          </View>
        </View>

        {/* Легенда */}
        <View style={styles.legendRow}>
          <View style={styles.legendItem}>
            <View style={[styles.legendBox, styles.legendAvailable]} />
            <Text style={styles.legendText}>Бос</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendBox, styles.legendSelected]} />
            <Text style={styles.legendText}>Таңдалды</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendBox, styles.legendOccupied]} />
            <Text style={styles.legendText}>Бос емес</Text>
          </View>
        </View>

        {/* Схема вагона */}
        <View style={styles.carriage}>
          <View style={styles.carriageHeader}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons
                name="train"
                size={20}
                color={colors.primary}
                style={{ marginRight: 8 }}
              />
              <Text style={styles.carriageTitle}>Вагон {CARRIAGE}</Text>
            </View>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <Ionicons
                name="male-female-outline"
                size={20}
                color={colors.onSurfaceVariant}
              />
              <Ionicons
                name="cafe-outline"
                size={20}
                color={colors.onSurfaceVariant}
              />
            </View>
          </View>

          <Text style={styles.sideLabel}>Терезе жағы</Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View>
              {WINDOW_LETTERS.map(renderRow)}

              <View style={styles.aisleBar}>
                <Text style={styles.aisleText}>Ө Т У Ж О Л Ы</Text>
              </View>

              {AISLE_LETTERS.map(renderRow)}
            </View>
          </ScrollView>

          <Text style={[styles.sideLabel, { marginTop: 12, marginBottom: 0 }]}>
            Жол жағы
          </Text>
        </View>
      </ScrollView>

      {/* Нижняя панель */}
      <View style={[styles.bottomBar, { paddingBottom: 16 + insets.bottom }]}>
        <View>
          <Text style={styles.bottomSub}>Таңдалған орындар</Text>
          <Text style={styles.selectedSeatsList}>
            {hasSelection ? sortSeats(selectedSeats).join(", ") : "Жоқ"}
          </Text>
        </View>

        <TouchableOpacity
          style={[
            styles.confirmBtn,
            !hasSelection && styles.confirmBtnDisabled,
          ]}
          disabled={!hasSelection}
          onPress={() =>
            navigation.navigate("PassengerInfo", {
              train,
              date,
              selectedClass,
              price,
              seats: sortSeats(selectedSeats),
              carriage: CARRIAGE,
            })
          }
        >
          <Text style={styles.confirmBtnText}>Таңдауды растау</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 130,
  },
  trainCard: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 8,
  },
  trainCardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  trainSubTitle: {
    fontSize: 11,
    fontWeight: "500",
    color: colors.onSurfaceVariant,
    letterSpacing: 0.5,
  },
  trainTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.primary,
  },
  classBadge: {
    backgroundColor: colors.mint,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 14,
  },
  classBadgeText: {
    color: "#005236",
    fontSize: 12,
    fontWeight: "700",
  },
  routeTimes: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  timeText: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.onSurface,
  },
  stationSub: {
    fontSize: 11,
    color: colors.onSurfaceVariant,
    textAlign: "center",
  },
  routeMiddle: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  routeLine: {
    flex: 1,
    height: 2,
    backgroundColor: "#CBD5E1",
  },
  legendRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  legendBox: {
    width: 22,
    height: 22,
    borderRadius: 7,
    marginRight: 8,
  },
  legendAvailable: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.outline,
  },
  legendSelected: {
    backgroundColor: colors.primary,
  },
  legendOccupied: {
    backgroundColor: "#E6EBFB",
  },
  legendText: {
    fontSize: 13,
    color: colors.onSurface,
    fontWeight: "600",
  },
  carriage: {
    backgroundColor: "#F1F3FF",
    borderRadius: 20,
    padding: 16,
    paddingLeft: 20,
    borderWidth: 1,
    borderColor: "#E0E7FF",
    borderLeftWidth: 8,
    borderLeftColor: "#D5DCF0",
  },
  carriageHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  carriageTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.onSurface,
  },
  sideLabel: {
    fontSize: 13,
    color: colors.onSurfaceVariant,
    fontWeight: "500",
    marginBottom: 12,
  },
  seatsRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
  },
  seat: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.outline,
    justifyContent: "center",
    alignItems: "center",
  },
  seatOccupied: {
    backgroundColor: "#E6EBFB",
    borderColor: "#E6EBFB",
  },
  seatSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  seatText: {
    fontSize: 13,
    fontFamily: fonts.mono,
    color: colors.onSurface,
  },
  seatTextOccupied: {
    color: "#9AA3B8",
  },
  seatTextSelected: {
    color: "#FFFFFF",
  },
  aisleBar: {
    height: 48,
    marginVertical: 24,
    backgroundColor: "#E6EBFB",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  aisleText: {
    fontSize: 11,
    fontWeight: "600",
    color: colors.onSurfaceVariant,
    letterSpacing: 3,
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.card,
    paddingTop: 16,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
  },
  bottomSub: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
  },
  selectedSeatsList: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.primary,
  },
  confirmBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: 28,
    paddingVertical: 16,
    borderRadius: 12,
  },
  confirmBtnDisabled: {
    backgroundColor: "#9E9E9E",
  },
  confirmBtnText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 14,
  },
});
