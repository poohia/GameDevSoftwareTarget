import { Route } from "../../../types";

type State = {
  route: Route;
  params?: {
    sceneId: number;
  };
};
type Action = {
  type: "push" | "nextScene";
  value: {
    route: Route;
    params?: {
      sceneId: number;
    };
  };
};

export const defaultState: State = {
  route: "home",
};

const RouterReducer = (state: State, action: Action): State => {
  const { type, value } = action;
  switch (type) {
    case "push":
      // console.log(value.route);
      // const path = value.route === "home" ? "/" : `/${value.route}`;
      // window.history.pushState(null, value.route, path);
      return { ...value };
    default:
      return state;
  }
};

export default RouterReducer;
