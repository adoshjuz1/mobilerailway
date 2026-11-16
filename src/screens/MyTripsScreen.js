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
import { colors } from '../theme';
import { UPCOMING_TRIPS, PAST_TRIPS } from '../services/mockTrips';

const MONTHS = ['Қаң', 'Ақп', 'Нау', 'Сәу', 'Мам', 'Мау', 'Шіл', 'Там', 'Қыр', 'Қаз', 'Қар', 'Жел'];

const TABS = [
  { id: 'upcoming', label: 'Алдағы' },
  { id: 'past', label: 'Өткен' },
];

// 2026-11-24 -> 24 Қар
const formatShortDate = (iso) => {
  const [, month, day] = iso.split('-');
  return `${day} ${MONTHS[Number(month) - 1]}`;
};

export default function MyTripsScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('upcoming');

  const trips = activeTab === 'upcoming' ? UPCOMING_TRIPS : PAST_TRIPS;

  const openTicket = (trip) => {
    navigation.navigate('TicketConfirmation', {
      train: trip.train,
      date: trip.date,
      seats: trip.seats,
      carriage: trip.carriage,
      ticketId: trip.ticketId,
    });
  };

  // Полная карточка ближайшей поездки
  const renderFullCard = (trip) => (
    <View key={trip.id} style={styles.tripCard}>
      <View style={styles.tripHeaderRow}>
        <View style={{ flex: 1 }}>
          <Text style={styles.confirmationText}>БРОНДАУ #{trip.id}</Text>
          <View style={styles.statusBadge}>
            <Ionicons name="checkmark-circle" size={14} color="#006C49" />
            <Text style={styles.statusBadgeText}>Уақытында</Text>
          </View>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={styles.tripDate}>{formatShortDate(trip.date)}</Text>
          <Text style={styles.classText}>{trip.className} класс</Text>
        </View>
      </View>

      <View style={styles.timelineRow}>
        <View style={styles.stationBlock}>
          <Text style={styles.timeBig}>{trip.train.departure_time}</Text>
          <Text style={styles.stationName}>{trip.train.from_city}</Text>
        </View>

        <View style={styles.centerTimeline}>
          <View style={styles.lineRow}>
            <View style={styles.dotRing} />
            <Ionicons name="train" size={20} color={colors.primary} style={{ marginHorizontal: 6 }} />
            <View style={styles.dotFilled} />
          </View>
          <Text style={styles.durationLabel}>{trip.train.duration_text}</Text>
        </View>

        <View style={[styles.stationBlock, { alignItems: 'flex-end' }]}>
          <Text style={styles.timeBig}>{trip.train.arrival_time}</Text>
          <Text style={[styles.stationName, { textAlign: 'right' }]}>{trip.train.to_city}</Text>
        </View>
      </View>

      <View style={styles.dashedDivider} />

      <View style={styles.tripFooter}>
        <View style={styles.seatInfo}>
          <View style={styles.seatIconBox}>
            <Ionicons name="grid-outline" size={20} color={colors.primary} />
          </View>
          <View>
            <Text style={styles.carriageLabel}>Вагон {trip.carriage}</Text>
            <Text style={styles.seatLabel}>Орын {trip.seats.join(', ')}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.viewTicketBtn} onPress={() => openTicket(trip)}>
          <Ionicons name="qr-code-outline" size={18} color="#FFFFFF" />
          <Text style={styles.viewTicketText}>Билетті көру</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // Компактная карточка
  const renderCompactCard = (trip) => (
    <TouchableOpacity
      key={trip.id}
      style={styles.compactCard}
      activeOpacity={0.8}
      onPress={() => openTicket(trip)}
    >
      <View style={styles.compactTopRow}>
        <Text style={styles.compactId}>БРОНДАУ #{trip.id}</Text>
        <View style={styles.dateBadge}>
          <Text style={styles.dateBadgeText}>{formatShortDate(trip.date)}</Text>
        </View>
      </View>

      <View style={styles.compactRouteRow}>
        <View style={styles.compactIconBox}>
          <Ionicons name="train" size={22} color={colors.primary} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.compactRoute}>
            {trip.train.from_city} ➔ {trip.train.to_city}
          </Text>
          <Text style={styles.compactSub}>
            Жөнелу: {trip.train.departure_time} • {trip.train.name}
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Header onAvatarPress={() => navigation.navigate('ProfileTab')} />

        <Text style={styles.mainHeading}>Менің сапарларым</Text>
        <Text style={styles.subHeading}>Белсенді маршруттарыңыз бен сапар тарихын басқарыңыз.</Text>

        {/* Переключатель вкладок */}
        <View style={styles.tabContainer}>
          {TABS.map((tab) => {
            const active = activeTab === tab.id;
            return (
              <TouchableOpacity
                key={tab.id}
                style={[styles.tabButton, active && styles.tabButtonActive]}
                onPress={() => setActiveTab(tab.id)}
              >
                <Text style={[styles.tabText, active && styles.tabTextActive]}>{tab.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {trips.length === 0 ? (
          <View style={styles.emptyBox}>
            <Ionicons name="ticket-outline" size={40} color="#94A3B8" />
            <Text style={styles.emptyText}>Сапарлар әзірше жоқ</Text>
          </View>
        ) : (
          trips.map((trip, index) =>
            // Ближайшая поездка показывается полной карточкой, остальные компактно
            activeTab === 'upcoming' && index === 0 ? renderFullCard(trip) : renderCompactCard(trip)
          )
        )}
      </ScrollView>

      {/* Кнопка новой поездки */}
      <TouchableOpacity
        style={[styles.fabButton, { bottom: 68 + insets.bottom + 16 }]}
        onPress={() => navigation.navigate('SearchTab')}
      >
        <Ionicons name="add" size={32} color="#FFFFFF" />
      </TouchableOpacity>
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
    paddingBottom: 170,
  },
  mainHeading: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.onSurface,
    marginBottom: 6,
  },
  subHeading: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.onSurfaceVariant,
    marginBottom: 20,
  },

  // Вкладки
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#EEF2FF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 16,
    padding: 4,
    marginBottom: 20,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 12,
  },
  tabButtonActive: {
    backgroundColor: '#D8E4FF',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.onSurface,
  },
  tabTextActive: {
    fontWeight: '700',
    color: colors.primary,
  },

  // Полная карточка
  tripCard: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
  },
  tripHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  confirmationText: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.onSurfaceVariant,
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 4,
    backgroundColor: colors.mint,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusBadgeText: {
    color: '#006C49',
    fontSize: 12,
    fontWeight: '700',
  },
  tripDate: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.primary,
  },
  classText: {
    fontSize: 13,
    color: colors.onSurfaceVariant,
    marginTop: 2,
  },
  timelineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stationBlock: {
    width: 100,
  },
  timeBig: {
    fontSize: 26,
    fontWeight: '700',
    color: colors.onSurface,
  },
  stationName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.onSurface,
  },
  centerTimeline: {
    flex: 1,
    alignItems: 'center',
  },
  lineRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dotRing: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.primary,
    backgroundColor: colors.card,
  },
  dotFilled: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primary,
  },
  durationLabel: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
    marginTop: 4,
    textAlign: 'center',
  },
  dashedDivider: {
    height: 1,
    borderWidth: 1,
    borderColor: '#D5DCF0',
    borderStyle: 'dashed',
    borderRadius: 1,
    marginVertical: 16,
  },
  tripFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  seatInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  seatIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#E6EEFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  carriageLabel: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
  },
  seatLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.onSurface,
  },
  viewTicketBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
  },
  viewTicketText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },

  // Компактная карточка
  compactCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  compactTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  compactId: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.onSurfaceVariant,
    letterSpacing: 0.5,
  },
  dateBadge: {
    backgroundColor: '#E6EEFF',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  dateBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.onSurfaceVariant,
  },
  compactRouteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  compactIconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#E6EEFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  compactRoute: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.onSurface,
  },
  compactSub: {
    fontSize: 13,
    color: colors.onSurfaceVariant,
    marginTop: 2,
  },

  // Пустое состояние
  emptyBox: {
    alignItems: 'center',
    paddingVertical: 50,
    gap: 10,
  },
  emptyText: {
    fontSize: 15,
    color: colors.onSurfaceVariant,
  },

  // Кнопка новой поездки
  fabButton: {
    position: 'absolute',
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 18,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
});