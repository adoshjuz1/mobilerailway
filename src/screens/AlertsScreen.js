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

export default function AlertsScreen({ navigation }) {
  const [urgentDelays, setUrgentDelays] = useState(true);
  const [bookingConfirmations, setBookingConfirmations] = useState(true);

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

        {/* Заголовок */}
        <View style={styles.titleSection}>
          <Text style={styles.mainHeading}>Ескертулер мен хабарламалар</Text>
          <Text style={styles.subHeading}>
            Сапар туралы өзекті ақпараттан және платформа өзгерістерінен хабардар болуыңыз.
          </Text>
        </View>

        {/* Настройки тогглов */}
        <View style={styles.settingsCard}>
          <View style={styles.switchRow}>
            <View style={styles.switchLabelBox}>
              <Text style={styles.switchIcon}>⚠️</Text>
              <View>
                <Text style={styles.switchTitle}>Шұғыл кешігулер</Text>
                <Text style={styles.switchSub}>Қызмет үзілістері туралы жедел хабарламалар</Text>
              </View>
            </View>
            <Switch
              value={urgentDelays}
              onValueChange={setUrgentDelays}
              trackColor={{ false: '#CBD5E1', true: '#0F2C59' }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.switchRow}>
            <View style={styles.switchLabelBox}>
              <Text style={styles.switchIcon}>🎟️</Text>
              <View>
                <Text style={styles.switchTitle}>Брондау растаулары</Text>
                <Text style={styles.switchSub}>Квитанциялар мен билет жаңартулары</Text>
              </View>
            </View>
            <Switch
              value={bookingConfirmations}
              onValueChange={setBookingConfirmations}
              trackColor={{ false: '#CBD5E1', true: '#0F2C59' }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        {/* Уведомление 1: Шұғыл кешігу */}
        <View style={[styles.alertCard, styles.urgentBorder]}>
          <View style={styles.alertHeader}>
            <View style={styles.urgentBadge}>
              <Text style={styles.urgentBadgeText}>⚠️ ШҰҒЫЛ КЕШІГУ</Text>
            </View>
            <Text style={styles.timeAgo}>2 мин бұрын</Text>
          </View>

          <Text style={styles.alertTitle}>Платформа өзгерді: Поезд 2042</Text>
          <Text style={styles.alertDesc}>
            Сағат 09:45-тегі Астана бағытындағы поезд техникалық кешігуге байланысты 12-ші платформадан жөнелтіледі.
          </Text>

          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.primaryActionBtn}>
              <Text style={styles.primaryActionText}>Жаңа бағытты көру</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryActionBtn}>
              <Text style={styles.secondaryActionText}>Жабу</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Уведомление 2: Брондау расталды */}
        <View style={[styles.alertCard, styles.confirmBorder]}>
          <View style={styles.alertHeader}>
            <View style={styles.confirmBadge}>
              <Text style={styles.confirmBadgeText}>ℹ️ БРОНДАУ РАСТАЛДЫ</Text>
            </View>
            <Text style={styles.timeAgo}>45 мин бұрын</Text>
          </View>

          <Text style={styles.alertTitle}>Билет берілді: Алматы 2</Text>
          <Text style={styles.alertDesc}>
            14:20 сапарына арналған электронды билетіңіз дайын. Турникетте QR-кодты дайындап қойыңыз.
          </Text>

          <TouchableOpacity 
            style={styles.primaryActionBtn}
            onPress={() => navigation.navigate('TicketConfirmation')}
          >
            <Text style={styles.primaryActionText}>Билетті көру</Text>
          </TouchableOpacity>
        </View>

        {/* Уведомление 3: Платформа жаңартуы */}
        <View style={styles.alertCard}>
          <View style={styles.alertHeader}>
            <View style={styles.updateBadge}>
              <Text style={styles.updateBadgeText}>⚙️ ПЛАТФОРМА ЖАҢАРТУЫ</Text>
            </View>
            <Text style={styles.timeAgo}>2 сағ бұрын</Text>
          </View>

          <Text style={styles.alertTitle}>Жаңа Терминал Wi-Fi</Text>
          <Text style={styles.alertDesc}>
            Барлық күту залында тегін 5G Wi-Fi іске қосылды. 'RailwayConnect_Free' желісіне қосылыңыз.
          </Text>
        </View>

        {/* Уведомление 4: Уақытында */}
        <View style={[styles.alertCard, styles.onTimeBorder]}>
          <View style={styles.alertHeader}>
            <View style={styles.onTimeBadge}>
              <Text style={styles.onTimeBadgeText}>✓ УАҚЫТЫНДА</Text>
            </View>
            <Text style={styles.timeAgo}>5 сағ бұрын</Text>
          </View>

          <Text style={styles.alertTitle}>Поезд 112: Келу қалыпты</Text>
          <Text style={styles.alertDesc}>
            Таңертеңгі қала маңындағы поездар 99% дәлдікпен кешікпей жүріп жатыр. Қауіпсіз сапар!
          </Text>
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0F2C59',
    marginBottom: 4,
  },
  subHeading: {
    fontSize: 13,
    color: '#64748B',
    lineHeight: 18,
  },
  settingsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  switchLabelBox: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  switchIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  switchTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  switchSub: {
    fontSize: 11,
    color: '#64748B',
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 12,
  },
  alertCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 14,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#CBD5E1',
  },
  urgentBorder: {
    borderLeftColor: '#EF4444',
  },
  confirmBorder: {
    borderLeftColor: '#3B82F6',
  },
  onTimeBorder: {
    borderLeftColor: '#10B981',
  },
  alertHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  urgentBadge: {
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  urgentBadgeText: {
    color: '#991B1B',
    fontSize: 10,
    fontWeight: 'bold',
  },
  confirmBadge: {
    backgroundColor: '#DBEAFE',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  confirmBadgeText: {
    color: '#1E40AF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  updateBadge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  updateBadgeText: {
    color: '#475569',
    fontSize: 10,
    fontWeight: 'bold',
  },
  onTimeBadge: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  onTimeBadgeText: {
    color: '#15803D',
    fontSize: 10,
    fontWeight: 'bold',
  },
  timeAgo: {
    fontSize: 11,
    color: '#94A3B8',
  },
  alertTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 4,
  },
  alertDesc: {
    fontSize: 12,
    color: '#64748B',
    lineHeight: 18,
    marginBottom: 12,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  primaryActionBtn: {
    backgroundColor: '#0F2C59',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  primaryActionText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
  secondaryActionBtn: {
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  secondaryActionText: {
    color: '#64748B',
    fontWeight: '600',
    fontSize: 12,
  },
});