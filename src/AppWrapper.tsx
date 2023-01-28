import { useEffect, useMemo } from "react";
import styled from "styled-components";
import App from "./App";
import { useGameProvider } from "./gameProvider";
import { useAssets } from "./hooks";

const AppContainer = styled.div`
  > div > div {
    width: 822px !important;
    height: 391px !important;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 58px;
    padding: 5px;
    overflow: hidden;
  }
`;

const ImgMobile = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const OrientationScreenInformationComponent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 2rem;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 999;
  text-align: center;
  color: white;
  line-height: 3.3rem;
`;

const AppWrapper: React.FC = () => {
  const { platform, screenorientation, setBackgroundColor, getEnvVar } =
    useGameProvider();
  const { getAsset } = useAssets();

  const activeMobileView: boolean = useMemo(() => {
    const view = getEnvVar<"dev" | "full">("SCREEN_VIEWPORT");
    switch (view) {
      case "full":
        return false;
      case "dev":
      default:
        return platform === "browser";
    }
  }, [platform, getEnvVar]);

  useEffect(() => {
    if (activeMobileView) {
      setBackgroundColor(
        "radial-gradient(circle, rgba(77,79,82,1) 0%, rgba(68,70,74,1) 35%)"
      );
    }
  }, [activeMobileView, setBackgroundColor]);

  useEffect(() => {
    setTimeout(() => {
      // document.documentElement.requestFullscreen();
    }, 2000);
  }, []);

  if (activeMobileView) {
    return (
      <AppContainer>
        <ImgMobile
          src={getAsset("iphone.png", "image") as string}
          alt="phone image"
        />
        <App />
      </AppContainer>
    );
  }

  return (
    <>
      {!screenorientation.includes("landscape") && (
        <OrientationScreenInformationComponent>
          <span>You must orient your screen in landscape mode</span>
        </OrientationScreenInformationComponent>
      )}
      <App />
    </>
  );
};

export default AppWrapper;
