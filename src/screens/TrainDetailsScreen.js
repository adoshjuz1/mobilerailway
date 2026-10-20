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

export default function TrainDetailsScreen({ navigation }) {
  const [selectedClass, setSelectedClass] = useState('standard'); // 'standard' или 'first'

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F4F6F9" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Шапка */}
        <View style={styles.topHeader}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Поезд мәліметтері</Text>
          <View style={styles.avatarPlaceholder}>
            <Text style={{ fontSize: 16 }}>👤</Text>
          </View>
        </View>

        {/* Главная карточка поезда */}
        <View style={styles.mainCard}>
          <View style={styles.cardTopRow}>
            <View style={styles.statusBadge}>
              <Text style={styles.statusBadgeText}>Уақытында</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.priceBig}>12 450 ₸</Text>
              <Text style={styles.priceSub}>адам басына</Text>
            </View>
          </View>

          <Text style={styles.trainTitle}>Expresso 402</Text>
          <Text style={styles.trainType}>Жоғары жылдамдықты қалааралық</Text>

          {/* Иконки удобств */}
          <View style={styles.amenitiesRow}>
            <View style={styles.amenityBox}>
              <Text style={styles.amenityIcon}>📶</Text>
              <Text style={styles.amenityText}>Тегін Wi-Fi</Text>
            </View>

            <View style={styles.amenityBox}>
              <Text style={styles.amenityIcon}>🔌</Text>
              <Text style={styles.amenityText}>220V Розетка</Text>
            </View>

            <View style={styles.amenityBox}>
              <Text style={styles.amenityIcon}>🍽️</Text>
              <Text style={styles.amenityText}>Вагон-ресторан</Text>
            </View>
          </View>
        </View>

        {/* Сапар бағыты (Journey Timeline) */}
        <Text style={styles.sectionTitle}>Сапар бағыты</Text>
        
        <View style={styles.timelineCard}>
          <View style={styles.timelineItem}>
            <View style={styles.dotBlue} />
            <View style={styles.timelineContent}>
              <View style={styles.itemHeader}>
                <Text style={styles.timeText}>08:30</Text>
                <Text style={styles.platformText}>4-ші платформа</Text>
              </View>
              <Text style={styles.stationTitle}>Астана (Нұрлы Жол)</Text>
              <Text style={styles.stationSub}>Шығатын станция</Text>
            </View>
          </View>

          <View style={styles.verticalLine} />

          <View style={styles.timelineItem}>
            <View style={styles.dotGray} />
            <View style={styles.timelineContent}>
              <View style={styles.itemHeader}>
                <Text style={styles.timeText}>10:15</Text>
                <Text style={styles.platformText}>1-ші платформа</Text>
              </View>
              <Text style={styles.stationTitle}>Қарағанды Сортировочная</Text>
              <Text style={styles.stationSub}>5 минут аялдама</Text>
            </View>
          </View>

          <View style={styles.verticalLine} />

          <View style={styles.timelineItem}>
            <View style={styles.dotOutline} />
            <View style={styles.timelineContent}>
              <View style={styles.itemHeader}>
                <Text style={styles.timeText}>12:45</Text>
                <Text style={styles.platformText}>12-ші платформа</Text>
              </View>
              <Text style={styles.stationTitle}>Алматы 2</Text>
              <Text style={styles.stationSub}>Баратын станция</Text>
            </View>
          </View>
        </View>

        {/* Класс таңдау */}
        <Text style={styles.sectionTitle}>Жол жүру класын таңдаңыз</Text>

        <View style={styles.classRow}>
          {/* Стандарт */}
          <TouchableOpacity 
            style={[styles.classCard, selectedClass === 'standard' && styles.classCardActive]}
            onPress={() => setSelectedClass('standard')}
          >
            <View style={styles.classHeader}>
              <Text style={styles.classTitle}>СТАНДАРТ</Text>
              {selectedClass === 'standard' && <Text style={styles.checkIcon}>✓</Text>}
            </View>
            <Text style={styles.classPrice}>12 450 ₸</Text>
            <Text style={styles.classDesc}>Реттелетін орындықтар, USB зарядтау</Text>
          </TouchableOpacity>

          {/* Бірінші класс */}
          <TouchableOpacity 
            style={[styles.classCard, selectedClass === 'first' && styles.classCardActive]}
            onPress={() => setSelectedClass('first')}
          >
            <View style={styles.classHeader}>
              <Text style={styles.classTitle}>1-ШІ КЛАСС</Text>
              {selectedClass === 'first' && <Text style={styles.checkIcon}>✓</Text>}
            </View>
            <Text style={styles.classPrice}>18 900 ₸</Text>
            <Text style={styles.classDesc}>Кең орындар, тегін тамақ, Бизнес-зал</Text>
          </TouchableOpacity>
        </View>

        {/* Детализация цен */}
        <View style={styles.priceBreakdownCard}>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Негізгі тариф</Text>
            <Text style={styles.priceVal}>11 200 ₸</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Брондау ақысы</Text>
            <Text style={styles.priceVal}>450 ₸</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Салықтар мен алымдар</Text>
            <Text style={styles.priceVal}>800 ₸</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.priceRow}>
            <Text style={styles.totalLabel}>Барлығы</Text>
            <Text style={styles.totalVal}>
              {selectedClass === 'standard' ? '12 450 ₸' : '18 900 ₸'}
            </Text>
          </View>
        </View>

      </ScrollView>

      {/* Нижняя кнопка */}
      <View style={styles.bottomBar}>
        <TouchableOpacity 
          style={styles.chooseSeatsBtn}
          onPress={() => navigation.navigate('SeatSelection')}
        >
          <Text style={styles.chooseSeatsBtnText}>Орын таңдау  💺</Text>
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
    paddingBottom: 110,
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
  mainCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  statusBadge: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  statusBadgeText: {
    color: '#15803D',
    fontSize: 11,
    fontWeight: 'bold',
  },
  priceBig: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0F2C59',
  },
  priceSub: {
    fontSize: 11,
    color: '#64748B',
  },
  trainTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 2,
  },
  trainType: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 16,
  },
  amenitiesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  amenityBox: {
    flex: 1,
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: 'center',
  },
  amenityIcon: {
    fontSize: 16,
    marginBottom: 4,
  },
  amenityText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#1D4ED8',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0F2C59',
    marginBottom: 12,
  },
  timelineCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  dotBlue: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#0F2C59',
    marginTop: 4,
    marginRight: 12,
  },
  dotGray: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#94A3B8',
    marginTop: 4,
    marginRight: 12,
  },
  dotOutline: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#0F2C59',
    backgroundColor: '#FFFFFF',
    marginTop: 4,
    marginRight: 12,
  },
  verticalLine: {
    width: 2,
    height: 24,
    backgroundColor: '#E2E8F0',
    marginLeft: 5,
    marginVertical: 2,
  },
  timelineContent: {
    flex: 1,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  timeText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  platformText: {
    fontSize: 11,
    color: '#64748B',
  },
  stationTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0F2C59',
  },
  stationSub: {
    fontSize: 11,
    color: '#94A3B8',
  },
  classRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  classCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
  },
  classCardActive: {
    borderColor: '#0F2C59',
    backgroundColor: '#F8FAFC',
  },
  classHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  classTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#64748B',
  },
  checkIcon: {
    color: '#0F2C59',
    fontWeight: 'bold',
  },
  classPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0F2C59',
    marginBottom: 4,
  },
  classDesc: {
    fontSize: 11,
    color: '#64748B',
    lineHeight: 15,
  },
  priceBreakdownCard: {
    backgroundColor: '#EFF6FF',
    borderRadius: 16,
    padding: 16,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  priceLabel: {
    fontSize: 13,
    color: '#475569',
  },
  priceVal: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1E293B',
  },
  divider: {
    height: 1,
    backgroundColor: '#DBEAFE',
    marginVertical: 8,
  },
  totalLabel: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#0F2C59',
  },
  totalVal: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0F2C59',
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
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  chooseSeatsBtn: {
    backgroundColor: '#0F2C59',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  chooseSeatsBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});