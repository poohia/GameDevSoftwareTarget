import { useTranslationsInterface } from "./useTranslations";
import { useRouterInterface } from "./useRouter";

export interface GameProviderHooksDefaultInterface {
  loaded: boolean;
}
export interface GameProviderHooksInterface
  extends useTranslationsInterface,
    useRouterInterface {}
export { default as useTranslations } from "./useTranslations";
export { default as useRouter } from "./useRouter";
