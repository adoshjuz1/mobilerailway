import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import { colors } from '../theme';
import { UPCOMING_TRIPS } from '../services/mockTrips';

const ALERT_TYPES = {
  urgent: {
    badge: 'ШҰҒЫЛ КЕШІГУ',
    icon: 'alert-circle-outline',
    badgeBg: '#FFDAD6',
    badgeColor: '#BA1A1A',
    border: '#F97316',
  },
  booking: {
    badge: 'БРОНДАУ РАСТАЛДЫ',
    icon: 'information-circle-outline',
    badgeBg: '#DCE5FA',
    badgeColor: colors.primary,
    border: colors.primary,
  },
  platform: {
    badge: 'ПЛАТФОРМА ЖАҢАРТУЫ',
    icon: 'settings-outline',
    badgeBg: 'E6EEFF',
    badgeColor: colors.onSurfaceVariant,
    border: null,
  },
  ontime: {
    badge: 'УАҚЫТЫНДА',
    icon: 'checkmark-circle',
    badgeBg: colors.mint,
    badgeColor: '#006C49',
    border: '#1E8E4E'
  },
};

const ALERTS = [
  {
    id: 'a1',
    type: 'urgent',
    time: '2 минут бұрын',
    title: 'Платформа өзгерді: Поезд 007',
    text: 'Сағат 09:45-тегі Астана бағытындағы поезд техникалық кешігуге байланысты 12-ші платформадан жөнелтіледі.',
    highlight: '12-ші платформадан',
    actions: ['route', 'dismiss'],
  },
  {
    id: 'a2',
    type: 'booking',
    time: '45 мин бұрын',
    title: 'Билет берілді: Алматы 2',
    text: '14:20 сапарына арналған электронды билетіңіз дайын. Турникетте QR-кодты дайындап қойыңыз.',
    actions: ['ticket'],
  },
  {
    id: 'a3',
    type: 'platform',
    time: '2 сағ бұрын',
    title: 'Жаңа терминал Wi-Fi',
    text: "Барлық күту залында тегін 5G Wi-Fi іске қосылды. 'RailwayConnect_Free' желісіне қосылыңыз",
  },
  {
    id: 'a4',
    type: 'ontime',
    time: '5 сағ бұрын',
    title: 'Поезд 112: келу қалыпты',
    text: 'Таңертеңгі қала маңындағы поездар 99% дәлдікпен кешікпей жүріп жатыр. Қауіпсіз сапар!',
  },
];

