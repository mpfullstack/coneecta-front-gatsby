import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import esTranslations from './es/translations.json';

// Translation outside a component
// import i18n from `./i18n`
// i18n.t(...);


const resources = {
  es: {
    translation: esTranslations
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'es',

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;