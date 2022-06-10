import { useCallback, useEffect, useMemo, useReducer } from "react";
import { GameProviderHooksDefaultInterface } from "..";
import { Route } from "../../../types";
import RouterReducer, { defaultState } from "./RouterReducer";

export interface useRouterInterface extends GameProviderHooksDefaultInterface {
  route: Route;
  params?: { sceneId: number };
  push: (route: Route, params?: any) => void;
  pushNextScene: (sceneId: number) => void;
}

const useRouter = (): useRouterInterface => {
  const loaded = useMemo(() => true, []);
  const [state, dispatch] = useReducer(RouterReducer, defaultState);
  const { route, params } = state;

  const push = useCallback((route: Route) => {
    dispatch({
      type: "push",
      value: { route },
    });
  }, []);

  const pushNextScene = useCallback((sceneId: number) => {
    dispatch({
      type: "push",
      value: { route: "scene", params: { sceneId } },
    });
  }, []);

  return {
    loaded,
    route,
    params,
    push,
    pushNextScene,
  };
};

export default useRouter;
