import React, { useState } from "react";
import styles from "@/styles/components/UserList.module.scss";
import { useEffect } from "react";
import {
  collection,
  DocumentData,
  QueryDocumentSnapshot,
  onSnapshot,
} from "firebase/firestore";
import { db } from "@/firebase";
import { useAuthUser } from "@/atoms/useAuthUser";
import { usePage } from "@/hooks/usePage";
import { useParams } from "react-router-dom";
import { memo } from "react";

type Rooms = {
  uid: string;
  roomid: string;
  length?: number;
};
const UserList = memo(() => {
  const authUser = useAuthUser();
  const { toPrivateRoom } = usePage();
  const [users, setUsers] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);
  const { partnerid } = useParams();

  useEffect(() => {
    const usersRef = collection(db, "users");
    const unSub = onSnapshot(usersRef, (snapshot) => {
      setUsers([...snapshot.docs.filter((doc) => doc.id !== authUser?.uid!)]);
    });
    return () => {
      unSub();
    };
  }, []);

  return (
    <div className={styles.container}>
      <ul className={styles.userList}>
        {users.length ? (
          users.map((user) => (
            <li
              key={user.id}
              className={`${styles.user} ${
                partnerid === user.id ? styles.active : styles.passive
              }`}
              onClick={() => {
                toPrivateRoom(authUser?.uid!, user.id);
              }}
            >
              <img src={user.data().photoURL} alt="" className={styles.image} />
              <p>{user.data().displayName}</p>
            </li>
          ))
        ) : (
          <div>...loading</div>
        )}
      </ul>
    </div>
  );
});

export default UserList;
