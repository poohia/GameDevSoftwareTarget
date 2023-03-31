import { useCallback, useEffect, useMemo, useReducer, useRef } from "react";
import { ImgFromSpriteProps } from ".";
import { useAssets } from "../../hooks";
import spriteReducer, {
  SpriteReducerActionData,
  spriteDefaultState,
} from "./spriteReducer";
import { useGameProvider } from "../../gameProvider";
import { AtlasType } from "./types";

const useSpriteComponent = (props: ImgFromSpriteProps) => {
  /**  */
  const { imageFile, atlasFile, frameName } = props;

  const { innerWidth, innerHeight } = useGameProvider();
  const { getAssetImg, getConfigurationFile } = useAssets();
  /**  */
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);
  /**  */
  const [state, dispatch] = useReducer(spriteReducer, spriteDefaultState);
  const { loaded, parentSize, imgLoaded } = state;
  /** */
  const image = useMemo(() => {
    const img = new Image();
    img.src = getAssetImg(imageFile);
    return img;
  }, []);
  const atlas = useMemo(() => getConfigurationFile<AtlasType>(atlasFile), []);
  const frameObject = useMemo(() => {
    const frameFind = atlas.frames.find((f) => f.filename === frameName);
    if (typeof frameFind !== "undefined") return frameFind.frame;
    return null;
  }, [frameName]);

  const updateParentSize = useCallback(() => {
    if (parentRef.current) {
      const { clientWidth, clientHeight } = parentRef.current;
      dispatch({
        type: "parentSize",
        data: {
          w: clientWidth,
          h: clientHeight,
        } as SpriteReducerActionData,
      });
    }
  }, [parentRef]);
  // draw image
  useEffect(() => {
    if (canvasRef.current && loaded && frameObject) {
      const ctx = canvasRef.current.getContext("2d");
      ctx?.clearRect(0, 0, parentSize.w, parentSize.h);
      const pw = parentSize.w > frameObject.w ? frameObject.w : parentSize.w;
      const ph = parentSize.h > frameObject.h ? frameObject.h : parentSize.h;
      ctx?.drawImage(
        image,
        frameObject.x,
        frameObject.y,
        frameObject.w,
        frameObject.h,
        0,
        0,
        pw,
        ph
      );
    }
  }, [canvasRef, loaded, parentSize]);
  // update parent size if ref is charged
  useEffect(() => {
    updateParentSize();
  }, [parentRef]);
  // update parent size on resize window
  useEffect(() => {
    updateParentSize();
  }, [innerWidth, innerHeight]);
  // check img loaded
  useEffect(() => {
    const dispatchImgLoaded = () => {
      dispatch({ type: "imgLoaded" });
    };
    if (image.complete) {
      dispatchImgLoaded();
    } else {
      image.addEventListener("load", dispatchImgLoaded);
      return () => {
        image.removeEventListener("load", dispatchImgLoaded);
      };
    }
  }, []);
  // if all is charged
  useEffect(() => {
    if (imgLoaded && parentSize) {
      dispatch({ type: "loaded" });
    }
  }, [imgLoaded, parentSize]);

  return {
    loaded,
    parentSize,
    canvasRef,
    parentRef,
  };
};

export default useSpriteComponent;