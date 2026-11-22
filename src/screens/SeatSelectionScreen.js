import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Header from '../components/Header';
import { colors, fonts } from '../theme';

// Стандарт = Плацкарт, 1-ші класс = Купе (как в базе данных сайта)
const CARRIAGE_TYPE_BY_CLASS = { standard: 'Плацкарт', first: 'Купе' };

// Первые 36 мест это купе по 4 места, остальные (в плацкарте 37-54) боковые
const MAIN_SEATS = 36;
const MAX_SEATS = 4;

// Раскладка мест вагона: по колонке на каждое купе, 4 ряда (A, B, C, D) и ряды боковых мест
const buildLayout = (seats) => {
  const byNumber = {};
  seats.forEach((seat) => {
    byNumber[seat.number] = seat;
  });

  const mainCount = seats.filter((s) => s.number <= MAIN_SEATS).length;
  const sideCount = seats.filter((s) => s.number > MAIN_SEATS).length;
  const compartments = Math.ceil(mainCount / 4);
  const sidePairs = Math.ceil(sideCount / 2);

  const rows = [0, 1, 2, 3].map((r) =>
    Array.from({ length: compartments }, (_, k) => byNumber[k * 4 + r + 1] || null),
  );
  const sideRows =
    sideCount > 0
      ? [0, 1].map((r) =>
          Array.from({ length: sidePairs }, (_, k) => byNumber[MAIN_SEATS + k * 2 + r + 1] || null),
        )
      : [];

  return { rows, sideRows };
};

