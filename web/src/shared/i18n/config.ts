"use client";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en/common.json";
import pt from "./locales/pt/common.json";

// inicializa uma única vez
if (!i18n.isInitialized) {
  i18n
    .use(initReactI18next)
    .init({
      resources: {
        en: { common: en },
        pt: { common: pt },
      },
      lng: "en",
      fallbackLng: "en",
      ns: ["common"],
      defaultNS: "common",
      interpolation: { escapeValue: false },
      // evita async microtask no JSDOM dos testes
      initImmediate: false,
    })
    .catch(() => {});
}

// expõe para components
export default i18n;
