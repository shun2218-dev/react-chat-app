import React, { FormEvent, Fragment, useState } from "react";
import UserList from "@/components/userList";
import { useLocation, useParams } from "react-router-dom";
import styles from "@/styles/pages/Private.module.scss";
import SendIcon from "@mui/icons-material/Send";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/firebase";
import { useEffect } from "react";
import { Message } from "@/types/Message";
import ChatMessage from "@/components/chatMessage";
import MessageDate from "@/components/messageDate";
import isCreatedRoom from "@/lib/private/isCreatedRoom";
import { formatDate } from "@/lib/formatDate";
import NotFoundIcon from "@mui/icons-material/SearchOff";
import CircularProgress from "@mui/material/CircularProgress";
import MessageInput from "@/components/messageInput";
import { useChatMessage } from "@/hooks/useChatMessage";

const Private = () => {
  const { uid, partnerid } = useParams();
  const { pathname } = useLocation();
  const [message, setMessage] = useState("");
  const {
    chatMessages,
    chatRoom,
    setChatRoom,
    loading,
    setLoading,
    dataLoading,
    setRoomExist,
    roomExist,
  } = useChatMessage();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (uid && partnerid) {
      setLoading(true);
      const { exist, roomid } = await isCreatedRoom(uid, partnerid, message);
      setChatRoom(roomid);
      setRoomExist(exist);
      if (exist) {
        console.log("room is exist");
        const roomRef = collection(db, "rooms", `${roomid}`, "messages");
        await addDoc(roomRef, {
          message,
          from: uid,
          createdAt: serverTimestamp(),
        });
      } else {
        console.log("room is created");
      }
      setLoading(false);
      setMessage("");
    }
  };

  return (
    <>
      <UserList />
      <div className={styles.chatRoom}>
        {dataLoading ? (
          <div className={styles.load}>
            <CircularProgress />
            <p>loading...</p>
          </div>
        ) : chatMessages.length !== 0 ? (
          chatMessages.map((doc, index) => {
            if (doc.createdAt !== null) {
              const targetDate = formatDate(doc);
              if (index === 0) {
                return (
                  <Fragment key={doc.id}>
                    <MessageDate {...targetDate} />
                    <ChatMessage {...doc} />
                  </Fragment>
                );
              } else {
                const preDate = formatDate(chatMessages[index - 1]);
                if (
                  preDate.month === targetDate.month &&
                  preDate.day === targetDate.day
                ) {
                  return <ChatMessage key={doc.id} {...doc} />;
                } else {
                  return (
                    <Fragment key={doc.id}>
                      <MessageDate {...targetDate} />
                      <ChatMessage {...doc} />
                    </Fragment>
                  );
                }
              }
            }
          })
        ) : (
          chatRoom === "" &&
          roomExist && (
            <div className={styles.notFound}>
              <NotFoundIcon fontSize="large" />
              <p>
                No history found. <br />
                You have not started a conversation with this person yet.
              </p>
            </div>
          )
        )}
      </div>
      {uid && partnerid && (
        <MessageInput
          onSubmit={onSubmit}
          loading={loading}
          state={message}
          setState={setMessage}
        />
      )}
    </>
  );
};

export default Private;
