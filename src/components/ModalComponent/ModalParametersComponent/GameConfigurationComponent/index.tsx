import { useMemo, useState } from "react";

import ModalComponent, { ModalChildrenParametersComponentProps } from "../..";
import TranslationComponent from "../../../TranslationComponent";
import { ParametersLanguagesComponent } from "../ModalParametersLanguagesComponent";
import {
  GameConfigurationContainerStyled,
  GameConfigurationFooterStyled,
  GameConfigurationMainStyled,
  GameConfigurationSectionStyled,
} from "./styles";
import { ButtonClassicType } from "../../../ButtonClassicComponent";
import ButtonClassicGroupComponent from "../../../ButtonClassicGroupComponent";
import { ParametersDialogueSpeedComponent } from "../ModalParametersDialogueSpeedComponent";
import { ParametersVibrationComponent } from "../ModalParametersVibrationComponent";
import { useGameProvider } from "../../../../gameProvider";
import { ParametersAudioComponent } from "../ModalParametersAudioComponent";
import { ParametersSoundEffectComponent } from "../ModalParametersSoundEffectComponent";

const MAX_STEP = 4;

const StepParametersLanguagesComponent: React.FC = () => {
  return (
    <GameConfigurationSectionStyled>
      <div>
        <h3>
          <TranslationComponent id="parameters_languages" />
        </h3>
        <div>1/{MAX_STEP}</div>
      </div>
      <div>
        <ParametersLanguagesComponent
          open
          buttonsDirection="row"
          delayBetweenButtons={0}
        />
      </div>
    </GameConfigurationSectionStyled>
  );
};

const StepParametersDialogueSpeedComponent: React.FC = () => {
  return (
    <GameConfigurationSectionStyled>
      <div>
        <h3>
          <TranslationComponent id="parameters_dialogue_speed" />
        </h3>
        <div>2/{MAX_STEP}</div>
      </div>
      <div>
        <ParametersDialogueSpeedComponent
          open
          buttonsDirection="row"
          delayBetweenButtons={0}
        />
      </div>
    </GameConfigurationSectionStyled>
  );
};

const StepParametersAudioComponent: React.FC = () => {
  const { isMobileDevice } = useGameProvider();
  return (
    <GameConfigurationSectionStyled>
      <div>
        <h3>
          <TranslationComponent id="game_configuration_volume" />
        </h3>
        <div>3/{MAX_STEP}</div>
      </div>
      <div>
        <section>
          <h4>
            <TranslationComponent id="parameters_audio" />
          </h4>
          <ParametersAudioComponent />
        </section>
        <section>
          <h4>
            <TranslationComponent id="parameters_activate_sound_effect" />
          </h4>
          <ParametersSoundEffectComponent />
        </section>
        {!isMobileDevice && (
          <section>
            <h4>
              <TranslationComponent id="parameters_activate_vibration" />
            </h4>
            <ParametersVibrationComponent
              open
              buttonsDirection="row"
              delayBetweenButtons={0}
            />
          </section>
        )}
      </div>
    </GameConfigurationSectionStyled>
  );
};

export const GameConfigurationComponent: React.FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const [step, setStep] = useState<number>(0);

  const buttonsAction = useMemo<ButtonClassicType[]>(() => {
    if (step === 0) {
      return [
        {
          idText: "game_configuration_next",
          key: "next",
        },
      ];
    }
    if (step >= MAX_STEP - 1) {
      return [
        {
          idText: "game_configuration_finish",
          key: "finish",
        },
      ];
    }
    return [
      {
        idText: "parameters_back",
        key: "back",
      },
      {
        idText: "game_configuration_next",
        key: "next",
      },
    ];
  }, [step]);

  return (
    <GameConfigurationContainerStyled>
      <GameConfigurationMainStyled>
        {step === 0 && <StepParametersLanguagesComponent />}
        {step === 1 && <StepParametersDialogueSpeedComponent />}
        {step === 2 && <StepParametersAudioComponent />}
      </GameConfigurationMainStyled>
      <GameConfigurationFooterStyled>
        <ButtonClassicGroupComponent
          buttons={buttonsAction}
          show
          direction="row"
          delayBetweenButtons={0}
          onClick={(key: string) => {
            if (key === "next") {
              setStep(step + 1);
            } else if (key === "back") {
              setStep(step - 1);
            } else if (key === "finish") {
              onClose();
              setStep(0);
            }
          }}
        />
      </GameConfigurationFooterStyled>
    </GameConfigurationContainerStyled>
  );
};

const ModalGameConfigurationComponent: React.FC<
  ModalChildrenParametersComponentProps & {
    onClose: () => void;
  }
> = (props) => {
  const { open, onClose, ...rest } = props;

  return (
    <ModalComponent
      title="parameters_game_configuration_title"
      open={open}
      isChildren
      inert={false}
      {...rest}
    >
      <GameConfigurationComponent onClose={onClose} />
    </ModalComponent>
  );
};
export default ModalGameConfigurationComponent;
