import { useCallback } from "react";
import scenes from "../../GameDevSoftware/scenes/index.json";
import { useGameProvider } from "../../gameProvider";
import { SceneObject, SceneTypeJSON } from "../../types";

const useScenes = () => {
  const { push } = useGameProvider();

  const findScene = useCallback(
    (sceneId: number): [SceneTypeJSON, SceneObject] => {
      const scene: SceneTypeJSON | undefined = scenes.find(
        (s) => Number(s.file.replace(".json", "")) === sceneId
      );
      if (!scene) {
        push("home");
        // @ts-ignore
        return;
      }
      const sceneData: SceneObject = require(`../../GameDevSoftware/scenes/${scene.file}`);
      return [scene, sceneData];
    },
    [push]
  );

  return {
    findScene,
  };
};

export default useScenes;
