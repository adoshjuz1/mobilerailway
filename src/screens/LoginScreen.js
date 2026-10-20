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
} from 'react-native';

export default function LoginScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

            <Text style={styles.welcomeText}>Қайта оралуыңызбен</Text>
            <Text style={styles.subWelcomeText}>Сапарлар мен билеттерді басқару үшін кіріңіз.</Text>

            {/* Кнопки соцсетей Google / Apple */}
            <View style={styles.socialRow}>
              <TouchableOpacity style={styles.socialBtn}>
                <Text style={styles.socialIcon}>🌐</Text>
                <Text style={styles.socialText}>Google</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialBtn}>
                <Text style={styles.socialIcon}>🍎</Text>
                <Text style={styles.socialText}>Apple</Text>
              </TouchableOpacity>
            </View>

            {/* Разделитель */}
            <View style={styles.dividerContainer}>
              <View style={styles.line} />
              <Text style={styles.orText}>НЕМЕСЕ ПОШТА АРҚЫЛЫ</Text>
              <View style={styles.line} />
            </View>

            {/* Почта */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Электронды пошта</Text>
              <View style={styles.inputWrapper}>
                <Text style={styles.inputPrefix}>✉️</Text>
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

            {/* Пароль */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Құпия сөз</Text>
              <View style={styles.inputWrapper}>
                <Text style={styles.inputPrefix}>🔒</Text>
                <TextInput
                  style={styles.input}
                  placeholder="••••••••"
                  placeholderTextColor="#A0AEC0"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                />
                <Text style={styles.inputSuffix}>👁️</Text>
              </View>
            </View>

            {/* Забыли пароль */}
            <TouchableOpacity style={styles.forgotContainer}>
              <Text style={styles.forgotText}>Құпия сөзді ұмытыңыз ба?</Text>
            </TouchableOpacity>

            {/* Кнопка входа */}
            <TouchableOpacity 
              style={styles.submitButton} 
              onPress={() => navigation.replace('Main')}
            >
              <Text style={styles.submitButtonText}>Кіру ➔</Text>
            </TouchableOpacity>

            {/* Ссылка на создание аккаунта */}
            <View style={styles.footerRow}>
              <Text style={styles.noAccountText}>Аккаунтыңыз жоқ па? </Text>
              <TouchableOpacity>
                <Text style={styles.createAccountLink}>Тіркелу</Text>
              </TouchableOpacity>
            </View>

          </View>

          {/* Преимущества снизу из макета */}
          <View style={styles.featuresContainer}>
            <View style={styles.featureCard}>
              <View style={[styles.featureIconBox, { backgroundColor: '#E0F2FE' }]}>
                <Text>🛡️</Text>
              </View>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.featureTitle}>Қауіпсіз қолжетімділік</Text>
                <Text style={styles.featureDesc}>Жеке деректеріңіз мен төлем әдістеріңіз қорғалған.</Text>
              </View>
            </View>

            <View style={styles.featureCard}>
              <View style={[styles.featureIconBox, { backgroundColor: '#DCFCE7' }]}>
                <Text>🎫</Text>
              </View>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.featureTitle}>Смарт билеттер</Text>
                <Text style={styles.featureDesc}>Вокзалда офлайн режимде де QR-кодқа қол жеткізіңіз.</Text>
              </View>
            </View>

            <View style={styles.featureCard}>
              <View style={[styles.featureIconBox, { backgroundColor: '#FEF3C7' }]}>
                <Text>🔔</Text>
              </View>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.featureTitle}>Жедел хабарламалар</Text>
                <Text style={styles.featureDesc}>Платформа өзгерістері мен кешігулер туралы бірінші болып біліңіз.</Text>
              </View>
            </View>
          </View>

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
  },
  brandTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0F2C59',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    padding: 4,
    marginBottom: 18,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  activeTab: {
    backgroundColor: '#0F2C59',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 4,
  },
  subWelcomeText: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 16,
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  socialBtn: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
    backgroundColor: '#FFFFFF',
  },
  socialIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  socialText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#334155',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 14,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#E2E8F0',
  },
  orText: {
    paddingHorizontal: 8,
    fontSize: 9,
    fontWeight: '700',
    color: '#94A3B8',
  },
  inputGroup: {
    marginBottom: 12,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
    marginBottom: 6,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  inputPrefix: {
    fontSize: 14,
    marginRight: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 14,
    color: '#1E293B',
  },
  inputSuffix: {
    fontSize: 14,
    marginLeft: 8,
  },
  forgotContainer: {
    alignItems: 'flex-end',
    marginBottom: 18,
  },
  forgotText: {
    fontSize: 12,
    color: '#0F2C59',
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: '#0F2C59',
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 16,
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
    color: '#64748B',
  },
  createAccountLink: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F2C59',
  },
  featuresContainer: {
    gap: 12,
  },
  featureCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  featureIconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 2,
  },
  featureDesc: {
    fontSize: 11,
    color: '#64748B',
    lineHeight: 15,
  },
});