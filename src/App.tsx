import React, { useEffect, useState } from "react";
import objects from "./GameDevSoftware/gameObjects/index.json";

const gameObjects: any = [];

objects.forEach((o) => {
  gameObjects.push(require(`./GameDevSoftware/gameObjects/${o}.json`));
});

function App() {
  const [firstObject, setFirstObject] = useState<any>();
  useEffect(() => {
    setFirstObject(gameObjects[0]);
  }, []);
  const findUrlImg = (src: string | { src: string; module: string }) => {
    const assetsUrl = "assets/";
    if (typeof src === "string") {
      return `${assetsUrl}images/${src}`;
    }
    return `${assetsUrl}${src.module}/images/${src.src}`;
  };
  console.log("🚀 ~ file: App.tsx ~ line 24 ~ App ~ gameObjects", gameObjects);
  console.log("🚀 ~ file: App.tsx ~ line 26 ~ App ~ firstObject", firstObject);
  return (
    <div>
      <p>Hello world</p>
      {firstObject && <img src={findUrlImg(firstObject.image)} alt="" />}
      {/* <img src="assets/darkbluedungeon/images/amulet.png" alt="" /> */}
    </div>
  );
}

export default App;
