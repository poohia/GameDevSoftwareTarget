const windowF: () => WindowCordovaType = (): WindowCordovaType => {
  return window as WindowCordovaType;
};

export type WindowCordovaType = {
  cordova: any;
} & Window &
  typeof globalThis;

export default windowF();
