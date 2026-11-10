import React, { useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Share,
  Alert,
} from 'react-native';
import { IonIcons } from '@expo/vector-icons';
import Header from '../components/Header';
import { colors, fonts} from '../theme';

const MONTHS = ['Қаң', 'Ақп', 'Нау', 'Сәу', 'Мам', 'Мау', 'Шіл', 'Там', 'Қыр', 'Қаз', 'Қар', 'Жел'];

const DEPARTURE_PLATFORM = "Платформа 9¾";
const ARRIVAL_PLATFORM = "12-ші платформа"

const formatDate = (iso) => {
  if (!iso) return '';
  const [year, month, day] = iso.split('-');
  return `${day} ${MONTHS[Number(month) -1]}, ${year}`;
};

const generateTicketId = () => {
  const letters = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
  const digits = Math.floor(1000 + Math.random() * 9000);
  const suffix = Array.from({ length: 3 }, () => letters[Math.floor(Math.random() * letters.length)]).join('');
  return `ALT-${digits}-${suffix}`;
};

const getSeatText = (seats) => {
  if (seats.length !== 1) return seats.join(', ');
  const side = ['A', 'B'].includes(seats[0].slice(-1)) ? 'Терезе жағы' : 'Жол жағы';
  return `${seats[0]} (${side})`;
}


export default function TicketConfirmationScreen({ route, navigation }) {
  const { train = {}, date, seats = [], carriage } = route.params || {};
  const [ticketId] = useState(generateTicketId);

  const handleShare = () => {
    Share.share({
      message: `Билет ${ticketId}: ${train.from_city} → ${train.to_city}, ${formatDate(date)}, ${train.departure_time}. Вагон ${carriage}, орын ${seats.join(', ')}.`,
    });
  };

  const handleWallet = () => {
    Alert.alert('Әмиян', 'Скоро братишка, скоро');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Header title="Билет расталды" onBack={() => navigation.navigate('Main')} onAvatarPress={() => navigation.navigate('Main', { screen: 'ProfileTab' })} />

        {/* Успешный статус */}
        <View style={styles.successContainer}>
          <View style={styles.successIconBox}>
            <IonIcons name="checkmark-circle-outline" size={40} color="#00513A" />
          </View>
          <Text style={styles.successTitle}>Брондау расталды!</Text>
          <Text style={styles.successSub}>
            Сапарыңыз дайын. Билетіңіз отырғызу үшін төменде дайын тұр.
          </Text>
        </View>

        {/* Карточка электронного билета */}
        <View style={styles.ticketCard}>
          <View style={styles.ticketTopRow}>
            <View>
              <Text style={styles.ticketIdLabel}>БИЛЕТ НӨМІРІ</Text>
              <Text style={styles.ticketIdValue}>{ticketId}</Text>
            </View>
            <View style={styles.statusBadge}>
              <Text style={styles.statusBadgeText}>Уақытында</Text>
            </View>
          </View>

          {/* Маршрут билета */}
          <View style={styles.routeSection}>
            <View style={styles.stationBlock}>
              <Text style={styles.stationCity}>{train.from_city}</Text>
              <Text style={styles.platformText}>{DEPARTURE_PLATFORM}</Text>
              <Text style={styles.timeText}>{train.departure_time}</Text>
            </View>

            <View style={styles.routeDots}>
              <View style={styles.dotFilled} />
              <View style={styles.dotRing} />
            </View>

            <View style={[styles.stationBlock, styles.stationBlockRight]}>
              <Text style={styles.stationCity}>{train.to_city}</Text>
              <Text style={styles.platformText}>{ARRIVAL_PLATFORM}</Text>
              <Text style={styles.timeText}>{train.arrival_time}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Детали даты и места */}
          <View style={styles.detailsRow}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Күні</Text>
              <Text style={styles.detailValue}>{formatDate(date)}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Вагон</Text>
              <Text style={styles.detailValue}>{carriage}</Text>
            </View>
            <View style={[styles.detailItem, styles.detailItemRight]}>
              <Text style={styles.detailLabel}>Орын</Text>
              <Text style={[styles.detailValue, styles.textRight]}>{getSeatText(seats)}</Text>
            </View>
          </View>

          <View style={styles.dishedDivider} />

          {/* QR-код заглушка */}
          <View style={styles.qrFrame}>
            <View style={styles.qrBox}>
              <IonIcons name="qr-code" size={130} color="#FFFFFF" />
            </View>
          </View>
          <Text style={styles.qrInstruction}>
            Қақпада немесе жол жетекшісі сұрағанда осы QR-кодты көрсетіңіз.
          </Text>
        </View>

        {/* Кнопки действий */}
        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.actionBtnBlue}>
            <Text style={styles.actionBtnIcon}>📱</Text>
            <Text style={styles.actionBtnTextBlue}>Әмиянға қосу</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionBtnBlue}>
            <Text style={styles.actionBtnIcon}>🔗</Text>
            <Text style={styles.actionBtnTextBlue}>Бөлісу</Text>
          </TouchableOpacity>
        </View>

        {/* Кнопка возврата на главную */}
        <TouchableOpacity 
          style={styles.homeButton}
          onPress={() => navigation.navigate('Main')}
        >
          <Text style={styles.homeButtonText}>Басты бетке оралу</Text>
        </TouchableOpacity>

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
    paddingBottom: 40,
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
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
  successContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  successIconBox: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#DCFCE7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  successCheck: {
    fontSize: 28,
    color: '#15803D',
    fontWeight: 'bold',
  },
  successTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0F2C59',
    marginBottom: 4,
  },
  successSub: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  ticketCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
  },
  ticketTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  ticketIdLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#64748B',
  },
  ticketIdValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0F2C59',
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
  routeSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  stationBlock: {
    flex: 1,
  },
  stationCity: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 2,
  },
  platformText: {
    fontSize: 11,
    color: '#64748B',
    marginBottom: 4,
  },
  timeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0F2C59',
  },
  stationCenterLine: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  dotBlue: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#0F2C59',
  },
  trackLine: {
    height: 30,
    width: 2,
    backgroundColor: '#CBD5E1',
    marginVertical: 2,
  },
  dotOutline: {
    width: 8,
    height: 8,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#0F2C59',
    backgroundColor: '#FFFFFF',
  },
  dashedDivider: {
    height: 1,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderStyle: 'dashed',
    marginBottom: 16,
  },
  ticketDetailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  detailLabel: {
    fontSize: 11,
    color: '#64748B',
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  qrContainer: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  qrBox: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  qrEmoji: {
    fontSize: 36,
    marginBottom: 4,
  },
  qrCodeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#334155',
    letterSpacing: 2,
  },
  qrInstruction: {
    fontSize: 11,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 16,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  actionBtnBlue: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#EFF6FF',
    borderRadius: 14,
    paddingVertical: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  actionBtnIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  actionBtnTextBlue: {
    color: '#1D4ED8',
    fontWeight: 'bold',
    fontSize: 13,
  },
  homeButton: {
    backgroundColor: '#0F2C59',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  homeButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
});