import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

import { useTranslations, GameProviderHooksInterface } from "./hooks";

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
  const { loaded: loadedTranslations, ...useTranslationsReturns } =
    useTranslations();

  useEffect(() => {
    if (loadedTranslations) {
      setLoaded(true);
    }
  }, [loadedTranslations]);

  if (!loaded) return <div>loading...</div>;

  return (
    <CtxProvider value={{ ...useTranslationsReturns, loaded }}>
      {children}
    </CtxProvider>
  );
};

export { useGameProvider };
export default GameProvider;
