import React, { FormEvent, Fragment, useState, lazy } from "react";
import { useParams } from "react-router-dom";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase";
import { formatDate } from "@/lib/formatDate";
import styles from "@/styles/pages/GroupRoom.module.scss";
import { useChatMessage } from "@/hooks/useChatMessage";

const MessageInput = lazy(() => import("@/components/messageInput"));
const UserList = lazy(() => import("@/components/userList"));
const ChatMessage = lazy(() => import("@/components/chatMessage"));
const MessageDate = lazy(() => import("@/components/messageDate"));

const GroupRoom = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { uid, groupid } = useParams();
  const { chatMessages } = useChatMessage(true);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message) {
      setLoading(true);
      const groupRef = collection(db, "groups", groupid!, "messages");
      await addDoc(groupRef, {
        message,
        from: uid!,
        createdAt: serverTimestamp(),
      }).then(() => setMessage(""));
      setLoading(false);
    }
  };

  return (
    <>
      <UserList group />
      <div className={styles.chatRoom}>
        {chatMessages.length ? (
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
        ) : loading ? (
          <div>...loading</div>
        ) : (
          <div>No history.</div>
        )}
      </div>
      <MessageInput
        onSubmit={onSubmit}
        loading={loading}
        state={message}
        setState={setMessage}
      />
    </>
  );
};

export default GroupRoom;
