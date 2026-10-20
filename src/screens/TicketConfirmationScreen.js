import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';

export default function TicketConfirmationScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F4F6F9" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Шапка */}
        <View style={styles.topHeader}>
          <TouchableOpacity onPress={() => navigation.navigate('Main')} style={styles.backBtn}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Билет расталды</Text>
          <View style={styles.avatarPlaceholder}>
            <Text style={{ fontSize: 16 }}>👤</Text>
          </View>
        </View>

        {/* Успешный статус */}
        <View style={styles.successContainer}>
          <View style={styles.successIconBox}>
            <Text style={styles.successCheck}>✓</Text>
          </View>
          <Text style={styles.successTitle}>Брондау сәтті аяқталды!</Text>
          <Text style={styles.successSub}>
            Сапарыңыз дайын. Вокзалда көрсетуге арналған билетіңіз төменде дайын тұр.
          </Text>
        </View>

        {/* Карточка электронного билета */}
        <View style={styles.ticketCard}>
          <View style={styles.ticketTopRow}>
            <View>
              <Text style={styles.ticketIdLabel}>БИЛЕТ НӨМІРІ</Text>
              <Text style={styles.ticketIdValue}>RC-8842-XLM</Text>
            </View>
            <View style={styles.statusBadge}>
              <Text style={styles.statusBadgeText}>Уақытында</Text>
            </View>
          </View>

          {/* Маршрут билета */}
          <View style={styles.routeSection}>
            <View style={styles.stationBlock}>
              <Text style={styles.stationCity}>London King's Cross</Text>
              <Text style={styles.platformText}>Платформа 9¾</Text>
              <Text style={styles.timeText}>09:45</Text>
            </View>

            <View style={styles.stationCenterLine}>
              <View style={styles.dotBlue} />
              <View style={styles.trackLine} />
              <View style={styles.dotOutline} />
            </View>

            <View style={[styles.stationBlock, { alignItems: 'flex-end' }]}>
              <Text style={styles.stationCity}>Edinburgh Waverley</Text>
              <Text style={styles.platformText}>Платформа 2</Text>
              <Text style={styles.timeText}>14:12</Text>
            </View>
          </View>

          <View style={styles.dashedDivider} />

          {/* Детали даты и места */}
          <View style={styles.ticketDetailsRow}>
            <View>
              <Text style={styles.detailLabel}>Күні</Text>
              <Text style={styles.detailValue}>24 Қаз, 2026</Text>
            </View>
            <View>
              <Text style={styles.detailLabel}>Вагон</Text>
              <Text style={styles.detailValue}>Coach B</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.detailLabel}>Орын</Text>
              <Text style={styles.detailValue}>42A (Терезе)</Text>
            </View>
          </View>

          {/* QR-код заглушка */}
          <View style={styles.qrContainer}>
            <View style={styles.qrBox}>
              <Text style={styles.qrEmoji}>🔲🚆🔲</Text>
              <Text style={styles.qrCodeText}>||| | |||| || |:::|| |||</Text>
            </View>
            <Text style={styles.qrInstruction}>
              Турникеттен өткен кезде немесе проводник сұрағанда осы QR-кодты сканерлеңіз.
            </Text>
          </View>
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