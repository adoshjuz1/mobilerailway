import React, { useState, useEffect, useMemo } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import { searchTrains } from '../services/api';
import { USE_MOCK_TRAINS, getMockTrains } from '../services/mockTrains';

const DAYS = ['Жексенбі', 'Дүйсенбі', 'Сейсенбі', 'Сәрсенбі', 'Бейсенбі', 'Жұма', 'Сенбі'];
const MONTHS = ['Қаң', 'Ақп', 'Нау', 'Сәу', 'Мам', 'Мау', 'Шіл', 'Там', 'Қыр', 'Қаз', 'Қар', 'Жел'];

// 2026-10-16 -> «Жұма, 16 Қаз»
const formatDateKazakh = (dateString) => {
  try {
    const [year, month, day] = dateString.split('-');
    const dateObj = new Date(year, month - 1, day);
    return `${DAYS[dateObj.getDay()]}, ${day} ${MONTHS[dateObj.getMonth()]}`;
  } catch (e) {
    return dateString;
  }
};

const FILTERS = [
  { id: 'cheapest', label: 'Ең арзан', icon: 'flash-outline' },
  { id: 'fastest', label: 'Ең жылдам', icon: 'rocket-outline' },
  { id: 'earliest', label: 'Ең ерте', icon: 'sunny-outline' },
];

const timeToMinutes = (time) => {
  const [h, m] = (time || '0:0').split(':').map(Number);
  return h * 60 + (m || 0);
};

// Длительность в минутах: сначала из duration_text, иначе по времени отправления и прибытия
const getDurationMinutes = (train) => {
  const text = train.duration_text || '';
  const num = (re) => {
    const match = text.match(re);
    return match ? parseInt(match[1], 10) : 0;
  };
  const total =
    num(/(\d+)\s*(?:күн|тәул|д)/i) * 1440 +
    num(/(\d+)\s*(?:сағ|ч|h)/i) * 60 +
    num(/(\d+)\s*(?:мин|м|m)/i);
  if (total > 0) return total;

  let diff = timeToMinutes(train.arrival_time) - timeToMinutes(train.departure_time);
  if (diff <= 0) diff += 1440;
  return diff;
};

