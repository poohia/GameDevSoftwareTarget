import { useCallback, useMemo } from "react";
import globalConstants from "../../../GameDevSoftware/constants.json";
import { ConstantObject } from "../../../types";
import { GameProviderHooksDefaultInterface } from "..";

export interface useConstantsInterface
  extends GameProviderHooksDefaultInterface {
  constants: ConstantObject[];
  getValueFromConstant: <T = any>(key: string) => T;
}

const useConstants = (): useConstantsInterface => {
  const constants = useMemo(() => globalConstants, []);
  const getValueFromConstant = useCallback(<T = any>(key: string): T => {
    const constant = globalConstants.find(
      (constant) => constant.key === key
    )?.value;
    if (typeof constant === "undefined") {
      throw new Error(`Constant ${key} undefined`);
    }
    return JSON.parse(JSON.stringify(constant));
  }, []);

  return { constants, loaded: true, getValueFromConstant };
};

export default useConstants;