export default function AlertsScreen({ navigation }) {
  const [urgentDelays, setUrgentDelays] = useState(true);
  const [bookingConfirmations, setBookingConfirmations] = useState(true);
  const [dismissedIds, setDismissedIds] = useState([]);

  const visibleAlerts = ALERTS.filter((alert) => {
    if (dismissedIds.includes(alert.id)) return false;
    if (alert.type === 'urgent' && !urgentDelays) return false;
    if (alert.type === 'booking' && !bookingConfirmations) return false;
    return true;
  });

  const openTicket = () => {
    const trip = UPCOMING_TRIPS[0];
    navigation.navigate('TicketConfirmation', {
      train: trip.train,
      date: trip.date,
      seats: trip.seats,
      carriage: trip.carriage,
      ticketId: trip.ticketId,
    });
  };

  const renderDescription = (alert) => {
    if (!alert.highlight) {
      return <Text style={styles.alertDesc}>{alert.text}</Text>;
    }
    const [before, after] = alert.text.split(alert.highlight);
    return (
      <Text style={styles.alertDesc}>
        {before}
        <Text style={styles.alertHighlight}>{alert.highlight}</Text>
        {after}
      </Text>
    );
  };

  const renderActions = (alert) => {
    if (!alert.actions) return null;
    return (
      <View style={styles.actionRow}>
        {alert.actions.includes('route') && (
          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={() => navigation.navigate('SearchTab')}
          >
            <Text style={styles.primaryBtnText}>Жаңа бағытты көру</Text>
          </TouchableOpacity>
        )}
        {alert.actions.includes('ticket') && (
          <TouchableOpacity style={styles.primaryBtn} onPress={openTicket}>
            <Text style={styles.primaryBtnText}>Билетті көру</Text>
          </TouchableOpacity>
        )}
        {alert.actions.includes('dismiss') && (
          <TouchableOpacity
            style={styles.secondaryBtn}
            onPress={() => setDismissedIds([...dismissedIds, alert.id])}
          >
            <Text style={styles.secondaryBtnText}>Жабу</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Header onAvatarPress={() => navigation.navigate('ProfileTab')} />

        <Text style={styles.mainHeading}>Ескертулер мен хабарламалар</Text>
        <Text style={styles.subHeading}>
          Сапар туралы өзекті ақпараттан және платформа өзгерістерінен хабардар болыңыз.
        </Text>

        {/* Переключатели */}
        <View style={styles.toggleCard}>
          <View style={styles.toggleInfo}>
            <Ionicons name="warning" size={24} color="#F97316" />
            <View style={{ flex: 1 }}>
              <Text style={styles.toggleTitle}>Шұғыл кешігулер</Text>
              <Text style={styles.toggleSub}>Қызмет үзілістері туралы жедел хабарламалар</Text>
            </View>
          </View>
          <Switch
            value={urgentDelays}
            onValueChange={setUrgentDelays}
            trackColor={{ false: '#C3C6D6', true: colors.primary }}
            thumbColor="#FFFFFF"
          />
        </View>

        <View style={styles.toggleCard}>
          <View style={styles.toggleInfo}>
            <Ionicons name="ticket" size={24} color={colors.primary} />
            <View style={{ flex: 1 }}>
              <Text style={styles.toggleTitle}>Брондау растаулары</Text>
              <Text style={styles.toggleSub}>Түбіртектер мен билет жаңартулары</Text>
            </View>
          </View>
          <Switch
            value={bookingConfirmations}
            onValueChange={setBookingConfirmations}
            trackColor={{ false: '#C3C6D6', true: colors.primary }}
            thumbColor="#FFFFFF"
          />
        </View>

        {/* Уведомления */}
        <View style={styles.alertsList}>
          {visibleAlerts.length === 0 ? (
            <View style={styles.emptyBox}>
              <Ionicons name="notifications-off-outline" size={40} color="#94A3B8" />
              <Text style={styles.emptyText}>Жаңа хабарламалар жоқ</Text>
            </View>
          ) : (
            visibleAlerts.map((alert) => {
              const type = ALERT_TYPES[alert.type];
              return (
                <View
                  key={alert.id}
                  style={[
                    styles.alertCard,
                    type.border && { borderLeftWidth: 6, borderLeftColor: type.border },
                  ]}
                >
                  <View style={styles.alertHeader}>
                    <View style={[styles.badge, { backgroundColor: type.badgeBg }]}>
                      <Ionicons name={type.icon} size={14} color={type.badgeColor} />
                      <Text style={[styles.badgeText, { color: type.badgeColor }]}>{type.badge}</Text>
                    </View>
                    <Text style={styles.timeAgo}>{alert.time}</Text>
                  </View>

                  <Text style={styles.alertTitle}>{alert.title}</Text>
                  {renderDescription(alert)}
                  {renderActions(alert)}
                </View>
              );
            })
          )}
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
    paddingBottom: 130,
  },
  mainHeading: {
    fontSize: 28,
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

  // Переключатели
  toggleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 14,
  },
  toggleInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginRight: 10,
  },
  toggleTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.onSurface,
  },
  toggleSub: {
    fontSize: 13,
    color: colors.onSurfaceVariant,
  },

  // Уведомления
  alertsList: {
    marginTop: 10,
  },
  alertCard: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  alertHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  timeAgo: {
    fontSize: 13,
    color: colors.onSurfaceVariant,
  },
  alertTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.onSurface,
    marginBottom: 6,
  },
  alertDesc: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.onSurfaceVariant,
  },
  alertHighlight: {
    fontWeight: '600',
    color: colors.onSurface,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
    marginTop: 14,
  },
  primaryBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 10,
  },
  primaryBtnText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
  secondaryBtn: {
    paddingVertical: 14,
  },
  secondaryBtnText: {
    color: colors.primary,
    fontWeight: '600',
    fontSize: 16,
  },

  // Пустое состояние
  emptyBox: {
    alignItems: 'center',
    paddingVertical: 40,
    gap: 10,
  },
  emptyText: {
    fontSize: 15,
    color: colors.onSurfaceVariant,
  },
});
