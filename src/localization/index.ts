import i18n from 'i18next';
import { ru } from './ru';
import { en } from './en';
import { initReactI18next } from 'react-i18next';
import { getLocales } from 'expo-localization';
import { storage } from '@/storage';

const resources = {
  en: {
    translation: {
      ...en,
    },
  },
  ru: {
    translation: {
      ...ru,
    },
  },
};

const initLocalization = async () => {
  const userLanguage: string | null = await storage.getItem('userLanguage');

  i18n.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    resources,
    lng: userLanguage || (getLocales()[0].languageCode as string),
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false,
    },
  });
};

initLocalization();

export default i18n;
