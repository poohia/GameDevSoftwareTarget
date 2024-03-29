import { useCallback } from "react";
import assets from "../../GameDevSoftware/assets.json";
import { AssertAcceptedType } from "../../types";

const useAssets = () => {
  const folderByType = useCallback((type: AssertAcceptedType): string => {
    switch (type) {
      case "image":
        return "images/";
      case "sound":
        return "sounds/";
      case "video":
        return "videos/";
      case "json":
        return "";
    }
  }, []);
  const getAsset = useCallback(
    (name: string, type: AssertAcceptedType): string | Object => {
      const findAsset = assets.find(
        (asset) => asset.type === type && asset.name === name
      );
      if (!findAsset) {
        throw new Error(`Asset not found ${name}`);
      }
      const typeAsset = folderByType(type);

      if (type === "json") {
        return require(`../../GameDevSoftware/configurationsFiles/${name}`);
      }

      const { name: nameAsset, module: moduleAsset } = findAsset;
      if (moduleAsset) {
        return `assets/${moduleAsset}/${typeAsset}${nameAsset}`;
      }
      return `assets/${typeAsset}${nameAsset}`;
    },
    [folderByType]
  );

  const getAssetImg = useCallback(
    (name: string): string => {
      return getAsset(name, "image") as string;
    },
    [getAsset]
  );
  const getAssetVideo = useCallback(
    (name: string): string => {
      return getAsset(name, "video") as string;
    },
    [getAsset]
  );
  const getAssetSounds = useCallback(
    (name: string): string => {
      return getAsset(name, "sound") as string;
    },
    [getAsset]
  );
  const getConfigurationFile = useCallback(
    <T = {}>(name: string): T => {
      return getAsset(name, "json") as T;
    },
    [getAsset]
  );

  const getAssetByFileName = useCallback(
    (fileName: string): string | Object => {
      if (
        fileName.endsWith(".png") ||
        fileName.endsWith(".jpg") ||
        fileName.endsWith(".jpeg")
      ) {
        return getAsset(fileName, "image");
      } else if (fileName.endsWith(".json")) {
        return getAsset(fileName, "json");
      } else if (fileName.endsWith(".mp3")) {
        return getAsset(fileName, "sound");
      } else if (fileName.endsWith(".mp4") || fileName.endsWith(".mkv")) {
        return getAsset(fileName, "video");
      } else {
        throw new Error(`Type of ${fileName} undefined`);
      }
    },
    [getAsset]
  );

  return {
    getAsset,
    getAssetImg,
    getAssetVideo,
    getAssetSounds,
    getConfigurationFile,
    getAssetByFileName,
  };
};

export default useAssets;
