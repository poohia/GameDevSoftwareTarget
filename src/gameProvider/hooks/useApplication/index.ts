import { useCallback, useEffect, useMemo, useState } from "react";
import useDevice from "@awesome-cordova-library/device/lib/react";
import useScreenOrientation from "@awesome-cordova-library/screen-orientation/lib/react";

import { GameProviderHooksDefaultInterface } from "..";
import { ConfigApplication, Platform } from "../../../types";
import config from "../../../config.json";

export interface useApplicationInterface
  extends GameProviderHooksDefaultInterface,
    ReturnType<typeof useApplication> {}

const useApplication = (splashscreenLoaded: boolean) => {
  const { getPlatform } = useDevice();
  const { currentOrientation } = useScreenOrientation();
  const [loaded, setLoaded] = useState<boolean>(false);
  const [platform, setPlatform] = useState<Platform | null>(null);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const [screenorientation, setScreenOrientation] = useState(
    currentOrientation()
  );
  const [backgroundColor, setBackgroundColor] = useState<string>(
    "radial-gradient(circle,rgba(77,79,82,1) 0%,rgba(68,70,74,1) 35%)"
  );
  const [primaryFont, setPrimaryFont] = useState<string>("auto");
  const isMobileDevice = useMemo(
    () =>
      platform === "android" ||
      platform === "ios" ||
      platform === "browserandroid" ||
      platform === "browserios",
    [platform]
  );
  const appConfig = useMemo(
    (): ConfigApplication => config as ConfigApplication,
    []
  );

  const detectBrowserPlatform = useCallback((): Platform => {
    const { userAgent } = navigator;
    if (/Android/i.test(userAgent)) {
      return "browserandroid";
    }
    if (/iPhone|iPad|iPod/i.test(userAgent)) {
      return "browserios";
    }
    return "browser";
  }, []);

  const detectPlatform = useCallback(() => {
    const p = getPlatform();
    switch (p) {
      case "Android":
        setPlatform("android");
        break;
      case "iOS":
        setPlatform("ios");
        break;
      case "browser":
        setPlatform(detectBrowserPlatform());
        break;
      case "Mac OS X":
      case "WinCE":
      default:
        setPlatform("electron");
    }
  }, [getPlatform, detectBrowserPlatform]);

  const updateInnerSize = useCallback(() => {
    const { innerWidth: ww, innerHeight: wh } = window;
    setInnerWidth(ww);
    setInnerHeight(wh);

    console.log(ww, wh);
  }, []);

  useEffect(() => {
    detectPlatform();
    setLoaded(true);
  }, [detectPlatform]);

  useEffect(() => {
    window.addEventListener("resize", () => {
      detectPlatform();
      setTimeout(() => setScreenOrientation(currentOrientation()), 500);
    });
  }, [detectPlatform, currentOrientation]);

  useEffect(() => {
    if (
      splashscreenLoaded &&
      platform &&
      (platform.includes("browser") || platform === "electron")
    ) {
      window.addEventListener("resize", updateInnerSize);
      return () => {
        window.removeEventListener("resize", updateInnerSize);
      };
    }
  }, [platform, splashscreenLoaded, updateInnerSize]);

  return {
    platform,
    screenorientation,
    backgroundColor,
    primaryFont,
    loaded,
    isMobileDevice,
    innerWidth,
    innerHeight,
    appConfig,
    setBackgroundColor,
    setPrimaryFont,
  };
};

export default useApplication;
