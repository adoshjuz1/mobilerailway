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

export default function ProfileScreen({ navigation }) {
  const [tripAlerts, setTripAlerts] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F4F6F9" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Шапка */}
        <View style={styles.topHeader}>
          <Text style={styles.hamburgerIcon}>☰</Text>
          <Text style={styles.brandTitle}>Railway Connect</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <View style={styles.avatarPlaceholder}>
              <Text style={{ fontSize: 16 }}>👤</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Профиль пользователя */}
        <View style={styles.profileSection}>
          <View style={styles.largeAvatarBox}>
            <Text style={{ fontSize: 42 }}>👤</Text>
            <TouchableOpacity style={styles.editAvatarBtn}>
              <Text style={styles.editIcon}>✏️</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>Алекс Уолкер</Text>
          <Text style={styles.userEmail}>alex.walker@traveler.com</Text>
          <View style={styles.goldBadge}>
            <Text style={styles.goldBadgeText}>★ Gold Мүшесі</Text>
          </View>
        </View>

        {/* Секция: Жиі саяхаттайтындар */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Жиі саяхаттайтындар</Text>
          <TouchableOpacity>
            <Text style={styles.addLink}>+ Жаңасын қосу</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.travelerCard}>
          <View style={[styles.avatarCircle, { backgroundColor: '#DCFCE7' }]}>
            <Text style={{ fontSize: 16 }}>👩</Text>
          </View>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.travelerName}>Сара Уолкер</Text>
            <Text style={styles.travelerSub}>Жұбайы • Ересек</Text>
          </View>
          <Text style={styles.arrowIcon}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.travelerCard}>
          <View style={[styles.avatarCircle, { backgroundColor: '#DBEAFE' }]}>
            <Text style={{ fontSize: 16 }}>👦</Text>
          </View>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.travelerName}>Лео Уолкер</Text>
            <Text style={styles.travelerSub}>Улы • Бала</Text>
          </View>
          <Text style={styles.arrowIcon}>›</Text>
        </TouchableOpacity>

        {/* Секция: Сақталған төлемдер */}
        <Text style={[styles.sectionTitle, { marginTop: 20, marginBottom: 12 }]}>
          Сақталған төлемдер
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 20 }}>
          <View style={styles.creditCardBox}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTypeLabel}>САЯХАТШЫ КАРТАСЫ</Text>
              <Text style={{ fontSize: 16 }}>📶</Text>
            </View>
            <Text style={styles.cardNumber}>•••• •••• •••• 4290</Text>
            <View style={styles.cardFooter}>
              <View>
                <Text style={styles.cardSubLabel}>ИЕСІ</Text>
                <Text style={styles.cardSubValue}>ALEX WALKER</Text>
              </View>
              <View>
                <Text style={styles.cardSubLabel}>МЕРЗІМІ</Text>
                <Text style={styles.cardSubValue}>12/26</Text>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Настройки */}
        <View style={styles.settingsGroup}>
          <TouchableOpacity style={styles.settingsItem}>
            <Text style={styles.settingsIcon}>🌐</Text>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.settingsTitle}>Тіл (Language)</Text>
              <Text style={styles.settingsSub}>Қазақша (KZ)</Text>
            </View>
            <Text style={styles.arrowIcon}>›</Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.settingsItem}>
            <Text style={styles.settingsIcon}>💱</Text>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.settingsTitle}>Валюта</Text>
              <Text style={styles.settingsSub}>Теңге (₸)</Text>
            </View>
            <Text style={styles.arrowIcon}>›</Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <View style={styles.settingsItem}>
            <Text style={styles.settingsIcon}>🔔</Text>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.settingsTitle}>Сапар ескертулері</Text>
              <Text style={styles.settingsSub}>Push және SMS хабарламалар</Text>
            </View>
            <Switch
              value={tripAlerts}
              onValueChange={setTripAlerts}
              trackColor={{ false: '#CBD5E1', true: '#0F2C59' }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        {/* Поддержка */}
        <Text style={[styles.sectionTitle, { marginTop: 20, marginBottom: 12 }]}>Қолдау</Text>
        <View style={styles.settingsGroup}>
          <TouchableOpacity style={styles.settingsItem}>
            <Text style={styles.settingsIcon}>❓</Text>
            <Text style={[styles.settingsTitle, { flex: 1, marginLeft: 12 }]}>Анықтама орталығы</Text>
            <Text style={styles.arrowIcon}>↗</Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.settingsItem}>
            <Text style={styles.settingsIcon}>🛡️</Text>
            <Text style={[styles.settingsTitle, { flex: 1, marginLeft: 12 }]}>Купуялық саясаты</Text>
            <Text style={styles.arrowIcon}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Кнопка выхода */}
        <TouchableOpacity 
          style={styles.logoutBtn}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.logoutText}>🚪 Шығу</Text>
        </TouchableOpacity>

        <Text style={styles.versionText}>RAILWAY CONNECT V2.4.0 • ALEX-W-GOLD</Text>

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
  profileSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  largeAvatarBox: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    position: 'relative',
  },
  editAvatarBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#0F2C59',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  editIcon: {
    fontSize: 12,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0F2C59',
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 13,
    color: '#64748B',
    marginBottom: 8,
  },
  goldBadge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  goldBadgeText: {
    color: '#D97706',
    fontSize: 12,
    fontWeight: 'bold',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0F2C59',
  },
  addLink: {
    fontSize: 13,
    color: '#3B82F6',
    fontWeight: '600',
  },
  travelerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 6,
  },
  avatarCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  travelerName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  travelerSub: {
    fontSize: 11,
    color: '#64748B',
  },
  arrowIcon: {
    fontSize: 18,
    color: '#94A3B8',
  },
  creditCardBox: {
    width: 240,
    backgroundColor: '#0F2C59',
    borderRadius: 18,
    padding: 16,
    marginRight: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTypeLabel: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#93C5FD',
    letterSpacing: 1,
  },
  cardNumber: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 1.5,
    marginBottom: 16,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardSubLabel: {
    fontSize: 8,
    color: '#94A3B8',
    fontWeight: 'bold',
  },
  cardSubValue: {
    fontSize: 11,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  settingsGroup: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 6,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  settingsIcon: {
    fontSize: 18,
  },
  settingsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
  },
  settingsSub: {
    fontSize: 11,
    color: '#64748B',
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 10,
  },
  logoutBtn: {
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FCA5A5',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 16,
  },
  logoutText: {
    color: '#DC2626',
    fontWeight: 'bold',
    fontSize: 14,
  },
  versionText: {
    textAlign: 'center',
    fontSize: 10,
    color: '#94A3B8',
    letterSpacing: 0.5,
  },
});