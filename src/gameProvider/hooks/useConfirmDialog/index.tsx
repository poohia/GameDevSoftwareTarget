import { useCallback, useMemo, useRef, useState } from "react";
import styled from "styled-components";

import {
  ButtonClassicGroupComponent,
  TranslationComponent,
} from "../../../components";
import { ButtonClassicType } from "../../../components/ButtonClassicComponent";
import { GameProviderHooksDefaultInterface } from "..";

export type ConfirmationType = {
  title: string;
  message?: string;
};

const ConfirmationContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 500px;
    width: 80vw;
    height: fit-content;
  }
`;

export interface useConfirmDialogInterface
  extends
    GameProviderHooksDefaultInterface,
    ReturnType<typeof useConfirmDialog> {}

const useConfirmDialog = () => {
  const [confirmation, setConfirmation] = useState<ConfirmationType | null>(
    null
  );
  const resolverRef = useRef<((value: boolean) => void) | null>(null);

  const confirm = useCallback((c: ConfirmationType) => {
    setConfirmation(c);

    return new Promise<boolean>((resolve) => {
      resolverRef.current = resolve;
    });
  }, []);

  const closeConfirm = useCallback((result: boolean) => {
    resolverRef.current?.(result);
    resolverRef.current = null;
    setConfirmation(null);
  }, []);

  const buttonsActions = useMemo<ButtonClassicType[]>(
    () => [
      {
        idText: "Annuler",
        key: "cancel",
      },
      {
        idText: "Confirmer",
        key: "confirmation",
      },
    ],
    []
  );
  console.log("🚀 ~ useConfirmDialog ~ buttonsActions:", buttonsActions);

  const ConfirmDialog = useCallback<React.FC>(() => {
    if (!confirmation) {
      return null;
    }

    return (
      <ConfirmationContent>
        <div>
          <h2>
            <TranslationComponent id={confirmation.title} />
          </h2>
          {confirmation.message && (
            <p>
              <TranslationComponent id={confirmation.message} />
            </p>
          )}

          <ButtonClassicGroupComponent
            buttons={buttonsActions}
            direction="row"
            delayBetweenButtons={0}
          />
        </div>
      </ConfirmationContent>
    );
  }, [confirmation, closeConfirm]);

  return {
    confirm,
    ConfirmDialog,
  };
};

export default useConfirmDialog;
