import { Route } from "../../../types";

type State = {
  route: Route;
  params?: {
    sceneId: number;
  };
};
type Action = {
  type: "push" | "nextScene";
  value: any;
};

export const defaultState: State = {
  route: "home",
};

const RouterReducer = (state: State, action: Action): State => {
  const { type, value } = action;
  switch (type) {
    case "push":
      return { ...value };
    default:
      return state;
  }
};

export default RouterReducer;
