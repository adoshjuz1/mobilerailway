import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from 'react-native';

export default function SearchResultsScreen({ route, navigation }) {
  const { from = 'Алматы', to = 'Атырау', date = '2026-10-18', return_date = '' } = route.params || {};
  const scrollRef = useRef(null);

  const [fromInput, setFromInput] = useState(from);
  const [toInput, setToInput] = useState(to);
  const [dateInput, setDateInput] = useState(date);
  const [returnDateInput, setReturnDateInput] = useState(return_date);

  const [activeCalendarTab, setActiveCalendarTab] = useState(null); 
  const [trainPricesByDate, setTrainPricesByDate] = useState({});

  const [trains, setTrains] = useState([]);
  const [availableDatesMap, setAvailableDatesMap] = useState({});
  const [loading, setLoading] = useState(true);

  // Фильтры
  const [filterPlatzkart, setFilterPlatzkart] = useState(true);
  const [filterCoupe, setFilterCoupe] = useState(true);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  // Текущая системная дата (18 октября 2026)
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const monthNames = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ];

  const firstMonthDate = new Date(today.getFullYear(), today.getMonth(), 1);
  const secondMonthDate = new Date(today.getFullYear(), today.getMonth() + 1, 1);

  const calculateArrivalDate = (depDateStr, durationText, depTimeStr = '22:30') => {
    try {
      if (!depDateStr) return 'вс 18.10';
      
      let year = today.getFullYear(), month = 10, day = 18;
      if (typeof depDateStr === 'string' && depDateStr.includes('-')) {
        const parts = depDateStr.split('-');
        if (parts.length === 3) {
          year = parseInt(parts[0], 10);
          month = parseInt(parts[1], 10);
          day = parseInt(parts[2], 10);
        }
      }

      let depH = 22, depM = 30;
      if (depTimeStr && depTimeStr.includes(':')) {
        const tParts = depTimeStr.split(':');
        depH = parseInt(tParts[0], 10) || 0;
        depM = parseInt(tParts[1], 10) || 0;
      }

      const depDate = new Date(year, month - 1, day, depH, depM);

      let totalHours = 0;
      let totalMins = 0;
      if (durationText) {
        const hMatch = durationText.match(/(\d+)\s*ч/);
        const mMatch = durationText.match(/(\d+)\s*м/);
        if (hMatch) totalHours = parseInt(hMatch[1], 10);
        if (mMatch) totalMins = parseInt(mMatch[1], 10);
      }

      const durationMs = (totalHours * 60 + totalMins) * 60 * 1000;
      const arrDate = new Date(depDate.getTime() + durationMs);

      const days = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
      const dayName = days[arrDate.getDay()];
      const dayNum = String(arrDate.getDate()).padStart(2, '0');
      const monthNum = String(arrDate.getMonth() + 1).padStart(2, '0');
      
      return `${dayName} ${dayNum}.${monthNum}`;
    } catch (e) {
      return depDateStr;
    }
  };

  const formatRussianDepDate = (dateStr) => {
    try {
      if (!dateStr) return 'вс 18.10';
      const parts = dateStr.split('-');
      if (parts.length !== 3) return dateStr;
      const d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
      const days = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
      const dayName = days[d.getDay()];
      const dayNum = String(d.getDate()).padStart(2, '0');
      const monthNum = String(d.getMonth() + 1).padStart(2, '0');
      return `${dayName} ${dayNum}.${monthNum}`;
    } catch (e) {
      return dateStr;
    }
  };

  useEffect(() => {
    fetchTrains();
    fetchAvailableDates();
  }, [dateInput, from, to]);

  const fetchTrains = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        from_city: from,
        to_city: to,
        date: dateInput
      });

      const response = await fetch(`http://172.20.10.6:8000/api/trains/search?${queryParams.toString()}`);
      if (!response.ok) throw new Error('Ошибка сети');
      const data = await response.json();
      setTrains(data);
    } catch (error) {
      console.log('Ошибка бэкенда FastAPI:', error);
      setTrains([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchAvailableDates = async () => {
    try {
      const response = await fetch(`http://172.20.10.6:8000/api/trains/available-dates?from_city=${encodeURIComponent(from)}&to_city=${encodeURIComponent(to)}`);
      if (response.ok) {
        const data = await response.json();
        setAvailableDatesMap(data);
        setTrainPricesByDate(data);
      }
    } catch (err) {
      console.log('Ошибка загрузки дат для ленты:', err);
    }
  };

  // Генерация ленты дат: убираем прошедшие дни и дни без рейсов
  const generateDateRibbon = () => {
    const ribbon = [];
    const daysOfWeek = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
    const monthsNames = ['янв.', 'фев.', 'мар.', 'апр.', 'май', 'июн.', 'июл.', 'авг.', 'сен.', 'окт.', 'ноя.', 'дек.'];

    for (let i = 0; i < 45; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      const fullDate = `${year}-${month}-${day}`;
      
      const price = availableDatesMap[fullDate];

      // Оставляем ТОЛЬКО те дни, на которые есть рейсы/цены в базе данных
      if (price) {
        ribbon.push({
          day: daysOfWeek[d.getDay()],
          date: `${d.getDate()} ${monthsNames[d.getMonth()]}`,
          fullDate: fullDate,
          price: price
        });
      }
    }
    return ribbon;
  };

  const dateRibbon = generateDateRibbon();

  const handleSearchSubmit = () => {
    setLoading(true);
    fetchTrains();
  };

  const handleSelectDate = (dateStr) => {
    if (activeCalendarTab === 'there') {
      setDateInput(dateStr);
    } else if (activeCalendarTab === 'back') {
      setReturnDateInput(dateStr);
    }
    setActiveCalendarTab(null);
  };

  const scrollRibbon = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ x: direction === 'left' ? 0 : 300, animated: true });
    }
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
      const isSelected = (activeCalendarTab === 'there' ? dateInput : returnDateInput) === dateStr;
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
          <Text style={[styles.dayNumText, (isPast || !price) && styles.dayNumTextUnavailable, isSelected && styles.dayTextSelected]}>
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

  const filteredTrains = trains.filter(train => {
    const coupePrice = train.coupe_price || train.min_price || 20000;
    const platskartPrice = train.platskart_price || train.min_price || 10000;
    
    const currentMin = Math.min(
      filterCoupe ? coupePrice : Infinity, 
      filterPlatzkart ? platskartPrice : Infinity
    );

    if (minPrice !== '' && currentMin < Number(minPrice)) return false;
    if (maxPrice !== '' && currentMin > Number(maxPrice)) return false;

    return true;
  });

  const goToSeatSelection = (train, carriageType) => {
    navigation.navigate('SeatSelection', { 
      train, 
      carriageType,
      fromCity: from,
      toCity: to,
      date: dateInput
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* Поисковая панель */}
        <View style={styles.searchBox}>
          <Text style={styles.label}>Откуда</Text>
          <TextInput 
            style={styles.input} 
            value={fromInput} 
            onChangeText={setFromInput} 
          />

          <Text style={styles.label}>Куда</Text>
          <TextInput 
            style={styles.input} 
            value={toInput} 
            onChangeText={setToInput} 
          />

          <View style={styles.rowDates}>
            <View style={styles.dateCol}>
              <Text style={styles.label}>Туда</Text>
              <TouchableOpacity 
                style={styles.dateSelector} 
                onPress={() => setActiveCalendarTab('there')}
              >
                <Text style={styles.dateText}>{dateInput}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.dateCol}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>Обратно</Text>
                {returnDateInput ? (
                  <TouchableOpacity onPress={() => setReturnDateInput('')}>
                    <Text style={styles.clearText}>✕ Сбросить</Text>
                  </TouchableOpacity>
                ) : null}
              </View>
              <TouchableOpacity 
                style={styles.dateSelector} 
                onPress={() => setActiveCalendarTab('back')}
              >
                <Text style={styles.dateText}>{returnDateInput || 'В одну сторону'}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.searchBtn} onPress={handleSearchSubmit}>
            <Text style={styles.searchBtnText}>Найти</Text>
          </TouchableOpacity>
        </View>

        {/* Всплывающий календарь */}
        <Modal visible={activeCalendarTab !== null} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>
                  {activeCalendarTab === 'there' ? 'Выберите дату туда' : 'Выберите дату обратно'}
                </Text>
                <TouchableOpacity 
                  style={styles.oneWayBtn} 
                  onPress={() => { setReturnDateInput(''); setActiveCalendarTab(null); }}
                >
                  <Text style={styles.oneWayBtnText}>В одну сторону</Text>
                </TouchableOpacity>
              </View>

              <ScrollView style={{ maxHeight: 400 }}>
                <Text style={styles.monthTitle}>
                  {monthNames[firstMonthDate.getMonth()]} {firstMonthDate.getFullYear()}
                </Text>
                <View style={styles.weekHeader}>
                  {['пн','вт','ср','чт','пт','сб','вс'].map(d => <Text key={d} style={styles.weekDayText}>{d}</Text>)}
                </View>
                <View style={styles.calendarGrid}>{renderMonthCalendar(firstMonthDate.getFullYear(), firstMonthDate.getMonth())}</View>

                <Text style={[styles.monthTitle, { marginTop: 15 }]}>
                  {monthNames[secondMonthDate.getMonth()]} {secondMonthDate.getFullYear()}
                </Text>
                <View style={styles.weekHeader}>
                  {['пн','вт','ср','чт','пт','сб','вс'].map(d => <Text key={d} style={styles.weekDayText}>{d}</Text>)}
                </View>
                <View style={styles.calendarGrid}>{renderMonthCalendar(secondMonthDate.getFullYear(), secondMonthDate.getMonth())}</View>
              </ScrollView>

              <TouchableOpacity style={styles.closeModalBtn} onPress={() => setActiveCalendarTab(null)}>
                <Text style={styles.closeModalBtnText}>Закрыть</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Блок фильтров */}
        <View style={styles.filterCard}>
          <Text style={styles.filterTitle}>Фильтры</Text>
          <View style={styles.checkboxRow}>
            <TouchableOpacity onPress={() => setFilterPlatzkart(!filterPlatzkart)} style={styles.checkItem}>
              <Text style={styles.checkbox}>{filterPlatzkart ? '☑' : '☐'}</Text>
              <Text style={styles.filterText}>Плацкарт</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setFilterCoupe(!filterCoupe)} style={styles.checkItem}>
              <Text style={styles.checkbox}>{filterCoupe ? '☑' : '☐'}</Text>
              <Text style={styles.filterText}>Купе</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Лента дат ТОЛЬКО С ДОСТУПНЫМИ РЕЙСАМИ */}
        <View style={styles.ribbonContainer}>
          <TouchableOpacity style={styles.ribbonArrow} onPress={() => scrollRibbon('left')}>
            <Text style={styles.arrowText}>‹</Text>
          </TouchableOpacity>

          <ScrollView 
            ref={scrollRef} 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            contentContainerStyle={styles.ribbonScroll}
          >
            {dateRibbon.length === 0 ? (
              <Text style={{ color: '#8e929b', fontSize: 12, paddingVertical: 10 }}>Нет доступных рейсов на ближайшие дни</Text>
            ) : (
              dateRibbon.map((item, idx) => {
                const isActive = dateInput === item.fullDate;
                return (
                  <TouchableOpacity 
                    key={idx} 
                    onPress={() => setDateInput(item.fullDate)}
                    style={[
                      styles.ribbonItem,
                      isActive && styles.ribbonActive
                    ]}
                  >
                    <Text style={[styles.ribbonDayText, isActive && styles.ribbonActiveText]}>{item.day} {item.date}</Text>
                    <Text style={[styles.ribbonPriceText, isActive && styles.ribbonActiveText]}>
                      от {item.price.toLocaleString()} ₸
                    </Text>
                  </TouchableOpacity>
                );
              })
            )}
          </ScrollView>

          <TouchableOpacity style={styles.ribbonArrow} onPress={() => scrollRibbon('right')}>
            <Text style={styles.arrowText}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Список поездов */}
        <Text style={styles.trainsCountTitle}>Поездов по маршруту: {filteredTrains.length}</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#0dcaf0" style={{ marginTop: 30 }} />
        ) : filteredTrains.length === 0 ? (
          <View style={styles.alertBox}><Text style={styles.alertText}>Поездов на эту дату не найдено.</Text></View>
        ) : (
          filteredTrains.map((train, idx) => {
            const coupePrice = train.coupe_price || 20000;
            const platskartPrice = train.platskart_price || 10000;
            const computedDepDate = formatRussianDepDate(dateInput);
            const computedArrDate = calculateArrivalDate(dateInput, train.duration_text, train.departure_time);

            return (
              <View key={idx} style={styles.trainCard}>
                <View style={styles.trainHeader}>
                  <Text style={styles.trainBadge}>{train.number}</Text>
                  <Text style={styles.trainName}>{train.name}</Text>
                </View>

                <View style={styles.trainTimesRow}>
                  <View>
                    <Text style={styles.timeText}>{train.departure_time}</Text>
                    <Text style={styles.cityText}>{from} ({computedDepDate})</Text>
                  </View>
                  <View style={styles.durationCol}>
                    <Text style={styles.durationText}>{train.duration_text}</Text>
                    <View style={styles.durationLine} />
                  </View>
                  <View style={{ alignItems: 'flex-end' }}>
                    <Text style={styles.timeText}>{train.arrival_time}</Text>
                    <Text style={styles.cityText}>{to} ({computedArrDate})</Text>
                  </View>
                </View>

                <View style={styles.carriagesRow}>
                  {filterCoupe && (
                    <TouchableOpacity style={styles.carriageBox} onPress={() => goToSeatSelection(train, 'coupe')}>
                      <Text style={styles.carriageTitle}>Купе</Text>
                      <Text style={styles.carriagePrice}>от {coupePrice.toLocaleString()} ₸</Text>
                    </TouchableOpacity>
                  )}
                  {filterPlatzkart && (
                    <TouchableOpacity style={styles.carriageBox} onPress={() => goToSeatSelection(train, 'platskart')}>
                      <Text style={styles.carriageTitle}>Плацкарт</Text>
                      <Text style={styles.carriagePrice}>от {platskartPrice.toLocaleString()} ₸</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            );
          })
        )}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#12151c' },
  container: { padding: 16 },
  searchBox: {
    backgroundColor: '#1c212c',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#2a313f',
  },
  label: { fontSize: 12, fontWeight: '600', color: '#0dcaf0', marginBottom: 4 },
  labelRow: { flexDirection: 'row', justifyContent: 'space-between' },
  clearText: { fontSize: 11, color: '#ff6b6b' },
  input: {
    backgroundColor: '#12151c',
    color: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#343d4e',
    fontSize: 14,
    marginBottom: 10,
  },
  rowDates: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  dateCol: { width: '48%' },
  dateSelector: {
    backgroundColor: '#12151c',
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: '#343d4e',
  },
  dateText: { color: '#fff', fontSize: 13 },
  searchBtn: {
    backgroundColor: '#0dcaf0',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  searchBtnText: { color: '#12151c', fontWeight: 'bold', fontSize: 15 },

  filterCard: {
    backgroundColor: '#1c212c',
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#2a313f',
  },
  filterTitle: { color: '#fff', fontWeight: 'bold', marginBottom: 8, fontSize: 14 },
  checkboxRow: { flexDirection: 'row', gap: 20 },
  checkItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  checkbox: { color: '#0dcaf0', fontSize: 16 },
  filterText: { color: '#fff', fontSize: 13 },

  ribbonContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  ribbonScroll: { gap: 8 },
  ribbonArrow: {
    paddingHorizontal: 10,
    paddingVertical: 14,
    backgroundColor: '#1c212c',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#343d4e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  ribbonItem: {
    backgroundColor: '#1c212c',
    borderRadius: 8,
    padding: 10,
    minWidth: 120,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  ribbonActive: { backgroundColor: '#0dcaf0', borderColor: '#0dcaf0' },
  ribbonDayText: { color: '#fff', fontSize: 11, fontWeight: '600' },
  ribbonPriceText: { color: '#8e929b', fontSize: 11, marginTop: 4 },
  ribbonActiveText: { color: '#12151c', fontWeight: 'bold' },

  trainsCountTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginBottom: 12 },
  alertBox: { backgroundColor: '#1c212c', padding: 20, borderRadius: 10, alignItems: 'center' },
  alertText: { color: '#ffc107', fontSize: 14 },

  trainCard: {
    backgroundColor: '#1c212c',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#2a313f',
  },
  trainHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10 },
  trainBadge: { backgroundColor: '#6c757d', color: '#fff', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, fontSize: 12, fontWeight: 'bold' },
  trainName: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  trainTimesRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  timeText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  cityText: { color: '#8e929b', fontSize: 11 },
  durationCol: { flex: 1, alignItems: 'center', paddingHorizontal: 10 },
  durationText: { color: '#8e929b', fontSize: 10, marginBottom: 4 },
  durationLine: { height: 2, backgroundColor: '#0dcaf0', width: '100%' },

  carriagesRow: { flexDirection: 'row', gap: 10 },
  carriageBox: {
    flex: 1,
    backgroundColor: '#212529',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#444',
  },
  carriageTitle: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  carriagePrice: { color: '#0dcaf0', fontSize: 13, fontWeight: 'bold', marginTop: 4 },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'center', padding: 16 },
  modalContent: { backgroundColor: '#1c212c', borderRadius: 16, padding: 16 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  modalTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  oneWayBtn: { backgroundColor: '#0dcaf0', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4 },
  oneWayBtnText: { color: '#12151c', fontSize: 11, fontWeight: 'bold' },
  monthTitle: { color: '#0dcaf0', textAlign: 'center', fontWeight: 'bold', marginBottom: 8 },
  weekHeader: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 6 },
  weekDayText: { color: '#6c757d', fontSize: 11, fontWeight: 'bold', width: '13%', textAlign: 'center' },
  calendarGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  dayCellEmpty: { width: '14.28%', height: 36 },
  dayCell: { width: '14.28%', height: 36, justifyContent: 'center', alignItems: 'center', borderRadius: 6, marginVertical: 2, opacity: 0.3 },
  dayCellAvailable: { opacity: 1, backgroundColor: 'rgba(13, 202, 240, 0.15)' },
  dayCellSelected: { backgroundColor: '#0dcaf0', opacity: 1 },
  dayNumText: { color: '#fff', fontSize: 11, fontWeight: 'bold' },
  dayNumTextUnavailable: { color: '#8e929b' },
  priceText: { color: '#8e929b', fontSize: 7 },
  dayTextSelected: { color: '#12151c' },
  closeModalBtn: { backgroundColor: '#343d4e', borderRadius: 10, paddingVertical: 10, alignItems: 'center', marginTop: 12 },
  closeModalBtnText: { color: '#fff', fontWeight: 'bold' },
});