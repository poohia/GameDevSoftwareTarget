import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { PageComponent } from "../../../../components";
import { EnvType, SceneComponentProps } from "../../../../types";
import { useAssets } from "../../../../hooks";

import "animate.css";
import { useGameProvider } from "../../../../gameProvider";

type RetrospacegameadventurecomicsceneHitBox = {
  width: number;
  height: number;
  top: number;
  left: number;
  content: string;
};
type RetrospacegameadventurecomicscenePropsData = {
  images: {
    src: string;
    dialogsboxes?: RetrospacegameadventurecomicsceneHitBox[];
  }[];
};

const Container = styled.div`
  background: black;
  background: url("assets/retrospaceadventure/images/backgroundprimary.png");
`;

const RetrospacegameadventurecomicsceneComic1Container = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  height: 100%;
  > div:nth-child(1) {
    grid-area: 1 / 1 / 6 / 6;
  }
`;

const RetrospacegameadventurecomicsceneComic2Container = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(5, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  height: 100%;
  > div {
    &:nth-child(1) {
      grid-area: 1 / 1 / 6 / 4;
    }
    &:nth-child(2) {
      grid-area: 1 / 4 / 6 / 7;
    }
  }
`;

const RetrospacegameadventurecomicsceneComicDivImg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const RetrospacegameadventurecomicsceneComicImg = styled.img`
  max-width: 100%;
  max-height: 100%;
  visibility: hidden;
  &.active {
    visibility: visible;
  }
  border: 3.5px solid black;
  border-radius: 3px;
`;

const RetrospacegameadventurecomicsceneComic3Container = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(4, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  height: 100%;
  > div {
    position: relative;

    &:nth-child(1) {
      grid-area: 1 / 1 / 5 / 4;
    }
    &:nth-child(2) {
      grid-area: 1 / 4 / 3 / 6;
    }
    &:nth-child(3) {
      grid-area: 3 / 4 / 5 / 6;
    }
  }
`;

const RetrospacegameadventurecomicsceneComic4Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(6, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  height: 100%;
  > div {
    position: relative;

    &:nth-child(1) {
      grid-area: 1 / 1 / 4 / 3;
    }
    &:nth-child(2) {
      grid-area: 4 / 1 / 7 / 3;
    }
    &:nth-child(3) {
      grid-area: 1 / 3 / 4 / 5;
    }
    &:nth-child(4) {
      grid-area: 4 / 3 / 7 / 5;
    }
  }
`;

const RetrospacegameadventurecomicsceneButtonAction = styled.div`
  position: absolute;
  bottom: 10px;
  right: 20px;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 3px solid black;
  overflow: hidden;
  img {
    width: 60px;
    border-radius: 50%;
  }
`;

const RetrospacegameadventurecomicsceneBull = styled.div<
  Omit<RetrospacegameadventurecomicsceneHitBox, "content"> & {
    env: EnvType;
    fontSize: number;
    visible: boolean;
  }
>`
  position: absolute !important;
  width: ${({ width }) => `${width}%`};
  height: ${({ height }) => `${height}%`};
  top: ${({ top }) => `${top}%`};
  left: ${({ left }) => `${left}%`};
  ${({ env }) => (env === "development" ? "border: 0.5px solid green;" : "")}
  font-size: ${({ fontSize }) => `${fontSize}px`};
  overflow-y: auto;
  text-align: center;
  visibility: ${({ visible }) => (visible ? "visible" : "hidden")};
  border-radius: 28px;
  // &:after {
  //   position: absolute;
  //   top: 0;
  //   left: 0;
  //   content: "";
  //   width: 100%;
  //   height: 100%;
  //   border: 1px solid green;
  //   border-radius: 28px;
  //   z-index: 9999;
  // }
`;

export type RetrospacegameadventurecomicsceneProps = SceneComponentProps<
  {},
  RetrospacegameadventurecomicscenePropsData
>;

const RetrospacegameadventurecomicsceneContainerFromImages: React.FC<{
  children: React.ReactNode;
  nbImage: number;
}> = ({ children, nbImage }) => {
  if (nbImage === 1) {
    return (
      <RetrospacegameadventurecomicsceneComic1Container>
        {children}
      </RetrospacegameadventurecomicsceneComic1Container>
    );
  }
  if (nbImage === 2) {
    return (
      <RetrospacegameadventurecomicsceneComic2Container>
        {children}
      </RetrospacegameadventurecomicsceneComic2Container>
    );
  }
  if (nbImage === 3) {
    return (
      <RetrospacegameadventurecomicsceneComic3Container>
        {children}
      </RetrospacegameadventurecomicsceneComic3Container>
    );
  }
  if (nbImage === 4) {
    return (
      <RetrospacegameadventurecomicsceneComic4Container>
        {children}
      </RetrospacegameadventurecomicsceneComic4Container>
    );
  }
  return <div />;
};

const RetrospacegameadventurecomicsceneImage: React.FC<{
  children: React.ReactNode;
  timeOutToShow: number;
}> = ({ children, timeOutToShow }) => {
  const refImageDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (refImageDiv.current) {
      const { children, offsetHeight, offsetWidth } = refImageDiv.current;
      const img = children[0] as HTMLImageElement;
      // const { naturalHeight, naturalWidth } = img;
      // const width =
      //   naturalWidth > offsetWidth ? offsetWidth - 20 : naturalWidth;
      // const height =
      //   naturalHeight > offsetHeight ? offsetHeight - 20 : naturalHeight;

      const width = offsetWidth - 20,
        height = offsetHeight - 20;

      img.style.width = `${width}px`;
      img.style.height = `${height}px`;
      setTimeout(() => {
        img.className = `${img.className} animate__zoomIn active`;
      }, timeOutToShow);
    }
  }, [refImageDiv, timeOutToShow]);

  return (
    <RetrospacegameadventurecomicsceneComicDivImg ref={refImageDiv}>
      {children}
    </RetrospacegameadventurecomicsceneComicDivImg>
  );
};

