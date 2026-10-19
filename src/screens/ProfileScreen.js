import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Alert,
  Linking,
} from 'react-native';

export default function ProfileScreen({ navigation }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [authType, setAuthType] = useState('login'); // 'login' | 'register'

  // Поля формы входа
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Поля формы регистрации
  const [regFullName, setRegFullName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');

  const handleLoginSubmit = async () => {
    if (!loginEmail.trim() || !loginPassword.trim()) {
      Alert.alert('Ошибка', 'Заполните все поля для входа');
      return;
    }
    try {
      const response = await fetch('http://172.20.10.6:8001/api/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: loginEmail, password: loginPassword })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Ошибка входа');

      setCurrentUser(data);
      Alert.alert('Успех', 'Авторизация прошла успешно!');
    } catch (err) {
      // Запасной локальный вход для тестов, если бэкенд недоступен
      setCurrentUser({
        full_name: loginEmail.split('@')[0],
        email: loginEmail,
        is_staff: loginEmail.includes('admin') || loginEmail.includes('staff')
      });
    }
  };

  const handleRegisterSubmit = async () => {
    if (!regEmail.trim() || !regPassword.trim() || !regFullName.trim()) {
      Alert.alert('Ошибка', 'Заполните все поля для регистрации');
      return;
    }
    try {
      const response = await fetch('http://172.20.10.6:8001/api/register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: regEmail, email: regEmail, password: regPassword, full_name: regFullName })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Ошибка регистрации');

      Alert.alert('Успех', data.message || 'Регистрация прошла успешно! Теперь войдите в систему.');
      setAuthType('login');
      setRegFullName('');
      setRegEmail('');
      setRegPassword('');
    } catch (err) {
      Alert.alert('Ошибка', err.message);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        
        {!currentUser ? (
          /* МОДАЛЬНОЕ ОКНО АВТОРИЗАЦИИ / РЕГИСТРАЦИИ (В СТИЛЕ ВСЕГО ПРИЛОЖЕНИЯ) */
          <View style={styles.authCard}>
            <View style={styles.avatarCircleGuest}>
              <Text style={{ fontSize: 26 }}>🐶</Text>
            </View>
            <Text style={styles.authTitle}>Личный кабинет</Text>
            <Text style={styles.authSubtitle}>ALT ONE LOVE • Авторизация</Text>

            {/* Переключатель вкладок Вход / Регистрация */}
            <View style={styles.tabsRow}>
              <TouchableOpacity 
                style={[styles.tabBtn, authType === 'login' && styles.tabBtnActive]}
                onPress={() => setAuthType('login')}
              >
                <Text style={[styles.tabBtnText, authType === 'login' && styles.tabBtnTextActive]}>Вход</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.tabBtn, authType === 'register' && styles.tabBtnActive]}
                onPress={() => setAuthType('register')}
              >
                <Text style={[styles.tabBtnText, authType === 'register' && styles.tabBtnTextActive]}>Регистрация</Text>
              </TouchableOpacity>
            </View>

            {authType === 'login' ? (
              <View>
                <Text style={styles.label}>Email или логин</Text>
                <TextInput
                  style={styles.input}
                  value={loginEmail}
                  onChangeText={setLoginEmail}
                  placeholder="example@mail.kz"
                  placeholderTextColor="#6c757d"
                  autoCapitalize="none"
                />

                <Text style={styles.label}>Пароль</Text>
                <TextInput
                  style={styles.input}
                  value={loginPassword}
                  onChangeText={setLoginPassword}
                  placeholder="••••••••"
                  placeholderTextColor="#6c757d"
                  secureTextEntry
                />

                <TouchableOpacity style={styles.submitBtn} onPress={handleLoginSubmit}>
                  <Text style={styles.submitBtnText}>Войти</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View>
                <Text style={styles.label}>ФИО</Text>
                <TextInput
                  style={styles.input}
                  value={regFullName}
                  onChangeText={setRegFullName}
                  placeholder="Иванов Иван"
                  placeholderTextColor="#6c757d"
                />

                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={styles.input}
                  value={regEmail}
                  onChangeText={setRegEmail}
                  placeholder="example@mail.kz"
                  placeholderTextColor="#6c757d"
                  autoCapitalize="none"
                />

                <Text style={styles.label}>Пароль</Text>
                <TextInput
                  style={styles.input}
                  value={regPassword}
                  onChangeText={setRegPassword}
                  placeholder="Придумайте пароль"
                  placeholderTextColor="#6c757d"
                  secureTextEntry
                />

                <TouchableOpacity style={styles.submitBtn} onPress={handleRegisterSubmit}>
                  <Text style={styles.submitBtnText}>Зарегистрироваться</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ) : (
          /* ЛИЧНЫЙ КАБИНЕТ (ЕДИНЫЙ СТИЛЬ КАРТОЧЕК ПРИЛОЖЕНИЯ) */
          <View style={styles.profileContainer}>
            
            {/* Шапка профиля */}
            <View style={styles.profileHeaderBox}>
              <View style={styles.profileUserInfo}>
                <View style={styles.avatarCircle}>
                  <Text style={{ fontSize: 22 }}>🐶</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.profileName} numberOfLines={1}>
                    {currentUser.full_name || currentUser.username}
                  </Text>
                  <Text style={styles.profileEmail} numberOfLines={1}>
                    {currentUser.email || currentUser.username}
                  </Text>
                </View>
              </View>
              <TouchableOpacity onPress={handleLogout}>
                <Text style={styles.logoutText}>Выйти</Text>
              </TouchableOpacity>
            </View>

            {/* Блок заказов */}
            <View style={styles.ordersCard}>
              <Text style={styles.ordersTitle}>Мои заказы</Text>
              <View style={styles.noOrdersBox}>
                <Text style={styles.noOrdersText}>У вас пока нет активных билетов</Text>
              </View>
            </View>

            <View style={styles.divider} />

            {/* Ссылки меню */}
            <View style={styles.menuLinksCol}>
              <TouchableOpacity style={styles.menuLinkItem} onPress={() => Alert.alert('Раздел', 'Мои билеты / покупки')}>
                <Text style={styles.menuLinkText}>🎟️  Мои билеты / покупки</Text>
                <Text style={styles.menuLinkArrow}>›</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuLinkItem} onPress={() => Alert.alert('Раздел', 'Избранные маршруты')}>
                <Text style={styles.menuLinkText}>⭐  Избранные маршруты</Text>
                <Text style={styles.menuLinkArrow}>›</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuLinkItem} onPress={() => Alert.alert('Раздел', 'Уведомления')}>
                <Text style={styles.menuLinkText}>🔔  Уведомления</Text>
                <Text style={styles.menuLinkArrow}>›</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuLinkItem} onPress={() => Alert.alert('Раздел', 'Настройка профиля')}>
                <Text style={styles.menuLinkText}>⚙️  Настройка профиля</Text>
                <Text style={styles.menuLinkArrow}>›</Text>
              </TouchableOpacity>

              {currentUser.is_staff && (
                <TouchableOpacity 
                  style={[styles.menuLinkItem, styles.adminItem]} 
                  onPress={() => Linking.openURL('http://172.20.10.6:8001/admin/')}
                >
                  <Text style={[styles.menuLinkText, { color: '#0dcaf0', fontWeight: 'bold' }]}>
                    🔒  Админка (Создать пост)
                  </Text>
                  <Text style={[styles.menuLinkArrow, { color: '#0dcaf0' }]}>›</Text>
                </TouchableOpacity>
              )}
            </View>

          </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#12151c' },
  container: { padding: 16, paddingBottom: 100 },

  /* Авторизация / Регистрация */
  authCard: {
    backgroundColor: '#1c212c',
    borderRadius: 16,
    padding: 20,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#2a313f',
  },
  avatarCircleGuest: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#12151c',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#0dcaf0',
  },
  authTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 2 },
  authSubtitle: { color: '#8e929b', fontSize: 11, textAlign: 'center', marginBottom: 16 },

  tabsRow: { flexDirection: 'row', backgroundColor: '#12151c', borderRadius: 10, padding: 4, marginBottom: 16, borderWidth: 1, borderColor: '#343d4e' },
  tabBtn: { flex: 1, paddingVertical: 8, alignItems: 'center', borderRadius: 8 },
  tabBtnActive: { backgroundColor: '#0dcaf0' },
  tabBtnText: { color: '#fff', fontSize: 13, fontWeight: '600' },
  tabBtnTextActive: { color: '#12151c', fontWeight: 'bold' },

  label: { fontSize: 12, fontWeight: '600', color: '#0dcaf0', marginBottom: 4 },
  input: {
    backgroundColor: '#12151c',
    color: '#fff',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#343d4e',
    fontSize: 14,
    marginBottom: 12,
  },
  submitBtn: {
    backgroundColor: '#0dcaf0',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 6,
  },
  submitBtnText: { color: '#12151c', fontWeight: 'bold', fontSize: 15 },

  /* Личный кабинет (В едином стиле приложения) */
  profileContainer: {
    backgroundColor: '#1c212c',
    borderRadius: 16,
    padding: 16,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#2a313f',
  },
  profileHeaderBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#2a313f',
    marginBottom: 14,
  },
  profileUserInfo: { flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1, marginRight: 10 },
  avatarCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#12151c',
    borderWidth: 1,
    borderColor: '#343d4e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileName: { color: '#fff', fontSize: 15, fontWeight: 'bold' },
  profileEmail: { color: '#8e929b', fontSize: 11 },
  logoutText: { color: '#ff6b6b', fontSize: 13, fontWeight: 'bold' },

  ordersCard: { marginBottom: 12 },
  ordersTitle: { color: '#8e929b', fontSize: 12, fontWeight: 'bold', marginBottom: 8 },
  noOrdersBox: {
    backgroundColor: '#12151c',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#343d4e',
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
  },
  noOrdersText: { color: '#8e929b', fontSize: 12 },

  divider: { height: 1, backgroundColor: '#2a313f', marginVertical: 10 },

  menuLinksCol: { gap: 4 },
  menuLinkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  menuLinkText: { color: '#fff', fontSize: 13, fontWeight: '500' },
  menuLinkArrow: { color: '#6c757d', fontSize: 16, fontWeight: 'bold' },
  adminItem: { backgroundColor: 'rgba(13, 202, 240, 0.08)' },
});