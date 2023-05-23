import { useTranslationsInterface } from "./useTranslations";
import { useRouterInterface } from "./useRouter";
import { useEnvInterface } from "./useEnv";
import { useSaveInterface } from "./useSave";
import { useApplicationInterface } from "./useApplication";
import { useParametersInterface } from "./useParameters";
import { useConstantsInterface } from "./useConstants";
import { useSoundInterface } from "./useSound";
import { useMessageInterface } from "./useMessages";
import { useFontsInterface } from "./useFonts";

export interface GameProviderHooksDefaultInterface {
  loaded: boolean;
}
export interface GameProviderHooksInterface
  extends useTranslationsInterface,
    useRouterInterface,
    useEnvInterface,
    useSaveInterface,
    useApplicationInterface,
    useParametersInterface,
    useConstantsInterface,
    useSoundInterface,
    useMessageInterface,
    Omit<useFontsInterface, "FontStyle"> {}
export { default as useTranslations } from "./useTranslations";
export { default as useRouter } from "./useRouter";
export { default as useEnv } from "./useEnv";
export { default as useSave } from "./useSave";
export { default as useApplication } from "./useApplication";
export { default as useConstants } from "./useConstants";
export { default as useSound } from "./useSound";
export { default as useSplashscreen } from "./useSplashscreen";
export { default as useMessage } from "./useMessages";
export { default as useFonts } from "./useFonts";
export { default as useSmartAppBanner } from "./useSmartAppBanner";
export { default as useScreenOrientation } from "./useScreenOrientation";
