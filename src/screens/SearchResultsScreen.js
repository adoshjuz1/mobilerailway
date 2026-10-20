import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import { searchTrains } from '../services/api';

export default function SearchResultsScreen({ route, navigation }) {
  const { fromCity = 'Алматы', toCity = 'Атырау', date = '2026-10-16' } = route.params || {};
  const [activeFilter, setActiveFilter] = useState('cheapest');
  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTrainsData() {
      setLoading(true);
      const data = await searchTrains(fromCity, toCity, date);
      setTrains(data);
      setLoading(false);
    }
    loadTrainsData();
  }, [fromCity, toCity, date]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F4F6F9" />
      
      {/* Верхняя шапка */}
      <View style={styles.topHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.hamburgerIcon}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.brandTitle}>Railway Connect</Text>
        <TouchableOpacity onPress={() => navigation.navigate('ProfileTab')}>
          <View style={styles.avatarPlaceholder}>
            <Text style={{ fontSize: 16 }}>👤</Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Блок маршрута */}
        <View style={styles.routeHeader}>
          <View style={{ flex: 1 }}>
            <Text style={styles.routeDateText}>{date}</Text>
            <Text style={styles.routeCitiesText}>{fromCity} ➔ {toCity}</Text>
            <Text style={styles.routeSubText}>Табылған поездар саны: {trains.length}</Text>
          </View>
          <TouchableOpacity style={styles.modifyBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.modifyBtnText}>Өзгерту</Text>
          </TouchableOpacity>
        </View>

        {/* Фильтры */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersScroll}>
          <TouchableOpacity 
            style={[styles.filterBtn, activeFilter === 'cheapest' && styles.filterBtnActive]}
            onPress={() => setActiveFilter('cheapest')}
          >
            <Text style={[styles.filterText, activeFilter === 'cheapest' && styles.filterTextActive]}>
              ⚡ Ең арзан
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.filterBtn, activeFilter === 'fastest' && styles.filterBtnActive]}
            onPress={() => setActiveFilter('fastest')}
          >
            <Text style={[styles.filterText, activeFilter === 'fastest' && styles.filterTextActive]}>
              🚀 Ең жылдам
            </Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Индикатор загрузки или список поездов из БД */}
        {loading ? (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color="#0F2C59" />
            <Text style={{ marginTop: 10, color: '#64748B' }}>Поезда жүктелуде...</Text>
          </View>
        ) : trains.length === 0 ? (
          <View style={styles.centerContainer}>
            <Text style={{ color: '#64748B', fontSize: 14 }}>Өкінішке орай, бұл бағытқа поездар табылмады.</Text>
          </View>
        ) : (
          trains.map((item) => (
            <View key={item.id} style={styles.trainCard}>
              <View style={styles.cardHeader}>
                <View style={styles.expressBadge}>
                  <Text style={styles.expressBadgeText}>{item.category || 'Скоростной'}</Text>
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
                    <Text style={styles.trainIconInline}>🚆</Text>
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
                  <Text style={styles.amenityText}>📶 Wi-Fi</Text>
                  <Text style={styles.amenityText}>🔌 Розетка</Text>
                </View>
                <TouchableOpacity 
                  style={styles.bookNowBtn}
                  onPress={() => navigation.navigate('TrainDetails', { train: item })}
                >
                  <Text style={styles.bookNowText}>Таңдау ›</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}

        {/* Промо карточки снизу */}
        <View style={styles.promoRow}>
          <View style={styles.promoCardBlue}>
            <Text style={styles.promoIcon}>🛡️</Text>
            <Text style={styles.promoTitle}>Сапарды қорғау</Text>
            <Text style={styles.promoDesc}>Сапарыңызды бары-жоғы 450 ₸ сақтандырыңыз</Text>
          </View>

          <View style={styles.promoCardOrange}>
            <Text style={styles.promoIcon}>🎖️</Text>
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
    backgroundColor: '#F4F6F9',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  scrollContent: {
    paddingBottom: 110,
  },
  centerContainer: {
    paddingVertical: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  hamburgerIcon: {
    fontSize: 22,
    color: '#0F2C59',
  },
  brandTitle: {
    fontSize: 20,
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
    backgroundColor: '#0F2C59',
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
    flexDirection: 'row',
    marginBottom: 20,
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
    backgroundColor: '#0F2C59',
    borderColor: '#0F2C59',
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
    backgroundColor: '#3B82F6',
  },
  trainIconInline: {
    fontSize: 12,
    marginHorizontal: 4,
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
  amenityText: {
    fontSize: 12,
    color: '#475569',
  },
  bookNowBtn: {
    backgroundColor: '#0F2C59',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },
  bookNowText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 13,
  },
  promoRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  promoCardBlue: {
    flex: 1,
    backgroundColor: '#EFF6FF',
    borderRadius: 16,
    padding: 14,
  },
  promoCardOrange: {
    flex: 1,
    backgroundColor: '#FFEDD5',
    borderRadius: 16,
    padding: 14,
  },
  promoIcon: {
    fontSize: 20,
    marginBottom: 8,
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