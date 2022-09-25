import React, { useState } from "react";
import styles from "@/styles/components/UserList.module.scss";
import { useEffect } from "react";
import {
  collection,
  DocumentData,
  getDocs,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { db } from "@/firebase";
import { useAuthUser } from "@/atoms/useAuthUser";
import { usePage } from "@/hooks/usePage";
import { useParams } from "react-router-dom";

const UserList = () => {
  const authUser = useAuthUser();
  const { toPrivateRoom } = usePage();
  const [users, setUsers] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);
  const { partnerid } = useParams();
  useEffect(() => {
    const usersRef = collection(db, "users");
    getDocs(usersRef).then((snapshot) => {
      setUsers([...snapshot.docs.filter((doc) => doc.id !== authUser?.uid!)]);
    });
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
              onClick={() => toPrivateRoom(authUser?.uid!, user.id)}
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
};

export default UserList;
