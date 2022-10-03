import React, { Dispatch, FC, FormEvent, SetStateAction, lazy } from "react";
import styles from "@/styles/components/MessageInput.module.scss";

const SendIcon = lazy(() => import("@/Icons/sendIcon"));

type MessageInput = {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  setState: Dispatch<SetStateAction<string>>;
  state: string;
  loading: boolean;
};

const MessageInput: FC<MessageInput> = ({
  onSubmit,
  setState,
  state,
  loading,
}) => {
  return (
    <form className={styles.container} onSubmit={onSubmit}>
      <input
        type="text"
        className={styles.input}
        value={state}
        onChange={(e) => setState(e.target.value)}
      />
      {state && (
        <button className={styles.button} disabled={loading} type="submit">
          <SendIcon />
        </button>
      )}
    </form>
  );
};

export default MessageInput;
