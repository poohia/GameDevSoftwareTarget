import React, { useEffect, useState } from "react";
// import objects from "./GameDevSoftware/gameObjects/index.json";
import { useAssets, useConstants } from "./hooks";
import { useGameProvider } from "./gameProvider";
import { TranslationComponent } from "./components";
import { Scene, Home } from "./pages";

// const gameObjects: any = [];

// objects.forEach((object) => {
//   gameObjects.push(require(`./GameDevSoftware/gameObjects/${object.file}`));
// });

function App() {
  // const [firstObject, setFirstObject] = useState<string>();
  // useModules();
  // const { getConfigurationFile, getAssetByFileName } = useAssets();
  // const { constants, getValueFromConstant } = useConstants();
  const { route } = useGameProvider();

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
  switch (route) {
    case "scene":
      return <Scene />;
    case "home":
    default:
      return <Home />;
  }
}

export default App;
