import { useTranslationsInterface } from "./useTranslations";
import { useRouterInterface } from "./useRouter";
import { useEnvInterface } from "./useEnv";
import { useSaveInterface } from "./useSave";

export interface GameProviderHooksDefaultInterface {
  loaded: boolean;
}
export interface GameProviderHooksInterface
  extends useTranslationsInterface,
    useRouterInterface,
    useEnvInterface,
    useSaveInterface {}
export { default as useTranslations } from "./useTranslations";
export { default as useRouter } from "./useRouter";
export { default as useEnv } from "./useEnv";
export { default as useSave } from "./useSave";
