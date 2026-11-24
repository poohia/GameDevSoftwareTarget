import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import styled from "styled-components";

import { GameProviderHooksDefaultInterface } from "..";
import { useEnvInterface } from "../useEnv";
import splashscreen from "../../../GameDevSoftware/splashscreen.json";
import VideoComponent from "../../../components/VideoComponent";
import { TranslationComponent } from "../../../components";
import { Platform } from "../../../types";
import { useButtonHandleClick } from "../../../hooks";

const SplashscreenBrandContainer = styled.section<{
  $showBrowserWarn: boolean;
}>`
  background-color: ${({ theme }) =>
    theme.default?.splashscreen_background ?? "#2b2b2b"};
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  overflow: hidden;
  cursor: ${({ $showBrowserWarn }) =>
    $showBrowserWarn ? "pointer" : "default"};
  > div {
    &:nth-child(1) {
      margin-bottom: 10px;
    }
    &:nth-child(2) {
      span {
        font-size: 2rem;
      }
    }
  }
  .mobile-information {
    font-size: 1.4rem;
    animation: blink 1.5s ease-in-out infinite;
    border: none;
    background-color: transparent;
    margin-top: 10px;
    color: white;
    cursor: pointer;
  }
`;

const SplashscreenGamePromotionContainer = styled.div<{
  show: boolean;
  $showBrowserWarn: boolean;
}>`
  background-color: transparent;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  display: ${({ show }) => (show ? "block" : "none")};
  overflow: hidden;
  cursor: ${({ $showBrowserWarn }) =>
    $showBrowserWarn ? "pointer" : "default"};
  video {
    width: 101%;
    height: 101%;
    object-fit: cover;
    object-position: center;
  }
  .mobile-information {
    font-size: 1.4rem;
    animation: blink 1.5s ease-in-out infinite;
    border: none;
    background-color: transparent;
    margin-top: 10px;
    color: white;
    cursor: pointer;
    position: absolute;
    bottom: 10px;
    right: 10px;
  }
`;
const SplashscreenAccessibilityContainer = styled.section`
  background-color: ${({ theme }) =>
    theme.default?.splashscreen_background ?? "#2b2b2b"};
  color: #ffffff;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 32px;
  height: 100%;
  overflow-y: auto;
  box-sizing: border-box;
  padding: 24px;
  text-align: center;

  .splashscreen-accessibility-brand {
    position: absolute;
    right: calc(16px + var(--sar, 0px));
    bottom: calc(16px + var(--sab, 0px));
    width: clamp(48px, 9vw, 96px);
    height: auto;
    opacity: 0.7;
    pointer-events: none;
  }

  h1 {
    margin: 0;
    max-width: 24ch;
    font-size: clamp(1.5rem, 4vw + 0.5rem, 2.5rem);
    line-height: 1.4;
  }

  .splashscreen-accessibility-answers {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 16px;
  }

  button {
    min-width: 8rem;
    min-height: 56px;
    padding: 12px 32px;
    font-family: inherit;
    font-size: clamp(1.25rem, 2.5vw + 0.5rem, 2rem);
    color: #ffffff;
    background-color: transparent;
    border: 3px solid #ffffff;
    border-radius: 8px;
    cursor: pointer;

    &:focus {
      outline: 4px solid #ffd60a;
      outline-offset: 3px;
    }
  }
`;

let step = 1;

export interface useSplashscreenInterface
  extends
    GameProviderHooksDefaultInterface,
    ReturnType<typeof useSplashscreen> {}

