import { useState, useEffect } from "react";
import { useGameProvider } from "../../gameProvider";
import { useScenes } from "../../hooks";
import { SceneComponentProps, SceneObject, SceneTypeJSON } from "../../types";

const Scene = () => {
  const [scene, setScene] = useState<SceneTypeJSON>();
  const [sceneData, setSceneData] = useState<SceneObject>();
  const [Component, setComponent] = useState<SceneComponentProps>();

  const { params, push } = useGameProvider();
  const { findScene } = useScenes();

  useEffect(() => {
    if (!params) {
      push("home");
      return;
    }
    const [s, sd, C] = findScene(params.sceneId);
    setScene(s);
    setSceneData(sd);
    setComponent(C);
  }, [params, push, findScene]);

  if (scene && sceneData && Component) {
    return <Component data={sceneData} />;
  }

  return <div>Hello world</div>;
};

export default Scene;
