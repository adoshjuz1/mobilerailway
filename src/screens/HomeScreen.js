import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
  SafeAreaView,
  Alert,
} from 'react-native';

export default function HomeScreen({ navigation }) {
  const [depStation, setDepStation] = useState('Алматы');
  const [arrStation, setArrStation] = useState('Атырау');
  const [searchDate, setSearchDate] = useState('');
  const [returnDate, setReturnDate] = useState('');

  const [activeCalendarTab, setActiveCalendarTab] = useState(null); // 'there' | 'back' | null
  const [trainPricesByDate, setTrainPricesByDate] = useState({});

  // Текущая системная дата (18 октября 2026)
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const monthNames = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ];

  const firstMonthDate = new Date(today.getFullYear(), today.getMonth(), 1);
  const secondMonthDate = new Date(today.getFullYear(), today.getMonth() + 1, 1);

  useEffect(() => {
    fetchCalendarPrices();
  }, [depStation, arrStation]);

  const fetchCalendarPrices = async () => {
    try {
      const response = await fetch(
        `http://172.20.10.6:8000/api/trains/available-dates?from_city=${encodeURIComponent(
          depStation
        )}&to_city=${encodeURIComponent(arrStation)}`
      );
      if (response.ok) {
        const data = await response.json();
        setTrainPricesByDate(data);
      }
    } catch (err) {
      console.log('Ошибка загрузки доступных дат:', err);
    }
  };

  const swapStations = () => {
    const temp = depStation;
    setDepStation(arrStation);
    setArrStation(temp);
  };

  const handleSearch = () => {
    if (!depStation.trim() || !arrStation.trim()) {
      Alert.alert('Ошибка', 'Пожалуйста, укажите станции отправления и назначения');
      return;
    }
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    const dateToUse = searchDate || todayStr;
    navigation.navigate('SearchResults', {
      from: depStation.trim(),
      to: arrStation.trim(),
      date: dateToUse,
      return_date: returnDate,
    });
  };

  const handleSelectDate = (dateStr) => {
    if (activeCalendarTab === 'there') {
      setSearchDate(dateStr);
    } else if (activeCalendarTab === 'back') {
      setReturnDate(dateStr);
    }
    setActiveCalendarTab(null);
  };

  const renderMonthCalendar = (year, monthIndex) => {
    const firstDay = new Date(year, monthIndex, 1).getDay();
    const offset = firstDay === 0 ? 6 : firstDay - 1;
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    const monthStr = monthIndex + 1 < 10 ? `0${monthIndex + 1}` : `${monthIndex + 1}`;

    const cells = [];

    for (let i = 0; i < offset; i++) {
      cells.push(<View key={`empty-${i}`} style={styles.dayCellEmpty} />);
    }

    for (let dayNum = 1; dayNum <= daysInMonth; dayNum++) {
      const formattedDay = dayNum < 10 ? `0${dayNum}` : `${dayNum}`;
      const dateStr = `${year}-${monthStr}-${formattedDay}`;
      const cellDate = new Date(year, monthIndex, dayNum);

      const isPast = cellDate < today;
      const price = trainPricesByDate[dateStr];
      const isSelected = (activeCalendarTab === 'there' ? searchDate : returnDate) === dateStr;
      const isAvailable = Boolean(price) && !isPast;

      cells.push(
        <TouchableOpacity
          key={dayNum}
          disabled={isPast || !isAvailable}
          onPress={() => isAvailable && handleSelectDate(dateStr)}
          style={[
            styles.dayCell,
            isAvailable && styles.dayCellAvailable,
            isSelected && styles.dayCellSelected,
          ]}
        >
          <Text 
            style={[
              styles.dayNumText, 
              (isPast || !price) && styles.dayNumTextUnavailable,
              isSelected && styles.dayTextSelected
            ]}
          >
            {dayNum}
          </Text>
          {!isPast && price ? (
            <Text style={[styles.priceText, isSelected && styles.dayTextSelected]} numberOfLines={1}>
              {price}
            </Text>
          ) : null}
        </TouchableOpacity>
      );
    }

    return cells;
  };

  const popularRoutes = [
    { from: 'Астана', to: 'Алматы', price: '4 938 ₸' },
    { from: 'Астана', to: 'Караганды', price: '1 028 ₸' },
    { from: 'Астана', to: 'Павлодар', price: '3 663 ₸' },
    { from: 'Астана', to: 'Костанай', price: '3 104 ₸' },
    { from: 'Астана', to: 'Шымкент', price: '8 798 ₸' },
    { from: 'Астана', to: 'Петропавловск', price: '3 476 ₸' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        
        <View style={styles.headerBox}>
          <Text style={styles.headerTitle}>Поиск ЖД-билетов</Text>
          <Text style={styles.headerSubtitle}>Поездки по Казахстану КТЖ</Text>
        </View>

        <View style={styles.searchCard}>
          <Text style={styles.label}>Откуда</Text>
          <TextInput
            style={styles.input}
            value={depStation}
            onChangeText={setDepStation}
            placeholder="Станция отправления"
            placeholderTextColor="#6c757d"
          />

          <TouchableOpacity style={styles.swapBtn} onPress={swapStations}>
            <Text style={styles.swapBtnText}>⇅ Поменять местами</Text>
          </TouchableOpacity>

          <Text style={styles.label}>Куда</Text>
          <TextInput
            style={styles.input}
            value={arrStation}
            onChangeText={setArrStation}
            placeholder="Станция назначения"
            placeholderTextColor="#6c757d"
          />

          <View style={styles.rowDates}>
            <View style={styles.dateCol}>
              <Text style={styles.label}>Туда</Text>
              <TouchableOpacity
                style={styles.dateSelector}
                onPress={() => setActiveCalendarTab('there')}
              >
                <Text style={styles.dateText}>
                  {searchDate || 'Выберите дату'}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.dateCol}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>Обратно</Text>
                {returnDate ? (
                  <TouchableOpacity onPress={() => setReturnDate('')}>
                    <Text style={styles.clearText}>✕ Сбросить</Text>
                  </TouchableOpacity>
                ) : null}
              </View>
              <TouchableOpacity
                style={styles.dateSelector}
                onPress={() => setActiveCalendarTab('back')}
              >
                <Text style={styles.dateText}>
                  {returnDate || 'В одну сторону'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.searchBtn} onPress={handleSearch}>
            <Text style={styles.searchBtnText}>НАЙТИ БИЛЕТЫ</Text>
          </TouchableOpacity>
        </View>

        {/* Модальный Календарь с динамическими месяцами */}
        <Modal visible={activeCalendarTab !== null} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>
                  {activeCalendarTab === 'there' ? 'Дата «Туда»' : 'Дата «Обратно»'}
                </Text>
                <TouchableOpacity
                  style={styles.oneWayBtn}
                  onPress={() => {
                    setReturnDate('');
                    setActiveCalendarTab(null);
                  }}
                >
                  <Text style={styles.oneWayBtnText}>В одну сторону</Text>
                </TouchableOpacity>
              </View>

              <ScrollView style={{ maxHeight: 420 }}>
                {/* Текущий месяц */}
                <Text style={styles.monthTitle}>
                  {monthNames[firstMonthDate.getMonth()]} {firstMonthDate.getFullYear()}
                </Text>
                <View style={styles.weekHeader}>
                  {['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'].map((d) => (
                    <Text key={d} style={styles.weekDayText}>{d}</Text>
                  ))}
                </View>
                <View style={styles.calendarGrid}>
                  {renderMonthCalendar(firstMonthDate.getFullYear(), firstMonthDate.getMonth())}
                </View>

                {/* Следующий месяц */}
                <Text style={[styles.monthTitle, { marginTop: 20 }]}>
                  {monthNames[secondMonthDate.getMonth()]} {secondMonthDate.getFullYear()}
                </Text>
                <View style={styles.weekHeader}>
                  {['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'].map((d) => (
                    <Text key={d} style={styles.weekDayText}>{d}</Text>
                  ))}
                </View>
                <View style={styles.calendarGrid}>
                  {renderMonthCalendar(secondMonthDate.getFullYear(), secondMonthDate.getMonth())}
                </View>
              </ScrollView>

              <TouchableOpacity
                style={styles.closeModalBtn}
                onPress={() => setActiveCalendarTab(null)}
              >
                <Text style={styles.closeModalBtnText}>Закрыть</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <View style={styles.bannerCard}>
          <Text style={styles.bannerBadge}>Специальное предложение</Text>
          <Text style={styles.bannerTitle}>Скидка до 20% на «Тальго»</Text>
          <Text style={styles.bannerDesc}>
            Бронируйте ж/д билеты за 45 дней до поездки и получайте выгоду на премиум-места.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Популярные направления</Text>
        {popularRoutes.map((route, idx) => (
          <TouchableOpacity
            key={idx}
            style={styles.routeCard}
            onPress={() => {
              setDepStation(route.from);
              setArrStation(route.to);
            }}
          >
            <View>
              <Text style={styles.routeName}>{route.from} ➔ {route.to}</Text>
              <Text style={styles.routeSub}>КТЖ Поезд</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.priceFrom}>от</Text>
              <Text style={styles.routePrice}>{route.price}</Text>
            </View>
          </TouchableOpacity>
        ))}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#12151c' },
  container: { padding: 16 },
  headerBox: { marginBottom: 16 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#fff' },
  headerSubtitle: { fontSize: 14, color: '#8e929b', marginTop: 2 },

  searchCard: {
    backgroundColor: '#1c212c',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#2a313f',
  },
  label: { fontSize: 12, fontWeight: '600', color: '#0dcaf0', marginBottom: 6 },
  labelRow: { flexDirection: 'row', justifyContent: 'space-between' },
  clearText: { fontSize: 11, color: '#ff6b6b' },
  input: {
    backgroundColor: '#12151c',
    color: '#fff',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#343d4e',
    fontSize: 15,
  },
  swapBtn: { alignSelf: 'center', marginVertical: 8 },
  swapBtnText: { color: '#0dcaf0', fontSize: 12, fontWeight: '600' },

  rowDates: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 },
  dateCol: { width: '48%' },
  dateSelector: {
    backgroundColor: '#12151c',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#343d4e',
  },
  dateText: { color: '#fff', fontSize: 13 },

  searchBtn: {
    backgroundColor: '#0dcaf0',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 16,
  },
  searchBtnText: { color: '#12151c', fontWeight: 'bold', fontSize: 15 },

  bannerCard: {
    backgroundColor: '#1a324b',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  bannerBadge: { color: '#0dcaf0', fontSize: 11, fontWeight: 'bold', marginBottom: 4 },
  bannerTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 6 },
  bannerDesc: { color: '#b0c4de', fontSize: 12, lineHeight: 16 },

  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#fff', marginBottom: 12 },
  routeCard: {
    backgroundColor: '#1c212c',
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  routeName: { color: '#fff', fontSize: 15, fontWeight: '600' },
  routeSub: { color: '#6c757d', fontSize: 11, marginTop: 2 },
  priceFrom: { color: '#6c757d', fontSize: 10 },
  routePrice: { color: '#0dcaf0', fontSize: 15, fontWeight: 'bold' },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    padding: 16,
  },
  modalContent: {
    backgroundColor: '#1c212c',
    borderRadius: 16,
    padding: 16,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  modalTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  oneWayBtn: { backgroundColor: '#0dcaf0', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4 },
  oneWayBtnText: { color: '#12151c', fontSize: 11, fontWeight: 'bold' },

  monthTitle: { color: '#0dcaf0', textAlign: 'center', fontWeight: 'bold', marginBottom: 8 },
  weekHeader: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 6 },
  weekDayText: { color: '#6c757d', fontSize: 11, fontWeight: 'bold', width: '13%', textAlign: 'center' },
  calendarGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  dayCellEmpty: { width: '14.28%', height: 40 },
  dayCell: {
    width: '14.28%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    marginVertical: 2,
    opacity: 0.3, // Единая прозрачность для прошедших дней и дней без рейсов
  },
  dayCellAvailable: { 
    opacity: 1, 
    backgroundColor: 'rgba(13, 202, 240, 0.15)' 
  },
  dayCellSelected: { 
    backgroundColor: '#0dcaf0', 
    opacity: 1 
  },
  dayNumText: { 
    color: '#fff', 
    fontSize: 11, 
    fontWeight: 'bold' 
  },
  dayNumTextUnavailable: { 
    color: '#8e929b' 
  },
  priceText: { 
    color: '#8e929b', 
    fontSize: 7, 
    marginTop: 1 
  },
  dayTextSelected: { 
    color: '#12151c' 
  },

  closeModalBtn: {
    backgroundColor: '#343d4e',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 12,
  },
  closeModalBtnText: { color: '#fff', fontWeight: 'bold' },
});