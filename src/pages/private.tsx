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

const Private = () => {
  const [isRoom, setIsRoom] = useState(false);
  const { uid, partnerid } = useParams();
  const { pathname } = useLocation();
  const [message, setMessage] = useState("");
  const [docs, setDocs] = useState<Message[]>([]);
  const [chatRoom, setChatRoom] = useState("");
  const [loading, setLoading] = useState(false);
  console.log(loading);

  const onSubmit = async (
    e: FormEvent<HTMLFormElement>,
    uid: string,
    partnerid: string
  ) => {
    e.preventDefault();
    if (uid && partnerid) {
      setLoading(true);
      const { exist, roomid } = await isCreatedRoom(uid, partnerid, message);
      setChatRoom(roomid);
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

  const getRoomId = async (uid: string, roomDocId: string) => {
    let roomid: string = "";
    const roomRef = doc(db, "users", `${uid}`, "rooms", `${roomDocId}`);
    await getDoc(roomRef).then((res) => {
      roomid = res.data()!.roomid;
    });
    return roomid;
  };

  useEffect(() => {
    setLoading(true);
    const userRef = collection(db, "users", `${uid}`, "rooms");
    getDocs(userRef)
      .then((snapshot) => {
        const room = snapshot.docs.filter((doc) => doc.id === partnerid);
        if (room.length && uid) {
          const roomDocId = room[0].id;
          getRoomId(uid, roomDocId).then((roomid) => {
            setChatRoom(roomid);
            const messageRef = query(
              collection(db, "rooms", `${roomid}`, "messages"),
              orderBy("createdAt", "asc")
            );
            getDocs(messageRef).then((snapshot) => {
              setDocs([
                ...snapshot.docs.map((doc) => {
                  return {
                    id: doc.id,
                    ...doc.data(),
                  } as Message;
                }),
              ]);
            });
          });
        } else {
          console.log("not exist");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [pathname]);

  useEffect(() => {
    setLoading(true);
    if (chatRoom) {
      const q = query(
        collection(db, "rooms", `${chatRoom}`, "messages"),
        orderBy("createdAt", "asc")
      );
      const unSub = onSnapshot(q, (querySnapshot) => {
        setDocs([
          ...querySnapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            } as Message;
          }),
        ]);
      });
      setLoading(false);
      return () => {
        unSub();
      };
    }
  }, [chatRoom]);

  useEffect(() => {
    if (partnerid) {
      setIsRoom(true);
      setDocs([]);
      setChatRoom("");
    } else {
      setIsRoom(false);
    }
  }, [pathname]);

  return (
    <>
      <UserList />
      <div className={styles.chatRoom}>
        {loading ? (
          <div className={styles.load}>
            <CircularProgress />
            <p>loading...</p>
          </div>
        ) : docs.length !== 0 ? (
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
        ) : (
          !chatRoom && (
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
        <form
          className={styles.container}
          onSubmit={(e) => onSubmit(e, uid, partnerid)}
        >
          <input
            type="text"
            className={styles.input}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          {message && (
            <button className={styles.button} disabled={loading} type="submit">
              <SendIcon sx={{ height: "25px" }} />
            </button>
          )}
        </form>
      )}
    </>
  );
};

export default Private;