const useSplashscreen = (getEnv: useEnvInterface["getEnvVar"]) => {
  const [loaded, setLoaded] = useState<boolean>(false);

  const SplashscreenBrandComponent: React.FC<{
    haveVideoSplash: boolean;
    loadedGame: boolean;
    platform: Platform;
    onSplashscreenBrandFinished: () => void;
  }> = ({
    haveVideoSplash,
    platform,
    loadedGame,
    onSplashscreenBrandFinished,
  }) => {
    const [showBrowserWarn, setShowBrowserWarn] = useState<boolean>(false);

    const click = useButtonHandleClick();

    useEffect(() => {
      if (loadedGame && !haveVideoSplash) {
        const timeout = setTimeout(() => {
          if (!platform.includes("browser")) {
            onSplashscreenBrandFinished();
          } else {
            setShowBrowserWarn(true);
          }
        }, 500);
        return () => {
          clearTimeout(timeout);
        };
      }
    }, [platform, loadedGame, haveVideoSplash]);

    return (
      <SplashscreenBrandContainer
        aria-labelledby={
          loadedGame ? "splashscreen_warn_browser" : "splashscreen_loading"
        }
        $showBrowserWarn={showBrowserWarn}
        onClick={(event) => {
          if (showBrowserWarn) {
            click(event, {
              callback: () => {
                onSplashscreenBrandFinished();
              },
            });
          }
        }}
        aria-live="polite"
      >
        <div aria-hidden="true">
          <img src={splashscreen.brandImage} alt="" />
        </div>
        <div aria-hidden="true">
          <span>{splashscreen.brandSlogan}</span>
        </div>
        {!loadedGame && (
          <TranslationComponent id="splashscreen_loading" srOnly />
        )}
        {showBrowserWarn && !haveVideoSplash && (
          <button className="mobile-information animate__animated animate__flash animate__infinite">
            <TranslationComponent id="splashscreen_warn_browser" />
          </button>
        )}
      </SplashscreenBrandContainer>
    );
  };

  const SplashscreenAccessibilityComponent: React.FC<{
    onAnswer: (visuallyImpaired: boolean) => void;
  }> = ({ onAnswer }) => {
    const questionId = "splashscreen_accessibility_question";
    const refAnswerNo = useRef<HTMLButtonElement>(null);

    const click = useButtonHandleClick();

    useEffect(() => {
      refAnswerNo.current?.focus();
    }, []);

    const answer = (
      event: React.MouseEvent<HTMLButtonElement>,
      visuallyImpaired: boolean
    ) => click(event, { callback: () => onAnswer(visuallyImpaired) });

    return (
      <SplashscreenAccessibilityContainer>
        <h1>
          <TranslationComponent id={questionId} />
        </h1>
        <div className="splashscreen-accessibility-answers">
          <button
            ref={refAnswerNo}
            aria-describedby={questionId}
            onClick={(event) => answer(event, false)}
          >
            <TranslationComponent id="label_no" />
          </button>
          <button
            aria-describedby={questionId}
            onClick={(event) => answer(event, true)}
          >
            <TranslationComponent id="label_yes" />
          </button>
        </div>
        <img
          className="splashscreen-accessibility-brand"
          src={splashscreen.brandImage}
          alt=""
          aria-hidden="true"
        />
      </SplashscreenAccessibilityContainer>
    );
  };

  const SplashscreenGamePromotion: React.FC<{
    source: string;
    show: boolean;
    platform: Platform;
    onVideoLoaded: () => void;
    onVideoFinished: () => void;
  }> = ({ source, show, platform, onVideoLoaded, onVideoFinished }) => {
    const refVideo = useRef<HTMLVideoElement>(null);
    const [showBrowserWarn, setShowBrowserWarn] = useState<boolean>(false);
    const [videoEnded, setVideoEnded] = useState<boolean>(false);

    const click = useButtonHandleClick();

    useEffect(() => {
      if (refVideo.current) {
        const timeout = setTimeout(() => {
          if (refVideo.current) {
            onVideoLoaded();
            refVideo.current.play();
            refVideo.current.playbackRate = 2.0;
          }
        }, 1500);
        return () => {
          clearTimeout(timeout);
        };
      }
    }, [refVideo, onVideoLoaded]);

    useEffect(() => {
      if (videoEnded) {
        if (!platform.includes("browser")) {
          setTimeout(() => onVideoFinished(), 700);
        } else {
          setShowBrowserWarn(true);
        }
      }
    }, [platform, videoEnded]);

    return (
      <SplashscreenGamePromotionContainer
        show={show}
        $showBrowserWarn={showBrowserWarn}
        onClick={(event) => {
          if (showBrowserWarn) {
            click(event, {
              callback: () => {
                onVideoFinished();
              },
            });
          }
        }}
      >
        <VideoComponent
          onEnded={() => {
            setVideoEnded(true);
          }}
          ref={refVideo}
          autoPlay={false}
          muted
          src={source}
        />
        {showBrowserWarn && (
          <button className="mobile-information animate__animated animate__flash animate__infinite">
            <TranslationComponent id="splashscreen_warn_browser" />
          </button>
        )}
      </SplashscreenGamePromotionContainer>
    );
  };

  const SplashScreenComponent: React.FC<{
    loadedGame: boolean;
    platform: Platform;
    canContinue: boolean;
    onAccessibilityAnswer: (visuallyImpaired: boolean) => void;
  }> = ({ loadedGame, platform, canContinue, onAccessibilityAnswer }) => {
    const [_, setReload] = useState(false);

    const videoSource = useMemo(() => {
      if (!splashscreen.gamePromotionVideo) {
        return null;
      }
      return `assets/videos/${splashscreen.gamePromotionVideo.replace("@a:", "")}`;
    }, []);

    const onSplashscreenFinished = useCallback(() => {
      setLoaded(true);
    }, []);

    const askAccessibility = !canContinue;

    const onSplashscreenBrandFinished = useCallback(() => {
      if (askAccessibility) {
        step = 2;
        setReload((reload) => !reload);
        return;
      }
      onSplashscreenFinished();
    }, [askAccessibility, onSplashscreenFinished]);

    const onAnswerAccessibility = useCallback(
      (visuallyImpaired: boolean) => {
        onAccessibilityAnswer(visuallyImpaired);

        if (!videoSource) {
          onSplashscreenFinished();
          return;
        }

        setReload((reload) => !reload);
      },
      [videoSource, onAccessibilityAnswer, onSplashscreenFinished]
    );

    useEffect(() => {
      if (getEnv<boolean>("IGNORE_SPLASHSCREEN")) {
        setLoaded(true);
      }
    }, []);

    return (
      <div>
        {step === 1 && (
          <SplashscreenBrandComponent
            haveVideoSplash={!!videoSource && !askAccessibility}
            loadedGame={loadedGame}
            platform={platform}
            onSplashscreenBrandFinished={onSplashscreenBrandFinished}
          />
        )}
        {step === 2 && (
          <SplashscreenAccessibilityComponent
            onAnswer={onAnswerAccessibility}
          />
        )}
        {videoSource && (
          <SplashscreenGamePromotion
            source={videoSource}
            show={step === 3}
            platform={platform}
            onVideoLoaded={() => {
              step = 3;
              setReload((reload) => !reload);
            }}
            onVideoFinished={onSplashscreenFinished}
          />
        )}
      </div>
    );
  };

  return {
    loaded,
    SplashScreenComponent,
    splashscreenInformations: splashscreen,
  };
};

export default useSplashscreen;
