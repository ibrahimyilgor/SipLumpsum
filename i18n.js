import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization"; // if using Expo
import { I18nManager } from "react-native";

// Import your translation files
import en from "./translation/en.json";
import tr from "./translation/tr.json";

// Detect the user's language
const languageDetector = {
  type: "languageDetector",
  async: true,
  detect: (callback) => {
    const locale = Localization.locale || "en";
    callback(locale);
  },
  init: () => {},
  cacheUserLanguage: () => {},
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: "v3",
    fallbackLng: "en",
    resources: {
      en: {
        translation: en,
      },
      tr: {
        translation: tr,
      },
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
