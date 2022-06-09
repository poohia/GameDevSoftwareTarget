import useLocalStorage from "@awesome-cordova-library/localstorage/lib/react";
import { useEffect, useState } from "react";
import { Parameters } from "../../types";

const useParameters = () => {
  const [parameters, setParameters] = useState<Parameters | undefined | null>();
  const { getItem } = useLocalStorage();

  useEffect(() => {
    const _parameters = getItem<Parameters>("parameters");
    if (!_parameters) {
      setParameters(null);
    } else {
      setParameters(_parameters);
    }
  }, [getItem]);

  return {
    parameters,
  };
};

export default useParameters;
