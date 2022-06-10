import { useState, useEffect } from "react";
import { useGameProvider } from "../../gameProvider";
import { useScenes } from "../../hooks";
import { SceneComponentProps, SceneObject, SceneTypeJSON } from "../../types";

const Scene = () => {
  const [scene, setScene] = useState<SceneTypeJSON>();
  const [sceneData, setSceneData] = useState<SceneObject>();
  const [Component, setComponent] = useState<SceneComponentProps>();

  const { game, push } = useGameProvider();
  const { findScene } = useScenes();

  useEffect(() => {
    console.log(
      "🚀 ~ file: index.tsx ~ line 16 ~ useEffect ~ JSON.stringify(game)",
      JSON.stringify(game)
    );
    if (game.currentScene === 0) {
      push("home");
      return;
    }
    const [s, sd, C] = findScene(game.currentScene);
    console.log(JSON.stringify(sd));
    console.log(C);
    setScene(s);
    setSceneData(sd);
    setComponent(C);
  }, [game, push, findScene]);

  if (scene && sceneData && Component) {
    return <Component data={sceneData} />;
  }

  return <div />;
};

export default Scene;
