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

export default function SeatSelectionScreen({ navigation }) {
  const [selectedSeats, setSelectedSeats] = useState(['1A']);

  // Определение занятых и доступных мест (заглушка)
  const occupiedSeats = ['2A', '4A', '4B', '2C', '3C', '2D', '3D'];

  const handleSeatPress = (seatId) => {
    if (occupiedSeats.includes(seatId)) return; // Занято — нажать нельзя

    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const renderSeat = (seatId) => {
    const isSelected = selectedSeats.includes(seatId);
    const isOccupied = occupiedSeats.includes(seatId);

    return (
      <TouchableOpacity
        key={seatId}
        disabled={isOccupied}
        style={[
          styles.seatBox,
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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F4F6F9" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Шапка */}
        <View style={styles.topHeader}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Орын таңдау</Text>
          <View style={styles.avatarPlaceholder}>
            <Text style={{ fontSize: 16 }}>👤</Text>
          </View>
        </View>

        {/* Карточка поезда */}
        <View style={styles.trainCard}>
          <View style={styles.trainCardTop}>
            <View>
              <Text style={styles.trainSubTitle}>ПОЕЗД 402</Text>
              <Text style={styles.trainTitle}>Intercity Express</Text>
            </View>
            <View style={styles.classBadge}>
              <Text style={styles.classBadgeText}>Бірінші класс</Text>
            </View>
          </View>

          <View style={styles.routeTimes}>
            <View>
              <Text style={styles.timeText}>08:45</Text>
              <Text style={styles.stationSub}>Астана</Text>
            </View>
            <Text style={styles.trainIconCenter}>🚆</Text>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.timeText}>11:30</Text>
              <Text style={styles.stationSub}>Алматы</Text>
            </View>
          </View>
        </View>

        {/* Легенда (Легенда мест) */}
        <View style={styles.legendRow}>
          <View style={styles.legendItem}>
            <View style={[styles.legendBox, styles.seatAvailableBorder]} />
            <Text style={styles.legendText}>Бос</Text>
          </View>

          <View style={styles.legendItem}>
            <View style={[styles.legendBox, styles.legendSelectedBg]} />
            <Text style={styles.legendText}>Таңдалды</Text>
          </View>

          <View style={styles.legendItem}>
            <View style={[styles.legendBox, styles.legendOccupiedBg]} />
            <Text style={styles.legendText}>Бос емес</Text>
          </View>
        </View>

        {/* Схема Вагона */}
        <View style={styles.carriageContainer}>
          <View style={styles.carriageHeader}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.carriageIcon}>🚆</Text>
              <Text style={styles.carriageTitle}> Вагон 04</Text>
            </View>
            <Text style={styles.carriageAmenities}>🚻 ☕</Text>
          </View>

          <Text style={styles.sideLabel}>Терезе жағы</Text>

          {/* Ряды возле окна A & B */}
          <View style={styles.seatsRow}>
            {['1A', '2A', '3A', '4A', '5A'].map(renderSeat)}
          </View>
          <View style={[styles.seatsRow, { marginBottom: 20 }]}>
            {['1B', '2B', '3B', '4B', '5B'].map(renderSeat)}
          </View>

          {/* Проход (Aisle) */}
          <View style={styles.aisleBox}>
            <Text style={styles.aisleText}>Ө Т У  Ж О Л Ы</Text>
          </View>

          {/* Ряды возле прохода C & D */}
          <View style={[styles.seatsRow, { marginTop: 20 }]}>
            {['1C', '2C', '3C', '4C', '5C'].map(renderSeat)}
          </View>
          <View style={styles.seatsRow}>
            {['1D', '2D', '3D', '4D', '5D'].map(renderSeat)}
          </View>

          <Text style={[styles.sideLabel, { marginTop: 12, textAlign: 'right' }]}>Жол жағы</Text>
        </View>

      </ScrollView>

      {/* Фиксированная плашка снизу */}
      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.bottomSub}>Таңдалған орындар:</Text>
          <Text style={styles.selectedSeatsList}>
            {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'Ештеңе таңдалмады'}
          </Text>
        </View>

        <TouchableOpacity
          style={[
            styles.confirmBtn,
            selectedSeats.length === 0 && styles.disabledConfirmBtn,
          ]}
          disabled={selectedSeats.length === 0}
          onPress={() => navigation.navigate('PassengerInfo')}
        >
          <Text style={styles.confirmBtnText}>Растау</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F9',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  backBtn: {
    width: 36,
    height: 36,
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 22,
    color: '#0F2C59',
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0F2C59',
  },
  avatarPlaceholder: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  trainCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  trainCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  trainSubTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#64748B',
  },
  trainTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0F2C59',
  },
  classBadge: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  classBadgeText: {
    color: '#15803D',
    fontSize: 12,
    fontWeight: 'bold',
  },
  routeTimes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  stationSub: {
    fontSize: 11,
    color: '#64748B',
  },
  trainIconCenter: {
    fontSize: 20,
  },
  legendRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendBox: {
    width: 18,
    height: 18,
    borderRadius: 6,
    marginRight: 6,
  },
  seatAvailableBorder: {
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    backgroundColor: '#FFFFFF',
  },
  legendSelectedBg: {
    backgroundColor: '#0F2C59',
  },
  legendOccupiedBg: {
    backgroundColor: '#E2E8F0',
  },
  legendText: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '600',
  },
  carriageContainer: {
    backgroundColor: '#EEF2FF',
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E0E7FF',
  },
  carriageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  carriageIcon: {
    fontSize: 18,
  },
  carriageTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0F2C59',
  },
  carriageAmenities: {
    fontSize: 14,
  },
  sideLabel: {
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '600',
    marginBottom: 8,
  },
  seatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  seatBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  seatOccupied: {
    backgroundColor: '#E2E8F0',
    borderColor: '#E2E8F0',
  },
  seatSelected: {
    backgroundColor: '#0F2C59',
    borderColor: '#0F2C59',
  },
  seatText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#334155',
  },
  seatTextOccupied: {
    color: '#94A3B8',
  },
  seatTextSelected: {
    color: '#FFFFFF',
  },
  aisleBox: {
    paddingVertical: 6,
    backgroundColor: '#E0E7FF',
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 4,
  },
  aisleText: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#6366F1',
    letterSpacing: 3,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  bottomSub: {
    fontSize: 11,
    color: '#64748B',
  },
  selectedSeatsList: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0F2C59',
  },
  confirmBtn: {
    backgroundColor: '#0F2C59',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
  },
  disabledConfirmBtn: {
    backgroundColor: '#94A3B8',
  },
  confirmBtnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
});