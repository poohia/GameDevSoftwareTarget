import { createContext, useContext, ReactNode, useMemo } from "react";

import {
  useTranslations,
  GameProviderHooksInterface,
  useRouter,
  useEnv,
  useSave,
  useApplication,
} from "./hooks";

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
  const { loaded: loadedApplication } = useApplication();
  const { loaded: loadedTranslations, ...useTranslationsReturns } =
    useTranslations();
  const {
    loaded: loadedRouter,
    pushNextScene,
    ...useRouterReturns
  } = useRouter();
  const { loaded: loadedEnv, ...useEnvReturns } = useEnv();
  const { loaded: loadedSave, ...useSaveReturns } = useSave(pushNextScene);

  const loaded = useMemo(
    () =>
      loadedApplication &&
      loadedTranslations &&
      loadedRouter &&
      loadedEnv &&
      loadedSave,
    [loadedApplication, loadedTranslations, loadedRouter, loadedEnv, loadedSave]
  );

  if (!loaded) return <div>loading...</div>;

  return (
    <CtxProvider
      value={{
        ...useTranslationsReturns,
        ...useRouterReturns,
        ...useEnvReturns,
        ...useSaveReturns,
        pushNextScene,
        loaded,
      }}
    >
      {children}
    </CtxProvider>
  );
};

export { useGameProvider };
export default GameProvider;
