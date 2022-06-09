import React, { useEffect, useState } from "react";
// import objects from "./GameDevSoftware/gameObjects/index.json";
import { useAssets, useConstants } from "./hooks";
import { useGameProvider } from "./gameProvider";
import { TranslationComponent } from "./components";
import { Scene } from "./pages";

// const gameObjects: any = [];

// objects.forEach((object) => {
//   gameObjects.push(require(`./GameDevSoftware/gameObjects/${object.file}`));
// });

function App() {
  // const [firstObject, setFirstObject] = useState<string>();
  // useModules();
  // const { getConfigurationFile, getAssetByFileName } = useAssets();
  // const { constants, getValueFromConstant } = useConstants();
  const { route, nextScene, switchLanguage } = useGameProvider();

  // useEffect(() => {
  //   const value = getConfigurationFile<{ image: string }[]>("example.json");
  //   console.log(
  //     "🚀 ~ file: App.tsx ~ line 17 ~ useEffect ~ value",
  //     JSON.stringify(value)
  //   );
  //   setFirstObject(value[0].image);
  // }, [getConfigurationFile]);

  // useEffect(() => {
  //   if (constants) {
  //     console.log(
  //       "🚀 ~ file: App.tsx ~ line 26 ~ useEffect ~ getValueFromConstant",
  //       getValueFromConstant("darkbluedungeon_max_card_total")
  //     );
  //   }
  // }, [constants, getValueFromConstant]);

  if (route === "scene") {
    return <Scene />;
  }

  return (
    <div>
      <button onClick={() => nextScene(1)}>Start game</button>
      <button onClick={() => switchLanguage("fr")}>Set french language</button>
      <button onClick={() => switchLanguage("en")}>Set english language</button>
    </div>
  );
}

export default App;
