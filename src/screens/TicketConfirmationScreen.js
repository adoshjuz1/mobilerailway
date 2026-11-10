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
import { Ionicons } from '@expo/vector-icons';
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
        <Header title="Билет расталды" centered onBack={() => navigation.navigate('Main')} onAvatarPress={() => navigation.navigate('Main', { screen: 'ProfileTab' })} />

{/* зеблютуздевайсконнектедсаксесфули */}
        <View style={styles.successContainer}>
          <View style={styles.successIconBox}>
            <Ionicons name="checkmark-circle-outline" size={40} color="#00513A" />
          </View>
          <Text style={styles.successTitle}>Брондау расталды!</Text>
          <Text style={styles.successSub}>
            Сапарыңыз дайын. Билетіңіз отырғызу үшін төменде дайын тұр.
          </Text>
        </View>

{/* электронныйбилет */}
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

{/* отправкаприбытиеотидо */}
          <View style={styles.routeSection}>
            <View style={styles.stationBlock}>
              <Text style={styles.stationCity}>{train.from_city}</Text>
              <Text style={styles.platformText}>{DEPARTURE_PLATFORM}</Text>
              <Text style={styles.timeText}>{train.departure_time}</Text>
            </View>


            <View style={[styles.stationBlock, styles.stationBlockRight]}>
              <Text style={styles.stationCity}>{train.to_city}</Text>
              <Text style={styles.platformText}>{ARRIVAL_PLATFORM}</Text>
              <Text style={styles.timeText}>{train.arrival_time}</Text>
            </View>
          </View>

          <View style={styles.divider} />

{/* Деталидатавагонместо */}
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
{/* куаркодзаглушка */}
          <View style={styles.qrFrame}>
            <View style={styles.qrBox}>
              <Ionicons name="qr-code" size={130} color="#FFFFFF" />
            </View>
          </View>
          <Text style={styles.qrInstruction}>
            Қақпада немесе жол жетекшісі сұрағанда осы QR-кодты көрсетіңіз.
          </Text>
        </View>

{/* кнопкадействияподелитьсяикошелек */}
        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.actionBtn} onPress={handleWallet}>
            <View style={[styles.actionIcon, styles.actionIconPrimary]}>
              <Ionicons name="wallet" size={24} color="#FFFFFF" />
            </View>
            <Text style={styles.actionText}>Әмиянға қосу</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionBtn} onPress={handleShare}>
            <View style={[styles.actionIcon, styles.actionIconLight]}>
              <Ionicons name="share-social" size={22} color={colors.primary} />
            </View>
              <Text style={styles.actionText}>Билетпен бөлісу</Text>
          </TouchableOpacity>
        </View>
{/* поездинфоресторанинфоподдержка */}
        <TouchableOpacity style={styles.infoRow}>
          <View style={styles.infoIcon}>
            <Ionicons name="train" size={22} color={colors.primary} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.infoTitle}>Пойыз туралы ақпарат</Text>
            <Text style={styles.infoSub}>{train.name} №{train.number}</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#94a3b8" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.infoRow}>
          <View style={styles.infoIcon}>
            <Ionicons name="restaurant" size={22} color={colors.primary} />
          </View>
          <View style={{ flex: 1}}>
            <Text style={styles.infoTitle}>Бортта қызмет көрсету</Text>
            <Text style={styles.infoSub}>Вагон-ресторан қолжетімді</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#94a3b8" />
        </TouchableOpacity>

        <View style={styles.supportBlock}>
          <Text style={styles.supportText}>Сапарыңызға көмек керек пе?</Text>
          <TouchableOpacity>
            <Text style={styles.supportLink}>Қолдау қызметіне хабарласу</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    paddingBottom: 40,
  },
  textRight: {
    textAlign: 'right',
  },

  // Статус
  successContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  successIconBox: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.mint,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  successTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#006C49',
    marginBottom: 6,
  },
  successSub: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    paddingHorizontal: 16,
  },

  // Билет
  ticketCard: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 18,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
  },
  ticketTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  ticketIdLabel: {
    fontSize: 11,
    fontWeight: '500',
    color: colors.onSurfaceVariant,
    letterSpacing: 0.5,
  },
  ticketIdValue: {
    fontSize: 14,
    fontFamily: fonts.mono,
    color: colors.primary,
  },
  statusBadge: {
    backgroundColor: colors.mint,
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 14,
  },
  statusBadgeText: {
    color: '#006C49',
    fontSize: 13,
    fontWeight: '700',
  },
  routeSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  stationBlock: {
    flex: 1,
  },
  stationBlockRight: {
    alignItems: 'flex-end',
  },
  stationCity: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.onSurface,
    marginBottom: 2,
  },
  platformText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: 6,
  },
  timeText: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.onSurface,
  },
  divider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginBottom: 14,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  detailItem: {
    flex: 1,
  },
  detailItemRight: {
    alignItems: 'flex-end',
  },
  detailLabel: {
    fontSize: 13,
    color: colors.onSurfaceVariant,
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.onSurface,
  },
  dashedDivider: {
    height: 1,
    borderWidth: 1,
    borderColor: '#D5DCF0',
    borderStyle: 'dashed',
    borderRadius: 1,
    marginVertical: 18,
  },
  qrFrame: {
    alignSelf: 'center',
    padding: 8,
    borderRadius: 18,
    borderWidth: 3,
    borderColor: colors.mint,
    marginBottom: 14,
  },
  qrBox: {
    width: 190,
    height: 190,
    borderRadius: 8,
    backgroundColor: '#0F3550',
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrInstruction: {
    fontSize: 13,
    lineHeight: 18,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
  },

  // Кнопки действий
  actionsRow: {
    flexDirection: 'row',
    gap: 14,
    marginBottom: 20,
  },
  actionBtn: {
    flex: 1,
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#E6EEFF',
    borderRadius: 16,
    paddingVertical: 18,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionIconPrimary: {
    backgroundColor: colors.primary,
  },
  actionIconLight: {
    backgroundColor: '#D5DFF7',
  },
  actionText: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.primary,
  },

  // Информационные строки
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
  },
  infoIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#E6EEFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.onSurface,
  },
  infoSub: {
    fontSize: 13,
    color: colors.onSurfaceVariant,
  },

  // Поддержка
  supportBlock: {
    alignItems: 'center',
    marginTop: 20,
    gap: 6,
  },
  supportText: {
    fontSize: 13,
    color: colors.onSurfaceVariant,
  },
  supportLink: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.primary,
    textDecorationLine: 'underline',
  },
});