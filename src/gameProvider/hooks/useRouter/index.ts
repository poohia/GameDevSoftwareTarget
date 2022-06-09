import { useCallback, useReducer, useState } from "react";
import { GameProviderHooksDefaultInterface } from "..";
import { Route } from "../../../types";
import RouterReducer, { defaultState } from "./RouterReducer";

export interface useRouterInterface extends GameProviderHooksDefaultInterface {
  route: Route;
  params: any;
  push: (route: Route, params?: any) => void;
  nextScene: (sceneId: string, params?: any) => void;
}

const useRouter = (): useRouterInterface => {
  const [loaded] = useState<boolean>(true);
  const [state, dispatch] = useReducer(RouterReducer, defaultState);
  const { route, params } = state;

  const push = useCallback((route: Route, params?: Object | null) => {
    dispatch({
      type: "push",
      value: { route, params: params || null },
    });
  }, []);

  const nextScene = useCallback((sceneId: string, params?: Object) => {
    dispatch({
      type: "push",
      value: { route: "scene", params: { sceneId, ...params } },
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
