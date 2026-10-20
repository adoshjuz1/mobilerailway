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
  Switch,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

export default function PassengerInfoScreen({ navigation }) {
  const [fullName, setFullName] = useState('Алекс Уолкер');
  const [email, setEmail] = useState('alex.walker@example.com');
  const [idNumber, setIdNumber] = useState('020815501234');
  const [saveDetails, setSaveDetails] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F4F6F9" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* Шапка */}
          <View style={styles.topHeader}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
              <Text style={styles.backIcon}>←</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Railway Connect</Text>
            <View style={styles.avatarPlaceholder}>
              <Text style={{ fontSize: 16 }}>👤</Text>
            </View>
          </View>

          {/* Индикатор шагов (Stepper) */}
          <View style={styles.stepperContainer}>
            <View style={styles.stepItem}>
              <View style={[styles.stepCircle, styles.stepDone]}>
                <Text style={styles.stepTextDone}>1</Text>
              </View>
              <Text style={styles.stepLabelDone}>Сапар</Text>
            </View>

            <View style={[styles.stepLine, styles.stepLineActive]} />

            <View style={styles.stepItem}>
              <View style={[styles.stepCircle, styles.stepActive]}>
                <Text style={styles.stepTextActive}>2</Text>
              </View>
              <Text style={styles.stepLabelActive}>Жолаушылар</Text>
            </View>

            <View style={styles.stepLine} />

            <View style={styles.stepItem}>
              <View style={styles.stepCircle}>
                <Text style={styles.stepTextInactive}>3</Text>
              </View>
              <Text style={styles.stepLabelInactive}>Төлем</Text>
            </View>
          </View>

          {/* Заголовок */}
          <View style={styles.titleSection}>
            <Text style={styles.mainTitle}>Жолаушы мәліметтері</Text>
            <Text style={styles.subTitle}>
              Деректерді мемлекеттік жеке куәлігіңізде көрсетілгендей дәл енгізіңіз.
            </Text>
          </View>

          {/* Карточка Жолаушы 1 */}
          <View style={styles.passengerCard}>
            <View style={styles.cardHeader}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.passengerIcon}>👤</Text>
                <Text style={styles.passengerTitle}>1-ші Жолаушы</Text>
              </View>
              <View style={styles.primaryBadge}>
                <Text style={styles.primaryBadgeText}>Негізгі</Text>
              </View>
            </View>

            {/* Поле ФИО */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Толық аты-жөні</Text>
              <TextInput
                style={styles.input}
                placeholder="Мысалы: Ахметов Асқар"
                placeholderTextColor="#94A3B8"
                value={fullName}
                onChangeText={setFullName}
              />
            </View>

            {/* Поле Email */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Электронды пошта</Text>
              <TextInput
                style={styles.input}
                placeholder="example@mail.kz"
                placeholderTextColor="#94A3B8"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            {/* Поле Құжат нөмірі */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>ЖСН / Төлқұжат нөмірі</Text>
              <TextInput
                style={styles.input}
                placeholder="12 таңбалы ЖСН"
                placeholderTextColor="#94A3B8"
                keyboardType="numeric"
                value={idNumber}
                onChangeText={setIdNumber}
              />
            </View>

            {/* Сохранение данных */}
            <View style={styles.switchRow}>
              <Text style={styles.switchLabel}>Болашақ сапарлар үшін сақтау</Text>
              <Switch
                value={saveDetails}
                onValueChange={setSaveDetails}
                trackColor={{ false: '#CBD5E1', true: '#0F2C59' }}
                thumbColor="#FFFFFF"
              />
            </View>
          </View>

          {/* Кнопка добавления еще одного пассажира */}
          <TouchableOpacity style={styles.addPassengerBtn}>
            <Text style={styles.addPassengerText}>+ Жолаушы қосу</Text>
          </TouchableOpacity>

          {/* Кнопка перехода к оплате */}
          <TouchableOpacity 
            style={styles.continueBtn}
            onPress={() => navigation.navigate('BookingSummary')}
          >
            <Text style={styles.continueBtnText}>Төлемге өту  ➔</Text>
          </TouchableOpacity>

          <Text style={styles.termsText}>
            Жалғастыру арқылы сіз біздің Плайдалану шарттарымен келісесіз.
          </Text>

        </ScrollView>
      </KeyboardAvoidingView>
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
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  stepItem: {
    alignItems: 'center',
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  stepDone: {
    backgroundColor: '#0F2C59',
  },
  stepActive: {
    backgroundColor: '#0F2C59',
  },
  stepTextDone: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 13,
  },
  stepTextActive: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 13,
  },
  stepTextInactive: {
    color: '#64748B',
    fontWeight: 'bold',
    fontSize: 13,
  },
  stepLabelDone: {
    fontSize: 11,
    color: '#0F2C59',
    fontWeight: '600',
  },
  stepLabelActive: {
    fontSize: 11,
    color: '#0F2C59',
    fontWeight: 'bold',
  },
  stepLabelInactive: {
    fontSize: 11,
    color: '#94A3B8',
  },
  stepLine: {
    flex: 0.2,
    height: 2,
    backgroundColor: '#E2E8F0',
    marginHorizontal: 8,
    marginTop: -16,
  },
  stepLineActive: {
    backgroundColor: '#0F2C59',
  },
  titleSection: {
    marginBottom: 20,
  },
  mainTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0F2C59',
    marginBottom: 4,
  },
  subTitle: {
    fontSize: 13,
    color: '#64748B',
    lineHeight: 18,
  },
  passengerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  passengerIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  passengerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0F2C59',
  },
  primaryBadge: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  primaryBadgeText: {
    color: '#15803D',
    fontSize: 11,
    fontWeight: 'bold',
  },
  inputGroup: {
    marginBottom: 14,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: '#1E293B',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  switchLabel: {
    fontSize: 13,
    color: '#334155',
    fontWeight: '500',
  },
  addPassengerBtn: {
    borderWidth: 1.5,
    borderColor: '#0F2C59',
    borderStyle: 'dashed',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginBottom: 24,
  },
  addPassengerText: {
    color: '#0F2C59',
    fontSize: 14,
    fontWeight: 'bold',
  },
  continueBtn: {
    backgroundColor: '#0F2C59',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#0F2C59',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 12,
  },
  continueBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  termsText: {
    textAlign: 'center',
    fontSize: 11,
    color: '#94A3B8',
  },
});