const RetrospacegameadventurecomicsceneDialogBox: React.FC<
  RetrospacegameadventurecomicsceneHitBox & {
    env: EnvType;
    timeOutToShow: number;
  }
> = ({ content, timeOutToShow, width, height, ...rest }) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [fontSize, setFontSize] = useState<number>(0);
  const bullRef = useRef<HTMLDivElement>(null);

  const calculateFontSize = (
    width: number,
    height: number,
    content: number
  ) => {
    var area = width * height;

    return Math.sqrt(area / content); //this provides the font-size in points.
  };

  useEffect(() => {
    console.log(bullRef);
    if (bullRef.current) {
      const { offsetWidth, offsetHeight } = bullRef.current;
      setFontSize(calculateFontSize(offsetWidth, offsetHeight, content.length));
    }
  }, [bullRef, content]);

  useEffect(() => {
    setTimeout(() => setVisible(true), timeOutToShow);
  }, [timeOutToShow]);

  return (
    <RetrospacegameadventurecomicsceneBull
      width={width}
      height={height}
      fontSize={fontSize}
      ref={bullRef}
      visible={visible}
      {...rest}
    >
      <span>{content}</span>
    </RetrospacegameadventurecomicsceneBull>
  );
};

const Retrospacegameadventurecomicscene: RetrospacegameadventurecomicsceneProps =
  (props) => {
    const {
      data: { _actions, images },
    } = props;
    const { nextScene, env } = useGameProvider();
    const { getAssetImg } = useAssets();

    return (
      <PageComponent>
        <Container>
          <RetrospacegameadventurecomicsceneContainerFromImages
            nbImage={images.length}
          >
            {images.map((image, i) => (
              <RetrospacegameadventurecomicsceneImage
                key={`RetrospacegameadventurecomicsceneImage-${image.src}-${i}`}
                timeOutToShow={i * 1000}
              >
                <RetrospacegameadventurecomicsceneComicImg
                  src={getAssetImg(image.src)}
                  className="animate__animated"
                  alt=""
                />
                {image.dialogsboxes?.map((dialogsboxe, j) => {
                  return (
                    <RetrospacegameadventurecomicsceneDialogBox
                      key={`RetrospacegameadventurecomicsceneImage-RetrospacegameadventurecomicsceneBull-${image.src}-${i}-${j}`}
                      env={env}
                      timeOutToShow={i * 1000 + 1000}
                      {...dialogsboxe}
                    />
                  );
                })}
              </RetrospacegameadventurecomicsceneImage>
            ))}
          </RetrospacegameadventurecomicsceneContainerFromImages>

          <RetrospacegameadventurecomicsceneButtonAction
            className="animate__animated animate__backInUp"
            onClick={() => nextScene(_actions[0]._scene)}
          >
            <img src={getAssetImg("swords.png")} alt="" />
          </RetrospacegameadventurecomicsceneButtonAction>
        </Container>
      </PageComponent>
    );
  };

export default Retrospacegameadventurecomicscene;