export default function SeatSelectionScreen({ route, navigation }) {
  const { train = {}, date, selectedClass = 'standard' } = route.params || {};
  const insets = useSafeAreaInsets();

  const carriageType = CARRIAGE_TYPE_BY_CLASS[selectedClass];
  const carriages = (train.carriages || []).filter((c) => c.type === carriageType);

  const [carriageNumber, setCarriageNumber] = useState(carriages[0]?.number);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const carriage = carriages.find((c) => c.number === carriageNumber);
  const seats = carriage?.seats || [];
  const seatsByNumber = {};
  seats.forEach((seat) => {
    seatsByNumber[seat.number] = seat;
  });
  const { rows, sideRows } = buildLayout(seats);

  const sortedSeats = [...selectedSeats].sort((a, b) => a - b);
  const totalPrice = selectedSeats.reduce((sum, n) => sum + (seatsByNumber[n]?.price || 0), 0);
  const hasSelection = selectedSeats.length > 0;

  // При смене вагона выбранные места сбрасываются: заказ оформляется на один вагон
  const handleCarriagePress = (number) => {
    setCarriageNumber(number);
    setSelectedSeats([]);
  };

  const handleSeatPress = (seat) => {
    if (seat.is_occupied) return;

    if (selectedSeats.includes(seat.number)) {
      setSelectedSeats(selectedSeats.filter((n) => n !== seat.number));
    } else if (selectedSeats.length < MAX_SEATS) {
      setSelectedSeats([...selectedSeats, seat.number]);
    }
  };

  const renderSeat = (seat, index) => {
    // Пустая ячейка, если места с таким номером нет в вагоне
    if (!seat) return <View key={`empty-${index}`} style={styles.seatEmpty} />;

    const isSelected = selectedSeats.includes(seat.number);

    return (
      <TouchableOpacity
        key={seat.number}
        disabled={seat.is_occupied}
        activeOpacity={0.7}
        style={[
          styles.seat,
          seat.is_occupied && styles.seatOccupied,
          isSelected && styles.seatSelected,
        ]}
        onPress={() => handleSeatPress(seat)}
      >
        <Text
          style={[
            styles.seatText,
            seat.is_occupied && styles.seatTextOccupied,
            isSelected && styles.seatTextSelected,
          ]}
        >
          {seat.number}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderRow = (row, key) => (
    <View key={key} style={styles.seatsRow}>
      {row.map(renderSeat)}
    </View>
  );

  const handleConfirm = () => {
    navigation.navigate('PassengerInfo', {
      train,
      date,
      selectedClass,
      price: carriage.price,
      seats: sortedSeats.map(String),
      carriage: String(carriageNumber),
      carriageType,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Header
          title="Орын таңдау"
          onBack={() => navigation.goBack()}
          onAvatarPress={() => navigation.navigate('Main', { screen: 'ProfileTab' })}
        />

        {/* Карточка поезда */}
        <View style={styles.trainCard}>
          <View style={styles.trainCardTop}>
            <View style={{ flex: 1, marginRight: 8 }}>
              <Text style={styles.trainSubTitle}>ПОЕЗД {train.number}</Text>
              <Text style={styles.trainTitle} numberOfLines={1}>{train.name}</Text>
            </View>
            <View style={styles.classBadge}>
              <Text style={styles.classBadgeText}>
                {selectedClass === 'first' ? 'Бірінші класс' : 'Стандарт'}
              </Text>
            </View>
          </View>

          <View style={styles.routeTimes}>
            <View>
              <Text style={styles.timeText}>{train.departure_time || '--:--'}</Text>
              <Text style={styles.stationSub}>{train.from_city}</Text>
            </View>
            <View style={styles.routeMiddle}>
              <View style={styles.routeLine} />
              <Ionicons name="train" size={20} color={colors.primary} style={{ marginHorizontal: 10 }} />
              <View style={styles.routeLine} />
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.timeText}>{train.arrival_time || '--:--'}</Text>
              <Text style={styles.stationSub}>{train.to_city}</Text>
            </View>
          </View>
        </View>

        {carriages.length === 0 ? (
          <View style={styles.emptyBox}>
            <Ionicons name="alert-circle-outline" size={36} color="#94A3B8" />
            <Text style={styles.emptyText}>Бұл класта бос вагондар жоқ</Text>
          </View>
        ) : (
          <>
            {/* Выбор вагона */}
            <Text style={styles.blockLabel}>Вагонды таңдаңыз</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.chipsScroll}
              contentContainerStyle={{ gap: 10 }}
            >
              {carriages.map((c) => {
                const active = c.number === carriageNumber;
                return (
                  <TouchableOpacity
                    key={c.number}
                    style={[styles.chip, active && styles.chipActive]}
                    onPress={() => handleCarriagePress(c.number)}
                  >
                    <Text style={[styles.chipTitle, active && styles.chipTitleActive]}>
                      Вагон {c.number}
                    </Text>
                    <Text style={[styles.chipSub, active && styles.chipSubActive]}>
                      Бос: {c.seats_left}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

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
            <Text style={styles.legendHint}>Тақ нөмір төменгі орын, жұп нөмір жоғарғы орын</Text>

            {/* Схема вагона */}
            <View style={styles.carriage}>
              <View style={styles.carriageHeader}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Ionicons name="train" size={20} color={colors.primary} style={{ marginRight: 8 }} />
                  <Text style={styles.carriageTitle}>Вагон {carriageNumber} • {carriageType}</Text>
                </View>
                <Text style={styles.carriagePrice}>{carriage?.price} ₸</Text>
              </View>

              <Text style={styles.sideLabel}>Терезе жағы</Text>

              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View>
                  {renderRow(rows[0], 'row-a')}
                  {renderRow(rows[1], 'row-b')}

                  <View style={styles.aisleBar}>
                    <Text style={styles.aisleText}>Ө Т У  Ж О Л Ы</Text>
                  </View>

                  {renderRow(rows[2], 'row-c')}
                  {renderRow(rows[3], 'row-d')}

                  {sideRows.length > 0 && (
                    <>
                      <Text style={[styles.sideLabel, { marginTop: 14 }]}>Бүйір орындар</Text>
                      {sideRows.map((row, i) => renderRow(row, `side-${i}`))}
                    </>
                  )}
                </View>
              </ScrollView>

              <Text style={[styles.sideLabel, { marginTop: 12, marginBottom: 0 }]}>Жол жағы</Text>
            </View>
          </>
        )}
      </ScrollView>

      {/* Нижняя панель */}
      <View style={[styles.bottomBar, { paddingBottom: 16 + insets.bottom }]}>
        <View style={{ flex: 1 }}>
          <Text style={styles.bottomSub}>Таңдалған орындар</Text>
          <Text style={styles.selectedSeatsList} numberOfLines={1}>
            {hasSelection ? sortedSeats.join(', ') : 'Жоқ'}
          </Text>
          {hasSelection && <Text style={styles.totalText}>{totalPrice} ₸</Text>}
        </View>

        <TouchableOpacity
          style={[styles.confirmBtn, !hasSelection && styles.confirmBtnDisabled]}
          disabled={!hasSelection}
          onPress={handleConfirm}
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
    paddingBottom: 140,
  },
  trainCard: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
  },
  trainCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  trainSubTitle: {
    fontSize: 11,
    fontWeight: '500',
    color: colors.onSurfaceVariant,
    letterSpacing: 0.5,
  },
  trainTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.primary,
  },
  classBadge: {
    backgroundColor: colors.mint,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 14,
  },
  classBadgeText: {
    color: '#005236',
    fontSize: 12,
    fontWeight: '700',
  },
  routeTimes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.onSurface,
  },
  stationSub: {
    fontSize: 11,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
  },
  routeMiddle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  routeLine: {
    flex: 1,
    height: 2,
    backgroundColor: '#CBD5E1',
  },
  emptyBox: {
    alignItems: 'center',
    paddingVertical: 40,
    gap: 10,
  },
  emptyText: {
    fontSize: 15,
    color: colors.onSurfaceVariant,
  },

  // Выбор вагона
  blockLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.onSurface,
    marginBottom: 10,
  },
  chipsScroll: {
    flexGrow: 0,
    marginBottom: 20,
  },
  chip: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.outline,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignItems: 'center',
  },
  chipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.onSurface,
  },
  chipTitleActive: {
    color: '#FFFFFF',
  },
  chipSub: {
    fontSize: 11,
    color: colors.onSurfaceVariant,
    marginTop: 2,
  },
  chipSubActive: {
    color: '#DCE5FA',
  },

  // Легенда
  legendRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
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
    backgroundColor: '#E6EBFB',
  },
  legendText: {
    fontSize: 13,
    color: colors.onSurface,
    fontWeight: '600',
  },
  legendHint: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
    marginBottom: 16,
    paddingHorizontal: 4,
  },

  // Вагон
  carriage: {
    backgroundColor: '#F1F3FF',
    borderRadius: 20,
    padding: 16,
    paddingLeft: 20,
    borderWidth: 1,
    borderColor: '#E0E7FF',
    borderLeftWidth: 8,
    borderLeftColor: '#D5DCF0',
  },
  carriageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  carriageTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.onSurface,
  },
  carriagePrice: {
    fontSize: 14,
    fontFamily: fonts.mono,
    color: colors.primary,
  },
  sideLabel: {
    fontSize: 13,
    color: colors.onSurfaceVariant,
    fontWeight: '500',
    marginBottom: 12,
  },
  seatsRow: {
    flexDirection: 'row',
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  seatEmpty: {
    width: 48,
    height: 48,
  },
  seatOccupied: {
    backgroundColor: '#E6EBFB',
    borderColor: '#E6EBFB',
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
    color: '#9AA3B8',
  },
  seatTextSelected: {
    color: '#FFFFFF',
  },
  aisleBar: {
    height: 48,
    marginVertical: 24,
    backgroundColor: '#E6EBFB',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  aisleText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.onSurfaceVariant,
    letterSpacing: 3,
  },

  // Нижняя панель
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.card,
    paddingTop: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  bottomSub: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
  },
  selectedSeatsList: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
  },
  totalText: {
    fontSize: 13,
    fontFamily: fonts.mono,
    color: colors.onSurface,
  },
  confirmBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 12,
  },
  confirmBtnDisabled: {
    backgroundColor: '#9E9E9E',
  },
  confirmBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
});