import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
  Animated,
} from 'react-native';

export default function OnboardingScreen({ navigation }) {
  const [currentStep, setCurrentStep] = useState(0);
  const animValues = useRef(
    [0, 1, 2].map((_, i) => new Animated.Value(i === 0 ? 28 : 8))
  ).current;
  const animateDots = (toStep) => {
    animValues.forEach((anim, i) => {
      Animated.timing(anim, {
        toValue: i === toStep ? 28 : 8,
        duration: 250,
        useNativeDriver: false,
      }).start();
    });
  };
  const slamNext = () => {
    if (currentStep < slid.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      animateDots(nextStep);
    } else {
      navigation.replace("Login", { initialTab: 'signup' }); // 👈 Переходим сразу на регистрацию
    }
  };
  const slid = [
    {
      title: "Оңай іздеу",
      subtitle: "Интеллектуальды бағыт жоспарлаушымыздың көмегімен ең жақсы бағыттар мен бағаларды секундтарда табыңыз.",
      imd: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs-DdhaaGYk3676IU_OsExLH7fqN-lsOMipwD4ylA3xA&s=10",
    },
    {
      title: "Ыңғайлы кесте",
      subtitle: "Поезердің қозғалыс кестесін нақты уақыт режимінде қадағалап, өзіңізге ыңғайлы уақытты таңдаңыз.",
      imd: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd84zcpfTxMYn_SlsIgrx12maccAwXGgbOOzVj12UbVw&s=10",
    },
    {
      title: "Қауіпсіз төлем",
      subtitle: "Билеттерді сенімді әрі қауіпсіз төлем жүйелері арқылы комиссиясыз сатып алыңыз.",
      imd: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJgey8LIMlO270We3_YjvyeUkh3NrKxrdGE4nu4L4ADA&s=10",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F4F6F9" />
      
      {/* Шапка */}
      <View style={styles.header}>
        <Text style={styles.brandTitle}>Railway Connect</Text>
        <TouchableOpacity onPress={() => navigation.replace('Login', { initialTab: 'signup' })}>
          <Text style={styles.skipText}>Өткізу</Text>
        </TouchableOpacity>
      </View>

      {/* Центральная часть с иллюстрацией */}
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: slid[currentStep].imd}}
            style={styles.trainImage}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.title}>{slid[currentStep].title}</Text>
        <Text style={styles.subtitle}>{slid[currentStep].subtitle}</Text>

        {/* Индикатор слайдов */}
        <View style={styles.pagination}>
          {slid.map((_, index) => {
            return (
              <Animated.View
                key={index}
                style={[
                  styles.dot, 
                  {
                    width: animValues[index],
                    backgroundColor: currentStep === index ? '#003d9b' : '#c3c6d6',
                  },
                ]}
              /> 
            );
          })}
        </View>
      </View>

      {/* Нижняя часть */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.nextButton} 
          onPress={slamNext}
        >
          <Text style={styles.nextButtonText}>
            {currentStep === slid.length - 1 ? "Бастау" : "Келесі"}
          </Text>
        </TouchableOpacity>

        <View style={styles.loginRow}>
          <Text style={styles.accountText}>Аккаунтыңыз бар ма? </Text>
          <TouchableOpacity onPress={() => navigation.replace('Login', { initialTab: 'login' })}>
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
    fontSize: 30,
    fontWeight: '700',
    color: '#003d9b',
    marginLeft: 20,
  },
  skipText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#434654',
    marginRight: 30,
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
    overflow: "hidden",
  },
  trainImage: {
    width: "85%",
    height: "85%",
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#003d9b',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#434654',
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 10,
    marginBottom: 20,
    height: 60,
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  footer: {
    marginBottom: 10,
  },
  nextButton: {
    backgroundColor: '#013d9b',
    borderRadius: 14,
    paddingVertical: 20,
    alignItems: 'center',
    marginBottom: 17,
    shadowColor: '#0F2C59',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
    width: "80%",
    alignSelf: "center",
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
    color: '#434654',
  },
  loginLink: {
    fontSize: 13,
    fontWeight: '700',
    color: '#013d9b',
  },
});