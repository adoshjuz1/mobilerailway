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

export default function SearchResultsScreen({ route, navigation }) {
  const { fromCity = 'Астана', toCity = 'Алматы' } = route.params || {};
  const [activeFilter, setActiveFilter] = useState('cheapest');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F4F6F9" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
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

        {/* Блок маршрута */}
        <View style={styles.routeHeader}>
          <View style={{ flex: 1 }}>
            <Text style={styles.routeDateText}>Сәрсенбі, 25 Қаз</Text>
            <Text style={styles.routeCitiesText}>{fromCity} ➔ {toCity}</Text>
            <Text style={styles.routeSubText}>2 ересек үшін 12 нәтиже табылды</Text>
          </View>
          <TouchableOpacity style={styles.modifyBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.modifyBtnText}>Өзгерту</Text>
          </TouchableOpacity>
        </View>

        {/* Фильтры */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersScroll}>
          <TouchableOpacity 
            style={[styles.filterBtn, activeFilter === 'all' && styles.filterBtnActive]}
            onPress={() => setActiveFilter('all')}
          >
            <Text style={[styles.filterText, activeFilter === 'all' && styles.filterTextActive]}>
              ⚙️ Сүзгілер
            </Text>
          </TouchableOpacity>

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

        {/* Поезд 1: Экспресс #9021 */}
        <View style={styles.trainCard}>
          <View style={styles.cardHeader}>
            <View style={styles.expressBadge}>
              <Text style={styles.expressBadgeText}>Экспресс</Text>
            </View>
            <Text style={styles.trainNumber}>Поезд #9021</Text>
            <Text style={styles.priceText}>12 400 ₸</Text>
          </View>

          <View style={styles.timelineRow}>
            <View style={{ alignItems: 'flex-start' }}>
              <Text style={styles.timeText}>08:30</Text>
              <Text style={styles.stationText}>Нұрлы Жол</Text>
            </View>

            <View style={styles.durationBox}>
              <Text style={styles.durationText}>2 сағ 16 мин</Text>
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
              <Text style={styles.timeText}>11:46</Text>
              <Text style={styles.stationText}>Алматы 2</Text>
            </View>
          </View>

          <View style={styles.cardDivider} />

          <View style={styles.cardFooter}>
            <View style={styles.amenitiesRow}>
              <Text style={styles.amenityText}>📶 Wi-Fi</Text>
              <Text style={styles.amenityText}>🍽️ Тамақтану</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('TrainDetails')}>
              <Text style={styles.selectLink}>Таңдау ›</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Поезд 2: Өңірлік #R455 */}
        <View style={styles.trainCard}>
          <View style={styles.cardHeader}>
            <View style={styles.regionalBadge}>
              <Text style={styles.regionalBadgeText}>Өңірлік</Text>
            </View>
            <Text style={styles.trainNumber}>Поезд #R455</Text>
            <Text style={styles.priceText}>4 550 ₸</Text>
          </View>

          <View style={styles.timelineRow}>
            <View style={{ alignItems: 'flex-start' }}>
              <Text style={styles.timeText}>09:15</Text>
              <Text style={styles.stationText}>Нұрлы Жол</Text>
            </View>

            <View style={styles.durationBox}>
              <Text style={styles.durationText}>4 сағ 05 мин</Text>
              <View style={styles.lineWithIcon}>
                <View style={styles.lineDot} />
                <View style={styles.lineTrack} />
                <View style={styles.stopDot} />
                <View style={styles.lineTrack} />
                <View style={styles.lineDot} />
              </View>
              <Text style={styles.stopText}>1 аялдама (Қарағанды)</Text>
            </View>

            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.timeText}>13:20</Text>
              <Text style={styles.stationText}>Алматы 1</Text>
            </View>
          </View>

          <View style={styles.cardDivider} />

          <View style={styles.cardFooter}>
            <View style={styles.amenitiesRow}>
              <Text style={styles.amenityText}>🔌 Розетка</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('TrainDetails')}>
              <Text style={styles.selectLink}>Таңдау ›</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Поезд 3: Экспресс #9025 (ЕҢ ЖЫЛДАМ) */}
        <View style={[styles.trainCard, styles.fastestCard]}>
          <View style={styles.topRibbon}>
            <Text style={styles.topRibbonText}>ЕҢ ЖЫЛДАМ</Text>
          </View>

          <View style={[styles.cardHeader, { marginTop: 6 }]}>
            <View style={styles.expressBadge}>
              <Text style={styles.expressBadgeText}>Экспресс</Text>
            </View>
            <Text style={styles.trainNumber}>Поезд #9025</Text>
            <Text style={styles.priceText}>15 600 ₸</Text>
          </View>

          <View style={styles.timelineRow}>
            <View style={{ alignItems: 'flex-start' }}>
              <Text style={styles.timeText}>10:24</Text>
              <Text style={styles.stationText}>Нұрлы Жол</Text>
            </View>

            <View style={styles.durationBox}>
              <Text style={styles.durationText}>2 сағ 12 мин</Text>
              <View style={styles.lineWithIcon}>
                <View style={styles.lineDot} />
                <View style={styles.lineTrack} />
                <Text style={styles.trainIconInline}>⚡</Text>
                <View style={styles.lineTrack} />
                <View style={styles.lineDot} />
              </View>
              <Text style={styles.directText}>Төте</Text>
            </View>

            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.timeText}>13:36</Text>
              <Text style={styles.stationText}>Алматы 2</Text>
            </View>
          </View>

          <View style={styles.cardDivider} />

          <View style={styles.cardFooter}>
            <View style={styles.amenitiesRow}>
              <Text style={styles.amenityText}>⚡ Жоғары жылдамдықты Wi-Fi</Text>
            </View>
            <TouchableOpacity 
              style={styles.bookNowBtn}
              onPress={() => navigation.navigate('TrainDetails')}
            >
              <Text style={styles.bookNowText}>Брондау</Text>
            </TouchableOpacity>
          </View>
        </View>

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
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 110,
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
  fastestCard: {
    borderWidth: 1.5,
    borderColor: '#0F2C59',
    overflow: 'hidden',
  },
  topRibbon: {
    backgroundColor: '#0F2C59',
    alignSelf: 'flex-end',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderBottomLeftRadius: 10,
    marginRight: -16,
    marginTop: -16,
  },
  topRibbonText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
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
  regionalBadge: {
    backgroundColor: '#E0E7FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 8,
  },
  regionalBadgeText: {
    color: '#4338CA',
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
  stopDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#EF4444',
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
  stopText: {
    fontSize: 10,
    color: '#64748B',
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
  selectLink: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0F2C59',
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