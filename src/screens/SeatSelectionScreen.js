import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';

export default function SeatSelectionScreen({ route, navigation }) {
  const carriageScrollRef = useRef(null);

  const passedTrain = route.params?.train;
  const initialCarriageType = route.params?.carriageType || 'coupe';
  const fromCity = route.params?.fromCity || 'Алматы';
  const toCity = route.params?.toCity || 'Атырау';
  const selectedDate = route.params?.date || '2026-10-14';

  const calculateArrivalDate = (depDateStr, durationText, depTimeStr = '22:30') => {
    try {
      if (!depDateStr) return 'чт, 22.10';
      const parts = depDateStr.split('-');
      if (parts.length !== 3) return depDateStr;

      const [year, month, day] = parts.map(Number);
      const [depH, depM] = depTimeStr.split(':').map(Number);

      const depDate = new Date(year, month - 1, day, depH, depM);

      let totalHours = 51;
      let totalMins = 59;
      if (durationText) {
        const hMatch = durationText.match(/(\d+)ч/);
        const mMatch = durationText.match(/(\d+)м/);
        if (hMatch) totalHours = parseInt(hMatch[1], 10);
        if (mMatch) totalMins = parseInt(mMatch[1], 10);
      }

      const durationMs = (totalHours * 60 + totalMins) * 60 * 1000;
      const arrDate = new Date(depDate.getTime() + durationMs);

      const days = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
      const dayName = days[arrDate.getDay()];
      const dayNum = String(arrDate.getDate()).padStart(2, '0');
      const monthNum = String(arrDate.getMonth() + 1).padStart(2, '0');
      return `${dayName}, ${dayNum}.${monthNum}`;
    } catch (e) {
      return depDateStr;
    }
  };

  const formatRussianDate = (dateInput) => {
    try {
      if (!dateInput) return 'ср, 14.10';
      let d = new Date();
      if (typeof dateInput === 'string' && dateInput.includes('-')) {
        const parts = dateInput.split('-');
        if (parts.length === 3) {
          d = new Date(parts[0], parts[1] - 1, parts[2]);
        }
      }
      const days = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
      const dayName = days[d.getDay()];
      const dayNum = String(d.getDate()).padStart(2, '0');
      const monthNum = String(d.getMonth() + 1).padStart(2, '0');
      return `${dayName}, ${dayNum}.${monthNum}`;
    } catch (e) {
      return dateInput;
    }
  };

  const formattedDepDate = formatRussianDate(selectedDate || passedTrain?.departure_date);
  const depTimeVal = passedTrain?.departure_time || '22:30';
  const durationVal = passedTrain?.duration_text || '51ч 59м';
  const formattedArrDate = calculateArrivalDate(selectedDate || passedTrain?.departure_date, durationVal, depTimeVal);

  const trainData = {
    number: passedTrain?.number || '041Ц',
    departureTime: depTimeVal,
    departureDate: formattedDepDate,
    departureStation: fromCity,
    arrivalTime: passedTrain?.arrival_time || '02:29',
    arrivalDate: formattedArrDate,
    arrivalStation: toCity,
    duration: durationVal,
    coupePrice: passedTrain?.coupe_price || 25711,
    coupeSeatsTotal: passedTrain?.coupe_seats_total ?? 180,
    platskartPrice: passedTrain?.platskart_price || 18014,
    platskartSeatsTotal: passedTrain?.platskart_seats_total ?? 270
  };

  const [selectedCarriageType, setSelectedCarriageType] = useState(initialCarriageType);
  const allCarriages = passedTrain?.carriages || [];

  const coupeCarriages = allCarriages
    .filter(c => c.type === 'Купе')
    .map(c => ({
      number: `${c.number} Купе`,
      type: 'Купе',
      rawNumber: c.number,
      price: c.price,
      seatsLeft: c.seats_left,
      seats: c.seats || []
    }));

  const platskartCarriages = allCarriages
    .filter(c => c.type === 'Плацкарт')
    .map(c => ({
      number: `${c.number} Плацкарт`,
      type: 'Плацкарт',
      rawNumber: c.number,
      price: c.price,
      seatsLeft: c.seats_left,
      seats: c.seats || []
    }));

  const currentCarriages = selectedCarriageType === 'coupe' ? coupeCarriages : platskartCarriages;

  const [activeCarriage, setActiveCarriage] = useState(currentCarriages[0] || null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seatFilter, setSeatFilter] = useState('all');

  useEffect(() => {
    if (currentCarriages.length > 0) {
      setActiveCarriage(currentCarriages[0]);
      setSelectedSeats([]);
    }
  }, [selectedCarriageType, passedTrain]);

  const handleCarriageTypeChange = (type) => {
    setSelectedCarriageType(type);
    const newCarriages = type === 'coupe' ? coupeCarriages : platskartCarriages;
    setActiveCarriage(newCarriages[0] || null);
    setSelectedSeats([]);
  };

  const seatsMap = {};
  (activeCarriage?.seats || []).forEach(s => {
    seatsMap[s.number] = s;
  });

  const toggleSeat = (seatNum) => {
    const seatObj = seatsMap[seatNum];
    if (!seatObj || seatObj.is_occupied) return;
    if (selectedSeats.includes(seatNum)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seatNum));
    } else {
      setSelectedSeats([...selectedSeats, seatNum].sort((a, b) => a - b));
    }
  };

  const totalPrice = selectedSeats.length * (activeCarriage?.price || 0);

  const renderSeatBox = (num) => {
    const seat = seatsMap[num];
    if (!seat) return <View style={{ width: 32, height: 32 }} />;

    const isOccupied = seat.is_occupied;
    const isSelected = selectedSeats.includes(num);
    const isBottom = num % 2 !== 0; 

    if (seatFilter === 'bottom' && !isBottom) {
      return (
        <View style={[styles.seatBox, { backgroundColor: '#212529', opacity: 0.3 }]}>
          <Text style={styles.seatNumMuted}>{num}</Text>
        </View>
      );
    }

    let bg = '#174ea6'; 
    if (isOccupied) bg = '#495057';
    if (isSelected) bg = '#e83e8c'; 

    return (
      <TouchableOpacity 
        key={num}
        disabled={isOccupied}
        onPress={() => toggleSeat(num)}
        style={[
          styles.seatBox,
          { backgroundColor: bg, opacity: isOccupied ? 0.4 : 1 },
          isSelected && styles.seatSelectedBorder
        ]}
      >
        <Text style={[styles.seatNumText, isBottom && styles.seatBottomLine]}>
          {num}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* Хлебные крошки */}
        <View style={styles.breadcrumbContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.breadcrumbLink}>Результаты поиска</Text>
          </TouchableOpacity>
          <Text style={styles.breadcrumbActive}> › Выбор места › Бронирование › Оплата</Text>
        </View>

        {/* Шапка рейса */}
        <View style={styles.trainHeaderCard}>
          <View style={styles.trainRouteInfo}>
            <View>
              <Text style={styles.badgeText}>{trainData.number}</Text>
              <Text style={styles.timeMain}>{trainData.departureTime}</Text>
              <Text style={styles.dateSub}>{trainData.departureDate}</Text>
              <Text style={styles.stationSub}>{trainData.departureStation}</Text>
            </View>

            <View style={styles.durationCenter}>
              <Text style={styles.dateSub}>{trainData.duration}</Text>
              <View style={styles.durationLine} />
            </View>

            <View style={{ alignItems: 'flex-end', paddingTop: 20 }}>
              <Text style={styles.timeMain}>{trainData.arrivalTime}</Text>
              <Text style={styles.dateSub}>{trainData.arrivalDate}</Text>
              <Text style={styles.stationSub}>{trainData.arrivalStation}</Text>
            </View>
          </View>

          {/* Переключатель Купе / Плацкарт */}
          <View style={styles.carriageToggleRow}>
            <TouchableOpacity 
              onPress={() => handleCarriageTypeChange('coupe')}
              style={[styles.toggleBtn, selectedCarriageType === 'coupe' && styles.toggleBtnActive]}
            >
              <Text style={styles.toggleTitle}>Купе</Text>
              <Text style={styles.dateSub}>{trainData.coupeSeatsTotal} мест</Text>
              <Text style={styles.priceHighlight}>{trainData.coupePrice.toLocaleString()} ₸</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => handleCarriageTypeChange('platskart')}
              style={[styles.toggleBtn, selectedCarriageType === 'platskart' && styles.toggleBtnActive]}
            >
              <Text style={styles.toggleTitle}>Плацкарт</Text>
              <Text style={styles.dateSub}>{trainData.platskartSeatsTotal} мест</Text>
              <Text style={styles.priceHighlight}>{trainData.platskartPrice.toLocaleString()} ₸</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Выбор вагона */}
        <Text style={styles.sectionTitle}>Выберите вагон</Text>
        <ScrollView 
          ref={carriageScrollRef}
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.carriageScrollContainer}
        >
          {currentCarriages.map((car, idx) => {
            const isActive = activeCarriage?.number === car.number;
            return (
              <TouchableOpacity 
                key={idx} 
                onPress={() => { setActiveCarriage(car); setSelectedSeats([]); }}
                style={[styles.carriageItemCard, isActive && styles.carriageItemActive]}
              >
                <View style={styles.carriageItemHeader}>
                  <Text style={styles.carriageItemNum}>{car.number}</Text>
                  <Text style={styles.priceHighlight}>{car.price.toLocaleString()} ₸</Text>
                </View>
                <Text style={styles.dateSub}>{car.seatsLeft} мест</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Интерактивная схема мест */}
        <View style={styles.schemaCard}>
          <Text style={styles.sectionTitle}>Выберите места ({activeCarriage?.number || 'Вагон'})</Text>

          <View style={styles.filterRow}>
            <View style={styles.filterButtonsGroup}>
              <TouchableOpacity 
                style={[styles.filterBtn, seatFilter === 'all' && styles.filterBtnActive]} 
                onPress={() => setSeatFilter('all')}
              >
                <Text style={styles.filterBtnText}>Все</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.filterBtn, seatFilter === 'bottom' && styles.filterBtnActive]} 
                onPress={() => setSeatFilter('bottom')}
              >
                <Text style={styles.filterBtnText}>Только нижние</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Вагонный блок */}
          <View style={styles.wagonBox}>
            <View style={styles.wagonInnerRow}>
              {/* Левый тамбур */}
              <View style={styles.tambourBox}>
                <Text style={{ fontSize: 14 }}>🚻 👨‍✈️</Text>
              </View>

              {/* 9 секций */}
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.sectionsScroll}>
                {Array.from({ length: 9 }, (_, secIdx) => {
                  const topSeat1 = secIdx * 4 + 2;
                  const topSeat2 = secIdx * 4 + 4;
                  const botSeat1 = secIdx * 4 + 1;
                  const botSeat2 = secIdx * 4 + 3;

                  return (
                    <View key={secIdx} style={styles.sectionGroup}>
                      <View style={styles.sectionRow}>
                        {renderSeatBox(topSeat1)}
                        {renderSeatBox(topSeat2)}
                      </View>
                      <View style={styles.sectionRow}>
                        {renderSeatBox(botSeat1)}
                        {renderSeatBox(botSeat2)}
                      </View>
                    </View>
                  );
                })}
              </ScrollView>

              {/* Правый тамбур */}
              <View style={styles.tambourBox}>
                <Text style={{ fontSize: 14 }}>🚻</Text>
              </View>
            </View>

            {/* Боковые места для плацкарта */}
            {activeCarriage?.type === 'Плацкарт' && (
              <View style={styles.sideSeatsContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 4 }}>
                  {Array.from({ length: 18 }, (_, i) => {
                    const seatNum = 54 - i; 
                    return renderSeatBox(seatNum);
                  })}
                </ScrollView>
              </View>
            )}
          </View>
        </View>

        {/* Панель Маршрут и итого */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Маршрут</Text>
          <Text style={styles.summaryRouteText}>{trainData.departureStation} ➔ {trainData.arrivalStation}</Text>
          <Text style={styles.dateSub}>{trainData.departureDate} {trainData.departureTime} — {trainData.arrivalDate} {trainData.arrivalTime}</Text>
          
          <View style={styles.summaryDivider} />
          
          <Text style={styles.dateSub}>Выбрано мест:</Text>
          <Text style={styles.summarySeatsText}>{selectedSeats.join(', ') || 'не выбрано'}</Text>

          <View style={styles.summaryDivider} />

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Всего</Text>
            <Text style={styles.totalAmount}>{totalPrice.toLocaleString()} ₸</Text>
          </View>

          <TouchableOpacity 
            disabled={selectedSeats.length === 0}
            style={[styles.continueBtn, selectedSeats.length === 0 && { opacity: 0.5 }]}
            onPress={() => Alert.alert('Бронирование', `Успешно! Выбраны места: ${selectedSeats.join(', ')}`)}
          >
            <Text style={styles.continueBtnText}>Продолжить</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#12151c' },
  container: { padding: 16 },
  breadcrumbContainer: { flexDirection: 'row', marginBottom: 14 },
  breadcrumbLink: { color: '#0dcaf0', fontSize: 13, textDecorationLine: 'underline' },
  breadcrumbActive: { color: '#8e929b', fontSize: 13 },

  trainHeaderCard: {
    backgroundColor: '#1a1d26',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#2a313f',
  },
  trainRouteInfo: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 },
  badgeText: { backgroundColor: '#6c757d', color: '#fff', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, fontSize: 11, fontWeight: 'bold', overflow: 'hidden', alignSelf: 'flex-start', marginBottom: 4 },
  timeMain: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  dateSub: { color: '#8e929b', fontSize: 11 },
  stationSub: { color: '#fff', fontSize: 12, fontWeight: '600' },
  durationCenter: { alignItems: 'center', paddingTop: 8, paddingHorizontal: 10 },
  durationLine: { height: 2, backgroundColor: '#3b4252', width: 60, marginTop: 4 },

  carriageToggleRow: { flexDirection: 'row', gap: 10 },
  toggleBtn: {
    flex: 1,
    backgroundColor: '#141720',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#343d4e',
  },
  toggleBtnActive: { backgroundColor: '#172228', borderColor: '#0dcaf0' },
  toggleTitle: { color: '#fff', fontWeight: 'bold', fontSize: 13 },
  priceHighlight: { color: '#0dcaf0', fontWeight: 'bold', fontSize: 13, marginTop: 2 },

  sectionTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
  carriageScrollContainer: { gap: 10, marginBottom: 16 },
  carriageItemCard: {
    backgroundColor: '#1a1d26',
    borderRadius: 8,
    padding: 12,
    minWidth: 140,
    borderWidth: 1,
    borderColor: '#343d4e',
  },
  carriageItemActive: { backgroundColor: '#172228', borderColor: '#0dcaf0' },
  carriageItemHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  carriageItemNum: { color: '#fff', fontWeight: 'bold', fontSize: 13 },

  schemaCard: {
    backgroundColor: '#1a1d26',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#2a313f',
  },
  filterRow: { marginBottom: 12 },
  filterButtonsGroup: { flexDirection: 'row', gap: 8 },
  filterBtn: { backgroundColor: '#212529', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 6, borderWidth: 1, borderColor: '#444' },
  filterBtnActive: { backgroundColor: '#343d4e', borderColor: '#0dcaf0' },
  filterBtnText: { color: '#fff', fontSize: 12 },

  wagonBox: { backgroundColor: '#1b1f28', borderRadius: 8, padding: 12, borderWidth: 1, borderColor: '#343d4e' },
  wagonInnerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  tambourBox: { backgroundColor: '#141720', borderRadius: 6, padding: 8, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#343d4e', height: 72 },
  sectionsScroll: { gap: 6, paddingHorizontal: 6 },
  sectionGroup: { backgroundColor: '#141720', borderRadius: 6, padding: 4, gap: 4, borderWidth: 1, borderColor: '#343d4e' },
  sectionRow: { flexDirection: 'row', gap: 4 },

  seatBox: { width: 32, height: 32, borderRadius: 6, justifyContent: 'center', alignItems: 'center' },
  seatSelectedBorder: { borderWidth: 2, borderColor: '#fff' },
  seatNumText: { color: '#fff', fontSize: 11, fontWeight: 'bold' },
  seatBottomLine: { borderBottomWidth: 1, borderBottomColor: '#9ec5fe', paddingBottom: 1 },
  seatNumMuted: { color: '#6c757d', fontSize: 11 },

  sideSeatsContainer: { marginTop: 12, paddingTop: 10, borderTopWidth: 1, borderTopColor: '#343d4e', alignItems: 'center' },

  summaryCard: {
    backgroundColor: '#1a1d26',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#2a313f',
    marginBottom: 30,
  },
  summaryTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
  summaryRouteText: { color: '#fff', fontWeight: 'bold', fontSize: 14, marginBottom: 2 },
  summarySeatsText: { color: '#fff', fontWeight: 'bold', fontSize: 13, marginTop: 2 },
  summaryDivider: { height: 1, backgroundColor: '#343d4e', marginVertical: 12 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  totalLabel: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  totalAmount: { color: '#0dcaf0', fontSize: 20, fontWeight: 'bold' },
  continueBtn: { backgroundColor: '#0dcaf0', borderRadius: 10, paddingVertical: 14, alignItems: 'center' },
  continueBtnText: { color: '#12151c', fontWeight: 'bold', fontSize: 15 },
});