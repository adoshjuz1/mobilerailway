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
} from 'react-native';
import { Ionicons } from "@expo/vector-icons";

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

  // Функция проверки полей перед входом/регистрацией
  const handleSubmit = () => {
    if (activeTab === 'signup') {
      if (!name.trim() || !email.trim() || !password.trim()) {
        Alert.alert('Қате', 'Барлық өрістерді толтырыңыз!');
        return;
      }
    } else {
      if (!email.trim() || !password.trim()) {
        Alert.alert('Қате', 'Электронды пошта мен құпия сөзді жазыңыз!');
        return;
      }
    }
    navigation.replace('Main');
  };

  // Функция отправки запроса на восстановление пароля
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
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* Заголовок бренда */}
          <Text style={styles.brandTitle}>Railway Connect</Text>

          {/* Карточка авторизации */}
          <View style={styles.card}>
            
            {/* Переключатель вкладок */}
            <View style={styles.tabContainer}>
              <TouchableOpacity 
                style={[styles.tabButton, activeTab === 'login' && styles.activeTab]}
                onPress={() => setActiveTab('login')}
              >
                <Text style={[styles.tabText, activeTab === 'login' && styles.activeTabText]}>Кіру</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.tabButton, activeTab === 'signup' && styles.activeTab]}
                onPress={() => setActiveTab('signup')}
              >
                <Text style={[styles.tabText, activeTab === 'signup' && styles.activeTabText]}>Тіркелу</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.welcomeText}>
              {activeTab === 'login' ? 'Қайта оралуыңызбен' : 'Тіркелу'}
            </Text>
            <Text style={styles.subWelcomeText}>
              {activeTab === 'login' 
                ? 'Сапарлар мен билеттерді басқару үшін кіріңіз.' 
                : 'Жаңа аккаунт ашып, барлық мүмкіндіктерді пайдаланыңыз.'}
            </Text>

            {/* Кнопки соцсетей Google / Apple */}
            <View style={styles.socialRow}>
              <TouchableOpacity style={styles.socialBtn}>
                <Ionicons name="logo-google" size={18} color="#EA4335" style={{ marginRight: 8 }} />
                <Text style={styles.socialText}>Google</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialBtn}>
                <Ionicons name="logo-apple" size={18} color="#000000" style={{ marginRight: 8 }} />
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
            {activeTab === 'signup' && (
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Аты-жөні</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons name="person-outline" size={18} color="#94A3B8" style={{ marginRight: 10 }} />
                  <TextInput
                    style={styles.input}
                    placeholder="Атыңызды енгізіңіз"
                    placeholderTextColor="#A0AEC0"
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
                <Ionicons name="mail-outline" size={18} color="#94A3B8" style={{ marginRight: 10 }} />
                <TextInput
                  style={styles.input}
                  placeholder="name@example.com"
                  placeholderTextColor="#A0AEC0"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                />
              </View>
            </View>

            {/* Заголовок пароля + "Забыли пароль?" на одной линии */}
            <View style={styles.passwordHeaderRow}>
              <Text style={styles.label}>Құпия сөз</Text>
              {activeTab === 'login' && (
                <TouchableOpacity 
                  onPress={() => setForgotModalVisible(true)}
                  activeOpacity={0.6}
                  hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                >
                  <Text style={styles.forgotText}>Құпия сөзді ұмытыңыз ба?</Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Поле ввода пароля */}
            <View style={styles.inputGroup}>
              <View style={styles.inputWrapper}>
                <Ionicons name="lock-closed-outline" size={18} color="#94A3B8" style={{ marginRight: 10 }} />
                <TextInput
                  style={styles.input}
                  placeholder="••••••••"
                  placeholderTextColor="#A0AEC0"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Ionicons 
                    name={showPassword ? "eye-outline" : "eye-off-outline"} 
                    size={18} 
                    color="#94A3B8" 
                    style={{ marginLeft: 10 }} 
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Кнопка входа / регистрации с проверкой */}
            <TouchableOpacity 
              style={styles.submitButton} 
              onPress={handleSubmit}
            >
              <Text style={styles.submitButtonText}>
                {activeTab === 'login' ? 'Кіру ➔' : 'Тіркелу ➔'}
              </Text>
            </TouchableOpacity>

            {/* Ссылка на создание аккаунта в самом низу карточки */}
            <View style={styles.footerRow}>
              <Text style={styles.noAccountText}>
                {activeTab === 'login' ? 'Аккаунтыңыз жоқ па? ' : 'Аккаунтыңыз бар ма? '}
              </Text>
            </View>

            <TouchableOpacity onPress={() => setActiveTab(activeTab === 'login' ? 'signup' : 'login')}>
              <Text style={styles.createAccountLink}>
                {activeTab === 'login' ? 'Тіркелу' : 'Кіру'}
              </Text>
            </TouchableOpacity>

          </View>

          {/* Преимущества снизу */}
          <View style={styles.featuresContainer}>
            <View style={styles.featureCard}>
              <View style={[styles.featureIconBox, { backgroundColor: '#E0F2FE' }]}>
                <Ionicons name="shield-checkmark" size={24} color="#0284c7" />
              </View>
              <Text style={styles.featureTitle}>Қауіпсіз қолжетімділік</Text>
              <Text style={styles.featureDesc}>Жеке деректеріңіз мен төлем әдістеріңіз қорғалған.</Text>
            </View>

            <View style={styles.featureCard}>
              <View style={[styles.featureIconBox, { backgroundColor: '#DCFCE7' }]}>
                <Ionicons name="ticket" size={24} color="#16a34a" />
              </View>
              <Text style={styles.featureTitle}>Смарт билеттер</Text>
              <Text style={styles.featureDesc}>Вокзалда офлайн режимде де QR-кодқа қол жеткізіңіз.</Text>
            </View>

            <View style={styles.featureCard}>
              <View style={[styles.featureIconBox, { backgroundColor: '#FEF3C7' }]}>
                <Ionicons name="notifications" size={24} color="#d97706" />
              </View>
              <Text style={styles.featureTitle}>Жедел хабарламалар</Text>
              <Text style={styles.featureDesc}>Платформа өзгерістері мен кешігулер туралы бірінші болып біліңіз.</Text>
            </View>
          </View>

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
                <Ionicons name="close" size={24} color="#434654" />
              </TouchableOpacity>
            </View>

            <Text style={styles.modalSubText}>
              Тіркелген электронды поштаңызды енгізіңіз, біз сізге құпия сөзді өзгерту сілтемесін жібереміз.
            </Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Электронды пошта</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="mail-outline" size={18} color="#94A3B8" style={{ marginRight: 10 }} />
                <TextInput
                  style={styles.input}
                  placeholder="name@example.com"
                  placeholderTextColor="#A0AEC0"
                  value={forgotEmail}
                  onChangeText={setForgotEmail}
                  autoCapitalize="none"
                />
              </View>
            </View>

            <TouchableOpacity 
              style={styles.submitButton} 
              onPress={handlePasswordReset}
            >
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
    backgroundColor: '#F4F6F9',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  brandTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#003d9b',
    textAlign: 'center',
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingVertical: 32,
    paddingHorizontal: 24,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#f1f3ff',
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 10,
  },
  activeTab: {
    backgroundColor: '#003d9b',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#434654',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#041b3c',
    marginBottom: 6,
  },
  subWelcomeText: {
    fontSize: 13,
    color: '#434654',
    marginBottom: 20,
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  socialBtn: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingVertical: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
    backgroundColor: '#FFFFFF',
  },
  socialText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#334155',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#E2E8F0',
  },
  orText: {
    paddingHorizontal: 8,
    fontSize: 13,
    fontWeight: '700',
    color: '#94A3B8',
  },
  inputGroup: {
    marginBottom: 16,
  },
  passwordHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#434654',
    marginBottom: 6, // 👈 Возвращен четкий отступ снизу от текста до поля
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 14,
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 14,
    color: '#1E293B',
  },
  forgotText: {
    fontSize: 12,
    color: '#003d9b',
    fontWeight: '600',
    marginBottom: 7,
  },
  submitButton: {
    backgroundColor: '#013d9b',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  noAccountText: {
    fontSize: 12,
    color: '#434654',
  },
  createAccountLink: {
    fontSize: 12,
    fontWeight: '700',
    color: '#003d9b',
    marginLeft: 130,
  },
  featuresContainer: {
    gap: 16,
  },
  featureCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  featureIconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  featureTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#0F2C59',
    marginBottom: 6,
    textAlign: 'left',
  },
  featureDesc: {
    fontSize: 12,
    color: '#64748B',
    lineHeight: 18,
    textAlign: 'left',
  },
  // Стили для модального окна
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 6,
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
    color: '#041b3c',
  },
  modalSubText: {
    fontSize: 13,
    color: '#64748B',
    lineHeight: 18,
    marginBottom: 20,
  },
});