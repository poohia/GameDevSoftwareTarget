import React from "react";

export type AssertAcceptedType = "image" | "sound" | "video" | "json";
export type ConstantValue = string | number | string[] | number[];
export type ConstantObject = {
  key: string;
  value: ConstantValue;
  description?: string;
};
export type Parameters = {
  language: string;
};
export type Route = "home" | "parameters" | "scene";
export type ObjectGameTypeJSON = {
  file: string;
  type: string;
};
export type SceneTypeJSON = ObjectGameTypeJSON;
export type ActionOfScene = {
  [key: string]: any;
  _title: string;
  _scene: string;
};
export type SceneObject = {
  [key: string]: any;
  _id: number;
  _type: string;
  _title: string;
  _actions: ActionOfScene[];
};
export type SceneComponentProps<T = {}> = React.FC<
  T & {
    data: SceneObject;
  }
>;
