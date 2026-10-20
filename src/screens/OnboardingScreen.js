import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';

export default function OnboardingScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F4F6F9" />
      
      {/* Шапка */}
      <View style={styles.header}>
        <Text style={styles.brandTitle}>Railway Connect</Text>
        <TouchableOpacity onPress={() => navigation.replace('Login')}>
          <Text style={styles.skipText}>Өткізу</Text>
        </TouchableOpacity>
      </View>

      {/* Центральная часть с иллюстрацией */}
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <View style={styles.trainPlaceholder}>
            <Text style={styles.trainEmoji}>🚄</Text>
            <Text style={styles.imagePlaceholderText}>Railway Connect Express</Text>
          </View>
        </View>

        <Text style={styles.title}>Оңай іздеу</Text>
        <Text style={styles.subtitle}>
          Интеллектуальды бағыт жоспарлаушымыздың көмегімен ең жақсы бағыттар мен бағаларды секундтарда табыңыз.
        </Text>

        {/* Индикатор слайдов */}
        <View style={styles.pagination}>
          <View style={[styles.dot, styles.activeDot]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>
      </View>

      {/* Нижняя часть */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.nextButton} 
          onPress={() => navigation.replace('Login')}
        >
          <Text style={styles.nextButtonText}>Келесі</Text>
        </TouchableOpacity>

        <View style={styles.loginRow}>
          <Text style={styles.accountText}>Аккаунтыңыз бар ма? </Text>
          <TouchableOpacity onPress={() => navigation.replace('Login')}>
            <Text style={styles.loginLink}>Кіру</Text>
          </TouchableOpacity>
        </View>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F9',
    justifyContent: 'space-between',
    padding: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  brandTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F2C59',
  },
  skipText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  imageContainer: {
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 6,
  },
  trainPlaceholder: {
    alignItems: 'center',
  },
  trainEmoji: {
    fontSize: 64,
    marginBottom: 8,
  },
  imagePlaceholderText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#0F2C59',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#CBD5E1',
    marginHorizontal: 4,
  },
  activeDot: {
    width: 24,
    backgroundColor: '#0F2C59',
  },
  footer: {
    marginBottom: 10,
  },
  nextButton: {
    backgroundColor: '#0F2C59',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#0F2C59',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  accountText: {
    fontSize: 13,
    color: '#64748B',
  },
  loginLink: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F2C59',
  },
});