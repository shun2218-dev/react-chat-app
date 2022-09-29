import React, { FormEvent, Fragment, useEffect, useState } from "react";
import MessageInput from "@/components/messageInput";
import UserList from "@/components/userList";
import { Message } from "@/types/Message";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/firebase";
import { useParams } from "react-router-dom";
import ChatMessage from "@/components/chatMessage";
import MessageDate from "@/components/messageDate";
import { formatDate } from "@/lib/formatDate";
import styles from "@/styles/pages/GroupRoom.module.scss";

const GroupRoom = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [docs, setDocs] = useState<Message[]>([]);
  const { uid, groupid } = useParams();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message) {
      const groupRef = collection(db, "groups", groupid!, "messages");
      await addDoc(groupRef, {
        message,
        from: uid!,
        createdAt: serverTimestamp(),
      }).then(() => setMessage(""));
    }
  };

  useEffect(() => {
    const q = query(
      collection(db, "groups", groupid!, "messages"),
      orderBy("createdAt", "asc")
    );
    const unSub = onSnapshot(q, (snapshot) => {
      setDocs([
        ...snapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() } as Message;
        }),
      ]);
    });
    return () => {
      unSub();
    };
  }, []);
  return (
    <>
      <UserList group />
      <div className={styles.chatRoom}>
        {docs.length ? (
          docs.map((doc, index) => {
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
                const preDate = formatDate(docs[index - 1]);
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
