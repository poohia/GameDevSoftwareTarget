import React, { useEffect } from "react";
import gameObjects from "./GameDevSoftware/gameObjects.json";

function App() {
  useEffect(() => {
    gameObjects.forEach((o) => {
      console.log(require(`./GameDevSoftware/gameObjects/${o.value}`));
    });
  }, []);
  return (
    <div>
      <p>Hello world</p>
    </div>
  );
}

export default App;
