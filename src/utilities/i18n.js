// i18n.js
import i18n from 'i18next';
import languageDetector from 'i18next-react-native-language-detector';
import { initReactI18next } from 'react-i18next';

// Importing translation files
import en from '../locales/en/translation.json';
import fa from '../locales/fa/translation.json';

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    resources: {
      en: {
        translation: en,
      },
      fa: {
        translation: fa,
      },
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
