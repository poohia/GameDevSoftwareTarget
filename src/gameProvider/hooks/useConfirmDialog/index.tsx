import { useCallback, useState } from "react";

export type ConfirmationType = {
  title: string;
  message?: string;
};

const useConfirmDialog = () => {
  const [confirmation, setConfirmation] = useState<ConfirmationType | null>(
    null
  );
  const confirmFunc = useCallback(async (c: ConfirmationType) => {}, []);

  const ConfirmDialog = useCallback<React.FC>(() => {
    if (confirmation) {
      return null;
    }
    return <div>im here!!</div>;
  }, []);

  return {
    ConfirmDialog,
  };
};

export default useConfirmDialog;
