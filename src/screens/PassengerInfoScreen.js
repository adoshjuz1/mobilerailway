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
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import AppTabBar from '../components/AppTabBar';
import { colors } from '../theme';

const STEPS = ['Сапар', 'Жолаушылар', 'Төлем'];
const CURRENT_STEP = 2;

export default function PassengerInfoScreen({ route, navigation }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [saveDetails, setSaveDetails] = useState(true);

  const goToPayment = () => {
    // ...route.params передаёт дальше всё, что пришло с предыдущих экранов
    navigation.navigate('BookingSummary', {
      ...route.params,
      passenger: { fullName, email, idNumber },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Header
            onBack={() => navigation.goBack()}
            onAvatarPress={() => navigation.navigate('Main', { screen: 'ProfileTab' })}
          />

          {/* Индикатор шагов */}
          <View style={styles.stepper}>
            {STEPS.map((label, index) => {
              const stepNumber = index + 1;
              const reached = stepNumber <= CURRENT_STEP;

              return (
                <React.Fragment key={label}>
                  {index > 0 && (
                    <View style={[styles.stepLine, stepNumber <= CURRENT_STEP && styles.stepLineActive]} />
                  )}
                  <View style={styles.stepItem}>
                    <View style={[styles.stepCircle, reached && styles.stepCircleReached]}>
                      <Text style={[styles.stepNumber, reached && styles.stepNumberReached]}>
                        {stepNumber}
                      </Text>
                    </View>
                    <Text style={[styles.stepLabel, reached && styles.stepLabelReached]}>{label}</Text>
                  </View>
                </React.Fragment>
              );
            })}
          </View>

          <Text style={styles.mainTitle}>Жолаушы мәліметтері</Text>
          <Text style={styles.subTitle}>
            Деректерді мемлекеттік жеке куәлігіңізде көрсетілгендей дәл енгізіңіз.
          </Text>

          {/* Карточка жолаушы */}
          <View style={styles.passengerCard}>
            <View style={styles.cardHeader}>
              <View style={styles.cardTitleRow}>
                <Ionicons name="person-outline" size={20} color={colors.primary} />
                <Text style={styles.passengerTitle}>1-ші жолаушы</Text>
              </View>
              <View style={styles.primaryBadge}>
                <Text style={styles.primaryBadgeText}>Негізгі</Text>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Толық аты-жөні</Text>
              <TextInput
                style={styles.input}
                placeholder="Мысалы: Ахметов Асқар"
                placeholderTextColor="#8A8FA0"
                value={fullName}
                onChangeText={setFullName}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Электронды пошта</Text>
              <TextInput
                style={styles.input}
                placeholder="example@mail.kz"
                placeholderTextColor="#8A8FA0"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>ЖСН / Төлқұжат нөмірі</Text>
              <TextInput
                style={styles.input}
                placeholder="AB1234567"
                placeholderTextColor="#8A8FA0"
                autoCapitalize="characters"
                value={idNumber}
                onChangeText={setIdNumber}
              />
            </View>

            <View style={styles.switchRow}>
              <Switch
                value={saveDetails}
                onValueChange={setSaveDetails}
                trackColor={{ false: '#CBD5E1', true: colors.primary }}
                thumbColor="#FFFFFF"
              />
              <Text style={styles.switchLabel}>Болашақ сапарлар үшін сақтау</Text>
            </View>
          </View>

          {/* Добавить пассажира */}
          <TouchableOpacity style={styles.addPassengerBtn}>
            <Ionicons name="person-add-outline" size={20} color={colors.primary} />
            <Text style={styles.addPassengerText}>Жолаушы қосу</Text>
          </TouchableOpacity>

          {/* К оплате */}
          <TouchableOpacity style={styles.continueBtn} onPress={goToPayment}>
            <Text style={styles.continueBtnText}>Төлемге өту</Text>
            <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
          </TouchableOpacity>

          <Text style={styles.termsText}>
            Жалғастыру арқылы сіз біздің{' '}
            <Text style={styles.termsLink}>Қызмет көрсету шарттарымен</Text> келісесіз.
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Таб-бар как в макете: подсвечена вкладка «Сапарлар» */}
      <AppTabBar
        activeTab="MyTripsTab"
        onTabPress={(tab) => navigation.navigate('Main', { screen: tab })}
      />
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
  stepper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  stepItem: {
    alignItems: 'center',
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#DCE5FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  stepCircleReached: {
    backgroundColor: colors.primary,
  },
  stepNumber: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.onSurfaceVariant,
  },
  stepNumberReached: {
    color: '#FFFFFF',
  },
  stepLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.onSurfaceVariant,
  },
  stepLabelReached: {
    color: colors.primary,
    fontWeight: '600',
  },
  stepLine: {
    flex: 1,
    height: 2,
    marginTop: 15,
    marginHorizontal: 8,
    backgroundColor: '#C3C6D6',
  },
  stepLineActive: {
    backgroundColor: colors.primary,
  },
  mainTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: colors.onSurface,
    marginBottom: 6,
  },
  subTitle: {
    fontSize: 15,
    color: colors.onSurfaceVariant,
    lineHeight: 22,
    marginBottom: 20,
  },
  passengerCard: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  passengerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.primary,
  },
  primaryBadge: {
    backgroundColor: colors.mint,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  primaryBadgeText: {
    color: '#005236',
    fontSize: 12,
    fontWeight: '600',
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.onSurface,
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.outline,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: colors.onSurface,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  switchLabel: {
    fontSize: 15,
    color: colors.onSurface,
  },
  addPassengerBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1.5,
    borderColor: colors.primary,
    borderStyle: 'dashed',
    borderRadius: 16,
    paddingVertical: 14,
    marginBottom: 28,
  },
  addPassengerText: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: '700',
  },
  continueBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingVertical: 16,
    marginBottom: 14,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  continueBtnText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
  termsText: {
    textAlign: 'center',
    fontSize: 13,
    color: colors.onSurfaceVariant,
  },
  termsLink: {
    textDecorationLine: 'underline',
  },
});