import styled from "styled-components";

import useAnimationComponent from "./useAnimationComponent";
import { ObjectSize } from "./types";

type AnimationContainerProps = {
  width?: number;
  height?: number;
};
export type AnimationProps = {
  imageFile: string;
  atlasFile: string;
  animationFile: string;
  animationName: string;
  center?: boolean;
  responsive?: boolean;
  blockAtMaxSize?: boolean;
  blockAtMinSize?: boolean;
  minSize?: ObjectSize;
  children?: React.ReactNode;
} & AnimationContainerProps;

export type AnimationComponentProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  AnimationProps;

const ImgContainer = styled.div<AnimationContainerProps>`
  position: relative;
  width: ${({ width }) => (width ? `${width}px` : "100%")} !important;
  height: ${({ height }) => (height ? `${height}px` : "100%")} !important;
  > canvas {
    width: ${({ width }) => (width ? `${width}px` : "100%")} !important;
    height: ${({ height }) => (height ? `${height}px` : "100%")} !important;
  }
`;

const AnimationComponent: React.FC<AnimationComponentProps> = (props) => {
  const {
    imageFile,
    atlasFile,
    animationFile,
    animationName,
    center = false,
    responsive = false,
    blockAtMaxSize = false,
    blockAtMinSize = false,
    minSize,
    width,
    height,
    children,
    ...rest
  } = props;
  const { loaded, parentSize, canvasRef, parentRef } = useAnimationComponent({
    imageFile,
    atlasFile,
    animationFile,
    animationName,
    center,
    responsive,
    blockAtMaxSize,
    blockAtMinSize,
    minSize,
    height,
    width,
  });

  return (
    <ImgContainer width={width} height={height} {...rest} ref={parentRef}>
      {loaded && (
        <canvas width={parentSize.w} height={parentSize.h} ref={canvasRef} />
      )}
      {children && children}
    </ImgContainer>
  );
};

export default AnimationComponent;
