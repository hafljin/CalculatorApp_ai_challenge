import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

const resources = {
  en: {
    translation: {
      calculator: 'Calculator',
      converter: 'Converter',
      history: 'History',
      error_divide_by_zero: 'Error: Cannot divide by zero',
      // ...他の文言もここに追加...
    },
  },
  ja: {
    translation: {
      calculator: '計算機',
      converter: '単位変換',
      history: '履歴',
      error_divide_by_zero: 'エラー：0で割ることはできません',
      // ...他の文言もここに追加...
    },
  },
  es: {
    translation: {
      calculator: 'Calculadora',
      converter: 'Convertidor',
      history: 'Historial',
      error_divide_by_zero: 'Error: No se puede dividir por cero',
      // ...他の文言もここに追加...
    },
  },
  zh: {
    translation: {
      calculator: '计算器',
      converter: '单位换算',
      history: '历史',
      error_divide_by_zero: '错误：不能除以零',
      // ...他の文言もここに追加...
    },
  },
};

if (!i18n.isInitialized) {
  const locales = Localization.getLocales();
  const lng = locales && locales.length > 0 && locales[0].languageCode ? locales[0].languageCode : 'en';
  i18n
    .use(initReactI18next)
    .init({
      resources,
      lng,
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false,
      },
    });
}

export default function RootLayout() {
  useFrameworkReady();

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="light" />
    </>
  );
}