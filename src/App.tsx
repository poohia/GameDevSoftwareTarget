import React, { useEffect, useState } from "react";
import objects from "./GameDevSoftware/gameObjects/index.json";
import { useAssets, useConstants, useModules } from "./hooks";

const gameObjects: any = [];

objects.forEach((object) => {
  gameObjects.push(require(`./GameDevSoftware/gameObjects/${object.file}`));
});

function App() {
  const [firstObject, setFirstObject] = useState<string>();
  useModules();
  const { getConfigurationFile, getAssetByFileName } = useAssets();
  const { constants, getValueFromConstant } = useConstants();

  useEffect(() => {
    const value = getConfigurationFile<{ image: string }[]>("example.json");
    console.log("🚀 ~ file: App.tsx ~ line 17 ~ useEffect ~ value", value);
    setFirstObject(value[0].image);
  }, [getConfigurationFile]);

  useEffect(() => {
    if (constants) {
      console.log(
        "🚀 ~ file: App.tsx ~ line 26 ~ useEffect ~ getValueFromConstant",
        getValueFromConstant("darkbluedungeon_max_card_total")
      );
    }
  }, [constants, getValueFromConstant]);
  return (
    <div>
      <p>Hello world</p>
      {firstObject && (
        <img src={getAssetByFileName<string>(firstObject)} alt="" />
      )}
    </div>
  );
}

export default App;
