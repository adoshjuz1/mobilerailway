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
import { colors, fonts } from '../theme';

// Данные профиля пока заглушки, позже будут приходить из базы данных
const USER = {
  name: 'Абдурахман Құрмаш',
  email: 'abdurakhmankurmash@gmail.com',
  level: 'Шүкір мүшесі',
};

const TRAVELERS = [
  { id: 't1', name: 'Қыдырбек Құрмаш', sub: 'Ағасы • Ересек', icon: 'person-outline', bg: colors.mint, color: '#006C49' },
  { id: 't2', name: 'Исмаил Оразғали', sub: 'Інісі • Бала', icon: 'happy-outline', bg: '#DCE5FA', color: colors.primary },
];

export default function ProfileScreen({ navigation }) {
  const [tripAlerts, setTripAlerts] = useState(true);

  // Выход: сбрасываем весь стек навигации, чтобы с экрана входа нельзя было вернуться назад
  const handleLogout = () => {
    const rootNavigation = navigation.getParent() || navigation;
    rootNavigation.reset({ index: 0, routes: [{ name: 'Login', params: { initialTab: 'login' } }] });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Header />

        {/* Профиль пользователя */}
        <View style={styles.profileSection}>
          <View style={styles.avatarWrap}>
            <View style={styles.largeAvatar}>
              <Ionicons name="person" size={52} color={colors.primary} />
            </View>
            <TouchableOpacity style={styles.editAvatarBtn}>
              <Ionicons name="pencil" size={14} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>{USER.name}</Text>
          <Text style={styles.userEmail}>{USER.email}</Text>
          <View style={styles.levelBadge}>
            <Ionicons name="star" size={14} color="#5C2A12" />
            <Text style={styles.levelBadgeText}>{USER.level}</Text>
          </View>
        </View>

        {/* Жиі саяхаттайтындар */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Жиі саяхаттайтындар</Text>
          <TouchableOpacity style={styles.addLink}>
            <Ionicons name="add-circle-outline" size={20} color={colors.primary} />
            <Text style={styles.addLinkText}>Жаңасын қосу</Text>
          </TouchableOpacity>
        </View>

        {TRAVELERS.map((traveler) => (
          <TouchableOpacity key={traveler.id} style={styles.travelerCard}>
            <View style={[styles.travelerAvatar, { backgroundColor: traveler.bg }]}>
              <Ionicons name={traveler.icon} size={22} color={traveler.color} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.travelerName}>{traveler.name}</Text>
              <Text style={styles.travelerSub}>{traveler.sub}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
          </TouchableOpacity>
        ))}

        {/* Сақталған төлемдер */}
        <Text style={[styles.sectionTitle, { marginTop: 24, marginBottom: 14 }]}>Сақталған төлемдер</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.cardsScroll}
          contentContainerStyle={{ paddingRight: 20 }}
        >
          <View style={styles.bankCard}>
            <View style={styles.bankCardTop}>
              <Text style={styles.bankCardLabel}>САЯХАТШЫ КАРТАСЫ</Text>
              <View style={styles.contactlessIcon}>
                <Ionicons name="wifi" size={16} color="#FFFFFF" style={{ transform: [{ rotate: '90deg' }] }} />
              </View>
            </View>
            <Text style={styles.bankCardNumber}>**** **** **** 4290</Text>
            <View style={styles.bankCardBottom}>
              <View>
                <Text style={styles.bankCardSmallLabel}>КАРТА ИЕСІ</Text>
                <Text style={styles.bankCardValue}>ABDURAKHMAN KURMASH</Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={styles.bankCardSmallLabel}>МЕРЗІМІ</Text>
                <Text style={styles.bankCardValue}>12/26</Text>
              </View>
            </View>
          </View>

          <View style={[styles.bankCard, styles.bankCardDark]}>
            <View style={styles.bankCardTop}>
              <Ionicons name="apps" size={22} color="#FFFFFF" />
            </View>
            <Text style={styles.walletTitle}>Apple Pay</Text>
            <Text style={styles.walletSub}>Express Transit қосулы</Text>
            <Text style={[styles.walletSub, { color: '#FFFFFF', fontWeight: '700', marginTop: 14 }]}>
              Құрылғыға байланған
            </Text>
          </View>
        </ScrollView>

        {/* Настройки */}
        <View style={styles.group}>
          <TouchableOpacity style={styles.settingsItem}>
            <View style={styles.settingsIcon}>
              <Ionicons name="globe-outline" size={22} color={colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.settingsTitle}>Тіл</Text>
              <Text style={styles.settingsSub}>Қазақша</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.onSurfaceVariant} />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.settingsItem}>
            <View style={styles.settingsIcon}>
              <Ionicons name="cash-outline" size={22} color={colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.settingsTitle}>Валюта</Text>
              <Text style={styles.settingsSub}>Теңге (₸)</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.onSurfaceVariant} />
          </TouchableOpacity>

          <View style={styles.divider} />

          <View style={styles.settingsItem}>
            <View style={styles.settingsIcon}>
              <Ionicons name="notifications-outline" size={22} color={colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.settingsTitle}>Сапар ескертулері</Text>
              <Text style={styles.settingsSub}>Push және SMS қосулы</Text>
            </View>
            <Switch
              value={tripAlerts}
              onValueChange={setTripAlerts}
              trackColor={{ false: '#C3C6D6', true: '#006C49' }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        {/* Қолдау */}
        <Text style={styles.supportLabel}>Қолдау</Text>
        <View style={styles.group}>
          <TouchableOpacity style={styles.supportItem}>
            <Ionicons name="help-circle-outline" size={22} color={colors.primary} />
            <Text style={styles.supportTitle}>Анықтама орталығы</Text>
            <Ionicons name="open-outline" size={20} color={colors.onSurfaceVariant} />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.supportItem}>
            <Ionicons name="shield-checkmark-outline" size={22} color={colors.primary} />
            <Text style={styles.supportTitle}>Құпиялылық саясаты</Text>
            <Ionicons name="chevron-forward" size={20} color={colors.onSurfaceVariant} />
          </TouchableOpacity>
        </View>

        {/* Выход */}
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={22} color="#BA1A1A" />
          <Text style={styles.logoutText}>Шығу</Text>
        </TouchableOpacity>

        <Text style={styles.versionText}>RAILWAY CONNECT V2.4.0 • ALEX-W-GOLD</Text>
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

  // Профиль
  profileSection: {
    alignItems: 'center',
    marginBottom: 28,
  },
  avatarWrap: {
    marginBottom: 14,
  },
  largeAvatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#E2E8F0',
    borderWidth: 3,
    borderColor: colors.card,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editAvatarBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    borderWidth: 2,
    borderColor: colors.card,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userName: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.onSurface,
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 16,
    color: colors.onSurfaceVariant,
    marginBottom: 10,
  },
  levelBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FFDCC8',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
  },
  levelBadgeText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#5C2A12',
  },

  // Секции
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.onSurface,
  },
  addLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  addLinkText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.primary,
  },
  travelerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.outline,
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
  },
  travelerAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  travelerName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.onSurface,
  },
  travelerSub: {
    fontSize: 13,
    color: colors.onSurfaceVariant,
  },

  // Карты
  cardsScroll: {
    marginBottom: 24,
    overflow: 'visible',
  },
  bankCard: {
    width: 290,
    backgroundColor: colors.primary,
    borderRadius: 18,
    padding: 20,
    marginRight: 14,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  bankCardDark: {
    width: 200,
    backgroundColor: colors.onSurface,
  },
  bankCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 26,
  },
  bankCardLabel: {
    fontSize: 13,
    fontFamily: fonts.mono,
    color: '#DCE5FA',
    letterSpacing: 1.5,
  },
  contactlessIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bankCardNumber: {
    fontSize: 20,
    fontFamily: fonts.mono,
    color: '#FFFFFF',
    letterSpacing: 2,
    marginBottom: 18,
  },
  bankCardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bankCardSmallLabel: {
    fontSize: 10,
    fontFamily: fonts.mono,
    color: '#B8C7EA',
  },
  bankCardValue: {
    fontSize: 15,
    fontFamily: fonts.monoBold,
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  walletTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  walletSub: {
    fontSize: 13,
    color: '#B8C7EA',
  },

  // Настройки и поддержка
  group: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.outline,
    borderRadius: 14,
    overflow: 'hidden',
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  settingsIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#E6EEFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.onSurface,
  },
  settingsSub: {
    fontSize: 13,
    color: colors.onSurfaceVariant,
  },
  divider: {
    height: 1,
    backgroundColor: colors.outline,
  },
  supportLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.onSurfaceVariant,
    marginTop: 24,
    marginBottom: 10,
    marginLeft: 4,
  },
  supportItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  supportTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    color: colors.onSurface,
  },

  // Выход
  logoutBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: '#BA1A1A',
    borderRadius: 12,
    paddingVertical: 16,
    marginTop: 28,
    marginBottom: 18,
  },
  logoutText: {
    fontSize: 17,
    fontWeight: '500',
    color: '#BA1A1A',
  },
  versionText: {
    textAlign: 'center',
    fontSize: 11,
    color: colors.onSurfaceVariant,
    letterSpacing: 1,
  },
});