export default function SearchResultsScreen({ route, navigation }) {
  const { fromCity = 'Алматы', toCity = 'Атырау', date = '2026-10-16' } = route.params || {};

  const [activeFilter, setActiveFilter] = useState('cheapest');
  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function loadTrainsData() {
      setLoading(true);
      setError(false);
      try {
        const data = USE_MOCK_TRAINS
          ? getMockTrains(fromCity, toCity)
          : await searchTrains(fromCity, toCity, date);
        if (!cancelled) setTrains(Array.isArray(data) ? data : []);
      } catch (e) {
        if (!cancelled) {
          setTrains([]);
          setError(true);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadTrainsData();
    return () => {
      cancelled = true;
    };
  }, [fromCity, toCity, date, reloadKey]);

  const sortedTrains = useMemo(() => {
    const list = [...trains];
    if (activeFilter === 'cheapest') {
      list.sort((a, b) => Number(a.min_price) - Number(b.min_price));
    } else if (activeFilter === 'fastest') {
      list.sort((a, b) => getDurationMinutes(a) - getDurationMinutes(b));
    } else {
      list.sort((a, b) => timeToMinutes(a.departure_time) - timeToMinutes(b.departure_time));
    }
    return list;
  }, [trains, activeFilter]);

  // Самый быстрый поезд получает метку и выделенную карточку (если поездов больше одного)
  const fastestId = useMemo(() => {
    if (trains.length < 2) return null;
    return trains.reduce((best, t) => (getDurationMinutes(t) < getDurationMinutes(best) ? t : best)).id;
  }, [trains]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9F9FF" />

      <View style={styles.headerWrap}>
        <Header onAvatarPress={() => navigation.navigate('Main', { screen: 'ProfileTab' })} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.routeHeader}>
          <View style={{ flex: 1 }}>
            <Text style={styles.routeDateText}>{formatDateKazakh(date)}</Text>
            <Text style={styles.routeCitiesText}>{fromCity} ➔ {toCity}</Text>
            <Text style={styles.routeSubText}>Табылған поездар саны: {trains.length}</Text>
          </View>
          <TouchableOpacity style={styles.modifyBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.modifyBtnText}>Өзгерту</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersScroll}>
          <TouchableOpacity style={styles.filterBtnOutline}>
            <Ionicons name="options-outline" size={16} color="#334155" style={{ marginRight: 6 }} />
            <Text style={styles.filterText}>Сүзгілер</Text>
          </TouchableOpacity>

          {FILTERS.map((filter) => {
            const active = activeFilter === filter.id;
            return (
              <TouchableOpacity
                key={filter.id}
                style={[styles.filterBtn, active && styles.filterBtnActive]}
                onPress={() => setActiveFilter(filter.id)}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Ionicons
                    name={filter.icon}
                    size={14}
                    color={active ? '#FFFFFF' : '#334155'}
                    style={{ marginRight: 4 }}
                  />
                  <Text style={[styles.filterText, active && styles.filterTextActive]}>{filter.label}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {loading ? (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color="#003d9b" />
            <Text style={styles.centerText}>Поезда жүктелуде...</Text>
          </View>
        ) : error ? (
          <View style={styles.centerContainer}>
            <Ionicons name="cloud-offline-outline" size={32} color="#94A3B8" />
            <Text style={styles.centerText}>Деректерді жүктеу мүмкін болмады.</Text>
            <TouchableOpacity style={styles.retryBtn} onPress={() => setReloadKey((k) => k + 1)}>
              <Text style={styles.retryBtnText}>Қайталау</Text>
            </TouchableOpacity>
          </View>
        ) : sortedTrains.length === 0 ? (
          <View style={styles.centerContainer}>
            <Text style={styles.centerText}>Өкінішке орай, бұл бағытқа поездар табылмады.</Text>
          </View>
        ) : (
          sortedTrains.map((item) => {
            const isFastest = item.id === fastestId;
            return (
            <View key={item.id} style={[styles.trainCard, isFastest && styles.trainCardFastest]}>
              {isFastest && (
                <View style={styles.fastestTag}>
                  <Text style={styles.fastestTagText}>ЕҢ ЖЫЛДАМ</Text>
                </View>
              )}
              <View style={styles.cardHeader}>
                <View style={styles.expressBadge}>
                  <Text style={styles.expressBadgeText}>{item.category || 'Express'}</Text>
                </View>
                <Text style={styles.trainNumber}>Поезд #{item.number} ({item.name})</Text>
                <Text style={styles.priceText}>{item.min_price} ₸</Text>
              </View>

              <View style={styles.timelineRow}>
                <View style={{ alignItems: 'flex-start' }}>
                  <Text style={styles.timeText}>{item.departure_time}</Text>
                  <Text style={styles.stationText}>{item.from_city}</Text>
                </View>

                <View style={styles.durationBox}>
                  <Text style={styles.durationText}>{item.duration_text}</Text>
                  <View style={styles.lineWithIcon}>
                    <View style={styles.lineDot} />
                    <View style={styles.lineTrack} />
                    <Ionicons name="train" size={14} color="#003d9b" style={{ marginHorizontal: 4 }} />
                    <View style={styles.lineTrack} />
                    <View style={styles.lineDot} />
                  </View>
                  <Text style={styles.directText}>Төте</Text>
                </View>

                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={styles.timeText}>{item.arrival_time}</Text>
                  <Text style={styles.stationText}>{item.to_city}</Text>
                </View>
              </View>

              <View style={styles.cardDivider} />

              <View style={styles.cardFooter}>
                <View style={styles.amenitiesRow}>
                  <View style={styles.amenity}>
                    <Ionicons name="wifi" size={17} color="#475569" style={{ marginRight: 4 }} />
                    <Text style={styles.amenityText}>Wi-Fi</Text>
                  </View>
                  <View style={styles.amenity}>
                    <Ionicons name="flash-outline" size={17} color="#475569" style={{ marginRight: 4 }} />
                    <Text style={styles.amenityText}>Розетка</Text>
                  </View>
                </View>

                <TouchableOpacity
                  style={isFastest ? styles.bookBtn : styles.selectBtn}
                  onPress={() => navigation.navigate('TrainDetails', { train: item, date })}
                >
                  <Text style={isFastest ? styles.bookBtnText : styles.selectBtnText}>
                    {isFastest ? 'Брондау' : 'Таңдау ›'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            );
          })
        )}

        <View style={styles.promoRow}>
          <View style={styles.promoCardBlue}>
            <Ionicons name="shield-checkmark-outline" size={24} color="#003d9b" style={{ marginBottom: 8 }} />
            <Text style={styles.promoTitle}>Сапарды қорғау</Text>
            <Text style={styles.promoDesc}>Сапарыңызды бары-жоғы 450 ₸ сақтандырыңыз</Text>
          </View>

          <View style={styles.promoCardOrange}>
            <Ionicons name="ribbon-outline" size={24} color="#d97706" style={{ marginBottom: 8 }} />
            <Text style={styles.promoTitle}>1-ші класс</Text>
            <Text style={styles.promoDesc}>Қосымша орын және тегін тағамдар</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9FF',
  },
  headerWrap: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  centerContainer: {
    paddingVertical: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerText: {
    marginTop: 10,
    color: '#64748B',
    fontSize: 14,
    textAlign: 'center',
  },
  retryBtn: {
    marginTop: 16,
    backgroundColor: '#003d9b',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
  },
  retryBtnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 13,
  },
  routeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  routeDateText: {
    fontSize: 12,
    color: '#64748B',
  },
  routeCitiesText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0F2C59',
    marginVertical: 2,
  },
  routeSubText: {
    fontSize: 12,
    color: '#64748B',
  },
  modifyBtn: {
    backgroundColor: '#003d9b',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  modifyBtnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 13,
  },
  filtersScroll: {
    flexGrow: 0,
    marginBottom: 20,
  },
  filterBtnOutline: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 10,
  },
  filterBtn: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 10,
  },
  filterBtnActive: {
    backgroundColor: '#003d9b',
    borderColor: '#003d9b',
  },
  filterText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#334155',
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  trainCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  expressBadge: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 8,
  },
  expressBadgeText: {
    color: '#15803D',
    fontSize: 11,
    fontWeight: 'bold',
  },
  trainNumber: {
    fontSize: 12,
    color: '#64748B',
    flex: 1,
  },
  priceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0F2C59',
  },
  timelineRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  timeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  stationText: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  durationBox: {
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 10,
  },
  durationText: {
    fontSize: 11,
    color: '#64748B',
    marginBottom: 4,
  },
  lineWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  lineTrack: {
    flex: 1,
    height: 2,
    backgroundColor: '#CBD5E1',
  },
  lineDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#003d9b',
  },
  directText: {
    fontSize: 11,
    color: '#16A34A',
    fontWeight: 'bold',
    marginTop: 4,
  },
  cardDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  amenitiesRow: {
    flexDirection: 'row',
    gap: 12,
  },
  amenity: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amenityText: {
    fontSize: 12,
    color: '#475569',
  },
  selectBtn: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },
  selectBtnText: {
    color: '#003d9b',
    fontWeight: 'bold',
    fontSize: 13,
  },
  trainCardFastest: {
    borderWidth: 1,
    borderColor: '#8FA8D8',
    paddingTop: 36,
  },
  fastestTag: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#003d9b',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderTopRightRadius: 19,
    borderBottomLeftRadius: 12,
  },
  fastestTagText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  bookBtn: {
    backgroundColor: '#003d9b',
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 12,
  },
  bookBtnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  promoRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  promoCardBlue: {
    flex: 1,
    backgroundColor: '#EFF6FF',
    borderRadius: 20,
    padding: 16,
  },
  promoCardOrange: {
    flex: 1,
    backgroundColor: '#FFEDD5',
    borderRadius: 20,
    padding: 16,
  },
  promoTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 4,
  },
  promoDesc: {
    fontSize: 11,
    color: '#64748B',
    lineHeight: 15,
  },
});