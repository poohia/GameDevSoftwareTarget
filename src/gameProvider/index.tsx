import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import useNavigationBar from "@awesome-cordova-library/navigationbar/lib/react";
import { GlobalCSSComponent } from "../components";
import { useScreenOrientationConfig, useStatusBarConfig } from "../hooks";
import {
  useTranslations,
  GameProviderHooksInterface,
  useRouter,
  useEnv,
  useSave,
  useApplication,
  useConstants,
  useSound,
  useSplashscreen,
  useMessage,
  useFonts,
} from "./hooks";
import useParameters from "./hooks/useParameters";

interface GameContextInterface extends GameProviderHooksInterface {}

export function createCtx<ContextType>() {
  const ctx = createContext<ContextType | undefined>(undefined);
  function useCtx() {
    const c = useContext(ctx);
    if (!c) throw new Error("useCtx must be inside a Provider with a value");
    return c;
  }
  return [useCtx, ctx.Provider] as const;
}

const [useGameProvider, CtxProvider] = createCtx<GameContextInterface>();

type GameProviderProps = {
  children: ReactNode;
};

const GameProvider = ({ children }: GameProviderProps) => {
  const [loaded, setLoaded] = useState<boolean>(false);
  useScreenOrientationConfig();
  useStatusBarConfig();
  const { setUp } = useNavigationBar();
  const {
    loaded: loadedParameters,
    parameters,
    setLocale,
    ...useParametersRest
  } = useParameters();

  const { loaded: loadedTranslations, ...useTranslationsRest } =
    useTranslations(parameters, setLocale);

  const { loaded: loadedRouter, pushNextScene, ...useRouterRest } = useRouter();
  const { loaded: loadedEnv, env, getEnvVar, ...useEnvRest } = useEnv();
  const { loaded: loadedSave, ...useSaveRest } = useSave(pushNextScene);
  const { loaded: loadedConstants, ...useConstatsRest } = useConstants();
  const { loaded: loadedSound, ...useSoundRest } = useSound(
    parameters.activedSound
  );
  const {
    loaded: loadedSplashscreen,
    SplashScreenComponent,
    showSplashscreen,
  } = useSplashscreen(getEnvVar);
  const { loaded: loadedMessage } = useMessage(env);
  const { loaded: loadedFonts, FontStyle, ...useFontsRest } = useFonts();

  const {
    loaded: loadedApplication,
    backgroundColor,
    primaryFont,
    platform,
    ...useApplicationRest
  } = useApplication(loadedSplashscreen);

  useEffect(() => {
    if (
      loadedParameters &&
      loadedApplication &&
      loadedTranslations &&
      loadedRouter &&
      loadedEnv &&
      loadedSave &&
      loadedSound &&
      loadedSplashscreen &&
      loadedMessage &&
      loadedFonts
    ) {
      setLoaded(true);
    }
  }, [
    env,
    loadedParameters,
    loadedApplication,
    loadedTranslations,
    loadedRouter,
    loadedEnv,
    loadedSave,
    loadedSound,
    loadedSplashscreen,
    loadedMessage,
    loadedFonts,
  ]);

  // console.log(
  //   loadedParameters,
  //   loadedApplication,
  //   loadedTranslations,
  //   loadedRouter,
  //   loadedEnv,
  //   loadedSave,
  //   loadedSound
  // );

  useEffect(() => {
    setUp(true);
  }, [setUp]);

  console.log(primaryFont);

  return (
    <CtxProvider
      value={{
        ...useParametersRest,
        ...useTranslationsRest,
        ...useRouterRest,
        ...useEnvRest,
        ...useSaveRest,
        ...useApplicationRest,
        ...useConstatsRest,
        ...useSoundRest,
        ...useFontsRest,
        parameters,
        env,
        loaded,
        platform,
        backgroundColor,
        primaryFont,
        setLocale,
        pushNextScene,
        getEnvVar,
      }}
    >
      <>
        <FontStyle />
        <GlobalCSSComponent
          backgroundColor={backgroundColor}
          primaryFont={primaryFont}
          platform={platform}
        />
        {loaded ? (
          children
        ) : (
          <SplashScreenComponent
            onSplashscreenFinished={() => showSplashscreen(false)}
          />
        )}
      </>
    </CtxProvider>
  );
};

export { useGameProvider };
export default GameProvider;
