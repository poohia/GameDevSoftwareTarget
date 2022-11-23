import { useCallback, useContext } from "react";
import RetrospaceadventureGameContext from "../contexts/RetrospaceadventureGameContext";
import { GameReducerActionData } from "../reducers/gameReducer";
import { RetrospaceadventureCard, TurnStatus } from "../types";
import useRetrospacegameadventurefightsceneEffects from "./useRetrospacegameadventurefightsceneEffects";
import useRetrospacegameadventurefightsceneUtils from "./useRetrospacegameadventurefightsceneUtils";

const useRetrospacegameadventurefightsceneApplyEffects = () => {
  const { stateGame, updateHero, updateEnemy, dispatchGame } = useContext(
    RetrospaceadventureGameContext
  );
  const { findCardHeroById, findCardEnemyById } =
    useRetrospacegameadventurefightsceneUtils();

  const {
    appendCanonLaserDamage,
    applyDamage,
    applyHalfDamage,
    applyDoubleDamage,
    applyUseFullCanonLaser,
    doubleHeal,
    heal,
    halfHeal,
    applyHalfLife,
    applyFullLife,
  } = useRetrospacegameadventurefightsceneEffects();

  const applyEffects = useCallback(
    (howWin: TurnStatus) => {
      const cardHero = findCardHeroById();
      const cardEnemy = findCardEnemyById();

      if (howWin === "win") {
        dispatchGame({
          type: "appendEffect",
          data: {
            effectState: {
              message: "criticalHero",
              value: cardHero.damage,
              effect: cardHero.critical_effect,
              name: cardHero.name,
            },
          } as GameReducerActionData,
        });

        appendCanonLaserDamage(cardHero, updateHero);
        switch (cardHero.critical_effect) {
          case "double_damage":
            applyDoubleDamage(
              cardHero,
              updateEnemy,
              cardEnemy.echec_effect === "protect_self",
              cardEnemy.echec_effect === "suffer_double_damage"
            );
            break;
          case "use_full_laser":
            applyUseFullCanonLaser(true, true);
            break;
          case "double_heal":
            doubleHeal(cardHero, updateHero);
            break;
          case "half_life_target":
            applyHalfLife(
              updateEnemy,
              cardEnemy.echec_effect === "protect_self"
            );
            break;
          case "full_life_self":
            applyFullLife(updateHero);
            break;
        }
        setTimeout(() => {
          dispatchGame({
            type: "appendEffect",
            data: {
              effectState: {
                message: "echecEnemy",
                value: cardEnemy.damage,
                effect: cardEnemy.echec_effect,
                name: cardEnemy.name,
              },
            } as GameReducerActionData,
          });
          appendCanonLaserDamage(cardEnemy, updateEnemy);
          switch (cardEnemy.echec_effect) {
            case "half_damage":
              applyHalfDamage(
                cardEnemy,
                updateHero,
                cardHero.critical_effect === "protect_self"
              );
              break;
            case "use_half_laser":
              applyUseFullCanonLaser(false, false);
              break;
            case "half_heal":
              halfHeal(cardEnemy, updateEnemy);
              break;
            case "half_life_self":
              applyHalfLife(updateEnemy);
              break;
            case "full_life_target":
              applyFullLife(updateHero);
              break;
          }
        }, 2000);
      }
      if (howWin === "loose") {
        dispatchGame({
          type: "appendEffect",
          data: {
            effectState: {
              message: "criticalEnemy",
              value: cardEnemy.damage,
              effect: cardEnemy.critical_effect,
              name: cardEnemy.name,
            },
          } as GameReducerActionData,
        });

        appendCanonLaserDamage(cardEnemy, updateEnemy);
        switch (cardEnemy.critical_effect) {
          case "double_damage":
            applyDoubleDamage(
              cardEnemy,
              updateHero,
              cardHero.echec_effect === "protect_self",
              cardHero.echec_effect === "suffer_double_damage"
            );
            break;
          case "use_full_laser":
            applyUseFullCanonLaser(false, true);
            break;
          case "double_heal":
            doubleHeal(cardEnemy, updateEnemy);
            break;
          case "half_life_target":
            applyHalfLife(updateHero, cardHero.echec_effect === "protect_self");
            break;
          case "full_life_self":
            applyFullLife(updateEnemy);
            break;
        }
        setTimeout(() => {
          dispatchGame({
            type: "appendEffect",
            data: {
              effectState: {
                message: "echecHero",
                value: cardHero.damage,
                effect: cardHero.echec_effect,
                name: cardHero.name,
              },
            } as GameReducerActionData,
          });
          appendCanonLaserDamage(cardHero, updateHero);
          switch (cardHero.echec_effect) {
            case "half_damage":
              applyHalfDamage(
                cardHero,
                updateEnemy,
                cardEnemy.critical_effect === "protect_self"
              );
              break;
            case "use_half_laser":
              applyUseFullCanonLaser(true, false);
              break;
            case "half_heal":
              halfHeal(cardHero, updateHero);
              break;
            case "half_life_self":
              applyHalfLife(updateHero);
              break;
            case "full_life_target":
              applyFullLife(updateEnemy);
              break;
          }
        }, 2000);
      }
      if (howWin === "draw") {
        dispatchGame({
          type: "appendEffect",
          data: {
            effectState: {
              message: "drawHero",
              value: cardHero.damage,
              effect: cardHero.draw_effect,
              name: cardHero.name,
            },
          } as GameReducerActionData,
        });
        appendCanonLaserDamage(cardHero, updateHero);
        switch (cardHero.draw_effect) {
          case "damage":
            applyDamage(
              cardHero,
              updateEnemy,
              cardEnemy.draw_effect === "protect_self"
            );
            break;
          case "use_full_laser":
            applyUseFullCanonLaser(true, true);
            break;
          case "heal":
            heal(cardHero, updateHero);
            break;
        }
        setTimeout(() => {
          dispatchGame({
            type: "appendEffect",
            data: {
              effectState: {
                message: "drawEnemy",
                value: cardEnemy.damage,
                effect: cardEnemy.draw_effect,
                name: cardEnemy.name,
              },
            } as GameReducerActionData,
          });
          appendCanonLaserDamage(cardEnemy, updateEnemy);
          switch (cardEnemy.draw_effect) {
            case "damage":
              applyDamage(
                cardEnemy,
                updateHero,
                cardHero.draw_effect === "protect_self"
              );
              break;
            case "use_full_laser":
              applyUseFullCanonLaser(false, true);
              break;
            case "heal":
              heal(cardEnemy, updateEnemy);
              break;
            default:
              return;
          }
        }, 2000);
      }
    },
    [stateGame, findCardHeroById, findCardEnemyById]
  );

  return applyEffects;
};

export default useRetrospacegameadventurefightsceneApplyEffects;