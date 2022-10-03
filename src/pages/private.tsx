import React, { FormEvent, Fragment, useState, lazy } from "react";
import { useParams } from "react-router-dom";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useChatMessage } from "@/hooks/useChatMessage";
import { db } from "@/firebase";
import { formatDate } from "@/lib/formatDate";
import isCreatedRoom from "@/lib/private/isCreatedRoom";
import styles from "@/styles/pages/Private.module.scss";
import CircularProgress from "@mui/material/CircularProgress";

const UserList = lazy(() => import("@/components/userList"));
const ChatMessage = lazy(() => import("@/components/chatMessage"));
const MessageDate = lazy(() => import("@/components/messageDate"));
const MessageInput = lazy(() => import("@/components/messageInput"));
const NotFoundIcon = lazy(() => import("@/Icons/notFoundIcon"));

const Private = () => {
  const { uid, partnerid } = useParams();
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
              <NotFoundIcon />
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
