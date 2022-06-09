import React, { useEffect, useState } from "react";
// import objects from "./GameDevSoftware/gameObjects/index.json";
import { useAssets, useConstants, useModules } from "./hooks";
import { useGameProvider } from "./gameProvider";
import { TranslationComponent } from "./components";

// const gameObjects: any = [];

// objects.forEach((object) => {
//   gameObjects.push(require(`./GameDevSoftware/gameObjects/${object.file}`));
// });

function App() {
  const [firstObject, setFirstObject] = useState<string>();
  useModules();
  const { getConfigurationFile, getAssetByFileName } = useAssets();
  const { constants, getValueFromConstant } = useConstants();
  const { switchLanguage } = useGameProvider();

  useEffect(() => {
    const value = getConfigurationFile<{ image: string }[]>("example.json");
    console.log(
      "🚀 ~ file: App.tsx ~ line 17 ~ useEffect ~ value",
      JSON.stringify(value)
    );
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
      <p>
        <TranslationComponent id="hello_world" />
      </p>
      <p>
        <TranslationComponent id="start_game" />
      </p>
      <p>
        <TranslationComponent id="ALERT_cancel" />
      </p>
      {firstObject && (
        <img src={getAssetByFileName(firstObject) as string} alt="" />
      )}
      <button onClick={() => switchLanguage("fr")}>Switch</button>
    </div>
  );
}

export default App;
