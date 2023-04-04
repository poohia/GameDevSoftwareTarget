import React, { useMemo } from "react";
import { PageComponent } from "../../../../components";
import { ContainerComponent } from "./components/RetrospacegameadventurefightsceneStyledComponents";
import RetrospacegameadventurefightsceneStatsRow from "./components/RetrospacegameadventurefightsceneStatsRow";

import RetrospaceadventureGameContext from "./contexts/RetrospaceadventureGameContext";
import useRetrospacegameadventurefightsceneParty from "./hooks/useRetrospacegameadventurefightsceneParty";
import RetrospacegameadventurefightsceneCardRows from "./components/RetrospacegameadventurefightsceneCardRows";
import RetrospacegameadventurefightsceneElementsChoiced from "./components/RetrospacegameadventurefightsceneElementsChoiced";
import RetrospacegameadventurefightMessageInfo from "./components/RetrospacegameadventurefightMessageInfo";
import RetrospaceadventureMiniGameWrapper from "./components/RetrospaceadventureMiniGameWrapper";
import { useConstants } from "../../../../gameProvider/hooks";
import RetrospaceadventureBarLifeAnimationContext, {
  useAnimationStatus,
} from "./contexts/RetrospaceadventureBarLifeAnimationContext";

type RetrospacegameadventurefightsceneWrapperProps = {};

const RetrospacegameadventurefightsceneWrapper: React.FC<
  RetrospacegameadventurefightsceneWrapperProps
> = () => {
  useRetrospacegameadventurefightsceneParty();
  const { getValueFromConstant } = useConstants();

  const maxSizeGameContainer = useMemo(() => {
    const [width, height] = getValueFromConstant(
      "retrospaceadventure_max_width_height_views"
    );
    return { width, height };
  }, [getValueFromConstant]);

  const useAnimationStatusReturn = useAnimationStatus();

  return (
    <RetrospaceadventureGameContext.Consumer>
      {({ stateGame, Enemy, Hero }) => {
        return (
          <RetrospaceadventureBarLifeAnimationContext.Provider
            value={useAnimationStatusReturn}
          >
            <RetrospacegameadventurefightMessageInfo />
            <PageComponent maxSize={maxSizeGameContainer} paddingRight="0px">
              <ContainerComponent>
                <RetrospacegameadventurefightsceneStatsRow character={Enemy} />
                {stateGame.status === "selectionCard" && (
                  <RetrospacegameadventurefightsceneCardRows />
                )}
                {stateGame.status === "startMinigame" && (
                  <RetrospaceadventureMiniGameWrapper />
                )}
                {(stateGame.status === "fightElement" ||
                  stateGame.status === "applyEffects" ||
                  stateGame.status === "applyEffectsEchec" ||
                  stateGame.status === "fight") && (
                  <RetrospacegameadventurefightsceneElementsChoiced />
                )}
                <RetrospacegameadventurefightsceneStatsRow character={Hero} />
              </ContainerComponent>
            </PageComponent>
          </RetrospaceadventureBarLifeAnimationContext.Provider>
        );
      }}
    </RetrospaceadventureGameContext.Consumer>
  );
};

export default RetrospacegameadventurefightsceneWrapper;
