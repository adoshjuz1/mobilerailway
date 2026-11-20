import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Switch,
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import { colors, fonts } from '../theme';

const USER = {
  name: 'Abdurakhman Kurmash',
  email: 'abdurakhmankurmash@gmail.com',
  level: 'Бишара мүшесі',
}

// данные профиля, пока заглушки
const TRAVELERS = [
  { id: 't1', name: 'Kydybek Kurmas', sub: 'Ағасы • Ересек', icons: 'person-outline', bg: colors.mint, color: '#006C49'},
  { id: 't2', name: 'Ismail Orazgali', sub: 'Інісі • Бала', icons: 'happy-outline', bg: '#DCE5FA', color: colors.primary },
];

export default function ProfileScreen({ navigation }) {
  const [tripAlerts, setTripAlerts] = useState(true);

  const handleLogout = () => {
    const rootNavigation = navigation.getParent() || navigation;
    rootNavigation.reset({ index: 0, routes: [{ name: 'Login', params: { initialTab: 'login' } }] });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
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
            <Text style={styles.goldBadgeText}>{USER.level}</Text>
          </View>
        </View>

        {/* Секция: Жиі саяхаттайтындар */}
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
            <View style={{ flex: 1}}>
              <Text style={styles.travelerName}>{traveler.name}</Text>
              <Text style={styles.travelerSub}>{traveler.sub}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
          </TouchableOpacity>
        ))}

        {/* Секция: Сақталған төлемдер */}
        <Text
          style={[styles.sectionTitle, { marginTop: 24, marginBottom: 14 }]}>Сақталған төлемдер</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.cardsScroll}
          contentContainerStyle={{ paddingRight: 20 }}
        >
          <View style={styles.bankCard}>
            <View style={styles.bankCardTop}>
              <Text style={styles.cardTypeLabel}>САЯХАТШЫ КАРТАСЫ</Text>
              <View style={styles.contactlessIcon}>
                <Ionicons name="wifi" size={16} color="#FFFFFF" style={{ transform: [{ rotate: '90deg' }] }} />
              </View>
            </View>
            <Text style={styles.bankCardNumber}>**** **** **** 4290</Text>
            <View style={styles.bankCardBottom}>
              <View>
                <Text style={styles.bankCardSmallLabel}> КАРТА ИЕСІ</Text>
                <Text style={styles.bankCardValue}>ABDURAKHMAN KURMASH</Text>
              </View>
              <View>
                <Text style={styles.bankCardSmallLabel}>МЕРЗІМІ</Text>
                <Text style={styles.bankCardValue}>12/26</Text>
              </View>
            </View>
          </View>


          <View style={[styles.bankCard, styles.bankCardDark]}>
            <View style={styles.bankCardTop}>
              <Ionicons name="apps" size={22} color="#FFFFFF" />
            </View>
            <Text style={styles.walletTitlEe}>Apple Pay</Text>
            <Text style={styles.walletSub}>Express Transit қосулы</Text>
            <Text style={[styles.walletSub, {color: '#FFFFFF', fontWeight: '700', marginTop: 14 }]}>
              Құрылғыға байланған
            </Text>
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
            <Ionicons name="chevron-forward" siez={20} color={colors.onSurfaceVariant} />
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
              trackColor={{ false: "#C3C6D6", true: "#006C49" }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        {/* Поддержка */}
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

        <Text style={styles.versionText}>RAILWAY CONNECT V2.4.0 • ABDURAKHMAN-K-Бишара</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6F9",
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 110,
  },
  topHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  hamburgerIcon: {
    fontSize: 22,
    color: "#0F2C59",
  },
  brandTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0F2C59",
  },
  avatarPlaceholder: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#E2E8F0",
    justifyContent: "center",
    alignItems: "center",
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 24,
  },
  largeAvatarBox: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: "#E2E8F0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    position: "relative",
  },
  editAvatarBtn: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#0F2C59",
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  editIcon: {
    fontSize: 12,
  },
  userName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#0F2C59",
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 13,
    color: "#64748B",
    marginBottom: 8,
  },
  goldBadge: {
    backgroundColor: "#FEF3C7",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  goldBadgeText: {
    color: "#D97706",
    fontSize: 12,
    fontWeight: "bold",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0F2C59",
  },
  addLink: {
    fontSize: 13,
    color: "#3B82F6",
    fontWeight: "600",
  },
  travelerCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 12,
    marginBottom: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 6,
  },
  avatarCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  travelerName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1E293B",
  },
  travelerSub: {
    fontSize: 11,
    color: "#64748B",
  },
  arrowIcon: {
    fontSize: 18,
    color: "#94A3B8",
  },
  creditCardBox: {
    width: 240,
    backgroundColor: "#0F2C59",
    borderRadius: 18,
    padding: 16,
    marginRight: 12,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  cardTypeLabel: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#93C5FD",
    letterSpacing: 1,
  },
  cardNumber: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#FFFFFF",
    letterSpacing: 1.5,
    marginBottom: 16,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardSubLabel: {
    fontSize: 8,
    color: "#94A3B8",
    fontWeight: "bold",
  },
  cardSubValue: {
    fontSize: 11,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  settingsGroup: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 14,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 6,
  },
  settingsItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
  },
  settingsIcon: {
    fontSize: 18,
  },
  settingsTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1E293B",
  },
  settingsSub: {
    fontSize: 11,
    color: "#64748B",
  },
  divider: {
    height: 1,
    backgroundColor: "#F1F5F9",
    marginVertical: 10,
  },
  logoutBtn: {
    backgroundColor: "#FEF2F2",
    borderWidth: 1,
    borderColor: "#FCA5A5",
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 24,
    marginBottom: 16,
  },
  logoutText: {
    color: "#DC2626",
    fontWeight: "bold",
    fontSize: 14,
  },
  versionText: {
    textAlign: "center",
    fontSize: 10,
    color: "#94A3B8",
    letterSpacing: 0.5,
  },
});
