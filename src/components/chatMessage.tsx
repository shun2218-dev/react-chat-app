import React, { useState, useEffect, FC } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { Skeleton } from "@mui/material";
import { formatTime } from "@/lib/formatTime";
import { Message } from "@/types/Message";
import Avatar from "./avatar";
import styles from "@/styles/components/ChatMessage.module.scss";

const ChatMessage: FC<Message> = ({ from, createdAt, id, message }) => {
  const { uid, partnerid } = useParams();
  const [partnerName, setPartnerName] = useState("");
  const [partnerPhoto, setPartnerPhoto] = useState("");

  const getPartnerInfo = async (partnerid: string) => {
    const userRef = doc(db, "users", partnerid);
    const snapshot = await getDoc(userRef);
    return {
      displayName: snapshot.data()!.displayName,
      photoURL: snapshot.data()!.photoURL,
    };
  };

  useEffect(() => {
    getPartnerInfo(partnerid!).then(({ displayName, photoURL }) => {
      setPartnerName(displayName);
      setPartnerPhoto(photoURL);
    });
  }, []);

  return (
    <>
      {from === uid ? (
        <ul className={`${styles.message} ${styles.own}`}>
          <li className={styles.text}>
            <p className={styles.bubble}>{message}</p>
            {createdAt !== null && (
              <p className={styles.time}>{formatTime(createdAt)}</p>
            )}
          </li>
        </ul>
      ) : (
        <ul className={`${styles.message} ${styles.partner}`}>
          <li className={styles.profile}>
            <Avatar size={40} storageRef={partnerPhoto} chat />
            {partnerName ? (
              <p>{partnerName}</p>
            ) : (
              <Skeleton variant="text" width={100} height={24} />
            )}
          </li>
          <li className={styles.text}>
            <p className={styles.bubble}>{message}</p>
            {createdAt !== null ? (
              <p className={styles.time}>{formatTime(createdAt)}</p>
            ) : (
              <Skeleton variant="text" width={40} height={24} />
            )}
          </li>
        </ul>
      )}
    </>
  );
};

export default ChatMessage;
