import { useState, useEffect } from "react";
import { useGameProvider } from "../../gameProvider";
import { useScenes } from "../../hooks";
import { SceneObject, SceneTypeJSON } from "../../types";

const Scene = () => {
  const [scene, setScene] = useState<SceneTypeJSON>();
  const [sceneData, setSceneData] = useState<SceneObject>();

  const { params, push } = useGameProvider();
  const { findScene } = useScenes();

  useEffect(() => {
    if (!params) {
      push("home");
      return;
    }
    const [s, sd] = findScene(params.sceneId);
    setScene(s);
    setSceneData(sd);
  }, [params, push, findScene]);

  if (!scene) {
    return <div />;
  }

  return <div>Hello world</div>;
};

export default Scene;
