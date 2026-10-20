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

export default function MyTripsScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('upcoming'); // 'upcoming' или 'past'

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F4F6F9" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Шапка */}
        <View style={styles.topHeader}>
          <Text style={styles.hamburgerIcon}>☰</Text>
          <Text style={styles.brandTitle}>Railway Connect</Text>
          <View style={styles.avatarPlaceholder}>
            <Text style={{ fontSize: 16 }}>👤</Text>
          </View>
        </View>

        {/* Заголовок страницы */}
        <View style={styles.titleSection}>
          <Text style={styles.mainHeading}>Менің сапарларым</Text>
          <Text style={styles.subHeading}>Белсенді сапарларыңыз бен саяхат тарихын басқарыңыз.</Text>
        </View>

        {/* Переключатель вкладок Upcoming / Past */}
        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tabButton, activeTab === 'upcoming' && styles.activeTab]}
            onPress={() => setActiveTab('upcoming')}
          >
            <Text style={[styles.tabText, activeTab === 'upcoming' && styles.activeTabText]}>Алдағы</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.tabButton, activeTab === 'past' && styles.activeTab]}
            onPress={() => setActiveTab('past')}
          >
            <Text style={[styles.tabText, activeTab === 'past' && styles.activeTabText]}>Өткен</Text>
          </TouchableOpacity>
        </View>

        {/* Карточка активной поездки */}
        <View style={styles.tripCard}>
          <View style={styles.tripHeaderRow}>
            <View>
              <Text style={styles.confirmationText}>БРОНДАУ #RC8821</Text>
            </View>
            <View style={styles.statusBadgeGreen}>
              <Text style={styles.statusBadgeGreenText}>✓ Уақытында</Text>
            </View>
          </View>

          <View style={styles.tripDateRow}>
            <Text style={styles.tripDateMain}>24 Қараша</Text>
            <Text style={styles.classText}>Стандарт Класс</Text>
          </View>

          {/* Временная шкала маршрута */}
          <View style={styles.timelineContainer}>
            <View>
              <Text style={styles.timeBig}>08:45</Text>
              <Text style={styles.stationName}>London Kings Cross</Text>
            </View>

            <View style={styles.centerTimeline}>
              <Text style={styles.durationLabel}>2 сағ 15 мин</Text>
              <View style={styles.lineRow}>
                <View style={styles.dotStart} />
                <View style={styles.lineTrack} />
                <Text style={{ fontSize: 12 }}>🚆</Text>
                <View style={styles.lineTrack} />
                <View style={styles.dotEnd} />
              </View>
            </View>

            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.timeBig}>11:00</Text>
              <Text style={styles.stationName}>Edinburgh Waverley</Text>
            </View>
          </View>

          <View style={styles.dashedDivider} />

          {/* Вагон и кнопка просмотра билета */}
          <View style={styles.tripFooter}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontSize: 20, marginRight: 8 }}>💺</Text>
              <View>
                <Text style={styles.carriageLabel}>Вагон C</Text>
                <Text style={styles.seatLabel}>Орын 42A (Терезе)</Text>
              </View>
            </View>

            <TouchableOpacity 
              style={styles.viewTicketBtn}
              onPress={() => navigation.navigate('TicketConfirmation')}
            >
              <Text style={styles.viewTicketText}>🎟️ Билетті көру</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Карточка второй поездки */}
        <View style={styles.tripCardPassive}>
          <View style={styles.passiveTopRow}>
            <Text style={styles.passiveId}>БРОНДАУ #RC9004</Text>
            <View style={styles.dateBadgeGray}>
              <Text style={styles.dateBadgeGrayText}>02 Желтоқсан</Text>
            </View>
          </View>

          <View style={styles.passiveRouteRow}>
            <View style={styles.passiveIconBox}>
              <Text style={{ fontSize: 16 }}>🚆</Text>
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.passiveRouteTitle}>Manchester Piccadilly ➔ London Euston</Text>
              <Text style={styles.passiveRouteSub}>Кету: 14:20 • Avanti West Coast</Text>
            </View>
            <Text style={styles.arrowGray}>›</Text>
          </View>
        </View>

      </ScrollView>

      {/* Плавающая кнопка добавления */}
      <TouchableOpacity style={styles.fabButton}>
        <Text style={styles.fabIcon}>＋</Text>
      </TouchableOpacity>
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
  titleSection: {
    marginBottom: 16,
  },
  mainHeading: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#0F2C59',
    marginBottom: 4,
  },
  subHeading: {
    fontSize: 13,
    color: '#64748B',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#E2E8F0',
    borderRadius: 14,
    padding: 4,
    marginBottom: 20,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  activeTab: {
    backgroundColor: '#FFFFFF',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
  },
  activeTabText: {
    color: '#0F2C59',
    fontWeight: 'bold',
  },
  tripCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  tripHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  confirmationText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#64748B',
    letterSpacing: 0.5,
  },
  statusBadgeGreen: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  statusBadgeGreenText: {
    color: '#15803D',
    fontSize: 10,
    fontWeight: 'bold',
  },
  tripDateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  tripDateMain: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0F2C59',
  },
  classText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
  },
  timelineContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  timeBig: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  stationName: {
    fontSize: 11,
    color: '#64748B',
    maxWidth: 90,
  },
  centerTimeline: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  durationLabel: {
    fontSize: 10,
    color: '#64748B',
    marginBottom: 4,
  },
  lineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  lineTrack: {
    flex: 1,
    height: 2,
    backgroundColor: '#CBD5E1',
  },
  dotStart: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#0F2C59',
  },
  dotEnd: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#0F2C59',
  },
  dashedDivider: {
    height: 1,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    borderStyle: 'dashed',
    marginBottom: 14,
  },
  tripFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  carriageLabel: {
    fontSize: 11,
    color: '#64748B',
  },
  seatLabel: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#0F2C59',
  },
  viewTicketBtn: {
    backgroundColor: '#0F2C59',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
  },
  viewTicketText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
  tripCardPassive: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 5,
  },
  passiveTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  passiveId: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#64748B',
  },
  dateBadgeGray: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  dateBadgeGrayText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#475569',
  },
  passiveRouteRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  passiveIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  passiveRouteTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 2,
  },
  passiveRouteSub: {
    fontSize: 11,
    color: '#64748B',
  },
  arrowGray: {
    fontSize: 18,
    color: '#94A3B8',
  },
  fabButton: {
    position: 'absolute',
    bottom: 90,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#00D18F',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  fabIcon: {
    fontSize: 28,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginTop: -2,
  },
});