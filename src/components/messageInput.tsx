import React, {
  ChangeEvent,
  Dispatch,
  FC,
  FormEvent,
  SetStateAction,
} from "react";
import SendIcon from "@mui/icons-material/Send";
import styles from "@/styles/components/MessageInput.module.scss";

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
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value);
    console.log(e.target.value);
  };
  return (
    <form className={styles.container} onSubmit={onSubmit}>
      <input
        type="text"
        className={styles.input}
        value={state}
        onChange={handleChange}
      />
      {state && (
        <button className={styles.button} disabled={loading} type="submit">
          <SendIcon
            sx={{
              height: "25px",
              color: "white",
              opacity: `${loading ? 0.3 : 1}`,
            }}
          />
        </button>
      )}
    </form>
  );
};

export default MessageInput;
