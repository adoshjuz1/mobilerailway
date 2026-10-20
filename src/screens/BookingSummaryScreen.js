import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';

export default function BookingSummaryScreen({ navigation }) {
  const [selectedPayment, setSelectedPayment] = useState('card'); // 'apple' или 'card'

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F4F6F9" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Шапка */}
        <View style={styles.topHeader}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Төлем және растау</Text>
          <View style={styles.avatarPlaceholder}>
            <Text style={{ fontSize: 16 }}>👤</Text>
          </View>
        </View>

        {/* Карточка: Детали сапары (Journey Summary) */}
        <View style={styles.card}>
          <Text style={styles.cardSectionTitle}>Сапар мәліметтері</Text>

          <View style={styles.journeyRow}>
            <View style={styles.stationDotBlue} />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.stationLabel}>ШЫҒУ</Text>
              <Text style={styles.stationName}>Астана (Нұрлы Жол)</Text>
              <Text style={styles.timeLabel}>Бүгін • 14:30</Text>
            </View>
          </View>

          <View style={styles.journeyRow}>
            <View style={styles.stationRing} />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.stationLabel}>КЕЛУ</Text>
              <Text style={styles.stationName}>Алматы 2</Text>
              <Text style={styles.timeLabel}>Бүгін • 17:47</Text>
            </View>
          </View>

          <View style={styles.cardDivider} />

          <View style={styles.trainInfoRow}>
            <Text style={styles.trainInfoText}>🚆 Intercity ES9032</Text>
            <Text style={styles.trainInfoText}>💺 Вагон 07, Орын 42</Text>
          </View>
        </View>

        {/* Карточка: Пассажиры */}
        <View style={styles.card}>
          <Text style={styles.cardSectionTitle}>Жолаушылар</Text>
          <View style={styles.passengerBox}>
            <View>
              <Text style={styles.passengerName}>Алекс Уолкер</Text>
              <Text style={styles.passengerSub}>Ересек • Стандарт Премьер</Text>
            </View>
            <Text style={styles.checkedIcon}>✅</Text>
          </View>
        </View>

        {/* Карточка: Способ оплаты */}
        <Text style={[styles.cardSectionTitle, { marginBottom: 10 }]}>Төлем әдісі</Text>
        
        {/* Apple Pay */}
        <TouchableOpacity 
          style={[styles.paymentOption, selectedPayment === 'apple' && styles.paymentActive]}
          onPress={() => setSelectedPayment('apple')}
        >
          <Text style={styles.paymentTitle}> Apple Pay</Text>
          <View style={styles.radioOuter}>
            {selectedPayment === 'apple' && <View style={styles.radioInner} />}
          </View>
        </TouchableOpacity>

        {/* Credit Card */}
        <TouchableOpacity 
          style={[styles.paymentOptionCard, selectedPayment === 'card' && styles.paymentActive]}
          onPress={() => setSelectedPayment('card')}
        >
          <View style={styles.cardTopRow}>
            <Text style={styles.paymentTitle}>💳 Банк картасы</Text>
            <View style={styles.radioOuter}>
              {selectedPayment === 'card' && <View style={styles.radioInner} />}
            </View>
          </View>

          <View style={styles.cardNumberBox}>
            <Text style={styles.cardNumberText}>•••• •••• •••• 4242</Text>
            <Text style={styles.visaText}>VISA</Text>
          </View>

          <View style={styles.cardDetailsRow}>
            <View style={styles.cardSmallInput}>
              <Text style={styles.smallInputText}>12/26</Text>
            </View>
            <View style={styles.cardSmallInput}>
              <Text style={styles.smallInputText}>***</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Чек / Итоги стоимости */}
        <View style={styles.card}>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Стандарт Премьер x1</Text>
            <Text style={styles.priceValue}>142 000 ₸</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Орын брондау</Text>
            <Text style={styles.priceValueFree}>Тегін</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Қызмет көрсету ақысы</Text>
            <Text style={styles.priceValue}>4 500 ₸</Text>
          </View>

          <View style={styles.cardDivider} />

          <View style={styles.priceRow}>
            <Text style={styles.totalLabel}>Барлығы</Text>
            <Text style={styles.totalValue}>146 500 ₸</Text>
          </View>
        </View>

        <Text style={styles.termsText}>
          «Төлеу» батырмасын басу арқылы сіз Railway Connect қызмет көрсету шарттарымен келісесіз.
        </Text>

      </ScrollView>

      {/* Нижняя кнопка оплаты */}
      <View style={styles.bottomBar}>
        <TouchableOpacity 
          style={styles.payButton}
          onPress={() => navigation.navigate('TicketConfirmation')}
        >
          <Text style={styles.payButtonText}>🔒  Қазір төлеу • 146 500 ₸</Text>
        </TouchableOpacity>
      </View>
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
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
  },
  cardSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0F2C59',
    marginBottom: 14,
  },
  journeyRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  stationDotBlue: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#0F2C59',
    marginTop: 4,
  },
  stationRing: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#0F2C59',
    backgroundColor: '#FFFFFF',
    marginTop: 4,
  },
  stationLabel: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#64748B',
  },
  stationName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  timeLabel: {
    fontSize: 12,
    color: '#64748B',
  },
  cardDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 12,
  },
  trainInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  trainInfoText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
  },
  passengerBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  passengerName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  passengerSub: {
    fontSize: 11,
    color: '#64748B',
  },
  checkedIcon: {
    fontSize: 16,
  },
  paymentOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
  },
  paymentOptionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1.5,
    borderColor: '#0F2C59',
  },
  paymentActive: {
    borderColor: '#0F2C59',
  },
  paymentTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#0F2C59',
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#0F2C59',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#0F2C59',
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardNumberBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  cardNumberText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
  },
  visaText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1D4ED8',
  },
  cardDetailsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  cardSmallInput: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
  },
  smallInputText: {
    fontSize: 13,
    color: '#475569',
    fontWeight: '600',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  priceLabel: {
    fontSize: 13,
    color: '#64748B',
  },
  priceValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1E293B',
  },
  priceValueFree: {
    fontSize: 13,
    fontWeight: '600',
    color: '#16A34A',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0F2C59',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0F2C59',
  },
  termsText: {
    textAlign: 'center',
    fontSize: 11,
    color: '#94A3B8',
    paddingHorizontal: 10,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  payButton: {
    backgroundColor: '#0F2C59',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  payButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});