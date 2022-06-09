import { useState, useCallback, useEffect } from "react";
import i18n from "i18n-js";
import { parallel } from "async";

import modules from "../../../GameDevSoftware/modules/index.json";
import languages from "../../../GameDevSoftware/languages.json";
import en from "../../../translations/en.json";
import fr from "../../../translations/fr.json";
import { GameProviderHooksDefaultInterface } from "..";

export interface useTranslationsInterface
  extends GameProviderHooksDefaultInterface {
  i18n: any;
  locale: string;
  switchLanguage: (language: string) => void;
}

const useTranslations = (): useTranslationsInterface => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [locale, setLocale] = useState<string>("en");
  const switchLanguage = useCallback((language: string) => {
    i18n.defaultLocale = language;
    i18n.locale = language;
    setLocale(language);
  }, []);

  useEffect(() => {
    const translationsModule: any = {};
    modules.forEach((m) => {
      languages.forEach(({ code }) => {
        if (typeof translationsModule[code] === "undefined") {
          translationsModule[code] = {};
        }
        translationsModule[code] = {
          ...translationsModule[code],
          ...require(`../../../GameDevSoftware/modules/${m}/translations/${code}.json`),
        };
      });
    });
    languages.forEach(({ code }) => {
      translationsModule[code] = {
        ...translationsModule[code],
        ...require(`../../../translations/${code}.json`),
      };
    });
    i18n.translations = translationsModule;
    i18n.locale = "en";
    console.log(translationsModule);
    setLoaded(true);
  }, []);

  return { i18n, locale, loaded, switchLanguage };
};

export default useTranslations;
