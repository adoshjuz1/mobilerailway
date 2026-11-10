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

const BOOKING_FEE = 450;

// 2026-10-16 -> 16.10.2026
const formatDate = (iso) => {
  if (!iso) return "";
  const [year, month, day] = iso.split("-");
  return `${day}.${month}.${year}`;
};

export default function BookingSummaryScreen({ route, navigation }) {
  const {
    train = {},
    date,
    selectedClass = "standard",
    price = 0,
    seats = [],
    carriage,
    passenger = {},
  } = route.params || {};

  const insets = useSafeAreaInsets();
  const [selectedPayment, setSelectedPayment] = useState("card"); // 'apple' или 'card'

  const classLabel = selectedClass === "first" ? "1-ші класс" : "Стандарт";
  const arrivesNextDay = train.arrival_time < train.departure_time;
  const departureText = `${formatDate(date)} • ${train.departure_time}`;
  const arrivalText = arrivesNextDay
    ? `Келесі күні • ${train.arrival_time}`
    : `${formatDate(date)} • ${train.arrival_time}`;

  const ticketCount = Math.max(seats.length, 1);
  const total = price * ticketCount;
  const fare = Math.max(total - BOOKING_FEE, 0);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Header
          title="Төлем және растау"
          centered
          onBack={() => navigation.goBack()}
          onAvatarPress={() =>
            navigation.navigate("Main", { screen: "ProfileTab" })
          }
        />

        {/* Сапар мәліметтері */}
        <View style={styles.card}>
          <Text style={styles.cardSectionTitle}>Сапар мәліметтері</Text>

          <View style={styles.journeyRow}>
            <View style={styles.dotColumn}>
              <View style={styles.dotHalo}>
                <View style={styles.dotFilled} />
              </View>
            </View>
            <View style={styles.journeyInfo}>
              <Text style={styles.stationLabel}>ШЫҒУ</Text>
              <Text style={styles.stationName}>{train.from_city}</Text>
              <Text style={styles.timeLabel}>{departureText}</Text>
            </View>
          </View>

          <View style={styles.journeyRow}>
            <View style={styles.dotColumn}>
              <View style={styles.dotRing} />
            </View>
            <View style={styles.journeyInfo}>
              <Text style={styles.stationLabel}>КЕЛУ</Text>
              <Text style={styles.stationName}>{train.to_city}</Text>
              <Text style={styles.timeLabel}>{arrivalText}</Text>
            </View>
          </View>

          <View style={styles.dashedDivider} />

          <View style={styles.trainInfoRow}>
            <View style={styles.trainInfoItem}>
              <Ionicons name="train" size={20} color={colors.primary} />
              <Text style={styles.trainInfoText}>
                {train.name} №{train.number}
              </Text>
            </View>
            <View style={styles.trainInfoItem}>
              <Ionicons name="grid-outline" size={20} color={colors.primary} />
              <Text style={styles.trainInfoText}>
                Вагон {carriage}, Орын {seats.join(", ")}
              </Text>
            </View>
          </View>
        </View>

        {/* Жолаушылар */}
        <View style={styles.card}>
          <View style={styles.cardTitleRow}>
            <Ionicons name="people-outline" size={22} color={colors.primary} />
            <Text style={[styles.cardSectionTitle, { marginBottom: 0 }]}>
              Жолаушылар
            </Text>
          </View>

          <View style={styles.passengerBox}>
            <View>
              <Text style={styles.passengerName}>
                {passenger.fullName || "Аты көрсетілмеген"}
              </Text>
              <Text style={styles.passengerSub}>Ересек • {classLabel}</Text>
            </View>
            <Ionicons
              name="checkmark-circle-outline"
              size={22}
              color="#00714D"
            />
          </View>

          <TouchableOpacity
            style={styles.addTravelerBtn}
            onPress={() => navigation.goBack()}
          >
            <View style={styles.addTravelerIcon}>
              <Ionicons name="add" size={20} color={colors.primary} />
            </View>
            <Text style={styles.addTravelerText}>Басқа жолаушы қосу</Text>
          </TouchableOpacity>
        </View>

        {/* Төлем әдісі */}
        <Text style={[styles.cardSectionTitle, { marginTop: 4 }]}>
          Төлем әдісі
        </Text>

        {/* Apple Pay */}
        <TouchableOpacity
          style={styles.applePay}
          onPress={() => setSelectedPayment("apple")}
        >
          <View style={styles.paymentTitleRow}>
            <Ionicons name="logo-apple" size={24} color="#FFFFFF" />
            <Text style={styles.applePayText}>Apple Pay</Text>
          </View>
          <View style={[styles.radioOuter, styles.radioOuterLight]}>
            {selectedPayment === "apple" && (
              <View style={[styles.radioInner, styles.radioInnerLight]} />
            )}
          </View>
        </TouchableOpacity>

        {/* Банк картасы */}
        <TouchableOpacity
          activeOpacity={0.9}
          style={[
            styles.cardOption,
            selectedPayment === "card" && styles.cardOptionActive,
          ]}
          onPress={() => setSelectedPayment("card")}
        >
          <View style={styles.cardTopRow}>
            <View style={styles.paymentTitleRow}>
              <Ionicons name="card-outline" size={22} color={colors.primary} />
              <Text style={styles.paymentTitle}>Банк картасы</Text>
            </View>
            <View style={styles.radioOuter}>
              {selectedPayment === "card" && <View style={styles.radioInner} />}
            </View>
          </View>

          <View style={styles.cardNumberBox}>
            <Text style={styles.cardNumberText}>**** **** **** 4242</Text>
            <Text style={styles.visaText}>VISA</Text>
          </View>

          <View style={styles.cardDetailsRow}>
            <View style={styles.cardSmallInput}>
              <Text style={styles.smallInputText}>12/26</Text>
            </View>
            <View style={styles.cardSmallInput}>
              <Text style={styles.smallInputText}>***</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Итоги стоимости */}
        <View style={styles.priceCard}>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>
              {classLabel} x{ticketCount}
            </Text>
            <Text style={styles.priceValue}>{fare} ₸</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Орын брондау</Text>
            <Text style={styles.priceValue}>Қосылған</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Брондау ақысы</Text>
            <Text style={styles.priceValue}>{BOOKING_FEE} ₸</Text>
          </View>

          <View style={styles.cardDivider} />

          <View style={styles.priceRow}>
            <Text style={styles.totalLabel}>Барлығы</Text>
            <Text style={styles.totalValue}>{total} ₸</Text>
          </View>
        </View>

        <Text style={styles.termsText}>
          «Төлеу» батырмасын басу арқылы сіз Railway Connect{" "}
          <Text style={styles.termsLink}>Қызмет көрсету шарттарымен</Text> және{" "}
          <Text style={styles.termsLink}>Құпиялылық саясатымен</Text> келісесіз.
        </Text>
      </ScrollView>

      {/* Нижняя кнопка оплаты */}
      <View style={[styles.bottomBar, { paddingBottom: 16 + insets.bottom }]}>
        <TouchableOpacity
          style={styles.payButton}
          onPress={() =>
            navigation.navigate("TicketConfirmation", {
              ...route.params,
              total,
            })
          }
        >
          <Ionicons name="lock-closed" size={20} color="#FFFFFF" />
          <Text style={styles.payButtonText}>Қазір төлеу • {total} ₸</Text>
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
    paddingBottom: 140,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  cardSectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.onSurface,
    marginBottom: 14,
  },
  cardTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 14,
  },
  cardDivider: {
    height: 1,
    backgroundColor: "#C9D3EE",
    marginVertical: 12,
  },
  dashedDivider: {
    height: 1,
    borderWidth: 1,
    borderColor: "#D5DCF0",
    borderStyle: "dashed",
    borderRadius: 1,
    marginVertical: 14,
  },

  // Сапар мәліметтері
  journeyRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  dotColumn: {
    width: 24,
    alignItems: "center",
    marginTop: 6,
  },
  dotHalo: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#DCE5FA",
    justifyContent: "center",
    alignItems: "center",
  },
  dotFilled: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primary,
  },
  dotRing: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: colors.primary,
    backgroundColor: colors.card,
  },
  journeyInfo: {
    flex: 1,
    marginLeft: 12,
  },
  stationLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: colors.onSurfaceVariant,
    letterSpacing: 0.5,
  },
  stationName: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.onSurface,
  },
  timeLabel: {
    fontSize: 15,
    color: colors.onSurfaceVariant,
  },
  trainInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  trainInfoItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  trainInfoText: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
    color: colors.onSurface,
  },

  // Жолаушылар
  passengerBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#E6EEFF",
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  passengerName: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.onSurface,
  },
  passengerSub: {
    fontSize: 13,
    color: colors.onSurfaceVariant,
  },
  addTravelerBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    padding: 12,
  },
  addTravelerIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#CFDCF7",
    justifyContent: "center",
    alignItems: "center",
  },
  addTravelerText: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.primary,
  },

  // Төлем әдісі
  paymentTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  applePay: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.onSurface,
    borderRadius: 16,
    padding: 18,
    marginBottom: 12,
  },
  applePayText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  cardOption: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.outline,
  },
  cardOptionActive: {
    borderWidth: 2,
    borderColor: colors.primary,
  },
  paymentTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.onSurface,
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  radioOuterLight: {
    borderColor: "#FFFFFF",
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primary,
  },
  radioInnerLight: {
    backgroundColor: "#FFFFFF",
  },
  cardTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  cardNumberBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#E6EEFF",
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
  },
  cardNumberText: {
    fontSize: 15,
    fontFamily: fonts.mono,
    color: colors.onSurface,
  },
  visaText: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.primary,
  },
  cardDetailsRow: {
    flexDirection: "row",
    gap: 10,
  },
  cardSmallInput: {
    flex: 1,
    backgroundColor: "#E6EEFF",
    padding: 14,
    borderRadius: 10,
  },
  smallInputText: {
    fontSize: 15,
    fontFamily: fonts.mono,
    color: colors.onSurface,
  },

  // Итоги стоимости
  priceCard: {
    backgroundColor: "#E6EEFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  priceLabel: {
    fontSize: 15,
    color: colors.onSurfaceVariant,
  },
  priceValue: {
    fontSize: 15,
    fontFamily: fonts.mono,
    color: colors.onSurface,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.onSurface,
  },
  totalValue: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.primary,
  },
  termsText: {
    textAlign: "center",
    fontSize: 12,
    lineHeight: 18,
    color: colors.onSurfaceVariant,
    paddingHorizontal: 10,
  },
  termsLink: {
    textDecorationLine: "underline",
  },

  // Нижняя кнопка
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.card,
    paddingTop: 16,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
  },
  payButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingVertical: 16,
  },
  payButtonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
  },
});
