import { useState, useCallback, useEffect } from "react";
import i18n from "i18n-js";
import useGlobalization from "@awesome-cordova-library/globalization/lib/react";

import modules from "../../../GameDevSoftware/modules/index.json";
import languages from "../../../GameDevSoftware/languages.json";
import { GameProviderHooksDefaultInterface } from "..";
import { parallel } from "async";
import { useParameters } from "../../../hooks";

export interface useTranslationsInterface
  extends GameProviderHooksDefaultInterface {
  i18n: any;
  locale: string;
  switchLanguage: (language: string) => void;
}

const useTranslations = (): useTranslationsInterface => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [locale, setLocale] = useState<string>("en");
  const { getPreferredLanguage } = useGlobalization();
  const { parameters } = useParameters();

  const switchLanguage = useCallback((language: string) => {
    i18n.defaultLocale = language;
    i18n.locale = language;
    setLocale(language);
  }, []);

  useEffect(() => {
    if (typeof parameters === "undefined") return;
    parallel(
      [
        (callback) => {
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
          callback();
        },
        (callback) => {
          if (parameters) {
            i18n.locale = parameters.language;
          } else {
            getPreferredLanguage().then(({ value }) => {
              const languageFind =
                languages.find((language) => value.includes(language.code)) ||
                languages[0];

              i18n.locale = languageFind.code;
              setLocale(languageFind.code);

              callback();
            });
          }
        },
      ],
      () => {
        setLoaded(true);
      }
    );
    i18n.locale = "en";
  }, [parameters, getPreferredLanguage]);

  return { i18n, locale, loaded, switchLanguage };
};

export default useTranslations;
