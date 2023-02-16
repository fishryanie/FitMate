/** @format */

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en';
import vi from './locales/vi';
import lo from './locales/lo';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    vi: {
      translation: vi,
    },
    lo: {
      translation: lo,
    },
  },
  fallbackLng: 'en',
});

export default i18n;
