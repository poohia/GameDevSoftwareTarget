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
