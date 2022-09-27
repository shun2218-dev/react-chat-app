import { NavigationState } from "@/types/NavigationState";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useTimeout } from "react-use";

type FlashMessage = {
  messageState: NavigationState | undefined;
  flashState: boolean;
  flashMessage: boolean;
  isReady: boolean;
  reset: () => void;
};

export const useFlashMessage = (timeout: number) => {
  const location = useLocation();
  const [flashMessage, setFlashMessage] = useState(false);
  const [isReady, cancel, reset] = useTimeout(timeout);

  useEffect(() => {
    if (location.state) {
      setFlashMessage(true);
    } else {
      setFlashMessage(false);
    }
  }, [location]);
  return {
    messageState: location.state,
    flashState: flashMessage && !isReady(),
    flashMessage,
    isReady: !isReady(),
    reset,
  } as FlashMessage;
};
