import { useTranslationsInterface } from "./useTranslations";

export interface GameProviderHooksDefaultInterface {
  loaded: boolean;
}
export interface GameProviderHooksInterface extends useTranslationsInterface {}
export { default as useTranslations } from "./useTranslations";
