import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import RetrospaceadventureGameContext from "../contexts/RetrospaceadventureGameContext";
import { ContainerRowFightCenter } from "./RetrospacegameadventurefightsceneStyledComponents";
import { CardWithEffect } from "./styled/Card";
// import styled from "styled-components";
// import AnimationScene from "../minigames/AnimationScene";
// import { useGameProvider } from "../../../../../gameProvider";
// import { useAssets } from "../../../../../hooks";
import useRetrospacegameadventurefightsceneUtils from "../hooks/useRetrospacegameadventurefightsceneUtils";
import { EffectStateType } from "../types";
import RetrospaceadventureBarLifeAnimationContext from "../contexts/RetrospaceadventureBarLifeAnimationContext";
import styled from "styled-components";
import { AnimationComponent } from "../../../../../components";
import { useGameProvider } from "../../../../../gameProvider";
import { calculResultPercent } from "../utils";

// const AnimationContainer = styled.div`
//   position: Absolute;
//   top: 0;
//   left: 0;
//   height: 100%;
//   width: 100%;
//   z-index: 999;
// `;
const AnimationContainer = styled.div`
  position: Absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 9;
  display: flex;
  align-items: center;
  justify-content: space-between;
  > div {
    flex-basis: 45%;
    margin: 2%;
    width: 40%;
    height: 80%;
    display: flex;
    align-items: center;
    &:nth-child(1) {
      justify-content: flex-start;
    }
    &:nth-child(2) {
      justify-content: flex-end;
    }
  }
`;

const RetrospacegameadventurefightsceneElementsChoiced: React.FC = () => {
  // const [phaserScene, setPhaserScene] = useState<Phaser.Game | null>(null);
  // const [scene, setScene] = useState<AnimationScene | null>(null);
  // const [createdDone, setCreatedDone] = useState<boolean>(false);
  const [messages, setMessages] = useState<EffectStateType[]>([]);
  const {
    stateGame: { howWin, effectState },
    Hero,
    Enemy,
    dispatchGame,
  } = useContext(RetrospaceadventureGameContext);
  const { animationEnemy, animationHero } = useContext(
    RetrospaceadventureBarLifeAnimationContext
  );
  const { innerHeight, innerWidth } = useGameProvider();

  // const { preloadSound, playSound } = useGameProvider();
  // const { getAssetImg, getConfigurationFile } = useAssets();
  const {
    findCardHeroById,
    findCardEnemyById,
    // findEffectHeroByIdAndHowWin,
    // findEffectEnemyByIdAndHowWin,
  } = useRetrospacegameadventurefightsceneUtils();
  // const phaserAnimationContainer = useRef<HTMLDivElement>(null);

  const cardHero = useMemo(() => findCardHeroById(), [findCardHeroById]);
  const cardEnemy = useMemo(() => findCardEnemyById(), [findCardEnemyById]);
  const lasMessage = useMemo(
    () => (messages.length > 0 ? messages[messages.length - 1] : null),
    [messages]
  );
  // const effectHero = useMemo(
  //   () => findEffectHeroByIdAndHowWin(),
  //   [findEffectHeroByIdAndHowWin]
  // );
  // const effectEnemy = useMemo(
  //   () => findEffectEnemyByIdAndHowWin(),
  //   [findEffectEnemyByIdAndHowWin]
  // );

  useEffect(() => {
    setTimeout(() => {
      console.log("start apply effects");
      dispatchGame({ type: "applyEffects" });
      setTimeout(() => {
        // when animations has finished
        dispatchGame({ type: "fight" });
      }, 5000);
    }, 1500);
  }, [dispatchGame]);

  // useEffect(() => {
  //   if (phaserAnimationContainer && phaserAnimationContainer.current) {
  //     const {
  //       current: { clientWidth: width, clientHeight: height },
  //     } = phaserAnimationContainer;

  //     const s = new AnimationScene({
  //       width,
  //       height,
  //       animations: [
  //         {
  //           phaserAnimation: getConfigurationFile(effectEnemy.animation),
  //           atlas: getConfigurationFile(effectEnemy.atlas),
  //           atlasName: effectEnemy.atlasName,
  //           image: getAssetImg(effectEnemy.image),
  //           position: "left",
  //         },
  //         {
  //           phaserAnimation: getConfigurationFile(effectHero.animation),
  //           atlas: getConfigurationFile(effectHero.atlas),
  //           atlasName: effectHero.atlasName,
  //           image: getAssetImg(effectHero.image),
  //           position: "right",
  //         },
  //       ],
  //       loadSound: preloadSound,
  //       playSound,
  //       onCreated: () => setCreatedDone(true),
  //     });
  //     setScene(s);
  //     setPhaserScene(new Phaser.Game({ ...s.config(), scene: s }));
  //   }
  // }, [phaserAnimationContainer]);

  useEffect(() => {
    if (!effectState) return;
    setMessages((_messages) => {
      return [..._messages, effectState];
    });
  }, [effectState]);

  // useEffect(() => {
  //   return () => {
  //     phaserScene?.destroy(false);
  //   };
  // }, [phaserScene]);

  // useEffect(() => {
  //   if (messages.length === 1 && howWin === "win" && createdDone) {
  //     scene?.appendRightAnimation();
  //   } else if (messages.length === 1 && howWin === "loose" && createdDone) {
  //     scene?.appendLeftAnimation();
  //   } else if (messages.length === 2 && howWin === "win" && createdDone) {
  //     scene?.appendLeftAnimation();
  //   } else if (messages.length === 2 && howWin === "loose" && createdDone) {
  //     scene?.appendRightAnimation();
  //   }
  // }, [messages, scene, createdDone, howWin]);

  useEffect(() => {
    // setCreatedDone(false);
    setMessages([]);
  }, []);

  if (!cardHero || !cardEnemy) return <div />;

  return (
    <>
      {/* <AnimationContainer
        id="animationcontent"
        ref={phaserAnimationContainer}
      /> */}
      <AnimationContainer>
        <AnimationComponent
          animationFile={Enemy.animationFile}
          atlasFile={Enemy.atlasFile}
          imageFile={Enemy.image}
          animationName={animationEnemy}
          center={false}
          width={calculResultPercent(innerWidth, 20)}
          height={calculResultPercent(innerHeight, 90)}
          responsive
        />
        <AnimationComponent
          animationFile={Hero.animationFile}
          atlasFile={Hero.atlasFile}
          imageFile={Hero.image}
          animationName={animationHero}
          center={false}
          width={calculResultPercent(innerWidth, 20)}
          height={calculResultPercent(innerHeight, 90)}
          responsive
        />
      </AnimationContainer>
      <ContainerRowFightCenter>
        <CardWithEffect
          // active={howWin === "loose"}
          active={
            lasMessage
              ? lasMessage.message.toLocaleLowerCase().includes("enemy")
              : false
          }
          effect={howWin === "loose" ? "critical" : "echec"}
          card={cardEnemy}
        />
        <CardWithEffect
          active={
            lasMessage
              ? lasMessage.message.toLocaleLowerCase().includes("hero")
              : false
          }
          effect={howWin === "win" ? "critical" : "echec"}
          card={cardHero}
        />
      </ContainerRowFightCenter>
    </>
  );
};

export default RetrospacegameadventurefightsceneElementsChoiced;
