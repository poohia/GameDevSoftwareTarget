import { useCallback, useReducer, useState } from "react";
import { GameProviderHooksDefaultInterface } from "..";
import { Route } from "../../../types";
import RouterReducer, { defaultState } from "./RouterReducer";

export interface useRouterInterface extends GameProviderHooksDefaultInterface {
  route: Route;
  params?: { sceneId: number };
  push: (route: Route, params?: any) => void;
  nextScene: (sceneId: number, params?: any) => void;
}

const useRouter = (): useRouterInterface => {
  const [loaded] = useState<boolean>(true);
  const [state, dispatch] = useReducer(RouterReducer, defaultState);
  const { route, params } = state;

  const push = useCallback((route: Route) => {
    dispatch({
      type: "push",
      value: { route },
    });
  }, []);

  const nextScene = useCallback((sceneId: number) => {
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
    nextScene,
  };
};

export default useRouter;
