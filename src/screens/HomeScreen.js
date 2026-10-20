import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Image,
} from 'react-native';

export default function HomeScreen({ navigation }) {
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [departDate, setDepartDate] = useState('24.10.2026');
  const [travelers, setTravelers] = useState('1 Ересек');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F4F6F9" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Шапка: Гамбургер + Название + Аватар */}
        <View style={styles.topHeader}>
          <TouchableOpacity style={styles.iconBtn}>
            <Text style={styles.hamburgerIcon}>☰</Text>
          </TouchableOpacity>
          <Text style={styles.brandTitle}>Railway Connect</Text>
          <TouchableOpacity onPress={() => navigation.navigate('ProfileTab')}>
            <View style={styles.avatarPlaceholder}>
              <Text style={{ fontSize: 16 }}>👤</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Заголовок страницы */}
        <View style={styles.titleSection}>
          <Text style={styles.mainHeading}>Қайда барамыз?</Text>
          <Text style={styles.subHeading}>Желі бойынша келесі сапарыңызды брондаңыз.</Text>
        </View>

        {/* Карточка поиска */}
        <View style={styles.searchCard}>
          <View style={styles.routeInputContainer}>
            {/* Графика линии маршрута слева */}
            <View style={styles.routeLineColumn}>
              <View style={styles.startDot}>
                <Text style={styles.dotIcon}>📍</Text>
              </View>
              <View style={styles.verticalLine} />
              <View style={styles.endDot}>
                <Text style={styles.dotIcon}>🗺️</Text>
              </View>
            </View>

            {/* Инпуты маршрута */}
            <View style={styles.inputsColumn}>
              <View style={styles.fieldBox}>
                <Text style={styles.fieldLabel}>Шығатын орын</Text>
                <TextInput
                  style={styles.fieldInput}
                  placeholder="Қайдан?"
                  placeholderTextColor="#94A3B8"
                  value={fromCity}
                  onChangeText={setFromCity}
                />
              </View>

              <View style={styles.fieldBox}>
                <Text style={styles.fieldLabel}>Баратын орын</Text>
                <TextInput
                  style={styles.fieldInput}
                  placeholder="Қайда?"
                  placeholderTextColor="#94A3B8"
                  value={toCity}
                  onChangeText={setToCity}
                />
              </View>
            </View>
          </View>

          {/* Дата и Количество пассажиров в один ряд */}
          <View style={styles.rowFields}>
            <View style={[styles.fieldBox, { flex: 1, marginRight: 6 }]}>
              <Text style={styles.fieldLabel}>Кету күні</Text>
              <View style={styles.pickerBox}>
                <Text style={styles.pickerText}>{departDate}</Text>
                <Text style={styles.pickerIcon}>📅</Text>
              </View>
            </View>

            <View style={[styles.fieldBox, { flex: 1, marginLeft: 6 }]}>
              <Text style={styles.fieldLabel}>Жолаушылар</Text>
              <View style={styles.pickerBox}>
                <Text style={styles.pickerText}>{travelers}</Text>
                <Text style={styles.pickerIcon}>👥</Text>
              </View>
            </View>
          </View>

          {/* Кнопка Поиска */}
          <TouchableOpacity 
            style={styles.findButton}
            onPress={() => navigation.navigate('SearchResults', { fromCity, toCity })}
          >
            <Text style={styles.findButtonText}>🔍 Поездарды табу</Text>
          </TouchableOpacity>
        </View>

        {/* Секция: Соңғы іздеулер */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Соңғы іздеулер</Text>
          <TouchableOpacity>
            <Text style={styles.clearLink}>Барлығын тазарту</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.recentItem}>
          <View style={styles.recentIconBox}>
            <Text style={styles.recentIcon}>🕒</Text>
          </View>
          <View style={styles.recentInfo}>
            <Text style={styles.recentRoute}>Лондон Кингс Кросс ➔ Эдинбург</Text>
            <Text style={styles.recentSub}>Ертең, 1 Ересек</Text>
          </View>
          <Text style={styles.arrowIcon}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.recentItem}>
          <View style={styles.recentIconBox}>
            <Text style={styles.recentIcon}>🕒</Text>
          </View>
          <View style={styles.recentInfo}>
            <Text style={styles.recentRoute}>Манчестер ➔ Лондон Юстон</Text>
            <Text style={styles.recentSub}>24 Қаз, 2 Ересек</Text>
          </View>
          <Text style={styles.arrowIcon}>›</Text>
        </TouchableOpacity>

        {/* Секция: Танымал бағыттар */}
        <Text style={[styles.sectionTitle, { marginTop: 24, marginBottom: 12 }]}>
          Танымал бағыттар
        </Text>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.popularScroll}>
          <View style={styles.popularCard}>
            <View style={[styles.cardImgPlaceholder, { backgroundColor: '#3B82F6' }]}>
              <Text style={styles.cardImgText}>🗼</Text>
              <View style={styles.cardOverlay}>
                <Text style={styles.fromTag}>ЛОНДОНДАН</Text>
                <Text style={styles.cardCity}>Париж Норд</Text>
              </View>
            </View>
            <Text style={styles.cardPrice}>49.00 £ бастап</Text>
          </View>

          <View style={styles.popularCard}>
            <View style={[styles.cardImgPlaceholder, { backgroundColor: '#10B981' }]}>
              <Text style={styles.cardImgText}>🌷</Text>
              <View style={styles.cardOverlay}>
                <Text style={styles.fromTag}>ЛОНДОНДАН</Text>
                <Text style={styles.cardCity}>Амстердам</Text>
              </View>
            </View>
            <Text style={styles.cardPrice}>55.00 £ бастап</Text>
          </View>
        </ScrollView>

        {/* Информационный баннер статуса */}
        <View style={styles.statusBanner}>
          <Text style={styles.bannerIcon}>ℹ️</Text>
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={styles.bannerTitle}>Барлық желілерде қалыпты қызмет</Text>
            <Text style={styles.bannerSub}>Қазіргі уақытта ірі кешігулер тіркелген жоқ. Қауіпсіз сапар!</Text>
          </View>
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
  titleSection: {
    marginBottom: 20,
  },
  mainHeading: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#0F2C59',
    marginBottom: 4,
  },
  subHeading: {
    fontSize: 14,
    color: '#64748B',
  },
  searchCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
    marginBottom: 24,
  },
  routeInputContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  routeLineColumn: {
    alignItems: 'center',
    justifyContent: 'space-around',
    marginRight: 10,
    paddingVertical: 12,
  },
  startDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  verticalLine: {
    width: 2,
    flex: 1,
    backgroundColor: '#3B82F6',
    marginVertical: 4,
  },
  endDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotIcon: {
    fontSize: 12,
  },
  inputsColumn: {
    flex: 1,
    gap: 10,
  },
  fieldBox: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  fieldLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
    marginBottom: 2,
  },
  fieldInput: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
    padding: 0,
  },
  rowFields: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  pickerBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pickerText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1E293B',
  },
  pickerIcon: {
    fontSize: 14,
  },
  findButton: {
    backgroundColor: '#0F2C59',
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
  },
  findButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0F2C59',
  },
  clearLink: {
    fontSize: 13,
    color: '#3B82F6',
    fontWeight: '600',
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    marginBottom: 10,
  },
  recentIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#DBEAFE',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  recentIcon: {
    fontSize: 16,
  },
  recentInfo: {
    flex: 1,
  },
  recentRoute: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  recentSub: {
    fontSize: 12,
    color: '#64748B',
  },
  arrowIcon: {
    fontSize: 18,
    color: '#94A3B8',
  },
  popularScroll: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  popularCard: {
    width: 160,
    marginRight: 12,
  },
  cardImgPlaceholder: {
    height: 110,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 6,
  },
  cardImgText: {
    fontSize: 40,
    opacity: 0.5,
  },
  cardOverlay: {
    position: 'absolute',
    bottom: 8,
    left: 8,
  },
  fromTag: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#FFFFFF',
    opacity: 0.8,
  },
  cardCity: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  cardPrice: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#10B981',
  },
  statusBanner: {
    flexDirection: 'row',
    backgroundColor: '#ECFDF5',
    borderWidth: 1,
    borderColor: '#A7F3D0',
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
  },
  bannerIcon: {
    fontSize: 20,
  },
  bannerTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#065F46',
    marginBottom: 2,
  },
  bannerSub: {
    fontSize: 11,
    color: '#047857',
  },
});