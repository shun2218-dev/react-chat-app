import React, { FormEvent, useState } from "react";
import UserList from "@/components/userList";
import { useParams } from "react-router-dom";
import styles from "@/styles/pages/Private.module.scss";
import SendIcon from "@mui/icons-material/Send";

const Private = () => {
  const [isRoom, setIsRoom] = useState(false);
  const { partnerid } = useParams();
  const [message, setMessage] = useState("");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(message);
    setMessage("");
  };

  return (
    <>
      <UserList />
      {partnerid && (
        <form className={styles.container} onSubmit={onSubmit}>
          <input
            type="text"
            className={styles.input}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          {message && (
            <button className={styles.button} type="submit">
              <SendIcon sx={{ height: "25px" }} />
            </button>
          )}
        </form>
      )}
    </>
  );
};

export default Private;
