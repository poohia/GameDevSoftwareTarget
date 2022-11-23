import { useCallback, useContext, useMemo } from "react";
import { useGameProvider } from "../../../../../gameProvider";
import { IACanUseLaser } from "../contants";
import RetrospaceadventureGameContext from "../contexts/RetrospaceadventureGameContext";
import {
  RetrospaceadventureCard,
  RetrospaceadventureCardEffect,
  RetrospaceadventureElements,
} from "../types";
import { calculPercent, isArrayWithEqualEntries } from "../utils";

const useRetrospacegameadventurefightsceneIA = () => {
  const {
    Enemy,
    stateGame: { enemy: EnemyState },
  } = useContext(RetrospaceadventureGameContext);
  const { getEnvVar, getValueFromConstant } = useGameProvider();

  const iaActivated: boolean = useMemo(() => {
    const v = getEnvVar("ACTIVATE_IA");
    return v ? JSON.parse(v) : false;
  }, [getEnvVar]);

  const chooseElement = useCallback(() => {
    if (!iaActivated) {
      return Enemy.preferred_element;
    }

    const elements = getValueFromConstant<RetrospaceadventureElements[]>(
      "retrospaceadventure_card_element"
    );

    return elements[Math.floor(Math.random() * 3)];
  }, [Enemy, iaActivated, getValueFromConstant]);

  const filterCanonLaser = useCallback(
    (
      criticalEffects: RetrospaceadventureCardEffect[],
      cards: RetrospaceadventureCard[]
    ) => {
      const { laser } = Enemy;
      if (
        laser >= IACanUseLaser &&
        criticalEffects.find((e) => e === "use_full_laser")
      ) {
        return cards.filter((c) => c.critical_effect === "use_full_laser");
      }
      return cards.filter((c) => c.critical_effect !== "use_full_laser");
    },
    [Enemy]
  );

  const filterHeal = useCallback(
    (
      criticalEffects: RetrospaceadventureCardEffect[],
      cards: RetrospaceadventureCard[]
    ) => {
      const { life, baseLife } = Enemy;
      const percent = calculPercent(life, baseLife);

      if (percent < 80 && criticalEffects.find((e) => e === "double_heal")) {
        return cards.filter((c) => c.critical_effect === "double_heal");
      }
      return cards.filter((c) => {
        return c.critical_effect !== "double_heal";
      });
    },
    [Enemy]
  );

  const chooseCard = useCallback(() => {
    if (!iaActivated) {
      return EnemyState.cards[
        Math.floor(Math.random() * EnemyState.cards.length)
      ].id;
    }
    const criticalEffects = EnemyState.cards.map((c) => c.critical_effect);

    if (
      isArrayWithEqualEntries<RetrospaceadventureCardEffect>(criticalEffects)
    ) {
      return EnemyState.cards[0].id;
    }

    let cardsFilter: RetrospaceadventureCard[] = JSON.parse(
      JSON.stringify(EnemyState.cards)
    );

    cardsFilter = filterHeal(criticalEffects, cardsFilter);
    cardsFilter = filterCanonLaser(criticalEffects, cardsFilter);

    if (cardsFilter.length > 0) {
      return cardsFilter[Math.floor(Math.random() * cardsFilter.length)].id;
    }
    return EnemyState.cards[Math.floor(Math.random() * EnemyState.cards.length)]
      .id;
  }, [iaActivated, EnemyState, filterCanonLaser, filterHeal]);

  return {
    chooseElement,
    chooseCard,
  };
};

export default useRetrospacegameadventurefightsceneIA;
