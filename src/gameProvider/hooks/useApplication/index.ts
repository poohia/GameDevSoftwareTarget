import { useEffect, useState } from "react";
import useScreenOrientation from "@awesome-cordova-library/screen-orientation/lib/react";

import useStatusbar from "@awesome-cordova-library/statusbar/lib/react";

import { GameProviderHooksDefaultInterface } from "..";

export interface useApplicationInterface
  extends GameProviderHooksDefaultInterface {}

const useApplication = (): useApplicationInterface => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const { lock } = useScreenOrientation();
  const { overlaysWebView, hide } = useStatusbar();

  useEffect(() => {
    lock("landscape");
    overlaysWebView(false);
    hide();
    setLoaded(true);
  }, [hide, lock, overlaysWebView]);

  return {
    loaded,
  };
};

export default useApplication;
