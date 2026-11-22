import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Modal,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';

// Преимущества приложения под формой входа
const FEATURES = [
  {
    id: 'secure',
    icon: 'shield-checkmark',
    iconBg: '#0052CC',
    iconColor: '#FFFFFF',
    title: 'Қауіпсіз қолжетімділік',
    desc: 'Жеке деректеріңіз бен төлем әдістеріңіз қорғалған.',
  },
  {
    id: 'tickets',
    icon: 'ticket',
    iconBg: colors.mint,
    iconColor: '#006C49',
    title: 'Смарт билеттер',
    desc: 'Вокзалда офлайн режимде де QR-кодқа қол жеткізіңіз.',
  },
  {
    id: 'alerts',
    icon: 'notifications',
    iconBg: '#FFDCC8',
    iconColor: '#5C2A12',
    title: 'Жедел хабарламалар',
    desc: 'Платформа өзгерістері мен кешігулер туралы бірінші болып біліңіз.',
  },
];

export default function LoginScreen({ route, navigation }) {
  const initialTab = route?.params?.initialTab || 'login';
  const [activeTab, setActiveTab] = useState(initialTab);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Состояния для модального окна восстановления пароля
  const [forgotModalVisible, setForgotModalVisible] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');

  const isLogin = activeTab === 'login';

  // Проверка полей перед входом или регистрацией
  const handleSubmit = () => {
    if (!isLogin) {
      if (!name.trim() || !email.trim() || !password.trim()) {
        Alert.alert('Қате', 'Барлық өрістерді толтырыңыз!');
        return;
      }
    } else if (!email.trim() || !password.trim()) {
      Alert.alert('Қате', 'Электронды пошта мен құпия сөзді жазыңыз!');
      return;
    }
    navigation.replace('Main');
  };

  // Запрос на восстановление пароля
  const handlePasswordReset = () => {
    if (!forgotEmail.trim()) {
      Alert.alert('Қате', 'Электронды поштаңызды енгізіңіз!');
      return;
    }
    Alert.alert('Сәтті', 'Құпия сөзді қалпына келтіру сілтемесі поштаңызға жіберілді!');
    setForgotEmail('');
    setForgotModalVisible(false);
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
          <Text style={styles.brandTitle}>Railway Connect</Text>

          {/* Карточка авторизации */}
          <View style={styles.card}>
            {/* Переключатель вкладок */}
            <View style={styles.tabContainer}>
              <TouchableOpacity
                style={[styles.tabButton, isLogin && styles.activeTab]}
                onPress={() => setActiveTab('login')}
              >
                <Text style={[styles.tabText, isLogin && styles.activeTabText]}>Кіру</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.tabButton, !isLogin && styles.activeTab]}
                onPress={() => setActiveTab('signup')}
              >
                <Text style={[styles.tabText, !isLogin && styles.activeTabText]}>Тіркелу</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.welcomeText}>{isLogin ? 'Қайта оралуыңызбен' : 'Тіркелу'}</Text>
            <Text style={styles.subWelcomeText}>
              {isLogin
                ? 'Сапарлар мен билеттерді басқару үшін кіріңіз.'
                : 'Жаңа аккаунт ашып, барлық мүмкіндіктерді пайдаланыңыз.'}
            </Text>

            {/* Google / Apple */}
            <View style={styles.socialRow}>
              <TouchableOpacity style={styles.socialBtn}>
                <Ionicons name="logo-google" size={18} color="#EA4335" />
                <Text style={styles.socialText}>Google</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialBtn}>
                <Ionicons name="logo-apple" size={18} color="#000000" />
                <Text style={styles.socialText}>Apple</Text>
              </TouchableOpacity>
            </View>

            {/* Разделитель */}
            <View style={styles.dividerContainer}>
              <View style={styles.line} />
              <Text style={styles.orText}>НЕМЕСЕ ПОШТА АРҚЫЛЫ</Text>
              <View style={styles.line} />
            </View>

            {/* Имя (только для регистрации) */}
            {!isLogin && (
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Аты-жөні</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons name="person-outline" size={20} color={colors.onSurfaceVariant} />
                  <TextInput
                    style={styles.input}
                    placeholder="Атыңызды енгізіңіз"
                    placeholderTextColor="#8A8FA0"
                    value={name}
                    onChangeText={setName}
                  />
                </View>
              </View>
            )}

            {/* Почта */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Электронды пошта</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="mail-outline" size={20} color={colors.onSurfaceVariant} />
                <TextInput
                  style={styles.input}
                  placeholder="name@example.com"
                  placeholderTextColor="#8A8FA0"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </View>
            </View>

            {/* Заголовок пароля и «Құпия сөзді ұмытыңыз ба?» на одной линии */}
            <View style={styles.passwordHeaderRow}>
              <Text style={[styles.label, { marginBottom: 0 }]}>Құпия сөз</Text>
              {isLogin && (
                <TouchableOpacity
                  onPress={() => setForgotModalVisible(true)}
                  activeOpacity={0.6}
                  hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                >
                  <Text style={styles.forgotText}>Құпия сөзді ұмыттыңыз ба?</Text>
                </TouchableOpacity>
              )}
            </View>

            <View style={styles.inputGroup}>
              <View style={styles.inputWrapper}>
                <Ionicons name="lock-closed-outline" size={20} color={colors.onSurfaceVariant} />
                <TextInput
                  style={styles.input}
                  placeholder="••••••••"
                  placeholderTextColor="#8A8FA0"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Ionicons
                    name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                    size={20}
                    color={colors.onSurfaceVariant}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Кнопка входа или регистрации */}
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>{isLogin ? 'Кіру' : 'Тіркелу'}</Text>
              <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
            </TouchableOpacity>

            {/* Переключение между входом и регистрацией */}
            <View style={styles.footerBlock}>
              <Text style={styles.noAccountText}>
                {isLogin ? 'Аккаунтыңыз жоқ па?' : 'Аккаунтыңыз бар ма?'}
              </Text>
              <TouchableOpacity onPress={() => setActiveTab(isLogin ? 'signup' : 'login')}>
                <Text style={styles.createAccountLink}>{isLogin ? 'Тіркелу' : 'Кіру'}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Преимущества */}
          <View style={styles.featuresContainer}>
            {FEATURES.map((feature) => (
              <View key={feature.id} style={styles.featureCard}>
                <View style={[styles.featureIconBox, { backgroundColor: feature.iconBg }]}>
                  <Ionicons name={feature.icon} size={24} color={feature.iconColor} />
                </View>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDesc}>{feature.desc}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.copyright}>© 2026 Railway Connect. Барлық құқықтар қорғалған.</Text>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Модальное окно восстановления пароля */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={forgotModalVisible}
        onRequestClose={() => setForgotModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Құпия сөзді қалпына келтіру</Text>
              <TouchableOpacity onPress={() => setForgotModalVisible(false)}>
                <Ionicons name="close" size={24} color={colors.onSurfaceVariant} />
              </TouchableOpacity>
            </View>

            <Text style={styles.modalSubText}>
              Тіркелген электронды поштаңызды енгізіңіз, біз сізге құпия сөзді өзгерту сілтемесін
              жібереміз.
            </Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Электронды пошта</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="mail-outline" size={20} color={colors.onSurfaceVariant} />
                <TextInput
                  style={styles.input}
                  placeholder="name@example.com"
                  placeholderTextColor="#8A8FA0"
                  value={forgotEmail}
                  onChangeText={setForgotEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </View>
            </View>

            <TouchableOpacity style={styles.submitButton} onPress={handlePasswordReset}>
              <Text style={styles.submitButtonText}>Жіберу</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    paddingBottom: 40,
  },
  brandTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.primary,
    textAlign: 'center',
    marginBottom: 24,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingVertical: 24,
    paddingHorizontal: 20,
    marginBottom: 28,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#F1F3FF',
    borderRadius: 10,
    padding: 4,
    marginBottom: 24,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: colors.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.onSurfaceVariant,
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.onSurface,
    marginBottom: 6,
  },
  subWelcomeText: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.onSurfaceVariant,
    marginBottom: 24,
  },
  socialRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 8,
  },
  socialBtn: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: colors.outline,
    borderRadius: 12,
    paddingVertical: 14,
    backgroundColor: colors.card,
  },
  socialText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.onSurface,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#E2E8F0',
  },
  orText: {
    paddingHorizontal: 12,
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.5,
    color: colors.onSurfaceVariant,
  },
  inputGroup: {
    marginBottom: 16,
  },
  passwordHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.onSurfaceVariant,
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.outline,
    borderRadius: 12,
    paddingHorizontal: 14,
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 15,
    color: colors.onSurface,
  },
  forgotText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
  },
  submitButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    marginTop: 8,
    marginBottom: 20,
    elevation: 3,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
  footerBlock: {
    alignItems: 'center',
    gap: 2,
  },
  noAccountText: {
    fontSize: 15,
    color: colors.onSurfaceVariant,
  },
  createAccountLink: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.primary,
  },
  featuresContainer: {
    gap: 16,
    marginBottom: 28,
  },
  featureCard: {
    backgroundColor: '#F1F3FF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 16,
    padding: 20,
  },
  featureIconBox: {
    width: 44,
    height: 44,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  featureTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.onSurface,
    marginBottom: 6,
  },
  featureDesc: {
    fontSize: 13,
    lineHeight: 18,
    color: colors.onSurfaceVariant,
  },
  copyright: {
    textAlign: 'center',
    fontSize: 13,
    color: colors.onSurfaceVariant,
  },

  // Модальное окно
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.onSurface,
  },
  modalSubText: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.onSurfaceVariant,
    marginBottom: 20,
  },
});